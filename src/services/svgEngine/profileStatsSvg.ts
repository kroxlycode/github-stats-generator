import type { ProfileStatsConfig } from '../../types/stats';
import { THEMES } from '../../constants/themes';

const TRANSLATIONS: Record<string, { title: (u: string) => string; stars: string; commits: string; prs: string; issues: string; rank: string }> = {
  tr: {
    title: (u) => `${u}'in GitHub İstatistikleri`,
    stars: 'Toplam Yıldız (Stars):',
    commits: 'Toplam Commit:',
    prs: "Pull Request'ler:",
    issues: 'Açılan Issues:',
    rank: 'SEVİYE',
  },
  en: {
    title: (u) => `${u}'s GitHub Stats`,
    stars: 'Total Stars:',
    commits: 'Total Commits:',
    prs: 'Pull Requests:',
    issues: 'Opened Issues:',
    rank: 'RANK',
  },
  de: {
    title: (u) => `GitHub-Statistiken von ${u}`,
    stars: 'Sterne Insgesamt:',
    commits: 'Commits Insgesamt:',
    prs: 'Pull-Requests:',
    issues: 'Offene Issues:',
    rank: 'RANG',
  },
  es: {
    title: (u) => `Estadísticas de GitHub de ${u}`,
    stars: 'Estrellas Totales:',
    commits: 'Commits Totales:',
    prs: 'Solicitudes de Extracción:',
    issues: 'Issues Abiertas:',
    rank: 'RANGO',
  },
  fr: {
    title: (u) => `Statistiques GitHub de ${u}`,
    stars: 'Total Étoiles :',
    commits: 'Total Commits :',
    prs: 'Pull Requests :',
    issues: 'Issues Ouvertes :',
    rank: 'RANG',
  },
};

export const renderProfileStatsSvg = (config: ProfileStatsConfig): string => {
  const selectedTheme = THEMES.find((t) => t.id === config.theme) || THEMES[0];
  const lang = config.locale && TRANSLATIONS[config.locale] ? config.locale : 'tr';
  const labels = TRANSLATIONS[lang];

  const bgColor = config.theme === 'custom' && config.bg_color ? `#${config.bg_color}` : `#${selectedTheme.bg_color}`;
  const titleColor = config.theme === 'custom' && config.title_color ? `#${config.title_color}` : `#${selectedTheme.title_color}`;
  const textColor = config.theme === 'custom' && config.text_color ? `#${config.text_color}` : `#${selectedTheme.text_color}`;
  const iconColor = config.theme === 'custom' && config.icon_color ? `#${config.icon_color}` : `#${selectedTheme.icon_color}`;
  const borderColor = config.theme === 'custom' && config.border_color ? `#${config.border_color}` : `#${selectedTheme.border_color || '30363d'}`;

  const title = config.custom_title || labels.title(config.username);
  const borderRadius = config.border_radius ?? 8;
  const hideBorder = config.hide_border;

  // Mock stats
  const stars = 128;
  const commits = config.include_all_commits ? 1452 : 380;
  const prs = 64;
  const issues = 19;

  // Calculate Rank
  const rank = commits > 1000 ? 'A+' : commits > 500 ? 'A' : 'B+';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="495" height="195" viewBox="0 0 495 195" fill="none">
  <style>
    .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${titleColor}; animation: fadeIn 0.8s ease-in-out; }
    .stat { font: 400 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; }
    .bold { font-weight: 700; }
    .rank-text { font: 800 26px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${titleColor}; dominant-baseline: central; text-anchor: middle; }
    .rank-label { font: 600 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; opacity: 0.7; dominant-baseline: central; text-anchor: middle; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
  </style>

  <rect 
    x="0.5" 
    y="0.5" 
    rx="${borderRadius}" 
    width="494" 
    height="194" 
    fill="${bgColor}" 
    stroke="${hideBorder ? 'transparent' : borderColor}" 
    stroke-opacity="${hideBorder ? '0' : '1'}"
  />

  <g transform="translate(25, 35)">
    <text x="0" y="0" class="header">${title}</text>
  </g>

  <g transform="translate(25, 65)">
    ${config.show_icons ? `<path fill="${iconColor}" d="M8 0L10.5 5L16 6L12 10L13 15.5L8 13L3 15.5L4 10L0 6L5.5 5L8 0Z" transform="translate(0, 0) scale(0.9)"/>` : ''}
    <text x="${config.show_icons ? 25 : 0}" y="12" class="stat">${labels.stars} <tspan class="bold">${stars}</tspan></text>

    ${config.show_icons ? `<path fill="${iconColor}" d="M10.5 0C4.7 0 0 4.7 0 10.5C0 16.3 4.7 21 10.5 21C16.3 21 21 16.3 21 10.5C21 4.7 16.3 0 10.5 0ZM10.5 18.9C5.9 18.9 2.1 15.1 2.1 10.5C2.1 5.9 5.9 2.1 10.5 2.1C15.1 2.1 18.9 5.9 18.9 10.5C18.9 15.1 15.1 18.9 10.5 18.9Z" transform="translate(0, 25) scale(0.7)"/>` : ''}
    <text x="${config.show_icons ? 25 : 0}" y="37" class="stat">${labels.commits} <tspan class="bold">${commits}</tspan></text>

    ${config.show_icons ? `<path fill="${iconColor}" d="M7 0C3.1 0 0 3.1 0 7C0 10.9 3.1 14 7 14C10.9 14 14 10.9 14 7C14 3.1 10.9 0 7 0Z" transform="translate(0, 50) scale(0.8)"/>` : ''}
    <text x="${config.show_icons ? 25 : 0}" y="62" class="stat">${labels.prs} <tspan class="bold">${prs}</tspan></text>

    ${config.show_icons ? `<path fill="${iconColor}" d="M6 0C2.7 0 0 2.7 0 6C0 9.3 2.7 12 6 12C9.3 12 12 9.3 12 6C12 2.7 9.3 0 6 0Z" transform="translate(0, 75) scale(0.8)"/>` : ''}
    <text x="${config.show_icons ? 25 : 0}" y="87" class="stat">${labels.issues} <tspan class="bold">${issues}</tspan></text>
  </g>

  <!-- Dead-Center Rank Circle Badge -->
  <g transform="translate(390, 110)">
    <circle cx="0" cy="0" r="36" fill="none" stroke="${iconColor}" stroke-width="4" stroke-dasharray="220" stroke-dashoffset="30"/>
    <text x="0" y="-4" class="rank-text">${rank}</text>
    <text x="0" y="20" class="rank-label">${labels.rank}</text>
  </g>
</svg>`;
};
