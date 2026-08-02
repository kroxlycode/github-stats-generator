import type { ActivityGraphConfig } from '../../types/stats';
import { THEMES } from '../../constants/themes';

const TRANSLATIONS: Record<string, { title: (u: string) => string; months: string[] }> = {
  tr: {
    title: (u) => `${u}'in Katkı Grafiği`,
    months: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem'],
  },
  en: {
    title: (u) => `${u}'s Activity Graph`,
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  },
  de: {
    title: (u) => `Aktivitätsdiagramm von ${u}`,
    months: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul'],
  },
  es: {
    title: (u) => `Gráfico de Actividad de ${u}`,
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
  },
  fr: {
    title: (u) => `Graphique d'Activité de ${u}`,
    months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
  },
};

export const renderActivityGraphSvg = (config: ActivityGraphConfig): string => {
  const selectedTheme = THEMES.find((t) => t.id === config.theme) || THEMES[0];
  const lang = config.locale && TRANSLATIONS[config.locale] ? config.locale : 'tr';
  const labels = TRANSLATIONS[lang];

  const bgColor = `#${selectedTheme.bg_color}`;
  const titleColor = `#${selectedTheme.title_color}`;
  const textColor = `#${selectedTheme.text_color}`;
  const lineColor = `#${selectedTheme.icon_color}`;
  const borderColor = selectedTheme.border_color ? `#${selectedTheme.border_color}` : '#30363d';

  const title = config.custom_title || labels.title(config.username);
  const m = labels.months;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="495" height="175" viewBox="0 0 495 175" fill="none">
  <rect x="0.5" y="0.5" rx="12" width="494" height="174" fill="${bgColor}" stroke="${borderColor}"/>

  <!-- Card Title -->
  <text x="25" y="28" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="15" font-weight="700" fill="${titleColor}">${title}</text>

  <!-- Activity Wave Graph Stage - Explicit Clamped Cubic Curves -->
  <g transform="translate(25, 42)">
    <!-- Horizontal Grid Baseline -->
    <line x1="0" y1="80" x2="445" y2="80" stroke="${borderColor}" stroke-opacity="0.5" stroke-dasharray="3"/>

    <!-- Filled Smooth Gradient Area -->
    <defs>
      <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${lineColor}" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="${lineColor}" stop-opacity="0.0"/>
      </linearGradient>
    </defs>

    <!-- Strictly Bounded Wave Path (Y ranges between 20px and 60px, baseline at 80px) -->
    <path d="M 0,55 C 25,45 49,40 74,40 C 98,40 124,25 148,25 C 172,25 198,60 222,60 C 246,60 272,20 296,20 C 320,20 346,45 370,45 C 395,45 420,30 445,30 L 445,80 L 0,80 Z" fill="url(#actGrad)"/>
    
    <!-- Smooth Line Stroke -->
    <path d="M 0,55 C 25,45 49,40 74,40 C 98,40 124,25 148,25 C 172,25 198,60 222,60 C 246,60 272,20 296,20 C 320,20 346,45 370,45 C 395,45 420,30 445,30" fill="none" stroke="${lineColor}" stroke-width="2.5" stroke-linecap="round"/>

    <!-- Distinct Data Points -->
    <circle cx="74" cy="40" r="3.5" fill="${lineColor}" stroke="${bgColor}" stroke-width="1.5"/>
    <circle cx="148" cy="25" r="3.5" fill="${lineColor}" stroke="${bgColor}" stroke-width="1.5"/>
    <circle cx="222" cy="60" r="3.5" fill="${lineColor}" stroke="${bgColor}" stroke-width="1.5"/>
    <circle cx="296" cy="20" r="3.5" fill="${lineColor}" stroke="${bgColor}" stroke-width="1.5"/>
    <circle cx="370" cy="45" r="3.5" fill="${lineColor}" stroke="${bgColor}" stroke-width="1.5"/>
    <circle cx="445" cy="30" r="3.5" fill="${lineColor}" stroke="${bgColor}" stroke-width="1.5"/>

    <!-- Month Labels Positioned Safely Below Baseline -->
    <text x="0" y="102" font-family="'Segoe UI', sans-serif" font-size="11" fill="${textColor}" opacity="0.7">${m[0]}</text>
    <text x="74" y="102" font-family="'Segoe UI', sans-serif" font-size="11" fill="${textColor}" opacity="0.7">${m[1]}</text>
    <text x="148" y="102" font-family="'Segoe UI', sans-serif" font-size="11" fill="${textColor}" opacity="0.7">${m[2]}</text>
    <text x="222" y="102" font-family="'Segoe UI', sans-serif" font-size="11" fill="${textColor}" opacity="0.7">${m[3]}</text>
    <text x="296" y="102" font-family="'Segoe UI', sans-serif" font-size="11" fill="${textColor}" opacity="0.7">${m[4]}</text>
    <text x="370" y="102" font-family="'Segoe UI', sans-serif" font-size="11" fill="${textColor}" opacity="0.7">${m[5]}</text>
    <text x="445" y="102" font-family="'Segoe UI', sans-serif" font-size="11" fill="${textColor}" opacity="0.7">${m[6]}</text>
  </g>
</svg>`;
};
