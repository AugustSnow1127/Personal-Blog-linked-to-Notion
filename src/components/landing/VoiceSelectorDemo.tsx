/**
 * Epic 14: Voice Selector Demo Component
 * Landing page 用的簡化語音選擇演示 - 使用真實 Dashboard 選項
 */
'use client';

import { Badge } from '@/components/ui/badge';
import { Volume2 } from 'lucide-react';

// 真實 Dashboard 的語音選項（與 AiVideoCreator 一致）
const voices = [
  { value: 'alloy', name: 'Alloy', tags: ['Neutral', 'Professional'] },
  { value: 'echo', name: 'Echo', tags: ['Male', 'Warm'] },
  { value: 'fable', name: 'Fable', tags: ['Female', 'Soft'] },
  { value: 'onyx', name: 'Onyx', tags: ['Male', 'Deep'] },
  { value: 'nova', name: 'Nova', tags: ['Female', 'Energetic'] },
  { value: 'shimmer', name: 'Shimmer', tags: ['Female', 'Elegant'] }
];

export default function VoiceSelectorDemo() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-purple-300 mb-2 flex items-center gap-2">
        <Volume2 className="w-4 h-4" />
        Select Professional Voice:
      </p>
      <div className="grid grid-cols-2 gap-2">
        {voices.map((voice) => (
          <Badge
            key={voice.value}
            variant="outline"
            className="flex-col items-start px-3 py-2 bg-pink-900/20 border-pink-600/30 text-pink-200 hover:bg-pink-800/30 cursor-pointer h-auto w-auto"
          >
            <span className="font-medium">{voice.name}</span>
            <div className="flex gap-1 mt-1">
              {voice.tags.map((tag, index) => (
                <span key={index} className="text-xs opacity-70 bg-pink-800/30 px-1.5 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </Badge>
        ))}
      </div>
    </div>
  );
}
