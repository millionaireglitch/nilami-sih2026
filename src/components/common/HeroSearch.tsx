import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Home, Car, Hash, MapPin, Building2 } from 'lucide-react';
import { cn } from '@/utils/cn';

type SearchCategory = 'property' | 'vehicle' | 'auction_id' | 'location' | 'bank';

const CATEGORIES: {
  id: SearchCategory;
  label: string;
  placeholder: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: 'property', label: 'Property', placeholder: 'Type, city, area, society name...', icon: Home },
  { id: 'vehicle', label: 'Vehicle', placeholder: 'Cars, trucks, two-wheelers...', icon: Car },
  { id: 'auction_id', label: 'Auction ID', placeholder: 'e.g. SBI/MUM/2026/001', icon: Hash },
  { id: 'location', label: 'Location', placeholder: 'City, state or PIN code...', icon: MapPin },
  { id: 'bank', label: 'Bank / Org', placeholder: 'SBI, HDFC Bank, MCD...', icon: Building2 },
];

interface HeroSearchProps {
  className?: string;
  compact?: boolean;
}

export function HeroSearch({ className, compact = false }: HeroSearchProps) {
  const navigate = useNavigate();
  const [active, setActive] = useState<SearchCategory>('property');
  const [query, setQuery] = useState('');

  const current = CATEGORIES.find(c => c.id === active)!;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    params.set('cat', active);
    navigate(`/explore?${params.toString()}`);
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Category tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-3">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 focus:outline-none',
                active === cat.id
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-white/80 text-navy-600 hover:bg-white hover:text-navy-900 border border-surface-border'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Input + Submit */}
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search
            className={cn(
              'absolute top-1/2 -translate-y-1/2 text-navy-400 pointer-events-none',
              compact ? 'left-3 w-4 h-4' : 'left-4 w-5 h-5'
            )}
          />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={current.placeholder}
            className={cn(
              'w-full bg-white border border-surface-border rounded-xl text-navy-900',
              'placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-900/15',
              'focus:border-navy-400 transition-all',
              compact ? 'pl-9 pr-3 py-2.5 text-sm' : 'pl-12 pr-4 py-3.5 text-base'
            )}
          />
        </div>
        <button
          type="submit"
          className={cn(
            'btn btn-primary rounded-xl font-semibold shrink-0',
            compact ? 'px-5 py-2.5 text-sm' : 'px-8 py-3.5 text-base'
          )}
        >
          Search
        </button>
      </form>
    </div>
  );
}
