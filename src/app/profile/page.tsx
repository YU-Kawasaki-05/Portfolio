import { ProfileCard, SkillsSection } from '@/features/profile';
import { 
  SmoothScrollContainer, 
  ScrollReveal, 
  ParallaxBackground 
} from '@/components/parallax-container';

export default function ProfilePage() {
  return (
    <SmoothScrollContainer className="bg-[#0F0F0F] min-h-screen py-20 relative overflow-hidden">
      {/* 背景パララックス効果 */}
      <ParallaxBackground speed={0.2} className="opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF2D55]/5 via-transparent to-[#1479FF]/5" />
      </ParallaxBackground>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ヘッダー */}
        <ScrollReveal direction="down" className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading text-[#F9F9F9] mb-4">
            Profile
          </h1>
          <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto">
            開発者、AIコンサルタントとしての経歴とスキル
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* プロフィールカード */}
          <ScrollReveal direction="left" delay={0.2} className="lg:col-span-1">
            <ProfileCard />
          </ScrollReveal>

          {/* スキルリスト */}
          <ScrollReveal direction="right" delay={0.4} className="lg:col-span-2">
            <SkillsSection />
          </ScrollReveal>
        </div>
      </div>
    </SmoothScrollContainer>
  );
} 