import type { 
  ProfileStatsConfig, 
  TopLangsConfig, 
  StreakStatsConfig, 
  TypingSvgConfig, 
  RepoStatsConfig,
  ActivityGraphConfig,
  TrophiesConfig
} from '../types/stats';

import { 
  renderProfileStatsSvg, 
  renderTopLangsSvg, 
  renderStreakStatsSvg, 
  renderTypingSvg, 
  renderRepoStatsSvg,
  renderActivityGraphSvg,
  renderTrophiesSvg
} from '../services/svgEngine';

// Dynamically retrieve the current host API base URL (Vercel live domain or local dev)
export const getBaseUrl = (): string => {
  if (typeof window !== 'undefined' && window.location.origin) {
    return `${window.location.origin}/api`;
  }
  return 'http://localhost:3001/api';
};

const cleanParams = (params: Record<string, string | number | boolean | undefined>): string => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== '' && val !== false) {
      query.append(key, String(val));
    }
  });
  return query.toString();
};

// 1. Profile Stats
export const getProfileStatsUrl = (config: ProfileStatsConfig): string => {
  const params: Record<string, string | number | boolean | undefined> = {
    username: config.username || 'kroxlycode',
    theme: config.theme,
    locale: config.locale,
    hide_border: config.hide_border ? 'true' : undefined,
    include_all_commits: config.include_all_commits ? 'true' : undefined,
    show_icons: config.show_icons ? 'true' : undefined,
    count_private: config.count_private ? 'true' : undefined,
    custom_title: config.custom_title || undefined,
    border_radius: config.border_radius !== 4.5 ? config.border_radius : undefined,
  };

  if (config.theme === 'custom') {
    if (config.bg_color) params.bg_color = config.bg_color.replace('#', '');
    if (config.title_color) params.title_color = config.title_color.replace('#', '');
    if (config.text_color) params.text_color = config.text_color.replace('#', '');
    if (config.icon_color) params.icon_color = config.icon_color.replace('#', '');
    if (config.border_color) params.border_color = config.border_color.replace('#', '');
  }

  return `${getBaseUrl()}/stats?${cleanParams(params)}`;
};

export const getProfileStatsDataUri = (config: ProfileStatsConfig): string => {
  const svg = renderProfileStatsSvg(config);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// 2. Top Languages
export const getTopLangsUrl = (config: TopLangsConfig): string => {
  const params: Record<string, string | number | boolean | undefined> = {
    username: config.username || 'kroxlycode',
    theme: config.theme,
    locale: config.locale,
    layout: config.layout !== 'default' ? config.layout : undefined,
    hide_border: config.hide_border ? 'true' : undefined,
    hide_title: config.hide_title ? 'true' : undefined,
    langs_count: config.langs_count !== 5 ? config.langs_count : undefined,
    custom_title: config.custom_title || undefined,
    border_radius: config.border_radius !== 4.5 ? config.border_radius : undefined,
  };

  if (config.theme === 'custom') {
    if (config.bg_color) params.bg_color = config.bg_color.replace('#', '');
    if (config.title_color) params.title_color = config.title_color.replace('#', '');
    if (config.text_color) params.text_color = config.text_color.replace('#', '');
    if (config.border_color) params.border_color = config.border_color.replace('#', '');
  }

  return `${getBaseUrl()}/top-langs?${cleanParams(params)}`;
};

export const getTopLangsDataUri = (config: TopLangsConfig): string => {
  const svg = renderTopLangsSvg(config);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// 3. Streak Stats
export const getStreakStatsUrl = (config: StreakStatsConfig): string => {
  const params: Record<string, string | number | boolean | undefined> = {
    username: config.username || 'kroxlycode',
    theme: config.theme,
    locale: config.locale,
    hide_border: config.hide_border ? 'true' : undefined,
    border_radius: config.border_radius !== 4.5 ? config.border_radius : undefined,
  };

  if (config.theme === 'custom') {
    if (config.background) params.background = config.background.replace('#', '');
    if (config.border) params.border = config.border.replace('#', '');
    if (config.fire) params.fire = config.fire.replace('#', '');
    if (config.currStreakNum) params.currStreakNum = config.currStreakNum.replace('#', '');
  }

  return `${getBaseUrl()}/streak?${cleanParams(params)}`;
};

export const getStreakStatsDataUri = (config: StreakStatsConfig): string => {
  const svg = renderStreakStatsSvg(config);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// 4. Typing SVG
export const getTypingSvgUrl = (config: TypingSvgConfig): string => {
  const params: Record<string, string | number | boolean | undefined> = {
    theme: config.theme,
    font: config.font,
    weight: config.weight !== '400' ? config.weight : undefined,
    size: config.size !== 20 ? config.size : undefined,
    duration: config.duration !== 5000 ? config.duration : undefined,
    pause: config.pause !== 1000 ? config.pause : undefined,
    color: config.color ? config.color.replace('#', '') : undefined,
    background: config.background ? config.background.replace('#', '') : '00000000',
    center: config.center ? 'true' : undefined,
    width: config.width !== 435 ? config.width : undefined,
    height: config.height !== 50 ? config.height : undefined,
    locale: config.locale,
    gradient: config.gradient && config.gradient !== 'none' ? config.gradient : undefined,
    grad_start: config.customGradStart ? config.customGradStart.replace('#', '') : undefined,
    grad_end: config.customGradEnd ? config.customGradEnd.replace('#', '') : undefined,
    lines: config.lines.filter((l) => l.trim().length > 0).join(';'),
  };

  return `${getBaseUrl()}/typing-svg?${cleanParams(params)}`;
};

export const getTypingSvgDataUri = (config: TypingSvgConfig): string => {
  const svg = renderTypingSvg(config);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// 5. Pinned Repo
export const getRepoStatsUrl = (config: RepoStatsConfig): string => {
  const params: Record<string, string | number | boolean | undefined> = {
    username: config.username || 'kroxlycode',
    repo: config.repo || 'Hello-World',
    theme: config.theme,
    locale: config.locale,
    hide_border: config.hide_border ? 'true' : undefined,
    show_owner: config.show_owner ? 'true' : undefined,
    border_radius: config.border_radius !== 4.5 ? config.border_radius : undefined,
  };

  if (config.theme === 'custom') {
    if (config.bg_color) params.bg_color = config.bg_color.replace('#', '');
    if (config.title_color) params.title_color = config.title_color.replace('#', '');
    if (config.text_color) params.text_color = config.text_color.replace('#', '');
    if (config.icon_color) params.icon_color = config.icon_color.replace('#', '');
  }

  return `${getBaseUrl()}/repo?${cleanParams(params)}`;
};

export const getRepoStatsDataUri = (config: RepoStatsConfig): string => {
  const svg = renderRepoStatsSvg(config);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// 6. Activity Graph
export const getActivityGraphUrl = (config: ActivityGraphConfig): string => {
  return `${getBaseUrl()}/stats?username=${config.username || 'kroxlycode'}&theme=${config.theme}&locale=${config.locale || 'tr'}&type=activity`;
};

export const getActivityGraphDataUri = (config: ActivityGraphConfig): string => {
  const svg = renderActivityGraphSvg(config);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// 7. Trophies
export const getTrophiesUrl = (config: TrophiesConfig): string => {
  return `${getBaseUrl()}/stats?username=${config.username || 'kroxlycode'}&theme=${config.theme}&locale=${config.locale || 'tr'}&type=trophies`;
};

export const getTrophiesDataUri = (config: TrophiesConfig): string => {
  const svg = renderTrophiesSvg(config);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const formatMarkdownImage = (altText: string, imageUrl: string, linkUrl?: string): string => {
  const imgTag = `![${altText}](${imageUrl})`;
  if (linkUrl) {
    return `[${imgTag}](${linkUrl})`;
  }
  return imgTag;
};

export const formatHtmlImage = (altText: string, imageUrl: string, linkUrl?: string): string => {
  const imgTag = `<img src="${imageUrl}" alt="${altText}" />`;
  if (linkUrl) {
    return `<a href="${linkUrl}">${imgTag}</a>`;
  }
  return imgTag;
};
