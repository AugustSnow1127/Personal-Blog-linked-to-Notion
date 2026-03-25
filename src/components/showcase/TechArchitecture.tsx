import { techStack } from '@/app/(showcase)/projects/craftshorts/data';

export default function TechArchitecture() {
  const pillars = [techStack.frontend, techStack.backend, techStack.infrastructure];

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-purple-100">
          Technical Architecture
        </h2>
        <p className="text-center text-purple-300 mb-16 max-w-2xl mx-auto">
          How CraftShorts.ai works under the hood.
        </p>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.name}
              className="rounded-2xl border border-purple-600/30 bg-purple-900/10 p-6 hover:border-purple-500/50 transition-colors"
            >
              {/* Number + Icon */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <span className="text-2xl">{pillar.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-purple-100 mb-2">{pillar.name}</h3>

              {/* Description */}
              <p className="text-purple-300 text-sm mb-4">{pillar.description}</p>

              {/* Tech items */}
              <ul className="space-y-2">
                {pillar.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-purple-200">
                    <svg className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
