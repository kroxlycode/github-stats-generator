/**
 * Browser-side GitHub user data fetcher.
 */

export interface MonthlyActivityItem {
  month: string;
  count: number;
}

/**
 * Calls /api/user-data on the same server (Express / Vercel)
 * so the token lives ONLY on the server — never exposed to the browser.
 */

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
  rank: { level: string; score: number; percentile: number };
  topLanguages: Array<{ name: string; percent: number; color: string; size: number }>;
  streak: {
    totalContributions: number;
    currentStreak: number;
    longestStreak: number;
    startDate: string;
    endDate: string;
  };
}

const browserCache = new Map<string, { data: GitHubUserData; ts: number }>();
const TTL = 10 * 60 * 1000; // 10 min

function getApiBase(): string {
  if (typeof window !== 'undefined') {
    // On Vercel: same origin /api/user-data
    // On local dev: http://localhost:3001/api/user-data
    return window.location.origin.includes('localhost') && window.location.port !== '3001'
      ? 'http://localhost:3001/api'
      : `${window.location.origin}/api`;
  }
  return 'http://localhost:3001/api';
}

export async function fetchGitHubUserData(username: string): Promise<GitHubUserData | undefined> {
  const user = username.trim().toLowerCase();

  if (!user || user.length < 2) return undefined;

  const cached = browserCache.get(user);
  if (cached && Date.now() - cached.ts < TTL) {
    console.log(`[Browser GitHub] Cache hit for "${user}"`);
    return cached.data;
  }

  try {
    const url = `${getApiBase()}/user-data?username=${encodeURIComponent(user)}`;
    console.log(`[Browser GitHub] Fetching from: ${url}`);

    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[Browser GitHub] /api/user-data returned ${res.status} for "${user}"`);
      return undefined;
    }

    const data: GitHubUserData = await res.json();
    console.log(`[Browser GitHub] ✅ Got data for "${user}":`, {
      stars: data.totalStars,
      commits: data.totalCommits,
      langs: data.topLanguages.map(l => l.name),
    });

    browserCache.set(user, { data, ts: Date.now() });
    return data;

  } catch (err) {
    console.error(`[Browser GitHub] ❌ Failed to fetch for "${user}":`, err);
    return undefined;
  }
}
