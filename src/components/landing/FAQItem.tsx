/**
 * Epic 14: FAQ Item Component
 * 單個常見問題項目（使用 shadcn/ui Accordion）
 */
'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQItemProps {
  question: string;
  answer: string;
  value: string;
}

export default function FAQItem({ question, answer, value }: FAQItemProps) {
  return (
    <AccordionItem
      value={value}
      className="bg-black/60 backdrop-blur-lg border border-purple-600/30 rounded-lg px-6 mb-3"
    >
      <AccordionTrigger className="text-purple-100 hover:text-purple-200 text-left py-4">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-purple-300 pb-4">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
}
