import React, { useState, useEffect, useRef } from 'react';
import { aboutStats, engineeringPrinciples } from '../../data/portfolioData';
import { useGsapContext } from '../../hooks/useGsapContext';
import gsap from 'gsap';

// ─── Lightweight Animated Counter Component ────────────────────────────────────
interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = '',
  duration = 1500,
}) => {
  const [count, setCount] = useState<number>(0);
  const [hasTriggered, setHasTriggered] = useState<boolean>(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setCount(target);
      setHasTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasTriggered, target]);

  useEffect(() => {
    if (!hasTriggered) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Deceleration curve (easeOutCubic)
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOutProgress * target);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [hasTriggered, target, duration]);

  return (
    <span ref={elementRef}>
      {count}{suffix}
    </span>
  );
};

// ─── About Section Component ──────────────────────────────────────────────────
export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Subtle entrance reveal using GSAP Context
  useGsapContext(() => {
    if (!textRef.current) return;

    gsap.fromTo(
      textRef.current.children,
      { opacity: 0.3, y: 12 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
          end: 'bottom 60%',
          scrub: 0.5,
        },
      }
    );
  }, sectionRef);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10"
    >
      {/* 1. Section Title */}
      <div className="flex items-center gap-3 mb-12 sm:mb-16">
        <span className="font-mono text-xs text-indigo-400 font-semibold tracking-widest uppercase">
          01 // ABOUT
        </span>
        <div className="h-px bg-white/10 flex-grow" />
      </div>

      {/* 2. Personal Introduction (Short, Natural & Developer-Focused) */}
      <div ref={textRef} className="space-y-6 max-w-4xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-snug">
          I am a Computer Science student and Full-Stack Developer focused on building web applications, backend systems, APIs, database-driven applications, and desktop applications.
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed max-w-3xl">
          I care about writing clean, maintainable software and building systems with clear structure and separation of responsibilities.
        </p>
      </div>

      {/* 3. Animated Statistics Grid */}
      <div className="grid grid-cols-3 text-center gap-2 sm:gap-8 py-6 sm:py-10 border-y border-white/10 my-10 sm:my-16">
        {aboutStats.map((stat, idx) => (
          <div key={idx} className="space-y-1 sm:space-y-2">
            <div className="text-2xl sm:text-5xl font-bold font-mono text-white tracking-tight">
              <AnimatedCounter target={stat.target} suffix={stat.suffix} />
            </div>
            <div className="text-[10px] sm:text-xs font-mono text-indigo-400 uppercase tracking-wider sm:tracking-widest font-semibold">
              {stat.label}
            </div>
          </div>
        ))}
        </div>

      {/* 4. Engineering Principles — Editorial Typographic List (NO CARDS) */}
      <div className="pt-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 sm:mb-8">
          <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
            ENGINEERING PRINCIPLES
          </h3>
          <span className="text-xs font-mono text-zinc-600">04 ARCHITECTURAL PILLARS</span>
        </div>

        <div className="divide-y divide-white/10">
          {engineeringPrinciples.map((principle) => (
            <div
              key={principle.number}
              className="group py-6 sm:py-7 transition-colors duration-300 hover:bg-white/[0.015] px-2 rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-baseline">
                <div className="md:col-span-5 flex items-baseline gap-4 sm:gap-6">
                  <span className="font-mono text-sm sm:text-base text-indigo-400 font-semibold shrink-0">
                    {principle.number}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {principle.title}
                  </h4>
                </div>
                <div className="md:col-span-7 pl-8 md:pl-0">
                  <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
