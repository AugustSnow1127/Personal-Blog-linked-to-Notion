/**
 * Platform Icons Component
 * 顯示支援的社交媒體平台圖示
 * Uses inline SVG instead of remote icons
 */
'use client';

import { Badge } from '@/components/ui/badge';

const platforms = [
  {
    name: 'TikTok',
    aspectRatio: '9:16',
    color: 'bg-black border-white/20 text-white',
  },
  {
    name: 'YouTube',
    aspectRatio: '16:9',
    color: 'bg-red-600/20 border-red-500/30 text-red-300',
  }
];

export default function PlatformIcons() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-purple-300 text-center mb-4">
        Ready for all major platforms
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {platforms.map((platform, index) => {
          return (
            <Badge
              key={index}
              className={'px-6 py-3 text-base flex items-center gap-2 ' + platform.color}
            >
              {platform.name === 'TikTok' ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.81.11v-3.5a6.37 6.37 0 00-.81-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.98a8.2 8.2 0 004.76 1.52V7.05a4.84 4.84 0 01-1-.36z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              )}
              <span className="font-semibold">{platform.name}</span>
            </Badge>
          );
        })}
      </div>
      <p className="text-xs text-purple-400 text-center mt-4">
        Direct upload to TikTok & YouTube • HD quality export • Multi-aspect ratio support
      </p>
    </div>
  );
}
