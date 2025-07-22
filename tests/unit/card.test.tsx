import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from '@/shared/components/ui/card';

describe('Card Components', () => {
  describe('Card', () => {
    it('renders with default classes and data-slot attribute', () => {
      render(<Card data-testid="card">Card content</Card>);
      
      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveAttribute('data-slot', 'card');
      expect(card).toHaveClass(
        'bg-card',
        'text-card-foreground',
        'flex',
        'flex-col',
        'gap-6',
        'rounded-xl',
        'border',
        'py-6',
        'shadow-sm'
      );
    });

    it('accepts custom className', () => {
      render(<Card className="custom-class" data-testid="card">Content</Card>);
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('custom-class');
      expect(card).toHaveClass('bg-card'); // Default classes still applied
    });

    it('forwards props to div element', () => {
      render(
        <Card id="test-card" role="region" data-testid="card">
          Content
        </Card>
      );
      
      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('id', 'test-card');
      expect(card).toHaveAttribute('role', 'region');
    });
  });

  describe('CardHeader', () => {
    it('renders with correct data-slot and classes', () => {
      render(<CardHeader data-testid="header">Header content</CardHeader>);
      
      const header = screen.getByTestId('header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveAttribute('data-slot', 'card-header');
      expect(header).toHaveClass(
        '@container/card-header',
        'grid',
        'auto-rows-min',
        'grid-rows-[auto_auto]',
        'items-start',
        'gap-1.5',
        'px-6'
      );
    });

    it('applies custom className', () => {
      render(<CardHeader className="header-custom" data-testid="header">Content</CardHeader>);
      
      const header = screen.getByTestId('header');
      expect(header).toHaveClass('header-custom');
    });
  });

  describe('CardTitle', () => {
    it('renders with correct data-slot and classes', () => {
      render(<CardTitle data-testid="title">Title text</CardTitle>);
      
      const title = screen.getByTestId('title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveAttribute('data-slot', 'card-title');
      expect(title).toHaveClass('leading-none', 'font-semibold');
    });

    it('displays text content correctly', () => {
      render(<CardTitle>My Card Title</CardTitle>);
      
      expect(screen.getByText('My Card Title')).toBeInTheDocument();
    });
  });

  describe('CardDescription', () => {
    it('renders with correct data-slot and classes', () => {
      render(<CardDescription data-testid="description">Description text</CardDescription>);
      
      const description = screen.getByTestId('description');
      expect(description).toBeInTheDocument();
      expect(description).toHaveAttribute('data-slot', 'card-description');
      expect(description).toHaveClass('text-muted-foreground', 'text-sm');
    });

    it('displays description content correctly', () => {
      render(<CardDescription>This is a card description</CardDescription>);
      
      expect(screen.getByText('This is a card description')).toBeInTheDocument();
    });
  });

  describe('CardAction', () => {
    it('renders with correct data-slot and classes', () => {
      render(<CardAction data-testid="action">Action content</CardAction>);
      
      const action = screen.getByTestId('action');
      expect(action).toBeInTheDocument();
      expect(action).toHaveAttribute('data-slot', 'card-action');
      expect(action).toHaveClass(
        'col-start-2',
        'row-span-2',
        'row-start-1',
        'self-start',
        'justify-self-end'
      );
    });
  });

  describe('CardContent', () => {
    it('renders with correct data-slot and classes', () => {
      render(<CardContent data-testid="content">Main content</CardContent>);
      
      const content = screen.getByTestId('content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveAttribute('data-slot', 'card-content');
      expect(content).toHaveClass('px-6');
    });

    it('displays content correctly', () => {
      render(
        <CardContent>
          <p>Card main content</p>
        </CardContent>
      );
      
      expect(screen.getByText('Card main content')).toBeInTheDocument();
    });
  });

  describe('CardFooter', () => {
    it('renders with correct data-slot and classes', () => {
      render(<CardFooter data-testid="footer">Footer content</CardFooter>);
      
      const footer = screen.getByTestId('footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveAttribute('data-slot', 'card-footer');
      expect(footer).toHaveClass('flex', 'items-center', 'px-6');
    });
  });

  describe('Component Composition', () => {
    it('renders a complete card with all components', () => {
      render(
        <Card data-testid="complete-card">
          <CardHeader>
            <CardTitle>Test Card</CardTitle>
            <CardDescription>This is a test card</CardDescription>
            <CardAction>
              <button>Action</button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>Main card content goes here</p>
          </CardContent>
          <CardFooter>
            <button>Footer Button</button>
          </CardFooter>
        </Card>
      );

      // Check all components are rendered
      expect(screen.getByTestId('complete-card')).toBeInTheDocument();
      expect(screen.getByText('Test Card')).toBeInTheDocument();
      expect(screen.getByText('This is a test card')).toBeInTheDocument();
      expect(screen.getByText('Main card content goes here')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Footer Button' })).toBeInTheDocument();
    });

    it('works with minimal composition', () => {
      render(
        <Card>
          <CardContent>Simple card</CardContent>
        </Card>
      );

      expect(screen.getByText('Simple card')).toBeInTheDocument();
    });

    it('handles header with action layout', () => {
      render(
        <Card data-testid="card-with-action">
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardDescription>Description</CardDescription>
            <CardAction data-testid="action">
              <span>Action</span>
            </CardAction>
          </CardHeader>
        </Card>
      );

      const action = screen.getByTestId('action');
      expect(action).toHaveClass('col-start-2', 'row-span-2', 'row-start-1');
    });
  });

  describe('Accessibility', () => {
    it('supports ARIA attributes', () => {
      render(
        <Card role="article" aria-labelledby="card-title" data-testid="card">
          <CardTitle id="card-title">Accessible Card</CardTitle>
          <CardContent>Content</CardContent>
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('role', 'article');
      expect(card).toHaveAttribute('aria-labelledby', 'card-title');
    });

    it('maintains semantic structure', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Semantic Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This card maintains proper semantic structure</p>
          </CardContent>
        </Card>
      );

      // Title should be findable by text
      expect(screen.getByText('Semantic Card')).toBeInTheDocument();
      // Content paragraph should be present
      expect(screen.getByText('This card maintains proper semantic structure')).toBeInTheDocument();
    });
  });
});