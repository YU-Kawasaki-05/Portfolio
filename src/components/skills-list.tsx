'use client';

import React from 'react';
import { Code, Palette, Database, Globe, Smartphone, Zap } from 'lucide-react';

/**
 * SkillsListコンポーネント - 技術スキルを表示
 */
export default function SkillsList() {
  const skillCategories = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: <Code size={24} />,
      color: '#FF2D55',
      skills: [
        { name: 'React', level: 95, experience: '4年' },
        { name: 'TypeScript', level: 90, experience: '3年' },
        { name: 'Next.js', level: 88, experience: '3年' },
        { name: 'Three.js', level: 85, experience: '2年' },
        { name: 'Tailwind CSS', level: 92, experience: '3年' },
        { name: 'Framer Motion', level: 80, experience: '2年' },
      ],
    },
    {
      id: 'design',
      title: '3D & Design',
      icon: <Palette size={24} />,
      color: '#1479FF',
      skills: [
        { name: 'React Three Fiber', level: 85, experience: '2年' },
        { name: 'Blender', level: 70, experience: '1年' },
        { name: 'Figma', level: 88, experience: '3年' },
        { name: 'WebGL', level: 75, experience: '2年' },
        { name: 'GSAP', level: 82, experience: '2年' },
      ],
    },
    {
      id: 'backend',
      title: 'Backend & Database',
      icon: <Database size={24} />,
      color: '#F5C400',
      skills: [
        { name: 'Node.js', level: 85, experience: '3年' },
        { name: 'PostgreSQL', level: 80, experience: '3年' },
        { name: 'Prisma', level: 88, experience: '2年' },
        { name: 'GraphQL', level: 75, experience: '2年' },
        { name: 'REST API', level: 90, experience: '4年' },
      ],
    },
    {
      id: 'tools',
      title: 'Tools & DevOps',
      icon: <Zap size={24} />,
      color: '#FF2D55',
      skills: [
        { name: 'Git', level: 95, experience: '4年' },
        { name: 'Docker', level: 78, experience: '2年' },
        { name: 'Vercel', level: 92, experience: '3年' },
        { name: 'GitHub Actions', level: 85, experience: '2年' },
        { name: 'Jest', level: 88, experience: '3年' },
      ],
    },
  ];

  const getSkillLevelColor = (level: number) => {
    if (level >= 90) return '#FF2D55';
    if (level >= 80) return '#1479FF';
    if (level >= 70) return '#F5C400';
    return '#7A7A7A';
  };

  const getSkillLevelText = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <div className="space-y-8">
      {skillCategories.map((category) => (
        <div
          key={category.id}
          className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6"
        >
          {/* カテゴリヘッダー */}
          <div className="flex items-center mb-6">
            <div
              className="p-3 rounded-lg mr-4"
              style={{ backgroundColor: `${category.color}20`, color: category.color }}
            >
              {category.icon}
            </div>
            <h3 className="text-xl font-bold font-heading text-[#F9F9F9]">
              {category.title}
            </h3>
          </div>

          {/* スキル一覧 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.skills.map((skill) => (
              <div
                key={skill.name}
                className="bg-[#0F0F0F] p-4 rounded-lg border border-[#2A2A2A] hover:border-[#333] transition-colors"
              >
                {/* スキル名と経験年数 */}
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[#F9F9F9] font-semibold">{skill.name}</h4>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: `${getSkillLevelColor(skill.level)}20`,
                        color: getSkillLevelColor(skill.level),
                      }}
                    >
                      {getSkillLevelText(skill.level)}
                    </span>
                    <span className="text-[#7A7A7A] text-xs">
                      {skill.experience}
                    </span>
                  </div>
                </div>

                {/* プログレスバー */}
                <div className="relative">
                  <div className="w-full bg-[#2A2A2A] rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: getSkillLevelColor(skill.level),
                      }}
                    />
                  </div>
                  <span
                    className="absolute right-0 -top-6 text-xs font-medium"
                    style={{ color: getSkillLevelColor(skill.level) }}
                  >
                    {skill.level}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 学習中のスキル */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-[#F5C400]/20 text-[#F5C400] rounded-lg mr-4">
            <Globe size={24} />
          </div>
          <h3 className="text-xl font-bold font-heading text-[#F9F9F9]">
            Currently Learning
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {['Rust', 'WebAssembly', 'AI/ML', 'Blockchain', 'AR/VR'].map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 bg-[#F5C400]/10 text-[#F5C400] border border-[#F5C400]/20 rounded-lg text-sm font-medium hover:bg-[#F5C400]/20 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* 認定・資格 */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-[#1479FF]/20 text-[#1479FF] rounded-lg mr-4">
            <Smartphone size={24} />
          </div>
          <h3 className="text-xl font-bold font-heading text-[#F9F9F9]">
            Certifications
          </h3>
        </div>

        <div className="space-y-4">
          {[
            { name: 'AWS Certified Developer', year: '2023', status: 'Active' },
            { name: 'Google Cloud Professional', year: '2022', status: 'Active' },
            { name: 'React Developer Certification', year: '2021', status: 'Active' },
          ].map((cert) => (
            <div
              key={cert.name}
              className="flex items-center justify-between p-4 bg-[#0F0F0F] rounded-lg border border-[#2A2A2A]"
            >
              <div>
                <h4 className="text-[#F9F9F9] font-semibold">{cert.name}</h4>
                <p className="text-[#7A7A7A] text-sm">取得年: {cert.year}</p>
              </div>
              <span className="px-3 py-1 bg-[#1479FF]/20 text-[#1479FF] rounded-full text-sm">
                {cert.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 