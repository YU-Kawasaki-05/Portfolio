# 02. Layout Guidelines

> サイト全体のレイアウト構造と、新しいページを追加する際の指針を定義します。

## 3 ブレイクポイントのグリッドシステム

サイトはレスポンシブデザインを採用し、主要な3つのブレイクポイントでレイアウトが最適化されます。

- **Mobile**: `max-width: 767px`
- **Tablet**: `min-width: 768px` and `max-width: 1023px`
- **Desktop**: `min-width: 1024px`

```mermaid
graph TD
    subgraph Mobile (375px)
        A[Header] --> B(Main: 1-col);
    end
    subgraph Tablet (768px)
        C[Header] --> D(Main: 2-col);
    end
    subgraph Desktop (1440px)
        E[Header] --> F(Main: 3-col Grid);
    end

    B --> G[Footer];
    D --> G;
    F --> G;

    style A fill:#333,stroke:#fff,stroke-width:2px
    style C fill:#333,stroke:#fff,stroke-width:2px
    style E fill:#333,stroke:#fff,stroke-width:2px
    style G fill:#333,stroke:#fff,stroke-width:2px
```

## 拡張指針

新しいページやセクションを追加する際は、以下の構造を厳守してください。

1.  **Layout Shell の継承**:
    - 全てのページは `src/components/layout/page-shell.tsx` (仮) をルートコンポーネントとして利用します。
    - この Shell が `Header`, `Footer`, `Sidebar` などの共通レイアウトを提供します。

2.  **コンテンツの順序**:
    - HTML 構造として、メインコンテンツ (`<main>`) がサイドバーやフッターよりも先に配置されることを保証します。
    - これにより、アクセシビリティと SEO が向上します。

3.  **グリッドの利用**:
    - `page-shell` 内のメインコンテンツエリアは、ブレイクポイントに応じて可変する CSS Grid で構成されます。
    - コンテンツはこのグリッドシステム上に配置してください。 