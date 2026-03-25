/**
 * Epic 14: Trust Badges Component
 * 顯示核心價值主張的信任徽章
 */
'use client';

const badges: Array<{
  icon: any;
  text: string;
  color: string;
}> = [];

export default function TrustBadges() {
  return (
    <div className="flex flex-wrap justify-start gap-4 md:gap-2 my-4">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/20 border border-purple-600/30 backdrop-blur-sm"
        >
          <badge.icon className={'w-4 h-4 ' + badge.color} />
          <span className="text-sm text-purple-100">{badge.text}</span>
        </div>
      ))}
    </div>
  );
}
