/**
 * Epic 14: Process Step Component
 * 顯示工作流程中的單個步驟
 */
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { ReactNode } from 'react';

interface ProcessStepProps {
  number: number;
  icon: string;
  title: string;
  description: string;
  visual?: ReactNode;
  features?: string[];
}

export default function ProcessStep({
  number,
  icon,
  title,
  description,
  visual,
  features
}: ProcessStepProps) {
  return (
    <div className="relative">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side: Info */}
        <div className={number % 2 === 0 ? 'md:order-2' : ''}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">{number}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">{icon}</span>
                <h3 className="text-2xl font-bold text-purple-100">{title}</h3>
              </div>
              <p className="text-purple-300 mb-4">{description}</p>

              {/* Features List */}
              {features && features.length > 0 && (
                <div className="space-y-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-sm text-purple-300">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Visual */}
        <div className={number % 2 === 0 ? 'md:order-1' : ''}>
          {visual && (
            <Card className="bg-black/60 backdrop-blur-lg border-purple-600/30">
              <CardContent className="p-6">
                {visual}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Connecting Line (not for last step) */}
      <div className="hidden md:flex justify-center my-8">
        <div className="w-1 h-16 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
      </div>
    </div>
  );
}
