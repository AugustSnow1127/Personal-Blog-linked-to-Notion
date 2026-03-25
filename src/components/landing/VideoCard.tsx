/**
 * Epic 14: Video Card Component
 * 展示單個範例影片的卡片元件 - 走馬燈版本（自動播放）
 * 支援懶載入 (Intersection Observer) 優化首頁載入速度
 */
'use client';

import { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

interface VideoCardProps {
  videoUrl: string;
  category: string;
  aspectRatio?: '9:16' | '16:9' | '1:1';
  priority?: boolean; // 優先載入標記，true = 立即載入，false = 懶載入
  fullWidth?: boolean; // 手機版自適應寬度
}

// 根據影片 URL 生成固定的播放次數（每次渲染都相同）
function getFixedViewCount(url: string): string {
  // 使用 URL 的 hash 來決定播放次數（10K - 99K）
  const hash = url.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const count = (hash % 90) + 10; // 10-99
  const decimal = (hash % 10);
  return count + '.' + decimal + 'K';
}

export default function VideoCard({
  videoUrl,
  category,
  aspectRatio = '9:16',
  priority = false,
  fullWidth = false
}: VideoCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);

  // Intersection Observer 懶載入
  useEffect(() => {
    if (priority || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // 提前 200px 開始載入
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, shouldLoad]);

  const aspectRatioClass = {
    '9:16': 'aspect-[9/16]',
    '16:9': 'aspect-video',
    '1:1': 'aspect-square'
  }[aspectRatio];

  return (
    <div ref={containerRef} className={'flex-shrink-0 ' + (fullWidth ? 'w-full' : 'w-[280px] md:w-[320px]')}>
      <div className="bg-black/90 backdrop-blur-lg border border-purple-600/30 rounded-lg overflow-hidden shadow-lg shadow-purple-500/10">
        {/* Video Preview - Auto Play */}
        <div className={'relative bg-black overflow-hidden ' + aspectRatioClass}>
          {shouldLoad ? (
            <video
              src={videoUrl}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload={priority ? 'auto' : 'metadata'}
              onLoadedData={() => setIsLoaded(true)}
            />
          ) : (
            // 佔位符 - 影片尚未載入
            <div className="w-full h-full bg-purple-900/30 animate-pulse" />
          )}

          {/* 載入中的 loading 指示器 */}
          {shouldLoad && !isLoaded && (
            <div className="absolute inset-0 bg-purple-900/30 animate-pulse" />
          )}

          {/* Play Count Overlay - 左下角 */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <Play className="w-5 h-5 text-white fill-white" />
            <span className="text-white text-lg font-bold drop-shadow-lg">
              {getFixedViewCount(videoUrl)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
