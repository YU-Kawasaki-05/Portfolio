import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[#1A1A1A] text-[#F9F9F9] border-[#2A2A2A]',
        accent: 'bg-[#FF2D55]/10 text-[#FF2D55] border-[#FF2D55]/20',
        blue: 'bg-[#1479FF]/10 text-[#1479FF] border-[#1479FF]/20',
        yellow: 'bg-[#F5C400]/10 text-[#F5C400] border-[#F5C400]/20',
        outline: 'border-[#2A2A2A] text-[#F9F9F9]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  ),
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants }; 