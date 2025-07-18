'use client';

import { skills } from '../data/skills';
import SkillBadge from './skill-badge';

/** SkillsSection - シンプルなスキルタグ一覧 */
export default function SkillsSection() {
  return (
    <section aria-labelledby="skills-section-heading">
      <h2
        id="skills-section-heading"
        className="text-2xl sm:text-3xl font-bold font-heading text-[#F9F9F9] mb-6"
      >
        開発経験のある技術
      </h2>
      <div className="border border-[#555] rounded-lg p-6 mt-6 mb-10">
        <div className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}
        >
          {skills.map((skill) => (
            <SkillBadge key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}