'use client';

import { skills } from '@/data/skills';
import SkillBadge from '@/components/skill-badge';

/** SkillsSection - シンプルなスキルタグ一覧 */
export default function SkillsSection() {
  return (
    <section aria-labelledby="skills-section-heading">
      <h2
        id="skills-section-heading"
        className="sr-only"
      >
        Skills
      </h2>
      <div className="grid gap-3"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}
      >
        {skills.map((skill) => (
          <SkillBadge key={skill.name} skill={skill} />
        ))}
      </div>
    </section>
  );
} 