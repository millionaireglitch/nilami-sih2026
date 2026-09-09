import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaAction?: () => void;
  secondaryLabel?: string;
  secondaryAction?: () => void;
  secondaryHref?: string;
  className?: string;
  compact?: boolean;
}

export function EmptyState({
  icon,
  title,
  description,
  ctaLabel,
  ctaHref,
  ctaAction,
  secondaryLabel,
  secondaryAction,
  secondaryHref,
  className,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        compact ? 'py-10 px-4' : 'py-20 px-8',
        className
      )}
    >
      {icon && (
        <div
          className={cn(
            'flex items-center justify-center rounded-2xl bg-navy-50 mb-5',
            compact ? 'w-12 h-12' : 'w-20 h-20'
          )}
        >
          <span
            className={cn(
              'text-navy-400',
              compact ? '[&>svg]:w-5 [&>svg]:h-5' : '[&>svg]:w-8 [&>svg]:h-8'
            )}
          >
            {icon}
          </span>
        </div>
      )}
      <h3
        className={cn(
          'font-semibold text-navy-800',
          compact ? 'text-base mb-1' : 'text-xl mb-2'
        )}
      >
        {title}
      </h3>
      {description && (
        <p
          className={cn(
            'text-navy-500 max-w-sm leading-relaxed',
            compact ? 'text-xs' : 'text-sm'
          )}
        >
          {description}
        </p>
      )}
      {(ctaLabel || secondaryLabel) && (
        <div className="flex items-center gap-3 mt-5 flex-wrap justify-center">
          {ctaLabel &&
            (ctaHref ? (
              <Link to={ctaHref} className="btn btn-primary text-sm px-6 py-2.5">
                {ctaLabel}
              </Link>
            ) : ctaAction ? (
              <button onClick={ctaAction} className="btn btn-primary text-sm px-6 py-2.5">
                {ctaLabel}
              </button>
            ) : null)}
          {secondaryLabel &&
            (secondaryHref ? (
              <Link to={secondaryHref} className="btn btn-outline text-sm px-6 py-2.5">
                {secondaryLabel}
              </Link>
            ) : secondaryAction ? (
              <button onClick={secondaryAction} className="btn btn-outline text-sm px-6 py-2.5">
                {secondaryLabel}
              </button>
            ) : null)}
        </div>
      )}
    </div>
  );
}
