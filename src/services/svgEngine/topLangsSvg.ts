import type { TopLangsConfig } from '../../types/stats';
import { THEMES } from '../../constants/themes';
import type { GitHubUserData } from '../githubUserService';

const TITLES: Record<string, string> = {
  tr: 'En Çok Kullanılan Diller',
  en: 'Most Used Languages',
  de: 'Meistverwendete Sprachen',
  es: 'Lenguajes Más Usados',
  fr: 'Langages les Plus Utilisés',
};

export const renderTopLangsSvg = (config: TopLangsConfig & { userData?: GitHubUserData }): string => {
  const selectedTheme = THEMES.find((t) => t.id === config.theme) || THEMES[0];
  const lang = config.locale && TITLES[config.locale] ? config.locale : 'tr';

  const bgColor = config.theme === 'custom' && config.bg_color ? `#${config.bg_color}` : `#${selectedTheme.bg_color}`;
  const titleColor = config.theme === 'custom' && config.title_color ? `#${config.title_color}` : `#${selectedTheme.title_color}`;
  const textColor = config.theme === 'custom' && config.text_color ? `#${config.text_color}` : `#${selectedTheme.text_color}`;
  const borderColor = config.theme === 'custom' && config.border_color ? `#${config.border_color}` : `#${selectedTheme.border_color || '30363d'}`;

  const title = config.custom_title || TITLES[lang];
  const borderRadius = config.border_radius ?? 8;
  const hideBorder = config.hide_border;

  // Use real GitHub languages if provided, or fallback
  const realLangs = config.userData?.topLanguages || [
    { name: 'TypeScript', percent: 42.5, color: '#3178c6' },
    { name: 'JavaScript', percent: 28.0, color: '#f7df1e' },
    { name: 'Python', percent: 14.2, color: '#3572A5' },
    { name: 'HTML/CSS', percent: 9.8, color: '#e34c26' },
    { name: 'Go', percent: 5.5, color: '#00ADD8' },
  ];

  const langsToDisplay = realLangs.slice(0, config.langs_count || 5);

  let langBars = '';
  let yOffset = 50;

  langsToDisplay.forEach((l) => {
    langBars += `
    <g transform="translate(25, ${yOffset})">
      <text x="0" y="12" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="13" font-weight="600" fill="${textColor}">${l.name}</text>
      <text x="240" y="12" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="12" fill="${textColor}" text-anchor="end">${l.percent}%</text>
      <rect x="0" y="18" width="240" height="8" rx="4" fill="${borderColor}" opacity="0.3"/>
      <rect x="0" y="18" width="${(240 * l.percent) / 100}" height="8" rx="4" fill="${l.color}"/>
    </g>`;
    yOffset += 30;
  });

  const totalHeight = Math.max(165, yOffset + 20);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="${totalHeight}" viewBox="0 0 300 ${totalHeight}" fill="none">
  <rect x="0.5" y="0.5" rx="${borderRadius}" width="299" height="${totalHeight - 1}" fill="${bgColor}" stroke="${hideBorder ? 'transparent' : borderColor}"/>
  
  ${!config.hide_title ? `<text x="25" y="32" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="16" font-weight="700" fill="${titleColor}">${title}</text>` : ''}
  
  ${langBars}
</svg>`;
};
