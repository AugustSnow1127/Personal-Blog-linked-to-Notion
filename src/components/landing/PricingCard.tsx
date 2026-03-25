/**
 * Epic 14: Pricing Card Component (Enhanced Version)
 * 顯示單個定價方案卡片 - 完整功能版本
 */
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';

interface PricingCardProps {
  name: string;
  icon: string;
  credits: number;
  price: number;
  originalPrice?: number; // Monthly price for showing strikethrough when yearly
  billingCycle: 'monthly' | 'yearly';
  uploadQuota: number; // -1 for unlimited
  features: {
    voiceovers: boolean;
    aiGeneratedContent: boolean;
    noWatermark: boolean;
    autoPublish: boolean;
    veo3ASMR: boolean;
    royaltyFreeBgm: boolean;
  };
  popular?: boolean;
  cta: string;
  onCtaClick: () => void;
}

export default function PricingCard({
  name,
  icon,
  credits,
  price,
  originalPrice,
  billingCycle,
  uploadQuota,
  features,
  popular = false,
  cta,
  onCtaClick
}: PricingCardProps) {
  return (
    <Card
      className={'relative bg-black/90 backdrop-blur-lg border-purple-600/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 ' +
        (popular ? 'scale-105 border-2 border-purple-500/50 shadow-xl shadow-purple-500/30' : '')}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 border-none">
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pt-8">
        <div className="text-4xl mb-3">{icon}</div>
        <CardTitle className="text-purple-200 text-2xl mb-4">{name}</CardTitle>

        {/* Price Display */}
        <div className="space-y-1">
          <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
            ${price}
          </div>
          <div className="text-sm text-purple-400">
            per {billingCycle === 'monthly' ? 'month' : 'year'}
          </div>
          {billingCycle === 'yearly' && originalPrice && (
            <div className="text-xs text-purple-500 line-through">
              ${originalPrice}/month
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6 px-6 pb-6">
        {/* Credits */}
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-200">
            {credits.toLocaleString()}
          </div>
          <div className="text-sm text-purple-400">credits/month</div>
          {credits > 0 && (
            <div className="text-xs text-purple-400 mt-1">
              {Math.floor(credits / 10)} videos per month
            </div>
          )}
        </div>

        {/* Features List */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            {features.voiceovers ? (
              <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
            ) : (
              <X className="w-4 h-4 text-red-400 flex-shrink-0" />
            )}
            <span className={'transition-colors ' + (features.voiceovers ? 'text-purple-200' : 'text-purple-500')}>
              Professional voiceovers
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            {features.aiGeneratedContent ? (
              <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
            ) : (
              <X className="w-4 h-4 text-red-400 flex-shrink-0" />
            )}
            <span className={'transition-colors ' + (features.aiGeneratedContent ? 'text-purple-200' : 'text-purple-500')}>
              AI generated content
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            {features.noWatermark ? (
              <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
            ) : (
              <X className="w-4 h-4 text-red-400 flex-shrink-0" />
            )}
            <span className={'transition-colors ' + (features.noWatermark ? 'text-purple-200' : 'text-purple-500')}>
              No watermark
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            {features.autoPublish ? (
              <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
            ) : (
              <X className="w-4 h-4 text-red-400 flex-shrink-0" />
            )}
            <span className={'transition-colors leading-tight ' + (features.autoPublish ? 'text-purple-200' : 'text-purple-500')}>
              Auto-publish on TikTok & YouTube
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            {features.veo3ASMR ? (
              <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
            ) : (
              <X className="w-4 h-4 text-red-400 flex-shrink-0" />
            )}
            <span className={'transition-colors leading-tight ' + (features.veo3ASMR ? 'text-purple-200' : 'text-purple-500')}>
              Veo 3 AI ASMR videos
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            {features.royaltyFreeBgm ? (
              <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
            ) : (
              <X className="w-4 h-4 text-red-400 flex-shrink-0" />
            )}
            <span className={'transition-colors ' + (features.royaltyFreeBgm ? 'text-purple-200' : 'text-purple-500')}>
              Royalty-free BGM
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={onCtaClick}
          className={'w-full mt-4 ' +
            (popular
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30'
              : 'bg-purple-900/30 hover:bg-purple-800/40 text-purple-200 border border-purple-600/30'
            )}
          size="lg"
        >
          {cta}
        </Button>
      </CardContent>
    </Card>
  );
}
