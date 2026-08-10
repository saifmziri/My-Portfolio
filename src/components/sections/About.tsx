import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Database, Wrench } from 'lucide-react';
import { personalInfo, engineeringPrinciples } from '../../data/portfolioData';
import { SpotlightCard } from '../ui/SpotlightCard';
import { useGsapContext } from '../../hooks/useGsapContext';
import gsap from 'gsap';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  useGsapContext(() => {
    if (!textRef.current) return;

    gsap.fromTo(
      textRef.current.children,
      { opacity: 0.2, y: 15 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'bottom 50%',
          scrub: 0.5
        }
      }
    );
  }, sectionRef);

  const focusAreas = [
    { icon: Server, label: 'Backend & APIs', color: 'text-indigo-400' },
    { icon: Database, label: 'Databases & SQL', color: 'text-cyan-400' },
    { icon: Code, label: 'Clean Architecture', color: 'text-emerald-400' },
    { icon: Wrench, label: 'Desktop & Systems', color: 'text-amber-400' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-12">
        <span className="font-mono text-xs text-indigo-400 font-semibold tracking-widest uppercase">
          01 // PHILOSOPHY & ABOUT
        </span>
        <div className="h-px bg-white/10 flex-grow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Progressive Text Storytelling */}
        <div ref={textRef} className="lg:col-span-7 space-y-8">
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Building software that is reliable, maintainable, and engineered to last.
          </h2>

          <div className="space-y-6 text-zinc-400 text-base sm:text-lg font-light leading-relaxed">
            {personalInfo.extendedBio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Focus Areas Quick Grid */}
          <div className="pt-4 grid grid-cols-2 gap-4">
            {focusAreas.map(({ icon: Icon, label, color }) => (
              <div key={label} className="p-4 rounded-xl border border-white/10 bg-zinc-950/60 flex items-center gap-3">
                <Icon className={`w-4 h-4 shrink-0 ${color}`} />
                <span className="text-xs font-mono text-zinc-300">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Engineering Principles Card */}
        <div className="lg:col-span-5">
          <SpotlightCard className="h-full flex flex-col justify-between p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                  Engineering Principles
                </span>
                <Code className="w-4 h-4 text-indigo-400" />
              </div>

              {/* Tabs selector */}
              <div className="flex flex-wrap gap-2 mb-6">
                {engineeringPrinciples.map((principle, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                      activeTab === idx
                        ? 'bg-white/15 text-white border border-white/20'
                        : 'bg-white/5 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    0{idx + 1}. {principle.title}
                  </button>
                ))}
              </div>

              {/* Active Tab Narrative */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {engineeringPrinciples[activeTab].title}
                  </h3>
                  <span className="text-xs font-mono text-indigo-400">
                    {engineeringPrinciples[activeTab].subtitle}
                  </span>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed font-light">
                  {engineeringPrinciples[activeTab].description}
                </p>

                {/* Code Snippet Box */}
                {engineeringPrinciples[activeTab].codeSnippet && (
                  <div className="mt-4 p-4 rounded-lg bg-zinc-900 border border-white/10 font-mono text-xs text-cyan-300 overflow-x-auto">
                    <div className="flex items-center justify-between text-zinc-600 mb-2 text-[10px]">
                      <span className="flex items-center gap-1.5">
                        <Code className="w-3 h-3 text-zinc-500" />
                        architecture_pattern.cs
                      </span>
                      <span>C# / .NET</span>
                    </div>
                    <code>{engineeringPrinciples[activeTab].codeSnippet}</code>
                  </div>
                )}
              </motion.div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>SYSTEM LOG: STABLE</span>
              <span className="text-emerald-400">BUILD: PASSING</span>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
