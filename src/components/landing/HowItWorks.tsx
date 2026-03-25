/**
 * Epic 14: How It Works Section
 * 展示 Veo3 的 3 步驟工作流程
 */
'use client';

import ProcessStep from './ProcessStep';
import TemplateSelectorDemo from './TemplateSelectorDemo';
import Veo3GenerateDemo from './Veo3GenerateDemo';
import PlatformIcons from './PlatformIcons';

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-purple-100">
          Create AI Videos in 3 Simple Steps
        </h2>
        <p className="text-center text-purple-300 mb-16 max-w-2xl mx-auto">
          From template to viral video in minutes - powered by Veo 3 AI.
        </p>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Step 1: Choose Your Template */}
          <ProcessStep
            number={1}
            icon="🎬"
            title="Choose Your Template"
            description="Browse our collection of ready-to-use ASMR video templates. Pick your favorite objects, set segment count, and customize in seconds."
            visual={<TemplateSelectorDemo />}
            features={[
              'Pre-designed ASMR templates (Planetary, Fruit Soda, etc.)',
              'Multiple slicing objects to choose from',
              'Flexible segment count (1-5 segments, 8s each)'
            ]}
          />

          {/* Step 2: One-Click Generate */}
          <ProcessStep
            number={2}
            icon="✨"
            title="One-Click Generate"
            description="Hit generate and let Veo 3 AI do the magic. Our cutting-edge AI produces stunning cinematic video segments automatically."
            visual={<Veo3GenerateDemo />}
            features={[
              'Powered by Google Veo 3 AI',
              '8 seconds per segment, up to 40 seconds total',
              'Optional background music selection'
            ]}
          />

          {/* Step 3: Publish to Social Media */}
          <ProcessStep
            number={3}
            icon="🚀"
            title="Publish to Social Media"
            description="Download your HD video or upload directly to TikTok and YouTube. Your AI video is ready to go viral!"
            visual={<PlatformIcons />}
            features={[
              'Direct upload to TikTok & YouTube',
              'HD quality export with no watermark (paid plans)',
              'Ready in seconds'
            ]}
          />
        </div>
      </div>
    </section>
  );
}
