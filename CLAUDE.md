# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Commands

### Development
```bash
pnpm dev            # Start development server on http://localhost:3000
pnpm build          # Build for production
pnpm start          # Start production server
pnpm lint           # Run ESLint
```

### Testing
```bash
pnpm test           # Run Vitest unit tests
pnpm test:e2e       # Run Playwright E2E tests
pnpm test:storybook # Run Storybook tests
```

### Storybook
```bash
pnpm storybook      # Start Storybook dev server on http://localhost:6006
pnpm build-storybook # Build Storybook for production
```

### Note.com Integration
```bash
pnpm tsx scripts/fetch-notes.ts  # Fetch latest articles from note.com
```

## Architecture Overview

This is a **Neo-Typographic Fusion** portfolio built with Next.js 15 (App Router), featuring:

- **Framework**: Next.js 15 with App Router and TypeScript
- **Styling**: Tailwind CSS 4 with custom design tokens
- **3D Graphics**: Three.js + React Three Fiber for hero animations
- **Animations**: Framer Motion + GSAP for page transitions and scroll effects
- **Content Management**: Contentlayer for MDX blog posts and portfolio works
- **UI Components**: shadcn/ui with Radix UI primitives
- **Testing**: Vitest + Playwright + Storybook
- **Package Manager**: pnpm (required)

### Key Design Principles
- **Dark theme**: `#0F0F0F` background with `#F9F9F9` text
- **Accent colors**: Red `#FF2D55`, Blue `#1479FF`, Yellow `#F5C400` (max 10% usage)
- **Typography**: Space Grotesk (headings) + Inter (body) + Noto Sans JP (Japanese)
- **Performance**: Lighthouse 90+ target with image optimization

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── blog/[slug]/       # Dynamic blog post pages
│   ├── portfolio/[slug]/  # Dynamic portfolio work pages
│   └── (profile|services|sns)/ # Static pages
├── components/
│   ├── layout/            # Header, footer, navigation
│   ├── ui/               # shadcn/ui components
│   ├── hero3d.tsx        # Three.js hero animation
│   ├── skills-section.tsx # Skills showcase
│   └── [other components]
├── data/
│   ├── skills.ts         # Skills data structure
│   └── notes.json        # External note.com articles
├── lib/
│   └── utils.ts          # Utility functions (cn, etc.)
└── services/
    └── data.ts           # Data fetching services

content/
├── blog/                 # MDX blog posts
└── works/                # MDX portfolio works

tests/
├── e2e/                  # Playwright E2E tests
└── unit/                 # Vitest unit tests
```

## Content Management

### Blog Posts & Portfolio Works
- Located in `content/blog/` and `content/works/`
- Written in MDX with frontmatter schema defined in `contentlayer.config.ts`
- Required fields: `slug`, `title`, `date`, `excerpt`
- Optional fields: `cover`, `tags`
- URLs: `/blog/[slug]` and `/portfolio/[slug]`

### External Content Integration
- note.com articles are fetched via `scripts/fetch-notes.ts`
- Results stored in `src/data/notes.json`
- Integrated into blog page display

## Development Guidelines

### Code Style (.cursor rules)
- Line length: 100 characters max
- Japanese text: Use `「」` and `。` punctuation
- Code comments: English only
- File naming: PascalCase for components, kebab-case for pages
- Always add trailing newline

### React Components
- Use TypeScript interfaces for all props
- PascalCase file names matching component names
- Tailwind CSS only (no inline styles or SCSS)
- Use `cn()` utility from `lib/utils.ts` for conditional classes

### Testing Standards
- Unit tests: Vitest + React Testing Library
- E2E tests: Playwright with html reporter
- Storybook tests: Integrated with Vitest
- Coverage targets: 80% statements, 70% branches

## Important Configuration Notes

### Next.js Config
- TypeScript and ESLint errors are ignored during builds (`ignoreBuildErrors: true`)
- Contentlayer integration via `withContentlayer()` wrapper

### Font Loading
- Space Grotesk, Inter, and Noto Sans JP are preloaded
- Font display: swap for performance
- Font variables: `--font-space-grotesk`, `--font-inter`, `--font-noto-sans-jp`

### Performance Optimization
- Uses custom `PerformanceOptimizer` component
- Critical image preloading configured in layout
- Web Vitals monitoring enabled in production
- DNS prefetch for Google Fonts

### SEO & Metadata
- Comprehensive OpenGraph and Twitter metadata
- Schema.org structured data for person/organization
- PWA manifest and Apple Web App configuration
- Security headers configured in layout

## Package Manager

This project uses **pnpm** exclusively. Always use `pnpm` instead of `npm` or `yarn`:
- Lock file: `pnpm-lock.yaml`
- Playwright configured to use `pnpm dev` for test server
- Scripts should be run with `pnpm` prefix

## Development Notes

When working with this codebase:
1. Always run `pnpm dev` to start development server
2. Use `pnpm lint` to check code quality before commits
3. Test with `pnpm test` and `pnpm test:e2e` for full coverage
4. Preview components in Storybook with `pnpm storybook`
5. Update note.com content with `pnpm tsx scripts/fetch-notes.ts`