import ProfileCard from '@/components/profile-card';
import SkillsList from '@/components/skills-list';

export default function ProfilePage() {
  return (
    <div className="bg-[#0F0F0F] min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading text-[#F9F9F9] mb-4">
            Profile
          </h1>
          <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto">
            フロントエンドエンジニア・3Dウェブ開発者としての経歴とスキル
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* プロフィールカード */}
          <div className="lg:col-span-1">
            <ProfileCard />
          </div>

          {/* スキルリスト */}
          <div className="lg:col-span-2">
            <SkillsList />
          </div>
        </div>
      </div>
    </div>
  );
} 