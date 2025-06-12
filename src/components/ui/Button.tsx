import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent-red' | 'accent-blue' | 'accent-yellow';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseStyles = [
    'font-heading',
    'font-medium',
    'rounded-md',
    'transition-neo',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-blue',
    'focus:ring-offset-2',
    'focus:ring-offset-bg',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
  ];

  const variantStyles = {
    primary: [
      'bg-text',
      'text-bg',
      'hover:bg-muted',
      'border',
      'border-transparent',
    ],
    secondary: [
      'bg-transparent',
      'text-text',
      'border',
      'border-border',
      'hover:bg-hover',
    ],
    'accent-red': [
      'bg-red',
      'text-bg',
      'hover:opacity-90',
      'border',
      'border-transparent',
    ],
    'accent-blue': [
      'bg-blue',
      'text-bg',
      'hover:opacity-90',
      'border',
      'border-transparent',
    ],
    'accent-yellow': [
      'bg-yellow',
      'text-bg',
      'hover:opacity-90',
      'border',
      'border-transparent',
    ],
  };

  const sizeStyles = {
    sm: ['px-3', 'py-1.5', 'text-sm'],
    md: ['px-4', 'py-2', 'text-base'],
    lg: ['px-6', 'py-3', 'text-lg'],
  };

  const buttonClasses = clsx(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}; 