import type { TechStackItem, SocialLink } from '../types/stats';

export const TECH_STACK_ITEMS: TechStackItem[] = [
  // Frontend
  { id: 'react', name: 'React', icon: 'react', color: '61DAFB', category: 'Frontend' },
  { id: 'nextjs', name: 'Next.js', icon: 'nextdotjs', color: '000000', category: 'Frontend' },
  { id: 'typescript', name: 'TypeScript', icon: 'typescript', color: '3178C6', category: 'Frontend' },
  { id: 'javascript', name: 'JavaScript', icon: 'javascript', color: 'F7DF1E', category: 'Frontend' },
  { id: 'tailwind', name: 'Tailwind CSS', icon: 'tailwindcss', color: '06B6D4', category: 'Frontend' },
  { id: 'vue', name: 'Vue.js', icon: 'vuedotjs', color: '4FC08D', category: 'Frontend' },
  { id: 'svelte', name: 'Svelte', icon: 'svelte', color: 'FF3E00', category: 'Frontend' },
  { id: 'html5', name: 'HTML5', icon: 'html5', color: 'E34F26', category: 'Frontend' },
  { id: 'css3', name: 'CSS3', icon: 'css3', color: '1572B6', category: 'Frontend' },
  { id: 'bootstrap', name: 'Bootstrap', icon: 'bootstrap', color: '7952B3', category: 'Frontend' },

  // Backend
  { id: 'nodejs', name: 'Node.js', icon: 'nodedotjs', color: '339933', category: 'Backend' },
  { id: 'express', name: 'Express.js', icon: 'express', color: '000000', category: 'Backend' },
  { id: 'python', name: 'Python', icon: 'python', color: '3776AB', category: 'Backend' },
  { id: 'django', name: 'Django', icon: 'django', color: '092E20', category: 'Backend' },
  { id: 'fastapi', name: 'FastAPI', icon: 'fastapi', color: '009688', category: 'Backend' },
  { id: 'go', name: 'Go', icon: 'go', color: '00ADD8', category: 'Backend' },
  { id: 'rust', name: 'Rust', icon: 'rust', color: '000000', category: 'Backend' },
  { id: 'java', name: 'Java', icon: 'openjdk', color: 'ED8B00', category: 'Backend' },
  { id: 'csharp', name: 'C#', icon: 'csharp', color: '239120', category: 'Backend' },
  { id: 'php', name: 'PHP', icon: 'php', color: '777BB4', category: 'Backend' },

  // Database
  { id: 'postgresql', name: 'PostgreSQL', icon: 'postgresql', color: '4169E1', category: 'Database' },
  { id: 'mongodb', name: 'MongoDB', icon: 'mongodb', color: '47A248', category: 'Database' },
  { id: 'mysql', name: 'MySQL', icon: 'mysql', color: '4479A1', category: 'Database' },
  { id: 'redis', name: 'Redis', icon: 'redis', color: 'DC382D', category: 'Database' },
  { id: 'supabase', name: 'Supabase', icon: 'supabase', color: '3FCF8E', category: 'Database' },
  { id: 'firebase', name: 'Firebase', icon: 'firebase', color: 'FFCA28', category: 'Database' },
  { id: 'prisma', name: 'Prisma', icon: 'prisma', color: '2D3748', category: 'Database' },

  // DevOps & Cloud
  { id: 'docker', name: 'Docker', icon: 'docker', color: '2496ED', category: 'DevOps & Cloud' },
  { id: 'kubernetes', name: 'Kubernetes', icon: 'kubernetes', color: '326CE5', category: 'DevOps & Cloud' },
  { id: 'aws', name: 'AWS', icon: 'amazon-aws', color: '232F3E', category: 'DevOps & Cloud' },
  { id: 'gcp', name: 'Google Cloud', icon: 'googlecloud', color: '4285F4', category: 'DevOps & Cloud' },
  { id: 'vercel', name: 'Vercel', icon: 'vercel', color: '000000', category: 'DevOps & Cloud' },
  { id: 'githubactions', name: 'GitHub Actions', icon: 'githubactions', color: '2088FF', category: 'DevOps & Cloud' },

  // Mobile & Tools
  { id: 'reactnative', name: 'React Native', icon: 'react', color: '61DAFB', category: 'Mobile & Tools' },
  { id: 'flutter', name: 'Flutter', icon: 'flutter', color: '02569B', category: 'Mobile & Tools' },
  { id: 'git', name: 'Git', icon: 'git', color: 'F05032', category: 'Mobile & Tools' },
  { id: 'figma', name: 'Figma', icon: 'figma', color: 'F24E1E', category: 'Mobile & Tools' },
  { id: 'linux', name: 'Linux', icon: 'linux', color: 'FCC624', category: 'Mobile & Tools' },
];

export const DEFAULT_SOCIAL_PLATFORMS: SocialLink[] = [
  { platform: 'GitHub', username: '', badgeStyle: 'for-the-badge', color: '181717', icon: 'github' },
  { platform: 'LinkedIn', username: '', badgeStyle: 'for-the-badge', color: '0A66C2', icon: 'linkedin' },
  { platform: 'Twitter / X', username: '', badgeStyle: 'for-the-badge', color: '000000', icon: 'x' },
  { platform: 'Discord', username: '', badgeStyle: 'for-the-badge', color: '5865F2', icon: 'discord' },
  { platform: 'YouTube', username: '', badgeStyle: 'for-the-badge', color: 'FF0000', icon: 'youtube' },
  { platform: 'Medium', username: '', badgeStyle: 'for-the-badge', color: '000000', icon: 'medium' },
  { platform: 'Website', username: '', badgeStyle: 'for-the-badge', color: '4285F4', icon: 'globe' },
];
