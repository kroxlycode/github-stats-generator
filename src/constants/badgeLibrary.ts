export interface BadgeItem {
  id: string;
  name: string;
  category: 'social' | 'languages' | 'tech' | 'tools';
  color: string;
  logo: string;
  deviconName?: string;
  skilliconKey?: string;
  socialBaseUrl?: string;
}

export const BADGE_CATEGORIES = [
  { id: 'all', nameKey: 'all' },
  { id: 'social', nameKey: 'social' },
  { id: 'languages', nameKey: 'languages' },
  { id: 'tech', nameKey: 'tech' },
  { id: 'tools', nameKey: 'tools' },
] as const;

export const BADGE_LIBRARY: BadgeItem[] = [
  // 1. Sosyal Medya (Social)
  { id: 'youtube', name: 'YouTube', category: 'social', color: 'FF0000', logo: 'youtube', socialBaseUrl: 'https://youtube.com/@' },
  { id: 'twitch', name: 'Twitch', category: 'social', color: '9146FF', logo: 'twitch', socialBaseUrl: 'https://twitch.tv/' },
  { id: 'telegram', name: 'Telegram', category: 'social', color: '24A1DE', logo: 'telegram', socialBaseUrl: 'https://t.me/' },
  { id: 'medium', name: 'Medium', category: 'social', color: '000000', logo: 'medium', socialBaseUrl: 'https://medium.com/@' },
  { id: 'reddit', name: 'Reddit', category: 'social', color: 'FF4500', logo: 'reddit', socialBaseUrl: 'https://reddit.com/user/' },
  { id: 'buymeacoffee', name: 'Buy Me A Coffee', category: 'social', color: 'FFDD00', logo: 'buymeacoffee', socialBaseUrl: 'https://buymeacoffee.com/' },
  { id: 'instagram', name: 'Instagram', category: 'social', color: 'E4405F', logo: 'instagram', socialBaseUrl: 'https://instagram.com/' },
  { id: 'linkedin', name: 'LinkedIn', category: 'social', color: '0A66C2', logo: 'linkedin', deviconName: 'linkedin', skilliconKey: 'linkedin', socialBaseUrl: 'https://linkedin.com/in/' },
  { id: 'twitter', name: 'X (Twitter)', category: 'social', color: '000000', logo: 'x', deviconName: 'twitter', skilliconKey: 'twitter', socialBaseUrl: 'https://x.com/' },
  { id: 'discord', name: 'Discord', category: 'social', color: '5865F2', logo: 'discord', deviconName: 'discord', skilliconKey: 'discord', socialBaseUrl: 'https://discord.gg/' },
  { id: 'devto', name: 'DEV.to', category: 'social', color: '0A0A0A', logo: 'devdotto', socialBaseUrl: 'https://dev.to/' },
  { id: 'stackoverflow', name: 'Stack Overflow', category: 'social', color: 'F48024', logo: 'stackoverflow', skilliconKey: 'stackoverflow', socialBaseUrl: 'https://stackoverflow.com/users/' },
  { id: 'github', name: 'GitHub Profile', category: 'social', color: '181717', logo: 'github', deviconName: 'github', skilliconKey: 'github', socialBaseUrl: 'https://github.com/' },

  // 2. Yazılım Dilleri (Languages)
  { id: 'typescript', name: 'TypeScript', category: 'languages', color: '3178C6', logo: 'typescript', deviconName: 'typescript', skilliconKey: 'ts' },
  { id: 'javascript', name: 'JavaScript', category: 'languages', color: 'F7DF1E', logo: 'javascript', deviconName: 'javascript', skilliconKey: 'js' },
  { id: 'python', name: 'Python', category: 'languages', color: '3776AB', logo: 'python', deviconName: 'python', skilliconKey: 'py' },
  { id: 'cplusplus', name: 'C++', category: 'languages', color: '00599C', logo: 'cplusplus', deviconName: 'cplusplus', skilliconKey: 'cpp' },
  { id: 'csharp', name: 'C#', category: 'languages', color: '239120', logo: 'csharp', deviconName: 'csharp', skilliconKey: 'cs' },
  { id: 'java', name: 'Java', category: 'languages', color: 'ED8B00', logo: 'openjdk', deviconName: 'java', skilliconKey: 'java' },
  { id: 'rust', name: 'Rust', category: 'languages', color: '000000', logo: 'rust', deviconName: 'rust', skilliconKey: 'rust' },
  { id: 'go', name: 'Go (Golang)', category: 'languages', color: '00ADD8', logo: 'go', deviconName: 'go', skilliconKey: 'go' },
  { id: 'php', name: 'PHP', category: 'languages', color: '777BB4', logo: 'php', deviconName: 'php', skilliconKey: 'php' },
  { id: 'html5', name: 'HTML5', category: 'languages', color: 'E34F26', logo: 'html5', deviconName: 'html5', skilliconKey: 'html' },
  { id: 'css3', name: 'CSS3', category: 'languages', color: '1572B6', logo: 'css3', deviconName: 'css3', skilliconKey: 'css' },
  { id: 'swift', name: 'Swift', category: 'languages', color: 'F05138', logo: 'swift', deviconName: 'swift', skilliconKey: 'swift' },
  { id: 'kotlin', name: 'Kotlin', category: 'languages', color: '7F52FF', logo: 'kotlin', deviconName: 'kotlin', skilliconKey: 'kotlin' },
  { id: 'ruby', name: 'Ruby', category: 'languages', color: 'CC342D', logo: 'ruby', deviconName: 'ruby', skilliconKey: 'ruby' },
  { id: 'sql', name: 'SQL', category: 'languages', color: '4479A1', logo: 'mysql', skilliconKey: 'mysql' },

  // 3. Teknolojiler & Frameworks (Tech)
  { id: 'react', name: 'React', category: 'tech', color: '61DAFB', logo: 'react', deviconName: 'react', skilliconKey: 'react' },
  { id: 'nextjs', name: 'Next.js', category: 'tech', color: '000000', logo: 'nextdotjs', deviconName: 'nextjs', skilliconKey: 'nextjs' },
  { id: 'vue', name: 'Vue.js', category: 'tech', color: '4FC08D', logo: 'vuedotjs', deviconName: 'vuejs', skilliconKey: 'vue' },
  { id: 'angular', name: 'Angular', category: 'tech', color: 'DD0031', logo: 'angular', deviconName: 'angular', skilliconKey: 'angular' },
  { id: 'nodejs', name: 'Node.js', category: 'tech', color: '339933', logo: 'nodedotjs', deviconName: 'nodejs', skilliconKey: 'nodejs' },
  { id: 'express', name: 'Express.js', category: 'tech', color: '000000', logo: 'express', deviconName: 'express', skilliconKey: 'express' },
  { id: 'nestjs', name: 'NestJS', category: 'tech', color: 'E0234E', logo: 'nestjs', deviconName: 'nestjs', skilliconKey: 'nestjs' },
  { id: 'django', name: 'Django', category: 'tech', color: '092E20', logo: 'django', deviconName: 'django', skilliconKey: 'django' },
  { id: 'fastapi', name: 'FastAPI', category: 'tech', color: '009688', logo: 'fastapi', deviconName: 'fastapi', skilliconKey: 'fastapi' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'tech', color: '06B6D4', logo: 'tailwindcss', deviconName: 'tailwindcss', skilliconKey: 'tailwind' },
  { id: 'bootstrap', name: 'Bootstrap', category: 'tech', color: '7952B3', logo: 'bootstrap', deviconName: 'bootstrap', skilliconKey: 'bootstrap' },
  { id: 'flutter', name: 'Flutter', category: 'tech', color: '02569B', logo: 'flutter', deviconName: 'flutter', skilliconKey: 'flutter' },
  { id: 'reactnative', name: 'React Native', category: 'tech', color: '61DAFB', logo: 'react', deviconName: 'react', skilliconKey: 'react' },

  // 4. Programlar & Araçlar (Tools)
  { id: 'vscode', name: 'VS Code', category: 'tools', color: '007ACC', logo: 'visualstudiocode', deviconName: 'vscode', skilliconKey: 'vscode' },
  { id: 'git', name: 'Git', category: 'tools', color: 'F05032', logo: 'git', deviconName: 'git', skilliconKey: 'git' },
  { id: 'docker', name: 'Docker', category: 'tools', color: '2496ED', logo: 'docker', deviconName: 'docker', skilliconKey: 'docker' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'tools', color: '326CE5', logo: 'kubernetes', deviconName: 'kubernetes', skilliconKey: 'kubernetes' },
  { id: 'figma', name: 'Figma', category: 'tools', color: 'F24E1E', logo: 'figma', deviconName: 'figma', skilliconKey: 'figma' },
  { id: 'postman', name: 'Postman', category: 'tools', color: 'FF6C37', logo: 'postman', skilliconKey: 'postman' },
  { id: 'linux', name: 'Linux', category: 'tools', color: 'FCC624', logo: 'linux', deviconName: 'linux', skilliconKey: 'linux' },
  { id: 'ubuntu', name: 'Ubuntu', category: 'tools', color: 'E95420', logo: 'ubuntu', deviconName: 'ubuntu', skilliconKey: 'ubuntu' },
  { id: 'vercel', name: 'Vercel', category: 'tools', color: '000000', logo: 'vercel', skilliconKey: 'vercel' },
  { id: 'firebase', name: 'Firebase', category: 'tools', color: 'FFCA28', logo: 'firebase', deviconName: 'firebase', skilliconKey: 'firebase' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'tools', color: '4169E1', logo: 'postgresql', deviconName: 'postgresql', skilliconKey: 'postgres' },
  { id: 'mongodb', name: 'MongoDB', category: 'tools', color: '47A248', logo: 'mongodb', deviconName: 'mongodb', skilliconKey: 'mongodb' },
  { id: 'redis', name: 'Redis', category: 'tools', color: 'DC382D', logo: 'redis', deviconName: 'redis', skilliconKey: 'redis' },
];

export const getShieldUrl = (
  badge: BadgeItem, 
  style: string = 'for-the-badge', 
  format: 'full' | 'icon-only' | 'devicon' | 'skillicons' = 'full'
): string => {
  const logoColor = badge.color === 'FFDD00' || badge.color === 'F7DF1E' ? 'black' : 'white';
  const logoName = badge.id === 'devto' ? 'devdotto' : badge.logo;

  if (format === 'skillicons') {
    if (badge.skilliconKey) {
      return `https://skillicons.dev/icons?i=${badge.skilliconKey}`;
    }
    return `https://img.shields.io/badge/-%20-${badge.color}?style=for-the-badge&logo=${logoName}&logoColor=${logoColor}`;
  }

  if (format === 'devicon' && badge.deviconName) {
    return `https://raw.githubusercontent.com/devicons/devicon/master/icons/${badge.deviconName}/${badge.deviconName}-original.svg`;
  }

  if (format === 'icon-only') {
    return `https://img.shields.io/badge/-%20-${badge.color}?style=for-the-badge&logo=${logoName}&logoColor=${logoColor}`;
  }

  const nameEncoded = encodeURIComponent(badge.name);
  return `https://img.shields.io/badge/${nameEncoded}-${badge.color}?style=${style}&logo=${logoName}&logoColor=${logoColor}`;
};

export const getCombinedSkillIconsUrl = (skillKeys: string[], theme: 'dark' | 'light' = 'dark', perLine: number = 10): string => {
  const keys = skillKeys.join(',');
  return `https://skillicons.dev/icons?i=${keys}&theme=${theme}&perline=${perLine}`;
};
