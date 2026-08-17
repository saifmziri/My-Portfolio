import React, { useRef } from 'react';
import { GraduationCap, Calendar, MapPin, CheckCircle2, TrendingUp, Award } from 'lucide-react';
import { experiences } from '../../data/experienceData';
import { SpotlightCard } from '../ui/SpotlightCard';
import { useGsapContext } from '../../hooks/useGsapContext';
import gsap from 'gsap';

export const ExperienceTimeline: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!lineRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 0.5
        }
      }
    );
  }, containerRef);

  // Pick icon based on type
  const getIcon = (type: string) => {
    if (type === 'Education') return GraduationCap;
    if (type === 'Contract') return Award;
    return GraduationCap;
  };

  return (
    <section
      ref={containerRef}
      id="experience"
      className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#3F4739]"
    >
      <div className="flex items-center gap-3 mb-16">
        <span className="font-mono text-xs text-[#68705A] font-semibold tracking-widest uppercase">
          04 // EDUCATION & CERTIFICATIONS
        </span>
        <div className="h-px bg-[#3F4739] flex-grow" />
      </div>

      <div className="relative pl-6 sm:pl-10 space-y-12">
        <div className="absolute left-2 sm:left-3 top-2 bottom-2 w-0.5 bg-[#3F4739]">
          <div
            ref={lineRef}
            className="w-full h-full bg-[#68705A] origin-top"
          />
        </div>

        {experiences.map((exp) => {
          const Icon = getIcon(exp.type);
          return (
            <div key={exp.id} className="relative group">
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full border-2 border-[#B8F34A] bg-[#111311] flex items-center justify-center transition-transform group-hover:scale-125 shadow-lg shadow-[#B8F34A]/30">
                <div className="w-2 h-2 rounded-full bg-[#E2A968]" />
              </div>

              <SpotlightCard className="p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#3F4739] pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#E8EAE3] tracking-tight">
                        {exp.role}
                      </h3>
                      <span className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-[#C58A42]/15 border border-[#C58A42]/35 text-[#68705A]">
                        {exp.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#969B91]">
                      <span className="flex items-center gap-1.5 text-[#E8EAE3] font-medium">
                        <Icon className="w-3.5 h-3.5 text-[#B8F34A]" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#68705A]" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-[#3F4739] text-xs font-mono text-[#969B91]">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {exp.period}
                    </span>
                    {exp.highlightMetric && (
                      <span className="text-[11px] font-mono text-[#C8F23D] flex items-center gap-1 font-semibold">
                        <TrendingUp className="w-3 h-3" />
                        {exp.highlightMetric}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#969B91] font-light leading-relaxed">
                  {exp.summary}
                </p>

                <div className="space-y-2.5">
                  <span className="text-xs font-mono uppercase text-[#68705A] tracking-wider block mb-2">
                    Highlights & Achievements
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {exp.achievements.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#969B91]">
                        <CheckCircle2 className="w-4 h-4 text-[#68705A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#3F4739] flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-[#68705A] uppercase mr-2">Technologies:</span>
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-[11px] font-mono rounded bg-slate-900/60 border border-[#3F4739] text-[#969B91]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </div>
          );
        })}
      </div>
    </section>
  );
};
