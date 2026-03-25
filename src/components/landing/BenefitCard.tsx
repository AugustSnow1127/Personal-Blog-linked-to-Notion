/**
 * Epic 14: Benefit Card Component
 * 顯示單個優勢的卡片元件
 */
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <Card className="text-center bg-black/90 backdrop-blur-lg border-purple-600/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
      <CardHeader>
        <div className="text-4xl mb-4">{icon}</div>
        <CardTitle className="text-purple-200">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-purple-400 text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
