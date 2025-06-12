'use client';

import { useProfileStore, type SkillsData, type SkillCategory } from '@/stores/profileStore';
import MondrianBlock from '@/components/design/MondrianBlock';

interface ProfileCardProps {
  className?: string;
}

// スキルレベルをバーで表示
function SkillBar({ skill }: { skill: SkillCategory }) {
  const percentage = (skill.level / 5) * 100;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-text font-medium">{skill.name}</span>
        <span className="text-muted text-sm">{skill.level}/5</span>
      </div>
      <div className="w-full bg-dark rounded-full h-2 mb-1">
        <div 
          className="bg-blue h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-muted text-sm">{skill.description}</p>
    </div>
  );
}

// スキルセクション
function SkillsSection({ skills }: { skills: SkillsData }) {
  const skillSections = [
    { key: 'frontend', title: 'フロントエンド', data: skills.frontend },
    { key: 'backend', title: 'バックエンド', data: skills.backend },
    { key: 'tools', title: 'ツール・環境', data: skills.tools },
    { key: 'design', title: 'デザイン', data: skills.design },
  ];

  return (
    <div className="space-y-8">
      {skillSections.map((section) => (
        <div key={section.key}>
          <h3 className="text-xl font-heading font-semibold text-text mb-4 flex items-center gap-2">
            <MondrianBlock width={8} height={8} color="blue" />
            {section.title}
          </h3>
          <div className="space-y-4">
            {section.data.map((skill) => (
              <SkillBar key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// 詳細ボックス
function DetailBox() {
  const { selectedId, profileData } = useProfileStore();

  const renderContent = () => {
    switch (selectedId) {
      case 'basicInfo':
        return (
          <div>
            <h2 className="text-2xl font-heading font-bold text-text mb-6">基本情報</h2>
            <div className="space-y-4">
              <div>
                <label className="text-muted text-sm block mb-1">名前</label>
                <p className="text-text text-lg">{profileData.basicInfo.name}</p>
              </div>
              <div>
                <label className="text-muted text-sm block mb-1">職種</label>
                <p className="text-text">{profileData.basicInfo.title}</p>
              </div>
              <div>
                <label className="text-muted text-sm block mb-1">所在地</label>
                <p className="text-text">{profileData.basicInfo.location}</p>
              </div>
              <div>
                <label className="text-muted text-sm block mb-1">連絡先</label>
                <p className="text-blue">{profileData.basicInfo.email}</p>
              </div>
              <div>
                <label className="text-muted text-sm block mb-1">概要</label>
                <p className="text-muted leading-relaxed">{profileData.basicInfo.summary}</p>
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div>
            <h2 className="text-2xl font-heading font-bold text-text mb-6">スキル</h2>
            <SkillsSection skills={profileData.skills} />
          </div>
        );

      case 'works':
        return (
          <div>
            <h2 className="text-2xl font-heading font-bold text-text mb-6">職歴</h2>
            <div className="space-y-6">
              {profileData.works.map((work, index) => (
                <div key={index} className="border-l-2 border-blue pl-6 pb-6">
                  <div className="bg-dark/50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-text">{work.position}</h3>
                    <p className="text-blue font-medium">{work.company}</p>
                    <p className="text-muted text-sm mb-3">{work.period}</p>
                    <p className="text-muted mb-4">{work.description}</p>
                    <div>
                      <h4 className="text-text font-medium mb-2">主な成果</h4>
                      <ul className="list-disc list-inside text-muted space-y-1">
                        {work.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        return (
          <div>
            <h2 className="text-2xl font-heading font-bold text-text mb-6">学歴</h2>
            <div className="space-y-4">
              {profileData.education.map((edu, index) => (
                <div key={index} className="bg-dark/50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-text">{edu.degree}</h3>
                  <p className="text-blue font-medium">{edu.institution}</p>
                  <p className="text-muted text-sm mb-3">{edu.period}</p>
                  <p className="text-muted">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'philosophy':
        return (
          <div>
            <h2 className="text-2xl font-heading font-bold text-text mb-6">開発哲学</h2>
            <div className="bg-dark/50 p-6 rounded-lg">
              <p className="text-muted leading-relaxed text-lg">
                {profileData.philosophy}
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-muted">コンテンツが見つかりません</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-bg border border-border rounded-lg p-8 min-h-[400px]">
      {renderContent()}
    </div>
  );
}

export default function ProfileCard({ className = '' }: ProfileCardProps) {
  const { selectedId, setSelectedId } = useProfileStore();

  const menuItems = [
    { id: 'basicInfo', label: '基本情報', icon: '👤' },
    { id: 'skills', label: 'スキル', icon: '🔧' },
    { id: 'works', label: '職歴', icon: '💼' },
    { id: 'education', label: '学歴', icon: '🎓' },
    { id: 'philosophy', label: '開発哲学', icon: '💭' },
  ];

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 左サイドバー（メニュー） */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-heading font-bold text-text mb-6 flex items-center gap-2">
            <MondrianBlock width={12} height={12} color="red" />
            プロフィール
          </h2>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`
                  w-full text-left px-4 py-3 rounded-lg transition-all duration-200
                  flex items-center gap-3 text-sm font-medium
                  ${selectedId === item.id 
                    ? 'bg-blue text-white shadow-lg' 
                    : 'text-muted hover:text-text hover:bg-dark/50'
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* 右コンテンツエリア */}
        <div className="lg:col-span-3">
          <DetailBox />
        </div>
      </div>
    </div>
  );
} 