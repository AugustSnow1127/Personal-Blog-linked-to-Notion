/**
 * Epic 14: FAQ Section
 * 常見問題區塊（Faceless Video 相關）
 */
'use client';

import { Accordion } from '@/components/ui/accordion';
import FAQItem from './FAQItem';

const faqs = [
  {
    question: 'What is a faceless video?',
    answer: 'A faceless video is content created without showing the creator on camera. We use AI-generated images and professional voiceovers to create engaging videos while keeping you completely anonymous. Perfect for creators who want privacy or don\'t want to be on camera.'
  },
  {
    question: 'Do I need any video editing skills?',
    answer: 'No! Our AI handles everything - from generating visuals to syncing voice and subtitles. Just describe your idea in text, choose your preferred style and voice, and our AI creates a professional video in under 2 minutes. Zero editing experience required.'
  },
  {
    question: 'Can I monetize faceless videos?',
    answer: 'Absolutely! Many creators build successful monetized channels with faceless content on YouTube and TikTok. Our videos meet all platform requirements for monetization. You own the content you create and can monetize it however you choose.'
  },
  {
    question: 'What platforms are supported?',
    answer: 'We support TikTok (9:16 vertical) and YouTube (16:9 landscape and 9:16 Shorts). You can directly upload to TikTok and YouTube from our platform, or download videos for manual upload.'
  },
  {
    question: 'How long does it take to create a video?',
    answer: 'Most videos are ready in seconds! Our AI automatically generates visuals, voice narration, and subtitles. The exact time depends on video length and complexity, but you\'ll typically have your video ready quickly.'
  },
  {
    question: 'What makes CraftShorts different from other AI video tools?',
    answer: 'We specialize in faceless videos with premium AI-generated visuals, and professional voiceovers. Plus, we offer direct social media integration, multiple aspect ratios, and a focus on viral-ready content for creators who want to stay anonymous.'
  }
];

export default function FAQ() {
  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-purple-100">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-purple-300 mb-12 max-w-2xl mx-auto">
          Everything you need to know about creating faceless videos with CraftShorts.
        </p>

        <Accordion defaultValue={[]} className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              value={'item-' + index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </Accordion>
      </div>
    </section>
  );
}
