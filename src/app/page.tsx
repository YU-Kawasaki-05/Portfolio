'use client';

import dynamic from 'next/dynamic';
import { WorksPreviewSection, BlogPreviewSection } from '@/components/preview-sections';
import { NavigationCards } from '@/features/navigation';
import { 
  SmoothScrollContainer, 
  ScrollReveal 
} from '@/components/parallax-container';

// Hero3Dを動的インポートしてSSRを無効化（Three.jsのため）
const Hero3D = dynamic(() => import('@/components/hero3d'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
      <div className="text-[#F9F9F9] text-xl">Loading 3D Scene...</div>
    </div>
  ),
});

export default function Home() {
  return (
    <SmoothScrollContainer className="bg-[#0F0F0F]">
      {/* Hero Section with 3D Typography */}
      <Hero3D />
      
      {/* Works Preview Section */}
      <ScrollReveal direction="up" delay={0.2}>
        <WorksPreviewSection />
      </ScrollReveal>
      
      {/* Blog Preview Section */}
      <ScrollReveal direction="up" delay={0.4}>
        <BlogPreviewSection />
      </ScrollReveal>
      
      {/* Navigation Cards */}
      <ScrollReveal direction="up" delay={0.6}>
        <NavigationCards />
      </ScrollReveal>
    </SmoothScrollContainer>
  );
}
