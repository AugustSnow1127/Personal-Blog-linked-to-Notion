/**
 * Hero Section 撲克牌式影片卡片組件
 * 展示首頁展示影片 (sortOrder 0-2)
 * Uses static data instead of API
 */
'use client';

import { Play } from 'lucide-react';
import { SHOWCASE_VIDEOS } from '@/app/(showcase)/projects/craftshorts/static-data';

// 根據影片 URL 生成固定的播放次數（每次渲染都相同）
function getFixedViewCount(url: string): string {
  const hash = url.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const count = (hash % 90) + 10; // 10-99
  const decimal = (hash % 10);
  return count + '.' + decimal + 'K';
}

export default function HeroVideoCards() {
  // 取前 3 個 (sortOrder 0, 1, 2) 作為 Hero 影片
  const videos = SHOWCASE_VIDEOS.slice(0, 3);

  if (videos.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      {/* 撲克牌堆疊效果：響應式顯示 */}
      <div className="relative h-[300px] md:h-[500px] w-full flex items-center justify-center">
        {videos.map((video, index) => {
          const mobileTransforms = [
            'rotate-[-4deg] translate-x-[-60px] translate-y-[4px]',
            'rotate-[1deg] translate-x-[0px] translate-y-[-4px]',
            'rotate-[5deg] translate-x-[60px] translate-y-[4px]',
          ];

          const desktopTransforms = [
            'md:rotate-[-8deg] md:translate-x-[-30px] md:translate-y-[10px]',
            'md:rotate-[2deg] md:translate-x-[100px] md:translate-y-[-10px]',
            'md:rotate-[10deg] md:translate-x-[200px] md:translate-y-[10px]',
          ];

          const zIndexes = ['z-[3]', 'z-[2]', 'z-[1]'];

          return (
            <div
              key={video.id}
              className={'absolute transition-all duration-300 hover:scale-105 hover:z-[10] ' + mobileTransforms[index] + ' ' + desktopTransforms[index] + ' ' + zIndexes[index]}
            >
              <div className="w-[160px] md:w-[280px] bg-black/90 backdrop-blur-lg border border-purple-600/30 rounded-lg overflow-hidden shadow-2xl shadow-purple-500/20">
                {/* Video */}
                <div className="relative aspect-[9/16] bg-black overflow-hidden">
                  <video
                    src={video.videoUrl}
                    className="w-full h-full object-cover"
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="auto"
                  />

                  {/* Play Count Overlay */}
                  <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 flex items-center gap-1 md:gap-2">
                    <Play className="w-4 h-4 md:w-5 md:h-5 text-white fill-white" />
                    <span className="text-white text-sm md:text-lg font-bold drop-shadow-lg">
                      {getFixedViewCount(video.videoUrl)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
