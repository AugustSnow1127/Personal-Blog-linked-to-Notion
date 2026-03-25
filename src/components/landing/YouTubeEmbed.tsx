'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface YouTubeEmbedProps {
  videoId: string;
}

export default function YouTubeEmbed({ videoId }: YouTubeEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const thumbnailUrl = 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg';
  const embedUrl = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1';

  return (
    <section className="py-12 md:py-16 bg-black">
      <div className="container mx-auto px-4">
        <div ref={containerRef} className="max-w-4xl mx-auto">
          <div
            className="relative aspect-video rounded-2xl overflow-hidden shadow-lg shadow-purple-500/30"
            style={{
              border: '8px solid transparent',
              background: 'linear-gradient(black, black) padding-box, linear-gradient(to right, #a855f7, #ec4899, #a855f7) border-box'
            }}
          >
            {!isPlaying ? (
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 w-full h-full group cursor-pointer"
                aria-label="Play video"
              >
                {isInView && (
                  <Image
                    src={thumbnailUrl}
                    alt="Video thumbnail"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 896px"
                    unoptimized
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/40 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
                  </div>
                </div>
              </button>
            ) : (
              <iframe
                src={embedUrl}
                title="CraftShorts Product Demo"
                className="absolute inset-0 w-full h-full scale-[1.02] origin-center"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
            {!isInView && !isPlaying && (
              <div className="absolute inset-0 bg-purple-900/30 animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
