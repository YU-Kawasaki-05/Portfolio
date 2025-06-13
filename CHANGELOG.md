# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [未リリース] - 2024-03-21

### Added
* pages: Profile / Services / SNS / Portfolio / Blog を独立化 (#208-213)
* feat: Framer Motion でページ遷移フェードを layout.tsx に実装 (#215)
* test: Playwright E2E テストスケルトンを追加 (#216)

### Changed
* design: CTO レビュー準拠でコンポーネント分割・Contentlayer 方針を追記 (#330)
  - `03_components.md` に Slots 列を追加
  - Blog/Portfolio を Container-Presentational アーキテクチャに刷新
  - `07_content-layer.md` を新規作成
  - `02_layout-guidelines.md` に PageShell Server Component を追記
  - `00_overview.md` に成長戦略とKPIを追加
* nav: Header & Sidebar リンクを Router Link に変更 (#214)

## [0.1.0] - 2024-03-20

### Added
* 初期構築：Next.js 15 + TypeScript + Tailwind CSS環境構築
* shadcn/ui統合
* Cursorルール設定
* Phase 0完了

## [Unreleased] - YYYY-MM-DD

### Changed

-   design: 拡張性重視でフォルダ再構築 (#320) 