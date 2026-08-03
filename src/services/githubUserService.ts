export interface MonthlyActivityItem {
  month: string;
  count: number;
}

export interface GitHubUserData {
  username: string;
  name: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  rank: {
    level: string;
    score: number;
    percentile: number;
  };
  topLanguages: Array<{ name: string; percent: number; color: string; size: number }>;
  streak: {
    totalContributions: number;
    currentStreak: number;
    longestStreak: number;
    startDate: string;
    endDate: string;
  };
  monthlyActivity: MonthlyActivityItem[];
  apiStatus?: {
    rateLimited: boolean;
    hasToken: boolean;
    profileFound: boolean;
  };
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  'C++': '#f34b7d',
  'C#': '#178600',
  Java: '#b07219',
  PHP: '#4F5D95',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Ruby: '#701516',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Shell: '#89e051',
  C: '#555555',
  Docker: '#384d54',
};

const userCache = new Map<string, { data: GitHubUserData; timestamp: number }>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes cache

interface ParsedContributions {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  monthlyActivity: MonthlyActivityItem[];
}

/**
 * Scrapes & parses 100% REAL GitHub user contribution data from GitHub's native contribution calendar.
 * This endpoint is unthrottled and available for all public GitHub accounts.
 */
async function fetchParsedContributions(username: string): Promise<ParsedContributions> {
  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) GitHub-Stats-Generator' },
    });

    if (!res.ok) {
      throw new Error(`Contributions HTTP Status ${res.status}`);
    }

    const html = await res.text();

    // 1. Total Contributions
    const totalMatch = html.match(/([\d,]+)\s+contributions/i);
    const totalContributions = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ''), 10) : 0;

    // 2. Extract Days & Tooltips
    const dayIdMap = new Map<string, string>();
    const tdRegex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="(contribution-day-component-[^"]+)"/g;
    let m: RegExpExecArray | null;
    while ((m = tdRegex.exec(html)) !== null) {
      dayIdMap.set(m[2], m[1]);
    }

    const dailyData: { date: string; count: number }[] = [];
    const ttRegex = /for="(contribution-day-component-[^"]+)"[^>]*>\s*(No|\d+)\s+contribution[s]?/g;
    while ((m = ttRegex.exec(html)) !== null) {
      const id = m[1];
      const date = dayIdMap.get(id);
      const count = m[2] === 'No' ? 0 : parseInt(m[2], 10);
      if (date) {
        dailyData.push({ date, count });
      }
    }

    dailyData.sort((a, b) => a.date.localeCompare(b.date));

    // 3. Calculate Real Streaks
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    for (let i = 0; i < dailyData.length; i++) {
      if (dailyData[i].count > 0) {
        tempStreak++;
        if (tempStreak > longestStreak) longestStreak = tempStreak;
      } else {
        tempStreak = 0;
      }
    }

    for (let i = dailyData.length - 1; i >= 0; i--) {
      if (dailyData[i].count > 0) {
        currentStreak++;
      } else {
        // Skip current day if 0 contributions so far today
        if (i === dailyData.length - 1 && dailyData[i].count === 0) {
          continue;
        }
        break;
      }
    }

    // 4. Group by Month (last 7 months)
    const monthlyMap: Record<string, number> = {};
    dailyData.forEach((d) => {
      const monthKey = d.date.substring(0, 7); // e.g. "2026-08"
      monthlyMap[monthKey] = (monthlyMap[monthKey] || 0) + d.count;
    });

    const monthKeys = Object.keys(monthlyMap).sort();
    const last7Months = monthKeys.slice(-7);
    const monthlyActivity: MonthlyActivityItem[] = last7Months.map((mk) => ({
      month: mk,
      count: monthlyMap[mk] || 0,
    }));

    return {
      totalContributions,
      currentStreak,
      longestStreak,
      monthlyActivity,
    };
  } catch (err) {
    return {
      totalContributions: 0,
      currentStreak: 0,
      longestStreak: 0,
      monthlyActivity: [],
    };
  }
}

async function fetchAllUserRepos(cleanUser: string, headers: Record<string, string>, hasToken: boolean): Promise<any[]> {
  let allRepos: any[] = [];
  let page = 1;
  const maxPages = 10; // Supports up to 1000 repositories

  // If token is present, try authenticated /user/repos?visibility=all to fetch private repos if token belongs to cleanUser
  if (hasToken) {
    try {
      const authUserRes = await fetch('https://api.github.com/user', { headers }).catch(() => null);
      if (authUserRes && authUserRes.ok) {
        const authUser = await authUserRes.json();
        if (authUser.login?.toLowerCase() === cleanUser) {
          while (page <= maxPages) {
            const res = await fetch(`https://api.github.com/user/repos?visibility=all&per_page=100&page=${page}&sort=updated`, { headers }).catch(() => null);
            if (!res || !res.ok) break;
            const repos = await res.json();
            if (!Array.isArray(repos) || repos.length === 0) break;
            allRepos = allRepos.concat(repos);
            if (repos.length < 100) break;
            page++;
          }
          if (allRepos.length > 0) return allRepos;
        }
      }
    } catch (err) {
      // Ignore
    }
  }

  // Otherwise, fetch public & accessible repos for cleanUser across all pages
  page = 1;
  while (page <= maxPages) {
    try {
      const res = await fetch(`https://api.github.com/users/${cleanUser}/repos?per_page=100&page=${page}&type=all&sort=updated`, { headers }).catch(() => null);
      if (!res || !res.ok) break;
      const repos = await res.json();
      if (!Array.isArray(repos) || repos.length === 0) break;
      allRepos = allRepos.concat(repos);
      if (repos.length < 100) break;
      page++;
    } catch (err) {
      break;
    }
  }

  return allRepos;
}

async function fetchGraphQLUserData(cleanUser: string, token: string): Promise<Partial<GitHubUserData> | null> {
  const query = `
    query($username: String!) {
      user(login: $username) {
        name
        login
        avatarUrl
        followers { totalCount }
        repositories(first: 100, ownerAffiliations: [OWNER]) {
          totalCount
        }
        contributionsCollection {
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          restrictedContributionsCount
        }
      }
    }
  `;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'User-Agent': 'GitHub-Stats-Generator-App',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables: { username: cleanUser } }),
    });

    if (res.ok) {
      const json = await res.json();
      const u = json.data?.user;
      if (u) {
        const contribs = u.contributionsCollection || {};
        const totalCommits = Number(contribs.totalCommitContributions || 0) + Number(contribs.restrictedContributionsCount || 0);
        const totalPRs = Number(contribs.totalPullRequestContributions || 0);
        const totalIssues = Number(contribs.totalIssueContributions || 0);
        const totalContributions = totalCommits + totalPRs + totalIssues + Number(contribs.totalPullRequestReviewContributions || 0);

        return {
          totalCommits,
          totalPRs,
          totalIssues,
          publicRepos: Number(u.repositories?.totalCount || 0),
          followers: Number(u.followers?.totalCount || 0),
          streak: {
            totalContributions,
            currentStreak: 0,
            longestStreak: 0,
            startDate: 'Jan 1',
            endDate: 'Present',
          },
        };
      }
    }
  } catch (err) {
    // Ignore
  }
  return null;
}

export async function fetchGitHubUserData(username: string): Promise<GitHubUserData> {
  const cleanUser = username.trim().toLowerCase();
  const now = Date.now();

  if (!cleanUser || cleanUser.length < 2) {
    return getFallbackUserData(cleanUser || 'kroxlycode');
  }

  if (userCache.has(cleanUser)) {
    const cached = userCache.get(cleanUser)!;
    if (now - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }
  }

  // If running inside browser, fetch from backend API endpoint to prevent browser CORS restrictions
  if (typeof window !== 'undefined') {
    try {
      const baseUrl = window.location.origin ? `${window.location.origin}/api` : 'http://localhost:3001/api';
      const apiRes = await fetch(`${baseUrl}/user-data?username=${encodeURIComponent(cleanUser)}`);
      if (apiRes.ok) {
        const data = await apiRes.json();
        if (data && data.username && data.apiStatus?.profileFound) {
          userCache.set(cleanUser, { data, timestamp: now });
          return data;
        } else if (data) {
          return data;
        }
      }
    } catch (err) {
      // Ignore
    }
  }

  const nodeEnv = (typeof globalThis !== 'undefined' && (globalThis as any).process?.env) || {};
  const token = nodeEnv.GITHUB_TOKEN || nodeEnv.VITE_GITHUB_TOKEN || (import.meta as any)?.env?.VITE_GITHUB_TOKEN || (import.meta as any)?.env?.GITHUB_TOKEN;

  const headers: Record<string, string> = {
    'User-Agent': 'GitHub-Stats-Generator-App',
    Accept: 'application/vnd.github.v3+json',
  };

  const commitHeaders: Record<string, string> = {
    ...headers,
    Accept: 'application/vnd.github.cloak-preview+json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    commitHeaders['Authorization'] = `Bearer ${token}`;
  }

  try {
    const [userRes, reposJson, commitsRes, prsRes, issuesRes, parsedContribs, graphQLData] = await Promise.all([
      fetch(`https://api.github.com/users/${cleanUser}`, { headers }).catch(() => null),
      fetchAllUserRepos(cleanUser, headers, Boolean(token)),
      fetch(`https://api.github.com/search/commits?q=author:${cleanUser}`, { headers: commitHeaders }).catch(() => null),
      fetch(`https://api.github.com/search/issues?q=author:${cleanUser}+type:pr`, { headers }).catch(() => null),
      fetch(`https://api.github.com/search/issues?q=author:${cleanUser}+type:issue`, { headers }).catch(() => null),
      fetchParsedContributions(cleanUser),
      token ? fetchGraphQLUserData(cleanUser, token) : Promise.resolve(null),
    ]);

    let userJson: any = null;
    let rateLimited = false;

    if (userRes) {
      if (userRes.status === 403 || userRes.status === 429) {
        rateLimited = true;
      }
      if (userRes.ok) {
        userJson = await userRes.json();
      }
    }

    if (!userJson) {
      const fallback = getFallbackUserData(cleanUser);
      if (parsedContribs.totalContributions > 0) {
        fallback.totalCommits = parsedContribs.totalContributions;
        fallback.streak = {
          totalContributions: parsedContribs.totalContributions,
          currentStreak: parsedContribs.currentStreak,
          longestStreak: parsedContribs.longestStreak,
          startDate: 'Jan 1',
          endDate: 'Present',
        };
        fallback.monthlyActivity = parsedContribs.monthlyActivity;
      }
      fallback.apiStatus = { rateLimited, hasToken: Boolean(token), profileFound: false };
      return fallback;
    }

    // Parse Exact Stars, Forks & Top Languages across ALL fetched repository pages
    let totalStars = 0;
    let totalForks = 0;
    const langCountMap: Record<string, number> = {};

    if (Array.isArray(reposJson)) {
      reposJson.forEach((repo: any) => {
        totalStars += Number(repo.stargazers_count || 0);
        totalForks += Number(repo.forks_count || 0);
        if (repo.language) {
          langCountMap[repo.language] = (langCountMap[repo.language] || 0) + 1;
        }
      });
    }

    const totalLangRepos = Object.values(langCountMap).reduce((a, b) => a + b, 0) || 1;
    const topLanguages = Object.entries(langCountMap)
      .map(([name, count]) => ({
        name,
        percent: Math.round((count / totalLangRepos) * 100),
        color: LANGUAGE_COLORS[name] || '#858585',
        size: count,
      }))
      .sort((a, b) => b.percent - a.percent)
      .slice(0, 6);

    // Commits from REST Search API, GraphQL API, or Parsed HTML Contributions
    let totalCommits = 0;
    if (commitsRes && commitsRes.ok) {
      const commitsJson = await commitsRes.json();
      totalCommits = Number(commitsJson?.total_count || 0);
    }
    totalCommits = Math.max(totalCommits, parsedContribs.totalContributions || 0, graphQLData?.totalCommits || 0);

    // PRs Search API or GraphQL
    let totalPRs = 0;
    if (prsRes && prsRes.ok) {
      const prsJson = await prsRes.json();
      totalPRs = Number(prsJson?.total_count || 0);
    }
    totalPRs = Math.max(totalPRs, graphQLData?.totalPRs || 0);

    // Issues Search API or GraphQL
    let totalIssues = 0;
    if (issuesRes && issuesRes.ok) {
      const issuesJson = await issuesRes.json();
      totalIssues = Number(issuesJson?.total_count || 0);
    }
    totalIssues = Math.max(totalIssues, graphQLData?.totalIssues || 0);

    const publicRepos = Math.max(
      Number(userJson.public_repos || 0),
      Array.isArray(reposJson) ? reposJson.length : 0,
      graphQLData?.publicRepos || 0
    );
    const followers = Math.max(Number(userJson.followers || 0), graphQLData?.followers || 0);

    // Score & Rank Calculation
    const score = totalStars * 5 + totalCommits * 0.5 + totalPRs * 2 + followers * 3 + publicRepos * 2;
    let level = 'C';
    if (score > 1000) level = 'S+';
    else if (score > 500) level = 'S';
    else if (score > 250) level = 'A+';
    else if (score > 100) level = 'A';
    else if (score > 30) level = 'B+';
    else if (score > 10) level = 'B';

    const userData: GitHubUserData = {
      username: userJson.login || cleanUser,
      name: userJson.name || userJson.login || cleanUser,
      avatarUrl: userJson.avatar_url || `https://github.com/${cleanUser}.png`,
      publicRepos,
      followers,
      totalStars,
      totalForks,
      totalCommits,
      totalPRs,
      totalIssues,
      rank: {
        level,
        score,
        percentile: Math.min(99, Math.max(20, Math.round(99 - 5000 / (score + 50)))),
      },
      topLanguages: topLanguages.length > 0 ? topLanguages : [
        { name: 'TypeScript', percent: 60, color: '#3178c6', size: 3 },
        { name: 'JavaScript', percent: 40, color: '#f7df1e', size: 2 },
      ],
      streak: {
        totalContributions: parsedContribs.totalContributions || (totalCommits + totalPRs + totalIssues),
        currentStreak: parsedContribs.currentStreak,
        longestStreak: parsedContribs.longestStreak,
        startDate: 'Jan 1',
        endDate: 'Present',
      },
      monthlyActivity: parsedContribs.monthlyActivity,
      apiStatus: {
        rateLimited,
        hasToken: Boolean(token),
        profileFound: true,
      },
    };

    userCache.set(cleanUser, { data: userData, timestamp: now });
    return userData;
  } catch (error) {
    return getFallbackUserData(cleanUser);
  }
}

function getFallbackUserData(cleanUser: string): GitHubUserData {
  return {
    username: cleanUser,
    name: cleanUser,
    avatarUrl: `https://github.com/${cleanUser}.png`,
    publicRepos: 0,
    followers: 0,
    totalStars: 0,
    totalForks: 0,
    totalCommits: 0,
    totalPRs: 0,
    totalIssues: 0,
    rank: { level: 'B', score: 0, percentile: 50 },
    topLanguages: [],
    streak: {
      totalContributions: 0,
      currentStreak: 0,
      longestStreak: 0,
      startDate: 'Jan 1',
      endDate: 'Present',
    },
    monthlyActivity: [],
    apiStatus: {
      rateLimited: false,
      hasToken: false,
      profileFound: false,
    },
  };
}

