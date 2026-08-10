import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles } from 'lucide-react';
import { personalInfo, developerPhotoPlaceholder } from '../../data/portfolioData';
import { MagneticButton } from '../animations/MagneticButton';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { useGsapContext } from '../../hooks/useGsapContext';
import gsap from 'gsap';

// ─── Developer Photo Composition ─────────────────────────────────────────────
// Displays the professional developer portrait with a 3D orbital ring effect.

const DeveloperPhotoComposition: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  // Subtle gentle float animation
  useGsapContext(() => {
    if (!photoRef.current) return;
    gsap.to(photoRef.current, {
      y: -8,
      ease: 'sine.inOut',
      duration: 4,
      repeat: -1,
      yoyo: true,
    });
  }, photoRef);

  // Subtle parallax depth on scroll using GSAP ScrollTrigger
  useGsapContext(() => {
    if (!wrapperRef.current) return;
    gsap.to(wrapperRef.current, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    });
  }, wrapperRef);

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center select-none"
      aria-hidden="true"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-indigo-600/10 rounded-3xl blur-[90px] pointer-events-none" />

      {/* Floating photo wrapper */}
      <div ref={photoRef} className="relative w-full max-w-[340px] lg:max-w-[380px] mx-auto">

        {/* ─── 3D ORBITAL RING EFFECT (BEHIND LAYER - z-0) ────────────────── */}
        <div className="absolute -inset-10 sm:-inset-16 pointer-events-none z-0 overflow-visible flex items-center justify-center">
          <svg
            viewBox="0 0 500 600"
            className="w-[125%] h-[125%] overflow-visible"
            fill="none"
          >
            <defs>
              <linearGradient id="orbit-grad-back" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
              </linearGradient>
              <filter id="glow-back" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g transform="translate(250, 310) rotate(-16)">
              {/* Back Arc: passes behind upper torso/shoulders */}
              <path
                d="M -225 0 A 225 68 0 0 0 225 0"
                stroke="url(#orbit-grad-back)"
                strokeWidth="1.25"
                strokeDasharray="6 4"
                className="opacity-75"
                filter="url(#glow-back)"
              />
              {/* Solid thin core line behind */}
              <path
                d="M -225 0 A 225 68 0 0 0 225 0"
                stroke="#818cf8"
                strokeWidth="0.75"
                strokeOpacity="0.45"
              />
              {/* Particle 1 - Back phase */}
              <circle r="3" fill="#38bdf8" filter="url(#glow-back)">
                <animate
                  attributeName="opacity"
                  values="1;1;0;0;1"
                  keyTimes="0;0.49;0.5;0.99;1"
                  dur="14s"
                  repeatCount="indefinite"
                />
                <animateMotion
                  path="M -225 0 A 225 68 0 0 0 225 0"
                  dur="7s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Particle 2 - Back phase (offset by 180 deg) */}
              <circle r="2.5" fill="#c084fc" filter="url(#glow-back)">
                <animate
                  attributeName="opacity"
                  values="0;0;1;1;0"
                  keyTimes="0;0.5;0.51;0.99;1"
                  dur="14s"
                  repeatCount="indefinite"
                />
                <animateMotion
                  path="M -225 0 A 225 68 0 0 0 225 0"
                  dur="7s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </svg>
        </div>

        {/* Outer corner brackets — subtle technical framing */}
        <div className="absolute -top-4 -left-4 w-9 h-9 border-t-[1.5px] border-l-[1.5px] border-indigo-400/60 rounded-tl-xl z-20" />
        <div className="absolute -top-4 -right-4 w-9 h-9 border-t-[1.5px] border-r-[1.5px] border-indigo-400/60 rounded-tr-xl z-20" />
        <div className="absolute -bottom-4 -left-4 w-9 h-9 border-b-[1.5px] border-l-[1.5px] border-indigo-400/60 rounded-bl-xl z-20" />
        <div className="absolute -bottom-4 -right-4 w-9 h-9 border-b-[1.5px] border-r-[1.5px] border-indigo-400/60 rounded-br-xl z-20" />

        {/* Subtle accent line */}
        <div className="absolute top-1/3 -left-8 right-0 h-px bg-gradient-to-r from-indigo-500/40 via-transparent to-transparent z-20 pointer-events-none" />

        {/* Main photo container (z-10) */}
        <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/70 aspect-[3/4]">
          {/* Developer Photo with fallback */}
          <img
            src={personalInfo.profileImage}
            onError={(e) => {
              (e.target as HTMLImageElement).src = developerPhotoPlaceholder;
            }}
            alt={`${personalInfo.name} — ${personalInfo.title}`}
            className="w-full h-full object-cover object-top"
            loading="eager"
            draggable={false}
          />

          {/* Faint grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />

          {/* Bottom gradient dissolve mask into dark background */}
          <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent pointer-events-none" />

          {/* Side vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/30 via-transparent to-zinc-950/20 pointer-events-none" />
        </div>

        {/* ─── 3D ORBITAL RING EFFECT (FRONT LAYER - z-30) ────────────────── */}
        <div className="absolute -inset-10 sm:-inset-16 pointer-events-none z-30 overflow-visible flex items-center justify-center">
          <svg
            viewBox="0 0 500 600"
            className="w-[125%] h-[125%] overflow-visible"
            fill="none"
          >
            <defs>
              <linearGradient id="orbit-grad-front" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.6" />
              </linearGradient>
              <filter id="glow-front" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g transform="translate(250, 310) rotate(-16)">
              {/* Front Arc: passes in front of mid/lower torso */}
              <path
                d="M 225 0 A 225 68 0 0 0 -225 0"
                stroke="url(#orbit-grad-front)"
                strokeWidth="1.5"
                strokeDasharray="8 5"
                filter="url(#glow-front)"
              />
              {/* Solid crisp core line in front */}
              <path
                d="M 225 0 A 225 68 0 0 0 -225 0"
                stroke="#38bdf8"
                strokeWidth="1"
                strokeOpacity="0.8"
              />
              {/* Particle 1 - Front phase */}
              <circle r="3.5" fill="#38bdf8" filter="url(#glow-front)">
                <animate
                  attributeName="opacity"
                  values="0;0;1;1;0"
                  keyTimes="0;0.5;0.51;0.99;1"
                  dur="14s"
                  repeatCount="indefinite"
                />
                <animateMotion
                  path="M 225 0 A 225 68 0 0 0 -225 0"
                  dur="7s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Particle 2 - Front phase (offset by 180 deg) */}
              <circle r="3" fill="#c084fc" filter="url(#glow-front)">
                <animate
                  attributeName="opacity"
                  values="1;1;0;0;1"
                  keyTimes="0;0.49;0.5;0.99;1"
                  dur="14s"
                  repeatCount="indefinite"
                />
                <animateMotion
                  path="M 225 0 A 225 68 0 0 0 -225 0"
                  dur="7s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </svg>
        </div>

        {/* Vertical location coordinates detail — right side */}
        <div className="absolute -right-10 top-1/4 bottom-1/4 hidden xl:flex flex-col items-center gap-0 z-20">
          <div className="w-px flex-grow bg-gradient-to-b from-transparent via-indigo-500/40 to-transparent" />
          <span
            className="text-[9px] font-mono text-zinc-600 tracking-[0.2em] my-2"
            style={{ writingMode: 'vertical-rl' }}
          >
            36.8679° N 42.9883° E
          </span>
          <div className="w-px flex-grow bg-gradient-to-b from-transparent via-indigo-500/40 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};

// ─── Hero Section ─────────────────────────────────────────────────────────────

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  // Headline shifts slightly on scroll
  useGsapContext(() => {
    if (!headlineRef.current) return;
    gsap.to(headlineRef.current, {
      yPercent: -15,
      opacity: 0.4,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, containerRef);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[280px] h-[280px] bg-cyan-500/6 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Bar Location */}
      <div className="flex items-center justify-end gap-4 mb-8">
        <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
          <span className="hidden sm:inline-block">{personalInfo.location}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 hidden sm:inline-block" />
          <span className="text-zinc-400">CS @ UNIV OF DUHOK</span>
        </div>
      </div>

      {/* 2-column Layout */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

        {/* Left Column: Headline, Bio, CTAs, Stats */}
        <div className="space-y-8 order-2 lg:order-1">

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]"
          >
            Building{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400">
              robust software
            </span>{' '}
            from backend to frontend.
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl text-base sm:text-lg text-zinc-400 font-light leading-relaxed"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Action CTAs & Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <MagneticButton
              as="a"
              href="#projects"
              className="px-6 py-3.5 rounded-full bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10 flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <Sparkles className="w-4 h-4 text-indigo-600" />
            </MagneticButton>

            <MagneticButton
              as="a"
              href="#contact"
              className="px-6 py-3.5 rounded-full border border-white/15 bg-zinc-900/60 text-white font-medium text-sm hover:bg-white/10 hover:border-white/25 transition-all backdrop-blur-md flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-zinc-400" />
              <span>Get in Touch</span>
            </MagneticButton>

            {/* Social quick-links */}
            <div className="flex items-center gap-2 border-l border-white/10 pl-4 ml-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/20 transition-all"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/20 transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
            {personalInfo.stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Developer Photo Composition */}
        <div className="order-1 lg:order-2 flex justify-center">
          <DeveloperPhotoComposition />
        </div>
      </div>
    </section>
  );
};
