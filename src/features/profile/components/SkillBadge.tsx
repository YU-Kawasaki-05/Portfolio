import { Skill } from '../data';
import { Badge } from '@/components/ui/badge';
import type { FC } from 'react';

interface SkillBadgeProps {
  skill: Skill;
}

/**
 * Skill 名を Badge で表示するコンポーネント。
 * アイコンが指定されている場合はテキスト左側に表示する。
 */
const SkillBadge: FC<SkillBadgeProps> = ({ skill }) => {
  return (
    <Badge variant="outline" className="justify-center gap-1 w-full px-4 py-2 text-sm sm:text-base">
      {skill.icon && <span className="size-4">{skill.icon}</span>}
      {skill.name}
    </Badge>
  );
};

export default SkillBadge;