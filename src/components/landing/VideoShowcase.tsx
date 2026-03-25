/**
 * Video Showcase Section
 * 展示首頁展示影片 - 走馬燈效果
 * Uses static data instead of API
 */
'use client';

import VideoCard from './VideoCard';
import { SHOWCASE_VIDEOS } from '@/app/(showcase)/projects/craftshorts/static-data';

export default function VideoShowcase() {
  // 取 sortOrder 3-8 的影片用於 Showcase（跳過前 3 個給 Hero）
  const videos = SHOWCASE_VIDEOS.slice(3, 9);

  if (videos.length === 0) {
    return null;
  }

  // 複製影片列表兩次以實現無縫循環
  const duplicatedVideos = [...videos, ...videos];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-black to-purple-900/5 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-purple-100">
          See What You Can Create
        </h2>
        <p className="text-center text-purple-300 max-w-2xl mx-auto">
          Explore videos across different niches - each one crafted by AI in minutes.
        </p>
      </div>

      {/* 手機版：2 欄網格佈局 */}
      <div className="md:hidden container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              videoUrl={video.videoUrl}
              category={video.category}
              aspectRatio="9:16"
              fullWidth={true}
            />
          ))}
        </div>
      </div>

      {/* 桌面版：水平自動滾動 Carousel - 60% 寬度 */}
      <div className="hidden md:block w-full max-w-[60vw] mx-auto">
        <div className="relative overflow-x-hidden fade-edges">
          <style jsx>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-scroll {
              animation: scroll 90s linear infinite;
              will-change: transform;
            }
            .animate-scroll:hover {
              animation-play-state: paused;
            }

            /* 桌面版：顯示黑色漸層淡出效果 */
            .fade-edges::before,
            .fade-edges::after {
              content: '';
              position: absolute;
              top: 0;
              bottom: 0;
              width: 120px;
              z-index: 10;
              pointer-events: none;
            }
            .fade-edges::before {
              left: 0;
              background: linear-gradient(to right, rgb(0, 0, 0), transparent);
            }
            .fade-edges::after {
              right: 0;
              background: linear-gradient(to left, rgb(0, 0, 0), transparent);
            }
          `}</style>

          {/* Scrolling Videos - 使用 inline-flex 確保寬度是內容寬度 */}
          <div className="inline-flex gap-6 animate-scroll">
            {duplicatedVideos.map((video, index) => (
              <VideoCard
                key={video.id + '-' + index}
                videoUrl={video.videoUrl}
                category={video.category}
                aspectRatio="9:16"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
