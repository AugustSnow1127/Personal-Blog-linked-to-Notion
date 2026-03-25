/**
 * Epic 14: Stats Grid Component
 * 顯示統計數據網格
 */
'use client';

interface Stat {
  value: string;
  label: string;
}

interface StatsGridProps {
  stats: Stat[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-600/30 backdrop-blur-sm"
        >
          <div className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
            {stat.value}
          </div>
          <div className="text-sm text-purple-300">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
