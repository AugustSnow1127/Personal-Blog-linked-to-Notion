/**
 * Epic 14: Social Proof Section
 * 展示統計數據和社交證明
 */
'use client';

import StatsGrid from './StatsGrid';

const stats = [
  { value: '10,000+', label: 'Faceless Videos Created' },
  { value: '50+', label: 'Countries Using CraftShorts' },
  { value: '99%', label: 'Users Stay Anonymous' },
  { value: '2min', label: 'Average Generation Time' }
];

export default function SocialProof() {
  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-purple-100">
          Trusted by Creators Worldwide
        </h2>
        <p className="text-center text-purple-300 mb-12 max-w-2xl mx-auto">
          Join thousands of content creators building successful channels without ever showing their face.
        </p>

        {/* Stats Grid */}
        <StatsGrid stats={stats} />
      </div>
    </section>
  );
}
