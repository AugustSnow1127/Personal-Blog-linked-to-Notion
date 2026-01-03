'use client';

import { useState, useEffect } from 'react';

interface ViewToggleProps {
  onViewChange: (view: 'grid' | 'list') => void;
  defaultView?: 'grid' | 'list';
}

export default function ViewToggle({ onViewChange, defaultView = 'grid' }: ViewToggleProps) {
  const [view, setView] = useState<'grid' | 'list'>(defaultView);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('postViewMode') as 'grid' | 'list' | null;
    if (saved) {
      setView(saved);
      onViewChange(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleViewChange = (newView: 'grid' | 'list') => {
    setView(newView);
    localStorage.setItem('postViewMode', newView);
    onViewChange(newView);
  };

  if (!mounted) return null;

  return (
    <div className="flex gap-2 mb-6">
      <button
        onClick={() => handleViewChange('grid')}
        className={'p-2 rounded transition-colors ' + (view === 'grid' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}
        aria-label="Grid view"
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 3h8v8H3V3m10 0h8v8h-8V3M3 13h8v8H3v-8m10 0h8v8h-8v-8z" />
        </svg>
      </button>
      <button
        onClick={() => handleViewChange('list')}
        className={'p-2 rounded transition-colors ' + (view === 'list' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}
        aria-label="List view"
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 4h18v2H3V4m0 7h18v2H3v-2m0 7h18v2H3v-2z" />
        </svg>
      </button>
    </div>
  );
}
