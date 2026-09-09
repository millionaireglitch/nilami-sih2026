import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Car, Factory, Landmark, Package } from 'lucide-react';
import { cn } from '@/utils/cn';

interface Category {
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  iconColor: string;
  iconBg: string;
}

const CATEGORIES: Category[] = [
  {
    label: 'Properties',
    sublabel: '1,200+ listings',
    icon: Building2,
    href: '/property-auctions',
    iconColor: 'text-blue-700',
    iconBg: 'bg-blue-50 group-hover:bg-blue-100',
  },
  {
    label: 'Vehicles',
    sublabel: '860+ listings',
    icon: Car,
    href: '/vehicle-auctions',
    iconColor: 'text-amber-700',
    iconBg: 'bg-amber-50 group-hover:bg-amber-100',
  },
  {
    label: 'Commercial',
    sublabel: '340+ listings',
    icon: Factory,
    href: '/explore?types=commercial',
    iconColor: 'text-purple-700',
    iconBg: 'bg-purple-50 group-hover:bg-purple-100',
  },
  {
    label: 'Land',
    sublabel: '520+ listings',
    icon: Landmark,
    href: '/explore?types=land',
    iconColor: 'text-emerald-700',
    iconBg: 'bg-emerald-50 group-hover:bg-emerald-100',
  },
  {
    label: 'Other Assets',
    sublabel: '190+ listings',
    icon: Package,
    href: '/explore?types=industrial,equipment,other',
    iconColor: 'text-slate-600',
    iconBg: 'bg-slate-50 group-hover:bg-slate-100',
  },
];

interface CategoryNavProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export function CategoryNav({ className, variant = 'default' }: CategoryNavProps) {
  return (
    <div className={cn('flex items-center gap-3 md:gap-4 overflow-x-auto scrollbar-none', className)}>
      {CATEGORIES.map(({ label, sublabel, icon: Icon, href, iconColor, iconBg }) => (
        <Link
          key={label}
          to={href}
          className={cn(
            'group flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer select-none',
            variant === 'compact' ? 'min-w-[60px]' : 'min-w-[76px]'
          )}
        >
          <div
            className={cn(
              'rounded-2xl flex items-center justify-center transition-all duration-200',
              iconBg,
              'border border-transparent group-hover:border-gray-200 group-hover:shadow-sm',
              variant === 'compact' ? 'w-12 h-12' : 'w-16 h-16'
            )}
          >
            <Icon
              className={cn(
                'transition-transform duration-200 group-hover:scale-110',
                iconColor,
                variant === 'compact' ? 'w-5 h-5' : 'w-7 h-7'
              )}
            />
          </div>
          <div className="text-center">
            <p className={cn('font-semibold text-navy-800 leading-tight', variant === 'compact' ? 'text-xs' : 'text-sm')}>
              {label}
            </p>
            {variant !== 'compact' && (
              <p className="text-xs text-navy-400 mt-0.5">{sublabel}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
