export type Skill = {
  name: string;
  icon?: string; // JSXではなく文字列識別子を使用
};

export const skills: Skill[] = [
  { name: 'TypeScript', icon: 'code2' },
  { name: 'JavaScript', icon: 'code2' },
  { name: 'React', icon: 'code2' },
  { name: 'Next.js', icon: 'code2' },
  { name: 'Vue.js' },
  { name: 'Nuxt.js' },
  { name: 'Prisma' },
  { name: 'Auth.js (NextAuth)' },
  { name: 'Jest' },
  { name: 'Vitest' },
  { name: 'HTML' },
  { name: 'CSS' },
  { name: 'Sass' },
  { name: 'TailwindCSS' },
  { name: 'Node.js', icon: 'server' },
  { name: 'Python' },
  { name: 'Docker', icon: 'package' },
  { name: 'AWS', icon: 'cloud' },
  { name: 'Git', icon: 'gitBranch' },
  { name: 'GitHub', icon: 'gitBranch' },
  { name: 'Firebase' },
  { name: 'Supabase' },
  { name: 'Vercel' },
  { name: 'PostgreSQL' },
  { name: 'MySQL' },
  { name: 'Redis' },
  { name: 'GraphQL' },
];