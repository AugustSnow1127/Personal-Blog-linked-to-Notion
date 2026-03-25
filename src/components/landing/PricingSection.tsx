/**
 * Pricing Section (Enhanced Version)
 * 展示四個付費方案：Starter, Growth, Influencer, Ultra
 * 支持 Monthly/Yearly 切換
 * Static version - no auth/router needed
 */
'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import PricingCard from './PricingCard';
import { PAID_PLANS, getPrice, YEARLY_SAVINGS_PERCENTAGE } from '@/app/(showcase)/projects/craftshorts/static-data';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handlePlanClick = () => {
    window.open('https://craftshorts.ai/pricing', '_blank');
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-black to-purple-900/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-purple-100">
          Start Creating Faceless Videos Today
        </h2>
        <p className="text-center text-purple-300 mb-8 max-w-2xl mx-auto">
          Choose the plan that fits your content creation goals. All plans include full faceless video features.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-black/50 backdrop-blur-lg border border-purple-600/30 rounded-xl p-1 inline-flex relative">
            {/* Sliding Background Indicator */}
            <div
              className={'absolute top-1 bottom-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg transition-transform duration-300 ease-in-out ' +
                (billingCycle === 'monthly'
                  ? 'left-1 w-[calc(50%-2px)]'
                  : 'left-1/2 w-[calc(50%-2px)]')}
            />

            <button
              onClick={() => setBillingCycle('monthly')}
              className={'px-6 py-3 rounded-lg font-medium transition-colors duration-300 relative z-10 ' +
                (billingCycle === 'monthly'
                  ? 'text-white'
                  : 'text-purple-300 hover:text-purple-100'
                )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={'px-6 py-3 rounded-lg font-medium transition-colors duration-300 relative z-10 ' +
                (billingCycle === 'yearly'
                  ? 'text-white'
                  : 'text-purple-300 hover:text-purple-100'
                )}
            >
              Yearly
              <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 border-none">
                {YEARLY_SAVINGS_PERCENTAGE}% OFF!
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid - 4 Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {PAID_PLANS.map((plan) => {
            const currentPrice = getPrice(plan, billingCycle);
            const originalPrice = billingCycle === 'yearly' ? plan.monthlyPrice : undefined;

            return (
              <PricingCard
                key={plan.name}
                name={plan.name}
                icon={plan.icon}
                credits={plan.credits}
                price={currentPrice}
                originalPrice={originalPrice}
                billingCycle={billingCycle}
                uploadQuota={plan.uploadQuota}
                features={plan.features}
                popular={plan.highlighted}
                cta="Get Started"
                onCtaClick={handlePlanClick}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
