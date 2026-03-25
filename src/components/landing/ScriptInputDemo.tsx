/**
 * Epic 14: Script Input Demo Component
 * Landing page 用的簡化腳本輸入演示
 */
'use client';

import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

const templates = [
  'Random Story',
  'Travel Destinations',
  'What If?',
  'Scary Stories',
  'Philosophy',
  'Technology'
];

export default function ScriptInputDemo() {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm text-purple-300 mb-2">Write your script or choose a template:</p>
        <Textarea
          placeholder="Describe your video idea here...

Example:
'Tell a story about AI discovering emotions for the first time...'"
          className="bg-purple-900/20 border-purple-600/30 text-purple-100 min-h-[120px] resize-none"
          disabled
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm text-purple-300 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Or pick from 12+ templates:
        </p>
        <div className="flex flex-wrap gap-2">
          {templates.map((template, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-purple-900/20 border-purple-600/30 text-purple-300 text-xs"
            >
              {template}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
