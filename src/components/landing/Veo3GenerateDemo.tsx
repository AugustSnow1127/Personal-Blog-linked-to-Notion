/**
 * Epic 14: Veo3 Generate Demo Component
 * Landing page 用的一鍵生成演示 - Veo3 流程
 */
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Music, Zap, Clock } from 'lucide-react';

export default function Veo3GenerateDemo() {
  return (
    <div className="space-y-4">
      {/* Veo 3 Badge */}
      <div className="flex items-center gap-2">
        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
          <Sparkles className="w-3 h-3 mr-1" />
          Veo 3 AI
        </Badge>
        <span className="text-xs text-purple-400">Powered by Google</span>
      </div>

      {/* Segment Slider Demo */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-purple-300 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Video Segments
          </span>
          <span className="text-lg font-bold text-purple-100">3</span>
        </div>
        <div className="h-2 bg-purple-900/30 rounded-full overflow-hidden border border-purple-600/30">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
            style={{ width: '60%' }}
          />
        </div>
        <div className="flex justify-between text-xs text-purple-400/60">
          <span>1</span>
          <span>2</span>
          <span className="text-purple-300 font-semibold">3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>

      {/* BGM Selection Demo */}
      <div className="space-y-2">
        <span className="text-sm text-purple-300 flex items-center gap-2">
          <Music className="w-4 h-4" />
          Background Music
        </span>
        <div className="flex gap-2">
          <Badge
            variant="outline"
            className="bg-purple-900/20 border-purple-600/30 text-purple-300 cursor-pointer"
          >
            None
          </Badge>
          <Badge
            variant="outline"
            className="bg-purple-500/30 border-purple-400 text-purple-100 cursor-pointer"
          >
            ♪ Ambient
          </Badge>
          <Badge
            variant="outline"
            className="bg-purple-900/20 border-purple-600/30 text-purple-300 cursor-pointer"
          >
            ♪ Chill
          </Badge>
        </div>
      </div>

      {/* Cost Estimate */}
      <div className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg border border-purple-600/30">
        <div>
          <span className="text-xs text-purple-400">Estimated Cost</span>
          <p className="text-lg font-bold text-green-400">150 Credits</p>
        </div>
        <div>
          <span className="text-xs text-purple-400">Duration</span>
          <p className="text-lg font-bold text-blue-400">24s</p>
        </div>
      </div>

      {/* Generate Button */}
      <Button
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        disabled
      >
        <Zap className="w-4 h-4 mr-2" />
        Generate Video
      </Button>

      <p className="text-xs text-center text-purple-400">
        Click and let AI create your video automatically
      </p>
    </div>
  );
}
