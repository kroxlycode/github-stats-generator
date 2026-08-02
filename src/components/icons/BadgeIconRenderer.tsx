import React from 'react';
import type { BadgeItem } from '../../constants/badgeLibrary';
import {
  FaYoutube,
  FaTwitch,
  FaTelegram,
  FaMedium,
  FaReddit,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaDiscord,
  FaDev,
  FaStackOverflow,
  FaGithub,
  FaPython,
  FaJava,
  FaRust,
  FaPhp,
  FaHtml5,
  FaCss3Alt,
  FaSwift,
  FaReact,
  FaVuejs,
  FaAngular,
  FaNodeJs,
  FaBootstrap,
  FaGitAlt,
  FaDocker,
  FaFigma,
  FaLinux,
  FaUbuntu,
} from 'react-icons/fa6';

import {
  SiBuymeacoffee,
  SiTypescript,
  SiJavascript,
  SiCplusplus,
  SiGo,
  SiKotlin,
  SiRuby,
  SiMysql,
  SiNextdotjs,
  SiExpress,
  SiNestjs,
  SiDjango,
  SiFastapi,
  SiTailwindcss,
  SiFlutter,
  SiKubernetes,
  SiPostman,
  SiVercel,
  SiFirebase,
  SiPostgresql,
  SiMongodb,
  SiRedis,
} from 'react-icons/si';

const REACT_ICON_MAP: Record<string, React.ComponentType<{ className?: string; size?: number | string; color?: string }>> = {
  youtube: FaYoutube,
  twitch: FaTwitch,
  telegram: FaTelegram,
  medium: FaMedium,
  reddit: FaReddit,
  buymeacoffee: SiBuymeacoffee,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  twitter: FaXTwitter,
  discord: FaDiscord,
  devto: FaDev,
  stackoverflow: FaStackOverflow,
  github: FaGithub,

  typescript: SiTypescript,
  javascript: SiJavascript,
  python: FaPython,
  cplusplus: SiCplusplus,
  csharp: SiCplusplus,
  java: FaJava,
  rust: FaRust,
  go: SiGo,
  php: FaPhp,
  html5: FaHtml5,
  css3: FaCss3Alt,
  swift: FaSwift,
  kotlin: SiKotlin,
  ruby: SiRuby,
  sql: SiMysql,

  react: FaReact,
  nextjs: SiNextdotjs,
  vue: FaVuejs,
  angular: FaAngular,
  nodejs: FaNodeJs,
  express: SiExpress,
  nestjs: SiNestjs,
  django: SiDjango,
  fastapi: SiFastapi,
  tailwind: SiTailwindcss,
  bootstrap: FaBootstrap,
  flutter: SiFlutter,
  reactnative: FaReact,

  vscode: SiTypescript,
  git: FaGitAlt,
  docker: FaDocker,
  kubernetes: SiKubernetes,
  figma: FaFigma,
  postman: SiPostman,
  linux: FaLinux,
  ubuntu: FaUbuntu,
  vercel: SiVercel,
  firebase: SiFirebase,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  redis: SiRedis,
};

interface BadgeIconRendererProps {
  badge: BadgeItem;
  size?: number;
}

export const BadgeIconRenderer: React.FC<BadgeIconRendererProps> = ({ badge, size = 26 }) => {
  const IconComponent = REACT_ICON_MAP[badge.id];

  // Foreground text color depending on background contrast (black for yellow, white for others)
  const isLightBg = badge.color.toUpperCase() === 'FFDD00' || badge.color.toUpperCase() === 'F7DF1E';
  const iconColor = isLightBg ? '#000000' : '#FFFFFF';

  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-transform hover:scale-105"
      style={{ backgroundColor: `#${badge.color}` }}
    >
      {IconComponent ? (
        <IconComponent size={size} color={iconColor} />
      ) : (
        <span className="text-xs font-bold text-white uppercase">{badge.name.slice(0, 2)}</span>
      )}
    </div>
  );
};
