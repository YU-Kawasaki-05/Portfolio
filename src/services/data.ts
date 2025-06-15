export type ServiceCategory = 'Consulting' | 'Development' | 'Automation' | 'Training';

export interface ServiceItem {
  title: string;
  category: ServiceCategory;
  price: string;
  duration: string;
  description: string;
  contents: string[];
}

export const services: ServiceItem[] = [
  {
    title: 'AIコンサルティング',
    category: 'Consulting',
    price: '¥200,000/月~',
    duration: '継続',
    description: '業務プロセスのAI化に関する包括的なコンサルティング',
    contents: [
      '業務プロセスの把握',
      '経営者、従業員へのヒアリング',
      '業務プロセスのAI化施策の提案',
      'AIを用いた売上 / 利益向上施策の策定',
      'システム開発の方針の策定',
      '既存AIツールの活用支援',
    ],
  },
  {
    title: '生成AI導入支援',
    category: 'Consulting',
    price: '¥100,000/月~',
    duration: '継続',
    description: '業務プロセスのAI化からシステム開発まで包括的なコンサルティング',
    contents: [
      '業務プロセスの把握',
      '経営者、従業員へのヒアリング',
      '業務プロセスのAI化施策の提案',
      'AIを用いた売上 / 利益改善施策の提案',
      'システムの要件定義・設計から開発・導入までの伴走支援',
      '既存AIツールの活用支援',
    ],
  },
  {
    title: 'ウェブ開発',
    category: 'Development',
    price: '¥300,000〜',
    duration: '2-4週間',
    description: 'モダンな技術スタックを使用した高品質なウェブアプリケーションの開発',
    contents: [
      'React / Next.js による SPA 開発',
      'TypeScript による型安全な実装',
      'レスポンシブデザイン対応',
      'SEO 最適化',
      'パフォーマンス最適化',
      'テスト実装（Jest + RTL）',
    ],
  },
  {
    title: 'スモールスプリント開発',
    category: 'Development',
    price: '¥150,000~/案件',
    duration: '2-4週間',
    description: 'GAS・VBA・チャットボットなど"小回り"の利く自動化・連携開発',
    contents: [
      '業務フローのヒアリング',
      'Google Apps Script / VBA マクロ設計・実装',
      'Slack・Discord・ChatWork への Bot 組み込み',
      'GPTs / 外部 API とのデータ連携',
      'テスト & 動作マニュアル',
      '1か月運用サポート',
    ],
  },
  {
    title: 'Difyアプリ開発',
    category: 'Development',
    price: '¥300,000~/案件',
    duration: '4-6週間',
    description: 'Dify を基盤にしたチャットボット／ワークフロー自動化アプリ構築',
    contents: [
      '要件定義 & プロンプト設計',
      'Dify ワークフロー & UI 設計',
      '外部 API（Notion・Google Drive 等）連携',
      'カスタムプラグイン / スキーマ拡張',
      '社内導入トレーニング & ドキュメント',
      '1か月運用・改善サポート',
    ],
  },
  {
    title: 'SaaS MVP 開発',
    category: 'Development',
    price: '¥400,000~/案件',
    duration: '4-8週間',
    description: '生成AIや外部AI API を組み込んだ最小実用プロダクトをフルスタックで構築',
    contents: [
      '要件ヒアリング & MVP 仕様策定',
      'Next.js + Supabase / Firebase でバックエンド・認証構築',
      'OpenAI 等の API 設計・プロンプト最適化',
      'UI/UX デザイン（Tailwind・shadcn/ui）',
      'GitHub Actions で CI/CD パイプライン',
      '本番デプロイ & 運用マニュアル',
    ],
  },
  {
    title: '生成AIプロンプト作成',
    category: 'Automation',
    price: '¥50,000~',
    duration: '1-3週間',
    description: '既存のAIツールを活用した業務プロセスのAI化',
    contents: [
      '業務プロセスの把握',
      '経営者、従業員へのヒアリング',
      '業務プロセスにAIを取り入れるためのプロンプト設計',
      'プロンプト作成',
      '試用と修正',
      'マニュアル作成',
    ],
  },
  {
    title: 'LINE公式アカウント導入・拡張',
    category: 'Automation',
    price: '¥200,000~/案件',
    duration: '3-5週間',
    description: 'LINE Bot・リッチメニュー・バックエンド連携までワンストップ',
    contents: [
      '公式 LINE アカウント開設 & 設定',
      'リッチメニュー／テンプレートメッセージ作成',
      'Firebase / Supabase 等とのバックエンド接続',
      'データベース設計（顧客情報・購買履歴）',
      '運用マニュアル & レクチャー',
      '1か月保守サポート',
    ],
  },
  {
    title: '社内GPT ・ カスタムチャットボット導入',
    category: 'Automation',
    price: '¥250,000~/案件',
    duration: '3-5週間',
    description: '社内ドキュメントや Slack／Notion 等々を参照する社内専用 GPT を構築',
    contents: [
      'データソース整理 & ベクトルDB 設計',
      'Embeddings 生成 & 類似検索実装',
      'OpenAI Function Calling による高度応答',
      'Slack / Teams 連携 Bot',
      'アクセス権限 & ロギング設計',
      '1か月運用サポート',
    ],
  },
  {
    title: 'SaaSワークフロー統合開発',
    category: 'Automation',
    price: '¥300,000~/案件',
    duration: '4-6週間',
    description: 'Notion / Zapier / Make / HubSpot など複数 SaaS を 1 つに統合',
    contents: [
      '連携シナリオ設計',
      '個別 SaaS API 認証 & レート制御',
      'ロールバック & エラーハンドリング設計',
      'ダッシュボードで KPI 可視化',
      '操作マニュアル & 社員向け研修',
    ],
  },
  {
    title: 'AI駆動エンジニアリング研修',
    category: 'Training',
    price: '¥80,000~/回',
    duration: '3-4時間ワークショップ',
    description: 'AIを用いた開発手法をハンズオン形式で提供する研修',
    contents: [
      '最新 LLM エコシステム解説',
      'プロンプトパターンと失敗例',
      '実装実演',
      'ハンズオン演習',
      '演習テンプレート & スライド配布',
    ],
  },
]; 