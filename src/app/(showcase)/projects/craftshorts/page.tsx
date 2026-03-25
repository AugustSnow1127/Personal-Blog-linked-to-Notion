"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import TrustBadges from "@/components/landing/TrustBadges";
import { CreatorAvatars } from "@/components/landing/CreatorAvatars";
import VideoShowcase from "@/components/landing/VideoShowcase";
import YouTubeEmbed from "@/components/landing/YouTubeEmbed";
import HowItWorks from "@/components/landing/HowItWorks";
import PricingSection from "@/components/landing/PricingSection";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import LandingFooter from "@/components/landing/LandingFooter";
import { MobileMenu } from "@/components/landing/MobileMenu";

const SITE = 'https://craftshorts.ai';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Topbar */}
      <nav className="sticky top-0 z-50 border-b border-purple-600/30 bg-black/90 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center px-4">
          {/* Left: Logo */}
          <div className="flex-1">
            <a href={SITE} target="_blank" rel="noopener noreferrer" className="flex items-center w-fit">
              <Image
                src="/logo.svg"
                alt="CraftShorts Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                CraftShorts.ai
              </span>
            </a>
          </div>

          {/* Right: Navigation + Auth buttons */}
          <div className="flex-1 flex justify-end">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              {/* Blog 連結 */}
              <a
                href={SITE + '/blog'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-purple-100 font-medium transition-colors"
              >
                Blog
              </a>

              {/* Pricing 按鈕 */}
              <div className="relative ml-4">
                <a
                  href={SITE + '/pricing'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:text-purple-100 font-medium transition-colors"
                >
                  Pricing
                </a>
              </div>

              {/* 分隔線 */}
              <div className="h-6 w-px bg-purple-600/30"></div>

              {/* Login 按鈕 */}
              <a href={SITE + '/login'} target="_blank" rel="noopener noreferrer">
                <Button variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">Login</Button>
              </a>
            </div>

            {/* Mobile Menu */}
            <MobileMenu />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto max-w-4xl">
          {/* 置中對齊的文字內容 */}
          <div className="space-y-6 px-2 sm:px-0 text-center">
            {/* Powered by Veo-3 Badge */}
            <div className="flex justify-center">
              <Badge className="
                inline-flex items-center gap-2
                bg-gradient-to-r from-purple-500/20 to-pink-500/20
                border border-purple-400/50
                text-purple-200
                px-4 py-2
                text-sm font-semibold
                rounded-full
              ">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L15.708 8.292L24 12L15.708 15.708L12 24L8.292 15.708L0 12L8.292 8.292L12 0Z"/>
                </svg>
                Powered by Veo-3
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-100">
              <span className="block mb-2 md:mb-3">Grow your social media with</span>
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">faceless AI video</span>
            </h1>
            <p className="text-lg md:text-xl text-purple-300">
              Create viral AI faceless videos in seconds. 1000+ templates to automate your entire content workflow.
            </p>
            <div className="flex flex-col gap-4 items-center">
              <a href={SITE + '/dashboard'} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full">
                  Get Started
                </Button>
              </a>

              {/* Creator Social Proof */}
              <CreatorAvatars />

              {/* Trust Badges */}
              <TrustBadges />
            </div>
          </div>
        </div>
      </section>

      {/* Product Demo Video */}
      <YouTubeEmbed videoId="AsjwFHGIlrE" />

      {/* Video Showcase */}
      <VideoShowcase />

      {/* How It Works */}
      <HowItWorks />

      {/* Pricing Section */}
      <PricingSection />

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA */}
      <FinalCTA />

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
