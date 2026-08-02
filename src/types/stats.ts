export type TabType = 
  | 'profile-stats'
  | 'top-langs'
  | 'streak-stats'
  | 'typing-svg'
  | 'repo-stats'
  | 'activity-graph'
  | 'trophies';

export interface ThemeConfig {
  id: string;
  name: string;
  category: 'Popular' | 'Dark' | 'Light' | 'Vibrant' | 'Retro';
  bg_color: string;
  title_color: string;
  text_color: string;
  icon_color: string;
  border_color?: string;
  border_radius?: number;
}

export interface ProfileStatsConfig {
  username: string;
  theme: string;
  locale?: string;
  hide_border: boolean;
  include_all_commits: boolean;
  show_icons: boolean;
  count_private: boolean;
  custom_title: string;
  disable_animations: boolean;
  hide: string[];
  rank_icon: 'default' | 'github' | 'percentile';
  border_radius: number;
  bg_color?: string;
  title_color?: string;
  text_color?: string;
  icon_color?: string;
  border_color?: string;
  card_width?: number;
  userData?: any;
}

export interface TopLangsConfig {
  username: string;
  theme: string;
  locale?: string;
  layout: 'default' | 'compact' | 'donut' | 'pie';
  hide_border: boolean;
  hide_title: boolean;
  langs_count: number;
  hide: string[];
  custom_title: string;
  border_radius: number;
  bg_color?: string;
  title_color?: string;
  text_color?: string;
  border_color?: string;
}

export interface StreakStatsConfig {
  username: string;
  theme: string;
  locale?: string;
  hide_border: boolean;
  border_radius: number;
  background: string;
  border: string;
  stroke: string;
  ring: string;
  fire: string;
  currStreakNum: string;
  sideNums: string;
  currStreakLabel: string;
  sideLabels: string;
  dates: string;
  type: 'svg' | 'png';
  date_format: string;
}

export interface TypingSvgConfig {
  lines: string[];
  font: string;
  weight: string;
  size: number;
  duration: number;
  pause: number;
  color: string;
  background: string;
  center: boolean;
  vCenter: boolean;
  width: number;
  height: number;
  loop: boolean;
  multiline: boolean;
  locale?: string;
  theme?: string;
  gradient?: 'none' | 'cyan-purple' | 'gold-pink' | 'emerald-cyan' | 'custom';
  customGradStart?: string;
  customGradEnd?: string;
}

export interface RepoStatsConfig {
  username: string;
  repo: string;
  theme: string;
  locale?: string;
  hide_border: boolean;
  show_owner: boolean;
  border_radius: number;
  bg_color?: string;
  title_color?: string;
  text_color?: string;
  icon_color?: string;
  repoDetails?: {
    description?: string;
    stars?: number;
    forks?: number;
    language?: string;
    languageColor?: string;
  };
}

export interface ActivityGraphConfig {
  username: string;
  theme: string;
  locale?: string;
  area: boolean;
  custom_title: string;
  hide_border: boolean;
  radius: number;
}

export interface TrophiesConfig {
  username: string;
  theme: string;
  locale?: string;
  column: number;
  row: number;
  margin_w: number;
  margin_h: number;
  no_bg: boolean;
  no_frame: boolean;
}

export interface SocialLink {
  platform: string;
  username: string;
  badgeStyle: 'flat' | 'flat-square' | 'plastic' | 'for-the-badge' | 'social';
  color: string;
  icon: string;
}

export interface TechStackItem {
  id: string;
  name: string;
  icon: string;
  color: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps & Cloud' | 'Mobile & Tools';
}
