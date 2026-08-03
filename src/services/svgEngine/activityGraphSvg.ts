import type { ActivityGraphConfig } from '../../types/stats';
import { THEMES } from '../../constants/themes';
import type { GitHubUserData, MonthlyActivityItem } from '../githubUserService';

const MONTH_NAMES: Record<string, string[]> = {
  tr: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  de: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  fr: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
};

const TRANSLATIONS: Record<string, { title: (u: string) => string }> = {
  tr: { title: (u: string) => `${u}'in Katkı Grafiği` },
  en: { title: (u: string) => `${u}'s Activity Graph` },
  de: { title: (u: string) => `Aktivitätsdiagramm von ${u}` },
  es: { title: (u: string) => `Gráfico de Actividad de ${u}` },
  fr: { title: (u: string) => `Graphique d'Activité de ${u}` },
};

export const renderActivityGraphSvg = (config: ActivityGraphConfig & { userData?: GitHubUserData }): string => {
  const selectedTheme = THEMES.find((t) => t.id === config.theme) || THEMES[0];
  const lang = config.locale && MONTH_NAMES[config.locale] ? config.locale : 'tr';
  const monthLabels = MONTH_NAMES[lang];
  const labels = TRANSLATIONS[lang] || TRANSLATIONS.tr;

  const bgColor = `#${selectedTheme.bg_color}`;
  const titleColor = `#${selectedTheme.title_color}`;
  const textColor = `#${selectedTheme.text_color}`;
  const lineColor = `#${selectedTheme.icon_color}`;
  const borderColor = selectedTheme.border_color ? `#${selectedTheme.border_color}` : '#30363d';

  const title = config.custom_title || labels.title(config.username);

  // Extract monthly activity data (7 points)
  const monthlyData: MonthlyActivityItem[] = config.userData?.monthlyActivity && config.userData.monthlyActivity.length > 0
    ? config.userData.monthlyActivity.slice(-7)
    : [
        { month: '2026-02', count: 10 },
        { month: '2026-03', count: 5 },
        { month: '2026-04', count: 12 },
        { month: '2026-05', count: 8 },
        { month: '2026-06', count: 20 },
        { month: '2026-07', count: 15 },
        { month: '2026-08', count: 25 },
      ];

  while (monthlyData.length < 7) {
    monthlyData.unshift({ month: '', count: 0 });
  }

  const xCoords = [0, 74, 148, 222, 296, 370, 445];
  const counts = monthlyData.map((d: MonthlyActivityItem) => d.count);
  const maxCount = Math.max(...counts, 1);

  const points = counts.map((c: number, i: number) => {
    const ratio = c / maxCount;
    const y = 80 - ratio * 55;
    return { x: xCoords[i], y: Math.round(y), count: c, month: monthlyData[i].month };
  });

  let dPath = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cx1 = Math.round(p0.x + (p1.x - p0.x) / 2);
    const cy1 = p0.y;
    const cx2 = Math.round(p0.x + (p1.x - p0.x) / 2);
    const cy2 = p1.y;
    dPath += ` C ${cx1},${cy1} ${cx2},${cy2} ${p1.x},${p1.y}`;
  }

  const fillPath = `${dPath} L 445,80 L 0,80 Z`;

  const monthTexts = points
    .map((p: { x: number; y: number; count: number; month: string }) => {
      let label = '';
      if (p.month) {
        const parts = p.month.split('-');
        if (parts.length === 2) {
          const mIdx = parseInt(parts[1], 10) - 1;
          label = monthLabels[mIdx] || parts[1];
        }
      }
      return `<text x="${p.x}" y="102" font-family="'Segoe UI', sans-serif" font-size="11" fill="${textColor}" opacity="0.7">${label}</text>`;
    })
    .join('\n    ');

  const circles = points
    .map(
      (p: { x: number; y: number; count: number; month: string }) =>
        `<circle cx="${p.x}" cy="${p.y}" r="3.5" fill="${lineColor}" stroke="${bgColor}" stroke-width="1.5"/>`
    )
    .join('\n    ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="495" height="175" viewBox="0 0 495 175" fill="none">
  <rect x="0.5" y="0.5" rx="12" width="494" height="174" fill="${bgColor}" stroke="${borderColor}"/>

  <!-- Card Title -->
  <text x="25" y="28" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="15" font-weight="700" fill="${titleColor}">${title}</text>

  <!-- Activity Wave Graph Stage -->
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

    <!-- Dynamic Bounded Wave Path -->
    <path d="${fillPath}" fill="url(#actGrad)"/>
    
    <!-- Dynamic Line Stroke -->
    <path d="${dPath}" fill="none" stroke="${lineColor}" stroke-width="2.5" stroke-linecap="round"/>

    <!-- Distinct Data Points -->
    ${circles}

    <!-- Month Labels Positioned Below Baseline -->
    ${monthTexts}
  </g>
</svg>`;
};

