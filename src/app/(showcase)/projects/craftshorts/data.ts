// Static data for CraftShorts.ai portfolio showcase

export interface ShowcaseVideo {
  id: string;
  videoUrl: string;
  category: string;
}

// TODO: Replace with actual video file paths after copying to public/showcase-videos/
export const showcaseVideos: ShowcaseVideo[] = [
  { id: '1', videoUrl: '/showcase-videos/video-1.mp4', category: 'ASMR Slicing' },
  { id: '2', videoUrl: '/showcase-videos/video-2.mp4', category: 'Satisfying' },
  { id: '3', videoUrl: '/showcase-videos/video-3.mp4', category: 'ASMR Soap' },
  { id: '4', videoUrl: '/showcase-videos/video-4.mp4', category: 'Fruit Soda' },
  { id: '5', videoUrl: '/showcase-videos/video-5.mp4', category: 'Planetary' },
  { id: '6', videoUrl: '/showcase-videos/video-6.mp4', category: 'Kinetic Sand' },
];

export const projectMetrics = [
  { label: 'Video Success Rate', value: '99%+' },
  { label: 'Deploy Time Reduction', value: '70%' },
  { label: 'AI Providers Integrated', value: '3' },
  { label: 'Built Solo', value: '1 Engineer' },
];

export const techStack = {
  frontend: {
    icon: '🎨',
    name: 'Frontend',
    description: 'Modern React app with server-side rendering and real-time updates.',
    items: ['Next.js 15 + React 19', 'Tailwind CSS + shadcn/ui', 'Socket.IO for real-time status', 'Stripe payment integration'],
  },
  backend: {
    icon: '⚙️',
    name: 'Backend',
    description: 'Distributed task queue system orchestrating multiple AI providers.',
    items: ['Node.js + Express', 'Redis + BullMQ job queue', 'Prisma ORM + PostgreSQL', 'OpenAI TTS + Google Veo 3'],
  },
  infrastructure: {
    icon: '☁️',
    name: 'Infrastructure',
    description: 'Fully containerized deployment with CI/CD automation.',
    items: ['GCP Cloud Run (auto-scaling)', 'Docker multi-stage builds', 'GitLab CI/CD pipelines', 'Supabase (auth + storage)'],
  },
};
