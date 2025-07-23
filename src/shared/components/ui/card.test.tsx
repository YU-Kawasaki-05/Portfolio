import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';

describe('Card Components', () => {
  it('renders Card component', () => {
    render(
      <Card data-testid="card">
        <div>Card Content</div>
      </Card>
    );
    
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('rounded-xl', 'border', 'bg-card', 'text-card-foreground', 'shadow-sm');
  });

  it('renders CardHeader with title and description', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
      </Card>
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders CardContent', () => {
    render(
      <Card>
        <CardContent>
          <p>Card content text</p>
        </CardContent>
      </Card>
    );
    
    expect(screen.getByText('Card content text')).toBeInTheDocument();
  });

  it('renders CardFooter', () => {
    render(
      <Card>
        <CardFooter>
          <button>Footer Button</button>
        </CardFooter>
      </Card>
    );
    
    expect(screen.getByRole('button', { name: 'Footer Button' })).toBeInTheDocument();
  });

  it('renders complete card with all components', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Complete Card Title</CardTitle>
          <CardDescription>Complete card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Complete card content</p>
        </CardContent>
        <CardFooter>
          <button>Complete Card Action</button>
        </CardFooter>
      </Card>
    );
    
    expect(screen.getByText('Complete Card Title')).toBeInTheDocument();
    expect(screen.getByText('Complete card description')).toBeInTheDocument();
    expect(screen.getByText('Complete card content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Complete Card Action' })).toBeInTheDocument();
  });

  it('applies custom className to Card', () => {
    render(
      <Card className="custom-class" data-testid="card">
        <div>Content</div>
      </Card>
    );
    
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('custom-class');
  });

  it('applies custom className to CardTitle', () => {
    render(
      <CardHeader>
        <CardTitle className="custom-title-class">Custom Title</CardTitle>
      </CardHeader>
    );
    
    const title = screen.getByText('Custom Title');
    expect(title).toHaveClass('custom-title-class');
  });

  it('applies custom className to CardDescription', () => {
    render(
      <CardHeader>
        <CardDescription className="custom-desc-class">Custom Description</CardDescription>
      </CardHeader>
    );
    
    const description = screen.getByText('Custom Description');
    expect(description).toHaveClass('custom-desc-class');
  });
});