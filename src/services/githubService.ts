export interface GitHubRepoDetails {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
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
};

// In-memory cache to prevent hitting GitHub API rate limits unnecessarily
const repoCache = new Map<string, GitHubRepoDetails>();

export async function fetchGitHubRepoDetails(username: string, repo: string): Promise<GitHubRepoDetails> {
  const cacheKey = `${username.toLowerCase()}/${repo.toLowerCase()}`;
  if (repoCache.has(cacheKey)) {
    return repoCache.get(cacheKey)!;
  }

  try {
    const headers: Record<string, string> = {
      'User-Agent': 'GitHub-Stats-Generator-App',
      Accept: 'application/vnd.github.v3+json',
    };

    const nodeEnv = (typeof globalThis !== 'undefined' && (globalThis as any).process?.env) || {};
    const token = nodeEnv.GITHUB_TOKEN || nodeEnv.VITE_GITHUB_TOKEN || (import.meta as any)?.env?.VITE_GITHUB_TOKEN || (import.meta as any)?.env?.GITHUB_TOKEN;

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`https://api.github.com/repos/${username}/${repo}`, { headers });

    if (response.ok) {
      const data = await response.json();
      const lang = data.language || 'TypeScript';
      const details: GitHubRepoDetails = {
        name: data.name || repo,
        description: data.description || `${repo} • Open-source repository.`,
        stars: Number(data.stargazers_count || 0),
        forks: Number(data.forks_count || 0),
        language: lang,
        languageColor: LANGUAGE_COLORS[lang] || '#3178c6',
      };
      repoCache.set(cacheKey, details);
      return details;
    }
  } catch (error) {
    console.warn(`GitHub API request failed for ${cacheKey}:`, error);
  }

  return {
    name: repo,
    description: `${repo} • GitHub Repository`,
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    languageColor: '#3178c6',
  };
}
