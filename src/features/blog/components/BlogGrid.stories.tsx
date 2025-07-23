import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BlogGrid from './BlogGrid';

// Mock the data import for Storybook
const mockBlogs = [
  {
    slug: 'react-performance-tips',
    title: 'React Performance Optimization Tips',
    excerpt: 'Learn how to optimize your React applications for better performance and user experience.',
    date: '2024-01-15',
    tags: ['React', 'Performance', 'Optimization'],
    source: 'local' as const,
    url: '/blog/react-performance-tips'
  },
  {
    slug: 'typescript-best-practices',
    title: 'TypeScript Best Practices for Large Scale Applications',
    excerpt: 'Discover the best practices for using TypeScript in large scale applications.',
    date: '2024-01-10',
    tags: ['TypeScript', 'Best Practices', 'Architecture'],
    source: 'local' as const,
    url: '/blog/typescript-best-practices'
  },
  {
    slug: 'nextjs-app-router',
    title: 'Next.js App Router: Complete Guide',
    excerpt: 'A comprehensive guide to the new App Router in Next.js 13+.',
    date: '2024-01-05',
    tags: ['Next.js', 'App Router', 'React'],
    source: 'note.com' as const,
    url: '/blog/nextjs-app-router',
    link: 'https://note.com/nextjs-app-router'
  },
  {
    slug: 'css-grid-flexbox',
    title: 'CSS Grid vs Flexbox: When to Use Which',
    excerpt: 'Understanding the differences between CSS Grid and Flexbox and when to use each.',
    date: '2024-01-01',
    tags: ['CSS', 'Grid', 'Flexbox', 'Layout'],
    source: 'local' as const,
    url: '/blog/css-grid-flexbox'
  },
  {
    slug: 'web-accessibility',
    title: 'Web Accessibility in Modern Applications',
    excerpt: 'Making your web applications accessible to everyone.',
    date: '2023-12-28',
    tags: ['Accessibility', 'A11y', 'UX'],
    source: 'note.com' as const,
    url: '/blog/web-accessibility',
    link: 'https://note.com/web-accessibility'
  }
];

// Note: This story uses mock data instead of the actual data module
// The actual BlogGrid component would import from '../data'

const meta: Meta<typeof BlogGrid> = {
  title: 'Features/Blog/BlogGrid',
  component: BlogGrid,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'BlogGrid component displays a responsive grid of blog articles with search and filtering capabilities. It integrates both local Contentlayer articles and external note.com articles.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default blog grid showing all articles with search and filter functionality.'
      }
    }
  }
};

export const WithManyArticles: Story = {
  decorators: [
    (Story) => {
      // Mock more articles for this story
      const manyBlogs = Array.from({ length: 12 }, (_, i) => ({
        slug: `blog-${i + 1}`,
        title: `Blog Article ${i + 1}`,
        excerpt: `This is the excerpt for blog article ${i + 1}. It provides a brief overview of the content.`,
        date: new Date(2024, 0, i + 1).toISOString(),
        tags: ['React', 'TypeScript', 'Next.js'][i % 3] ? [['React', 'TypeScript'], ['Next.js', 'Performance'], ['CSS', 'Design']][i % 3] : ['General'],
        source: i % 3 === 0 ? 'note.com' as const : 'local' as const,
        url: `/blog/blog-${i + 1}`,
        ...(i % 3 === 0 && { link: `https://note.com/blog-${i + 1}` })
      }));
      
      // Note: Using static mock data for demonstration
      
      return <Story />;
    }
  ],
  parameters: {
    docs: {
      description: {
        story: 'Blog grid with many articles to showcase pagination and grid layout.'
      }
    }
  }
};

export const EmptyState: Story = {
  decorators: [
    (Story) => {
      // Note: Using empty array for empty state demonstration
      
      return <Story />;
    }
  ],
  parameters: {
    docs: {
      description: {
        story: 'Blog grid in empty state when no articles are available.'
      }
    }
  }
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Blog grid optimized for mobile devices with single column layout.'
      }
    }
  }
};

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: 'Blog grid on tablet devices with two-column layout.'
      }
    }
  }
};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: {
      default: 'dark'
    },
    docs: {
      description: {
        story: 'Blog grid with dark theme (default styling).'
      }
    }
  }
};