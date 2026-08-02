import type { TrophiesConfig } from '../../types/stats';
import { THEMES } from '../../constants/themes';

interface TrophyItem {
  title: string;
  rank: 'SSS' | 'SS' | 'S' | 'A' | 'B';
  category: string;
  badgeColor: string;
}

export const renderTrophiesSvg = (config: TrophiesConfig): string => {
  const selectedTheme = THEMES.find((t) => t.id === config.theme) || THEMES[0];

  const bgColor = `#${selectedTheme.bg_color}`;
  const titleColor = `#${selectedTheme.title_color}`;
  const textColor = `#${selectedTheme.text_color}`;
  const borderColor = selectedTheme.border_color ? `#${selectedTheme.border_color}` : '#30363d';

  const trophyList: TrophyItem[] = [
    { title: 'Commits', rank: 'SSS', category: '1,450+ Commits', badgeColor: '#eab308' },
    { title: 'Stars', rank: 'SS', category: '120+ Stars', badgeColor: '#38bdf8' },
    { title: 'Pull Requests', rank: 'S', category: '60+ PRs', badgeColor: '#a855f7' },
    { title: 'Streak', rank: 'SS', category: '42 Days', badgeColor: '#f97316' },
    { title: 'Issues', rank: 'A', category: '20+ Fixed', badgeColor: '#22c55e' },
    { title: 'Repositories', rank: 'A', category: '15+ Repos', badgeColor: '#ec4899' },
  ];

  let itemsSvg = '';
  trophyList.forEach((item, idx) => {
    const x = (idx % 3) * 155 + 15;
    const y = Math.floor(idx / 3) * 110 + 20;

    itemsSvg += `
    <g transform="translate(${x}, ${y})">
      <rect x="0" y="0" width="140" height="95" rx="10" fill="${bgColor}" stroke="${borderColor}" stroke-width="1.2"/>
      
      <!-- Trophy Cup Icon -->
      <g transform="translate(70, 32)">
        <path fill="${item.badgeColor}" d="M-12 -18 H12 V-6 C12 2 6 8 0 8 C-6 8 -12 2 -12 -6 Z M-16 -14 H-12 V-8 H-16 C-18 -8 -19 -10 -19 -11 C-19 -12 -18 -14 -16 -14 Z M12 -14 H16 C18 -14 19 -12 19 -11 C19 -10 18 -8 16 -8 H12 Z M-3 8 H3 V14 H-3 Z M-8 14 H8 V17 H-8 Z"/>
      </g>

      <text x="70" y="65" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="11" font-weight="700" fill="${titleColor}" text-anchor="middle">${item.title}</text>
      <text x="70" y="80" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="10" font-weight="600" fill="${textColor}" opacity="0.8" text-anchor="middle">${item.category}</text>
    </g>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="495" height="250" viewBox="0 0 495 250" fill="none">
  <rect x="0.5" y="0.5" rx="12" width="494" height="249" fill="${bgColor}" stroke="${borderColor}"/>
  ${itemsSvg}
</svg>`;
};
