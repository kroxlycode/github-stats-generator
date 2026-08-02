import type { StreakStatsConfig } from '../../types/stats';
import { THEMES } from '../../constants/themes';

const TRANSLATIONS: Record<string, { total: string; totalSub: string; currentStreak: string; longestStreak: string; daysUnit: string }> = {
  tr: {
    total: 'Toplam Katkı',
    totalSub: 'Oca 1 - Günümüz',
    currentStreak: 'Mevcut Seri',
    longestStreak: 'En Uzun Seri',
    daysUnit: 'Gün',
  },
  en: {
    total: 'Total Contributions',
    totalSub: 'Jan 1 - Present',
    currentStreak: 'Current Streak',
    longestStreak: 'Longest Streak',
    daysUnit: 'Days',
  },
  de: {
    total: 'Gesamtbeiträge',
    totalSub: '1. Jan. - Heute',
    currentStreak: 'Aktuelle Strähne',
    longestStreak: 'Längste Strähne',
    daysUnit: 'Tage',
  },
  es: {
    total: 'Contribuciones Totales',
    totalSub: '1 Ene - Presente',
    currentStreak: 'Racha Actual',
    longestStreak: 'Racha Más Larga',
    daysUnit: 'Días',
  },
  fr: {
    total: 'Total des Contributions',
    totalSub: '1 Jan. - Présent',
    currentStreak: 'Série Actuelle',
    longestStreak: 'Plus Longue Série',
    daysUnit: 'Jours',
  },
};

export const renderStreakStatsSvg = (config: StreakStatsConfig): string => {
  const selectedTheme = THEMES.find((t) => t.id === config.theme) || THEMES[0];
  const lang = config.locale && TRANSLATIONS[config.locale] ? config.locale : 'tr';
  const labels = TRANSLATIONS[lang];

  const bgColor = config.theme === 'custom' && config.background ? `#${config.background}` : `#${selectedTheme.bg_color}`;
  const numberColor = config.theme === 'custom' && config.currStreakNum ? `#${config.currStreakNum}` : `#${selectedTheme.title_color}`;
  const textColor = config.theme === 'custom' && config.currStreakLabel ? `#${config.currStreakLabel}` : `#${selectedTheme.text_color}`;
  const borderColor = config.theme === 'custom' && config.border ? `#${config.border}` : `#${selectedTheme.border_color || '30363d'}`;

  const borderRadius = config.border_radius ?? 8;
  const hideBorder = config.hide_border;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="495" height="150" viewBox="0 0 495 150" fill="none">
  <rect x="0.5" y="0.5" rx="${borderRadius}" width="494" height="149" fill="${bgColor}" stroke="${hideBorder ? 'transparent' : borderColor}"/>

  <!-- Stat Box 1: Total Contributions -->
  <g transform="translate(20, 20)">
    <rect x="0" y="0" width="140" height="110" rx="8" fill="${borderColor}" fill-opacity="0.15" stroke="${borderColor}" stroke-opacity="0.4"/>
    <text x="70" y="42" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="24" font-weight="800" fill="${numberColor}" text-anchor="middle">1,842</text>
    <text x="70" y="66" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="12" font-weight="600" fill="${textColor}" text-anchor="middle">${labels.total}</text>
    <text x="70" y="85" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="10" fill="${textColor}" opacity="0.6" text-anchor="middle">${labels.totalSub}</text>
  </g>

  <!-- Stat Box 2: Current Streak -->
  <g transform="translate(177, 20)">
    <rect x="0" y="0" width="140" height="110" rx="8" fill="${borderColor}" fill-opacity="0.25" stroke="${numberColor}" stroke-opacity="0.6" stroke-width="1.5"/>
    <text x="70" y="42" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="24" font-weight="800" fill="${numberColor}" text-anchor="middle">42 <tspan font-size="13" font-weight="600">${labels.daysUnit}</tspan></text>
    <text x="70" y="66" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="12" font-weight="700" fill="${numberColor}" text-anchor="middle">${labels.currentStreak}</text>
    <text x="70" y="85" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="10" fill="${textColor}" opacity="0.6" text-anchor="middle">Haz 20 - Ağu 2</text>
  </g>

  <!-- Stat Box 3: Longest Streak -->
  <g transform="translate(335, 20)">
    <rect x="0" y="0" width="140" height="110" rx="8" fill="${borderColor}" fill-opacity="0.15" stroke="${borderColor}" stroke-opacity="0.4"/>
    <text x="70" y="42" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="24" font-weight="800" fill="${numberColor}" text-anchor="middle">89 <tspan font-size="13" font-weight="600">${labels.daysUnit}</tspan></text>
    <text x="70" y="66" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="12" font-weight="600" fill="${textColor}" text-anchor="middle">${labels.longestStreak}</text>
    <text x="70" y="85" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="10" fill="${textColor}" opacity="0.6" text-anchor="middle">Oca 10 - Nis 9</text>
  </g>
</svg>`;
};
