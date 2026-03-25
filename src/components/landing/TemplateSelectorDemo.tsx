/**
 * Template Selector Demo Component
 * Landing page 用的 ASMR Template 選擇演示 - Veo3 流程
 * Uses static data instead of API
 */
'use client';

import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import { ASMR_OBJECTS_GROUPED, type AsmrObject } from '@/app/(showcase)/projects/craftshorts/static-data';

// Category display configuration
const CATEGORY_LABELS: Record<string, string> = {
  'planetary_cosmic': 'Planetary & Cosmic',
  'fruit_soda': 'Fruit Soda',
};

// 要顯示的物件 ID（使用資料庫中的實際 ID）
const DISPLAY_OBJECTS: Record<string, string[]> = {
  'planetary_cosmic': ['planet_03', 'planet_04', 'planet_06', 'planet_08'],
  'fruit_soda': ['fruit_01', 'fruit_10', 'fruit_03', 'fruit_08'],
};

// 預設選中的物件（Demo 用）
const SELECTED_OBJECTS: Record<string, number> = {
  'planet_03': 1,
  'planet_04': 2,
  'fruit_01': 3,
};

export default function TemplateSelectorDemo() {
  const asmrObjects = ASMR_OBJECTS_GROUPED;
  const categories = Object.keys(asmrObjects).filter(cat => DISPLAY_OBJECTS[cat]);

  // 過濾要顯示的物件
  const getFilteredObjects = (categoryId: string): AsmrObject[] => {
    const allowedIds = DISPLAY_OBJECTS[categoryId] || [];
    const allObjects = Object.values(asmrObjects).flat();
    return allObjects
      .filter(obj => allowedIds.includes(obj.id))
      .sort((a, b) => allowedIds.indexOf(a.id) - allowedIds.indexOf(b.id));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-purple-300 flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        Select objects for your video segments:
      </p>

      {categories.map((categoryId) => {
        const objects = getFilteredObjects(categoryId);
        const categoryLabel = CATEGORY_LABELS[categoryId] || categoryId;

        return (
          <div key={categoryId} className="space-y-2">
            <p className="text-xs font-semibold text-purple-400">{categoryLabel}</p>
            <div className="grid grid-cols-4 gap-2">
              {objects.map((obj) => {
                const selectedIndex = SELECTED_OBJECTS[obj.id];
                const isSelected = selectedIndex !== undefined;

                return (
                  <div
                    key={obj.id}
                    className={`
                      relative aspect-[9/16] rounded-lg overflow-hidden
                      border-2 transition-all cursor-pointer
                      ${isSelected
                        ? 'border-green-500 ring-2 ring-green-500/50'
                        : 'border-purple-600/30 hover:border-purple-400'
                      }
                    `}
                  >
                    {/* Thumbnail Video */}
                    <video
                      src={obj.thumbnailUrl}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />

                    {/* Selection Badge */}
                    {isSelected && (
                      <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                        {selectedIndex}
                      </div>
                    )}

                    {/* Object Label */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-1 py-1">
                      <p className="text-[10px] text-white truncate text-center">
                        {obj.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Selection Counter */}
      <div className="flex items-center justify-between pt-2 border-t border-purple-600/20">
        <Badge variant="outline" className="bg-purple-900/20 border-purple-600/30 text-purple-300">
          3 segments selected
        </Badge>
        <span className="text-xs text-green-400">✓ Ready to generate</span>
      </div>
    </div>
  );
}
