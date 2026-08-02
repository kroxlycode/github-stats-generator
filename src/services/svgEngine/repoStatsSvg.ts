import type { RepoStatsConfig } from '../../types/stats';
import { THEMES } from '../../constants/themes';

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

export const renderRepoStatsSvg = (config: RepoStatsConfig): string => {
  const selectedTheme = THEMES.find((t) => t.id === config.theme) || THEMES[0];
  const repoName = config.repo || 'Hello-World';
  const cleanRepo = repoName.trim() || 'Hello-World';

  const bgColor = config.theme === 'custom' && config.bg_color ? `#${config.bg_color}` : `#${selectedTheme.bg_color}`;
  const titleColor = config.theme === 'custom' && config.title_color ? `#${config.title_color}` : `#${selectedTheme.title_color}`;
  const textColor = config.theme === 'custom' && config.text_color ? `#${config.text_color}` : `#${selectedTheme.text_color}`;
  const iconColor = config.theme === 'custom' && config.icon_color ? `#${config.icon_color}` : `#${selectedTheme.icon_color}`;
  const borderColor = selectedTheme.border_color ? `#${selectedTheme.border_color}` : '#30363d';

  const borderRadius = config.border_radius ?? 8;
  const hideBorder = config.hide_border;
  const fullTitle = config.show_owner ? `${config.username}/${cleanRepo}` : cleanRepo;

  // Use real repoDetails if provided, else calculate fallback
  let desc = config.repoDetails?.description || `${cleanRepo} • Modern, fast and scalable project repository.`;
  let starsCount = config.repoDetails?.stars ?? 0;
  let forksCount = config.repoDetails?.forks ?? 0;
  let langName = config.repoDetails?.language || 'TypeScript';
  let langColor = config.repoDetails?.languageColor || LANGUAGE_COLORS[langName] || '#3178c6';

  if (!config.repoDetails) {
    let hash = 0;
    for (let i = 0; i < cleanRepo.length; i++) {
      hash = (hash << 5) - hash + cleanRepo.charCodeAt(i);
      hash |= 0;
    }
    const posHash = Math.abs(hash);
    const langKeys = Object.keys(LANGUAGE_COLORS);
    langName = langKeys[posHash % langKeys.length];
    langColor = LANGUAGE_COLORS[langName];
    starsCount = (posHash % 380) + 18;
    forksCount = Math.floor(starsCount * 0.26) + 4;
  }

  // Truncate long descriptions so SVG text doesn't overflow
  if (desc.length > 55) {
    desc = desc.substring(0, 52) + '...';
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="120" viewBox="0 0 400 120" fill="none">
  <rect x="0.5" y="0.5" rx="${borderRadius}" width="399" height="119" fill="${bgColor}" stroke="${hideBorder ? 'transparent' : borderColor}"/>

  <!-- Repo Icon & Title -->
  <g transform="translate(25, 30)">
    <path fill="${iconColor}" d="M4 0C1.8 0 0 1.8 0 4V14C0 16.2 1.8 18 4 18H14C16.2 18 18 16.2 18 14V4C18 1.8 16.2 0 14 0H4ZM4 2H14C15.1 2 16 2.9 16 4V14C16 15.1 15.1 16 14 16H4C2.9 16 2 15.1 2 14V4C2 2.9 2.9 2 4 2Z" transform="translate(0, -2) scale(0.9)"/>
    <text x="24" y="12" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="15" font-weight="700" fill="${titleColor}">${fullTitle}</text>
  </g>

  <!-- Repo Description -->
  <g transform="translate(25, 60)">
    <text x="0" y="0" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="11" fill="${textColor}">${escapeHtml(desc)}</text>
  </g>

  <!-- Repo Meta: Language, Stars, Forks -->
  <g transform="translate(25, 95)">
    <circle cx="6" cy="-4" r="5" fill="${langColor}"/>
    <text x="16" y="0" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="12" font-weight="600" fill="${textColor}">${langName}</text>

    <!-- Star Count -->
    <path fill="${iconColor}" d="M8 0L10.5 5L16 6L12 10L13 15.5L8 13L3 15.5L4 10L0 6L5.5 5L8 0Z" transform="translate(125, -10) scale(0.7)"/>
    <text x="140" y="0" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="12" font-weight="600" fill="${textColor}">${starsCount}</text>

    <!-- Fork Count -->
    <path fill="${iconColor}" d="M6 0C2.7 0 0 2.7 0 6C0 9.3 2.7 12 6 12C9.3 12 12 9.3 12 6C12 2.7 9.3 0 6 0Z" transform="translate(195, -10) scale(0.7)"/>
    <text x="208" y="0" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="12" font-weight="600" fill="${textColor}">${forksCount}</text>
  </g>
</svg>`;
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
