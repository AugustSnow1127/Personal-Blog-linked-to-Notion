/**
 * Style Selector Demo Component
 * Landing page 用的簡化風格選擇演示
 * Uses static data instead of API import
 */
'use client';

import { Badge } from '@/components/ui/badge';
import { Camera, Palette, Sparkles, Monitor } from 'lucide-react';
import { ART_STYLE_OPTIONS } from '@/app/(showcase)/projects/craftshorts/static-data';

// Icon 映射（與真實 Dashboard 一致）
const styleIcons: Record<string, any> = {
  'realistic': Camera,
  'illustration': Palette,
  'anime': Sparkles,
  'watercolor': Palette,
  'cyberpunk': Monitor,
  'comic-book': Sparkles,
  'sci-fi': Monitor
};

export default function StyleSelectorDemo() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-purple-300 mb-2 flex items-center gap-2">
        <Palette className="w-4 h-4" />
        Select AI Image Style:
      </p>
      <div className="grid grid-cols-2 gap-2">
        {ART_STYLE_OPTIONS.slice(0, 6).map((style) => {
          const Icon = styleIcons[style.value] || Palette;
          return (
            <Badge
              key={style.value}
              variant="outline"
              className="justify-start px-3 py-2 bg-purple-900/20 border-purple-600/30 text-purple-200 hover:bg-purple-800/30 cursor-pointer w-auto"
            >
              <Icon className="w-4 h-4 mr-2" />
              {style.label}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
