import type { TrophiesConfig } from '../../types/stats';
import { THEMES } from '../../constants/themes';
import type { GitHubUserData } from '../githubUserService';

interface TrophyItem {
  title: string;
  rank: 'SSS' | 'SS' | 'S' | 'A' | 'B';
  category: string;
  badgeColor: string;
}

function getRankColor(rank: string): string {
  switch (rank) {
    case 'SSS':
      return '#eab308'; // Gold
    case 'SS':
      return '#38bdf8'; // Cyan/Sky
    case 'S':
      return '#a855f7'; // Purple
    case 'A':
      return '#22c55e'; // Green
    default:
      return '#9ca3af'; // Gray
  }
}

export const renderTrophiesSvg = (config: TrophiesConfig & { userData?: GitHubUserData }): string => {
  const selectedTheme = THEMES.find((t) => t.id === config.theme) || THEMES[0];

  const bgColor = `#${selectedTheme.bg_color}`;
  const titleColor = `#${selectedTheme.title_color}`;
  const textColor = `#${selectedTheme.text_color}`;
  const borderColor = selectedTheme.border_color ? `#${selectedTheme.border_color}` : '#30363d';

  const u = config.userData;

  const commits = u?.totalCommits ?? u?.streak?.totalContributions ?? 0;
  const stars = u?.totalStars ?? 0;
  const prs = u?.totalPRs ?? 0;
  const streak = u?.streak?.longestStreak ?? u?.streak?.currentStreak ?? 0;
  const repos = u?.publicRepos ?? 0;
  const followers = u?.followers ?? 0;

  // Calculate dynamic trophy ranks
  const commitRank = commits >= 1000 ? 'SSS' : commits >= 500 ? 'SS' : commits >= 150 ? 'S' : commits >= 30 ? 'A' : 'B';
  const starRank = stars >= 200 ? 'SSS' : stars >= 50 ? 'SS' : stars >= 15 ? 'S' : stars >= 3 ? 'A' : 'B';
  const prRank = prs >= 100 ? 'SSS' : prs >= 30 ? 'SS' : prs >= 10 ? 'S' : prs >= 2 ? 'A' : 'B';
  const streakRank = streak >= 100 ? 'SSS' : streak >= 30 ? 'SS' : streak >= 14 ? 'S' : streak >= 3 ? 'A' : 'B';
  const repoRank = repos >= 50 ? 'SSS' : repos >= 20 ? 'SS' : repos >= 10 ? 'S' : repos >= 3 ? 'A' : 'B';
  const followerRank = followers >= 100 ? 'SSS' : followers >= 30 ? 'SS' : followers >= 10 ? 'S' : followers >= 2 ? 'A' : 'B';

  const trophyList: TrophyItem[] = [
    { title: 'Commits', rank: commitRank, category: `${commits.toLocaleString()} Commits`, badgeColor: getRankColor(commitRank) },
    { title: 'Stars', rank: starRank, category: `${stars} Stars`, badgeColor: getRankColor(starRank) },
    { title: 'Pull Requests', rank: prRank, category: `${prs} PRs`, badgeColor: getRankColor(prRank) },
    { title: 'Streak', rank: streakRank, category: `${streak} Days`, badgeColor: getRankColor(streakRank) },
    { title: 'Repositories', rank: repoRank, category: `${repos} Repos`, badgeColor: getRankColor(repoRank) },
    { title: 'Followers', rank: followerRank, category: `${followers} Followers`, badgeColor: getRankColor(followerRank) },
  ];

  let itemsSvg = '';
  trophyList.forEach((item, idx) => {
    const x = (idx % 3) * 155 + 15;
    const y = Math.floor(idx / 3) * 110 + 20;

    itemsSvg += `
    <g transform="translate(${x}, ${y})">
      <rect x="0" y="0" width="140" height="95" rx="10" fill="${bgColor}" stroke="${borderColor}" stroke-width="1.2"/>
      
      <!-- Trophy Cup Icon -->
      <g transform="translate(70, 28)">
        <path fill="${item.badgeColor}" d="M-12 -18 H12 V-6 C12 2 6 8 0 8 C-6 8 -12 2 -12 -6 Z M-16 -14 H-12 V-8 H-16 C-18 -8 -19 -10 -19 -11 C-19 -12 -18 -14 -16 -14 Z M12 -14 H16 C18 -14 19 -12 19 -11 C19 -10 18 -8 16 -8 H12 Z M-3 8 H3 V14 H-3 Z M-8 14 H8 V17 H-8 Z"/>
      </g>

      <!-- Trophy Rank Badge -->
      <text x="70" y="58" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="12" font-weight="800" fill="${item.badgeColor}" text-anchor="middle">${item.rank}</text>
      <text x="70" y="72" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="11" font-weight="700" fill="${titleColor}" text-anchor="middle">${item.title}</text>
      <text x="70" y="85" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="10" font-weight="600" fill="${textColor}" opacity="0.8" text-anchor="middle">${item.category}</text>
    </g>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="495" height="250" viewBox="0 0 495 250" fill="none">
  <rect x="0.5" y="0.5" rx="12" width="494" height="249" fill="${bgColor}" stroke="${borderColor}"/>
  ${itemsSvg}
</svg>`;
};

