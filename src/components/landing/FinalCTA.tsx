/**
 * Epic 14: Final CTA Component
 * 最終轉換 CTA 區塊
 */
'use client';

import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const trustSignals = [
  'No credit card required',
  '10 free credits',
  'Full privacy protection',
  'Cancel anytime'
];

export default function FinalCTA() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-purple-900/50 to-pink-900/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-100">
          Join 5,000+ Creators Making Faceless Videos
        </h2>
        <p className="text-xl mb-8 text-purple-300 max-w-2xl mx-auto">
          Start creating professional faceless videos today.
        </p>

        <a href="https://craftshorts.ai/dashboard" target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="text-lg px-8 py-6 mb-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30">
            Get Started
          </Button>
        </a>
      </div>
    </section>
  );
}
