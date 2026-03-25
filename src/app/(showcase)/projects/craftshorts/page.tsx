import type { Metadata } from 'next';
import Link from 'next/link';
import YouTubeDemo from '@/components/showcase/YouTubeDemo';
import VideoShowcase from '@/components/showcase/VideoShowcase';
import TechArchitecture from '@/components/showcase/TechArchitecture';
import { projectMetrics } from './data';

export const metadata: Metadata = {
  title: 'CraftShorts.ai | Project Showcase - AugustSnow',
  description:
    'AI video generation SaaS built with Next.js, Node.js, Redis + BullMQ, and GCP Cloud Run. A solo-built full-stack project showcasing distributed systems and AI orchestration.',
};

export default function CraftShortsShowcase() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-purple-600/30 bg-black/90 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link
            href="/"
            className="text-sm text-purple-300 hover:text-purple-100 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Blog
          </Link>
          <span className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
            CraftShorts.ai
          </span>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-6 text-center">
            {/* Badge */}
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/50 text-purple-200 px-4 py-2 text-sm font-semibold rounded-full">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L15.708 8.292L24 12L15.708 15.708L12 24L8.292 15.708L0 12L8.292 8.292L12 0Z" />
                </svg>
                Solo-Built AI SaaS
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-100">
              <span className="block mb-2 md:mb-3">CraftShorts.ai</span>
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                AI Video Generation Platform
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-purple-300 max-w-2xl mx-auto">
              A full-stack SaaS I designed, built, and deployed independently.
              Distributed task queues, multi-provider AI orchestration, and 99%+
              video generation reliability.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a
                href="https://craftshorts.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-lg px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full font-medium transition-all"
              >
                Visit Live Site
                <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
              <a
                href="#architecture"
                className="inline-flex items-center text-lg px-8 py-3 border border-purple-500/50 text-purple-200 hover:bg-purple-500/10 rounded-full font-medium transition-all"
              >
                View Architecture
              </a>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8">
              {projectMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-purple-600/30 bg-purple-900/10 px-4 py-3"
                >
                  <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                    {metric.value}
                  </div>
                  <div className="text-xs text-purple-400 mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Demo Video */}
      <YouTubeDemo videoId="AsjwFHGIlrE" />

      {/* Video Showcase */}
      <VideoShowcase />

      {/* Technical Architecture */}
      <div id="architecture">
        <TechArchitecture />
      </div>

      {/* Project Links (Final CTA) */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-purple-900/50 to-pink-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-100">
            Interested in This Project?
          </h2>
          <p className="text-xl mb-8 text-purple-300 max-w-2xl mx-auto">
            Check out the live product or get in touch to learn more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="https://craftshorts.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-lg px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full font-medium shadow-lg shadow-purple-500/30 transition-all"
            >
              Visit Live Site
              <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center text-lg px-8 py-3 border border-purple-500/50 text-purple-200 hover:bg-purple-500/10 rounded-full font-medium transition-all"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-purple-600/30 bg-black">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-sm text-purple-400 hover:text-purple-200 transition-colors">
            ← Back to AugustSnow Blog
          </Link>
          <p className="text-sm text-purple-600">
            &copy; {new Date().getFullYear()} Angus Chang. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
