import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
  centered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  tag?: string;
}

export function SectionHeader({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  className,
  centered = false,
  size = 'md',
  tag,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-4',
        centered && 'flex-col items-center text-center',
        className
      )}
    >
      <div className={cn(centered && 'max-w-2xl mx-auto text-center')}>
        {tag && (
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-saffron-600 mb-2">
            {tag}
          </span>
        )}
        <h2
          className={cn(
            'font-bold text-navy-900 leading-tight',
            size === 'sm' && 'text-xl',
            size === 'md' && 'text-2xl md:text-3xl',
            size === 'lg' && 'text-3xl md:text-4xl'
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              'text-navy-500 mt-1.5 leading-relaxed',
              size === 'sm' && 'text-sm',
              size === 'md' && 'text-sm md:text-base',
              size === 'lg' && 'text-base md:text-lg'
            )}
          >
            {subtitle}
          </p>
        )}
      </div>

      {ctaLabel && ctaHref && !centered && (
        <Link
          to={ctaHref}
          className="flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-navy-900 whitespace-nowrap group shrink-0 mt-1 transition-colors"
        >
          {ctaLabel}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}
      {ctaLabel && ctaHref && centered && (
        <Link
          to={ctaHref}
          className="btn btn-outline text-sm px-6 py-2.5 mt-2 inline-flex items-center gap-1.5"
        >
          {ctaLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
