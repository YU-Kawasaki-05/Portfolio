import { create } from 'zustand';

// プロフィールデータの型定義
export interface BasicInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  summary: string;
}

export interface SkillCategory {
  name: string;
  level: number; // 1-5
  description: string;
}

export interface SkillsData {
  frontend: SkillCategory[];
  backend: SkillCategory[];
  tools: SkillCategory[];
  design: SkillCategory[];
}

export interface WorkExperience {
  company: string;
  position: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string;
}

export interface ProfileData {
  basicInfo: BasicInfo;
  skills: SkillsData;
  works: WorkExperience[];
  education: Education[];
  philosophy: string;
}

// 詳細コンテンツの型
export type DetailContent = {
  basicInfo: BasicInfo;
  skills: SkillsData;
  works: WorkExperience[];
  education: Education[];
  philosophy: string;
};

// ストアの状態型
interface ProfileStore {
  selectedId: string;
  setSelectedId: (id: string) => void;
  profileData: ProfileData;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  getDetailContent: () => DetailContent;
}

// サンプルデータ
const sampleProfileData: ProfileData = {
  basicInfo: {
    name: "KawasakiK",
    title: "フロントエンド開発者",
    email: "contact@example.com",
    location: "Tokyo, Japan",
    summary: "モダンなWeb技術を駆使して、ユーザー体験を重視したフロントエンド開発を行っています。特にReact・TypeScript・Next.jsを中心とした技術スタックで、パフォーマンスとアクセシビリティを両立したWebアプリケーションの開発に取り組んでいます。"
  },
  skills: {
    frontend: [
      { name: "React", level: 5, description: "Hooks・Context・Suspense等の高度な機能を活用" },
      { name: "TypeScript", level: 5, description: "型安全性を重視した設計・実装" },
      { name: "Next.js", level: 4, description: "App Router・Server Components活用" },
      { name: "Tailwind CSS", level: 4, description: "デザインシステム構築・最適化" },
    ],
    backend: [
      { name: "Node.js", level: 3, description: "API開発・サーバーサイド処理" },
      { name: "GraphQL", level: 3, description: "効率的なデータフェッチング" },
      { name: "PostgreSQL", level: 3, description: "リレーショナルDB設計・運用" },
    ],
    tools: [
      { name: "Git", level: 4, description: "効率的なバージョン管理・チーム開発" },
      { name: "Docker", level: 3, description: "コンテナ化・開発環境構築" },
      { name: "Figma", level: 4, description: "デザインシステム・プロトタイピング" },
    ],
    design: [
      { name: "UI/UX Design", level: 4, description: "ユーザー中心設計・アクセシビリティ" },
      { name: "Design Systems", level: 4, description: "再利用可能なコンポーネント設計" },
      { name: "Typography", level: 3, description: "タイポグラフィ・レイアウト設計" },
    ],
  },
  works: [
    {
      company: "株式会社テック企業",
      position: "シニアフロントエンドエンジニア",
      period: "2023年4月 - 現在",
      description: "BtoBサービスのフロントエンド開発リード",
      achievements: [
        "React・TypeScriptでの新機能開発",
        "Lighthouse Performance 100点達成",
        "デザインシステム構築・運用",
        "新人エンジニアのメンタリング"
      ]
    },
    {
      company: "フリーランス",
      position: "フロントエンド開発者",
      period: "2022年1月 - 2023年3月",
      description: "複数のスタートアップ・中小企業向けWeb開発",
      achievements: [
        "Next.js・TypeScriptでのWebアプリ開発",
        "レスポンシブデザイン実装",
        "SEO最適化・パフォーマンス改善",
        "クライアント要件定義・仕様策定"
      ]
    }
  ],
  education: [
    {
      institution: "某工科大学",
      degree: "情報工学科 学士",
      period: "2018年4月 - 2022年3月",
      description: "コンピュータサイエンス・ソフトウェア工学を専攻。プログラミング基礎からアルゴリズム・データ構造まで幅広く学習。"
    }
  ],
  philosophy: "「技術は人を幸せにするためのツールである」という信念のもと、ユーザーファーストな開発を心がけています。コードの美しさと実用性のバランスを大切にし、持続可能で拡張性のあるシステム構築を目指しています。また、技術の進歩に合わせて常に学び続け、チーム全体のスキル向上に貢献したいと考えています。"
};

// Zustandストア
export const useProfileStore = create<ProfileStore>((set, get) => ({
  selectedId: 'basicInfo',
  setSelectedId: (id: string) => set({ selectedId: id }),
  
  profileData: sampleProfileData,
  isLoading: false,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  
  getDetailContent: () => {
    const { profileData } = get();
    return {
      basicInfo: profileData.basicInfo,
      skills: profileData.skills,
      works: profileData.works,
      education: profileData.education,
      philosophy: profileData.philosophy,
    };
  },
})); 