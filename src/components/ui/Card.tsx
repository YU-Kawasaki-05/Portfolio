import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseStyles = [
    'rounded-lg',
    'border',
    'transition-neo',
    'focus-within:ring-2',
    'focus-within:ring-blue',
    'focus-within:ring-offset-2',
    'focus-within:ring-offset-bg',
  ];

  const variantStyles = {
    default: [
      'bg-bg',
      'border-border',
      'text-text',
    ],
    hover: [
      'bg-bg',
      'border-border',
      'text-text',
      'hover:bg-hover',
      'hover:border-muted',
      'cursor-pointer',
    ],
    accent: [
      'bg-hover',
      'border-muted',
      'text-text',
    ],
  };

  const sizeStyles = {
    sm: ['p-4', 'max-w-card'],
    md: ['p-6', 'max-w-prose'],
    lg: ['p-8', 'max-w-container'],
  };

  const cardClasses = clsx(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

// Card Header
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  className,
  children,
  ...props
}) => {
  const headerClasses = clsx(
    'mb-4',
    'pb-2',
    'border-b',
    'border-border',
    className
  );

  return (
    <div className={headerClasses} {...props}>
      {children}
    </div>
  );
};

// Card Title
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  level = 3,
  className,
  children,
  ...props
}) => {
  const titleClasses = clsx(
    'font-heading',
    'font-bold',
    'text-text',
    'leading-tight',
    {
      'text-2xl': level === 1,
      'text-xl': level === 2,
      'text-lg': level === 3,
      'text-base': level === 4,
      'text-sm': level === 5,
      'text-xs': level === 6,
    },
    className
  );

  switch (level) {
    case 1:
      return <h1 className={titleClasses} {...props}>{children}</h1>;
    case 2:
      return <h2 className={titleClasses} {...props}>{children}</h2>;
    case 3:
      return <h3 className={titleClasses} {...props}>{children}</h3>;
    case 4:
      return <h4 className={titleClasses} {...props}>{children}</h4>;
    case 5:
      return <h5 className={titleClasses} {...props}>{children}</h5>;
    case 6:
      return <h6 className={titleClasses} {...props}>{children}</h6>;
    default:
      return <h3 className={titleClasses} {...props}>{children}</h3>;
  }
};

// Card Content
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({
  className,
  children,
  ...props
}) => {
  const contentClasses = clsx(
    'text-text',
    'leading-normal',
    className
  );

  return (
    <div className={contentClasses} {...props}>
      {children}
    </div>
  );
};

// Card Footer
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  className,
  children,
  ...props
}) => {
  const footerClasses = clsx(
    'mt-4',
    'pt-2',
    'border-t',
    'border-border',
    'flex',
    'justify-end',
    'gap-2',
    className
  );

  return (
    <div className={footerClasses} {...props}>
      {children}
    </div>
  );
}; 