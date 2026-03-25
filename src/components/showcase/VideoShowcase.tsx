'use client';

import { showcaseVideos, type ShowcaseVideo } from '@/app/(showcase)/projects/craftshorts/data';

function VideoCard({ videoUrl, category }: { videoUrl: string; category: string; fullWidth?: boolean }) {
  return (
    <div className="relative flex-shrink-0 w-48 md:w-56 rounded-xl overflow-hidden border border-purple-600/30 bg-purple-900/10">
      <div className="aspect-[9/16]">
        <video
          src={videoUrl}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          autoPlay
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
        <span className="text-xs text-purple-200 font-medium">{category}</span>
      </div>
    </div>
  );
}

export default function VideoShowcase() {
  const videos = showcaseVideos;

  if (videos.length === 0) return null;

  // Duplicate for seamless loop
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

      {/* Mobile: 2-column grid */}
      <div className="md:hidden container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              videoUrl={video.videoUrl}
              category={video.category}
              fullWidth
            />
          ))}
        </div>
      </div>

      {/* Desktop: auto-scrolling carousel */}
      <div className="hidden md:block w-full max-w-[60vw] mx-auto">
        <div className="relative overflow-x-hidden fade-edges-showcase">
          <style jsx>{`
            @keyframes scroll-showcase {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll-showcase {
              animation: scroll-showcase 90s linear infinite;
              will-change: transform;
            }
            .animate-scroll-showcase:hover {
              animation-play-state: paused;
            }
            .fade-edges-showcase::before,
            .fade-edges-showcase::after {
              content: '';
              position: absolute;
              top: 0;
              bottom: 0;
              width: 120px;
              z-index: 10;
              pointer-events: none;
            }
            .fade-edges-showcase::before {
              left: 0;
              background: linear-gradient(to right, rgb(0, 0, 0), transparent);
            }
            .fade-edges-showcase::after {
              right: 0;
              background: linear-gradient(to left, rgb(0, 0, 0), transparent);
            }
          `}</style>

          <div className="inline-flex gap-6 animate-scroll-showcase">
            {duplicatedVideos.map((video, index) => (
              <VideoCard
                key={video.id + '-' + index}
                videoUrl={video.videoUrl}
                category={video.category}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
