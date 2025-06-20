import type { ReactNode } from 'react';
import { Code2, Server, Cloud, GitBranch, Package } from 'lucide-react';

export type Skill = {
  name: string;
  icon?: ReactNode;
};

export const skills: Skill[] = [
  { name: 'TypeScript', icon: <Code2 size={16} /> },
  { name: 'JavaScript', icon: <Code2 size={16} /> },
  { name: 'React', icon: <Code2 size={16} /> },
  { name: 'Next.js', icon: <Code2 size={16} /> },
  { name: 'Vue.js' },
  { name: 'Nuxt.js' },
  { name: 'Prisma' },
  { name: 'Auth.js (NextAuth)' },
  { name: 'Jest' },
  { name: 'Vitest' },
  { name: 'HTML' },
  { name: 'CSS' },
  { name: 'TailWindCSS' },
  { name: 'shadcn/ui' },
  { name: 'AWS', icon: <Cloud size={16} /> },
  { name: 'GitHub', icon: <GitBranch size={16} /> },
  { name: 'pnpm', icon: <Package size={16} /> },
  { name: 'Python' },
  { name: 'FastAPI' },
]; 