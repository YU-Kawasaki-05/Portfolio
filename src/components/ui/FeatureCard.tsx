import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  accentColor: 'red' | 'blue' | 'yellow';
  className?: string;
}

export default function FeatureCard({ 
  icon, 
  title, 
  description, 
  accentColor,
  className = '' 
}: FeatureCardProps) {
  const colorClasses = {
    red: 'hover:border-red/50 hover:bg-red/5 group-hover:text-red',
    blue: 'hover:border-blue/50 hover:bg-blue/5 group-hover:text-blue', 
    yellow: 'hover:border-yellow/50 hover:bg-yellow/5 group-hover:text-yellow'
  };

  const iconColorClasses = {
    red: 'text-red bg-red/10 border-red/20',
    blue: 'text-blue bg-blue/10 border-blue/20',
    yellow: 'text-yellow bg-yellow/10 border-yellow/20'
  };

  return (
    <div className={`
      group relative bg-text/5 border border-text/10 p-8 
      transition-all duration-300 cursor-pointer
      ${colorClasses[accentColor]}
      ${className}
    `}>
      {/* Accent Dot */}
      <div className={`
        absolute top-4 right-4 w-3 h-3 rounded-full opacity-0 
        group-hover:opacity-100 transition-opacity duration-300
        bg-${accentColor}
      `} />
      
      {/* Icon */}
      <div className={`
        w-16 h-16 rounded-full flex items-center justify-center mb-6
        border-2 transition-colors duration-300
        ${iconColorClasses[accentColor]}
      `}>
        {icon}
      </div>
      
      {/* Content */}
      <h3 className="text-2xl font-heading font-bold text-text mb-4 group-hover:text-text transition-colors">
        {title}
      </h3>
      <p className="text-text/70 leading-relaxed">
        {description}
      </p>
    </div>
  );
} 