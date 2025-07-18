import { Skill } from '../data/skills';
import { Badge } from '@/components/ui/badge';
import { Code2, Server, Cloud, GitBranch, Package } from 'lucide-react';
import type { FC } from 'react';

interface SkillBadgeProps {
  skill: Skill;
}

/**
 * アイコン識別子からJSXアイコンを取得する関数
 */
const getIcon = (iconName?: string) => {
  if (!iconName) return null;
  
  const iconMap = {
    code2: <Code2 size={16} />,
    server: <Server size={16} />,
    cloud: <Cloud size={16} />,
    gitBranch: <GitBranch size={16} />,
    package: <Package size={16} />,
  };
  
  return iconMap[iconName as keyof typeof iconMap] || null;
};

/**
 * Skill 名を Badge で表示するコンポーネント。
 * アイコンが指定されている場合はテキスト左側に表示する。
 */
const SkillBadge: FC<SkillBadgeProps> = ({ skill }) => {
  const icon = getIcon(skill.icon);
  
  return (
    <Badge variant="outline" className="justify-center gap-1 w-full px-4 py-2 text-sm sm:text-base">
      {icon && <span className="size-4">{icon}</span>}
      {skill.name}
    </Badge>
  );
};

export default SkillBadge;