import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { projects } from '../../data/projectsData';
import type { Project } from '../../types/portfolio';
import { SpotlightCard } from '../ui/SpotlightCard';
import { StatusBadge } from '../ui/StatusBadge';
import { MagneticButton } from '../animations/MagneticButton';
import { ProjectModal } from '../ui/ProjectModal';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../ui/Icons';
import { useGsapContext } from '../../hooks/useGsapContext';
import gsap from 'gsap';

export const ProjectsPinned: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const pinnedBoxRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

  // Lock GSAP onUpdate during button click navigation to prevent smooth-scroll frame feedback loop
  const isNavigatingRef = useRef<boolean>(false);
  const navTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeIndexRef = useRef<number>(0);
  activeIndexRef.current = activeProjectIndex;

  useEffect(() => {
    const checkViewport = () => {
      const nextIsDesktop = window.innerWidth >= 1024;
      setIsDesktop((prev) => (prev !== nextIsDesktop ? nextIsDesktop : prev));
    };
    const checkReducedMotion = () => {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    checkReducedMotion();
    window.addEventListener('resize', checkViewport);
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionMedia.addEventListener('change', checkReducedMotion);

    return () => {
      window.removeEventListener('resize', checkViewport);
      motionMedia.removeEventListener('change', checkReducedMotion);
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    };
  }, []);

  // Use CSS sticky for pinning — GSAP ScrollTrigger tracks progress for scroll animation
  useGsapContext(() => {
    if (!containerRef.current) return;
    const totalProjects = projects.length;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
        invalidateOnRefresh: false,
        onUpdate: (self) => {
          // If button navigation was clicked, keep state locked until scroll settles
          if (isNavigatingRef.current) return;

          if (totalProjects <= 1) return;
          const calculatedIndex = Math.round(self.progress * (totalProjects - 1));
          const clampedIndex = Math.max(0, Math.min(totalProjects - 1, calculatedIndex));
          
          if (clampedIndex !== activeIndexRef.current) {
            activeIndexRef.current = clampedIndex;
            setActiveProjectIndex(clampedIndex);
          }
        }
      }
    });

    return () => {
      tl.kill();
    };
  }, containerRef, [isDesktop]);

  const activeProject = projects[activeProjectIndex];

  // Section height = scroll space per project + dwell space for last project
  const scrollPerProject = isDesktop ? 80 : 55;
  const sectionStyle: React.CSSProperties = {
    height: `calc(${(projects.length + 0.5) * scrollPerProject}vh)`
  };

  /**
   * Navigate to a project directly via buttons or dots
   */
  const scrollToProject = useCallback((idx: number) => {
    const total = projects.length;
    const clampedIndex = Math.max(0, Math.min(total - 1, idx));
    
    activeIndexRef.current = clampedIndex;
    setActiveProjectIndex(clampedIndex);

    isNavigatingRef.current = true;
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    navTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 750);

    const section = containerRef.current;
    if (!section) return;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableRange = sectionHeight - viewportHeight;

    if (scrollableRange > 0 && total > 1) {
      const targetProgress = clampedIndex / (total - 1);
      const targetScrollY = sectionTop + targetProgress * scrollableRange;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        id="projects"
        className="relative bg-[#111311]/40 border-t border-[#3F4739]"
        style={sectionStyle}
      >
        {/* Sticky showcase container */}
        <div
          ref={pinnedBoxRef}
          className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden"
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 lg:py-8">

            {/* ── Header Row ── */}
            <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6 lg:mb-8">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#68705A] font-semibold tracking-widest uppercase">
                  02 // FEATURED PROJECTS
                </span>
                <div className="h-px bg-[#3F4739] w-16 sm:w-32 lg:w-48" />
              </div>

              {/* Navigation arrows — visible on all screen sizes */}
              <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs text-[#969B91]">
                <button
                  onClick={() => scrollToProject(activeProjectIndex - 1)}
                  disabled={activeProjectIndex === 0}
                  className="p-1.5 sm:p-2 rounded-full border border-[#3F4739] bg-[#1B1E1A] hover:bg-[#222720] hover:border-[#68705A] hover:text-[#E8EAE3] disabled:opacity-30 disabled:pointer-events-none transition-all"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1 font-mono">
                  <span className="text-[#E8EAE3] font-bold">{activeProject.number}</span>
                  <span className="text-[#68705A]">/</span>
                  <span className="text-[#969B91]">0{projects.length}</span>
                </div>

                <button
                  onClick={() => scrollToProject(activeProjectIndex + 1)}
                  disabled={activeProjectIndex === projects.length - 1}
                  className="p-1.5 sm:p-2 rounded-full border border-[#3F4739] bg-[#1B1E1A] hover:bg-[#222720] hover:border-[#68705A] hover:text-[#E8EAE3] disabled:opacity-30 disabled:pointer-events-none transition-all"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* DESKTOP SHOWCASE — 12-col grid, left info + right image (lg+)      */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <div className="hidden lg:grid grid-cols-12 gap-8 items-center" style={{ minHeight: '520px' }}>
              {/* Info column */}
              <div className="col-span-5 flex flex-col justify-between h-full space-y-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: 'easeOut' }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-bold font-mono text-[#68705A]">
                        {activeProject.number}
                      </span>
                      <StatusBadge status="tech" text={activeProject.category} />
                    </div>

                    <div>
                      <h3 className="text-3xl xl:text-4xl font-bold text-[#E8EAE3] tracking-tight mb-1.5">
                        {activeProject.title}
                      </h3>
                      <p className="text-xs font-mono text-[#969B91] mb-2.5">
                        {activeProject.subtitle}
                      </p>
                      <p className="text-[#969B91] text-sm font-light leading-relaxed">
                        {activeProject.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#3F4739]">
                      {activeProject.metrics.map((m, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <span className="block text-[10px] font-mono text-[#68705A] uppercase">
                            {m.label}
                          </span>
                          <span className="block text-xs font-bold text-[#E8EAE3] font-mono">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-[11px] font-mono rounded bg-[#111311] border border-[#3F4739] text-[#969B91]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <MagneticButton
                        onClick={() => setSelectedProject(activeProject)}
                        className="px-5 py-2.5 rounded-full bg-[#C8F23D] hover:bg-[#D5FF63] text-[#111311] text-xs font-mono font-semibold transition-all shadow-md shadow-[#C8F23D]/15 flex items-center gap-2"
                      >
                        <span>View Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </MagneticButton>

                      {activeProject.githubFrontend && (
                        <a
                          href={activeProject.githubFrontend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-social-github"
                          aria-label="Frontend GitHub Repository"
                          title="Frontend Repository"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {activeProject.githubBackend && (
                        <a
                          href={activeProject.githubBackend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-social-github"
                          aria-label="Backend GitHub Repository"
                          title="Backend Repository"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {activeProject.github && !activeProject.githubFrontend && !activeProject.githubBackend && (
                        <a
                          href={activeProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-social-github"
                          aria-label="GitHub Repository"
                          title="GitHub Repository"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {activeProject.linkedinPost && (
                        <a
                          href={activeProject.linkedinPost}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-social-linkedin"
                          aria-label="Watch Video Demo on LinkedIn"
                          title="Watch Video Demo on LinkedIn"
                        >
                          <LinkedinIcon className="w-4 h-4" />
                        </a>
                      )}
                      {activeProject.instagramPost && (
                        <a
                          href={activeProject.instagramPost}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-social-instagram"
                          aria-label="Watch on Instagram"
                          title="Watch on Instagram"
                        >
                          <InstagramIcon className="w-4 h-4" />
                        </a>
                      )}
                      {activeProject.live && (
                        <a
                          href={activeProject.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-full border border-[#3F4739] bg-[#1B1E1A] text-[#969B91] hover:text-[#E8EAE3] hover:border-[#68705A] hover:bg-[#222720] transition-colors"
                          aria-label="Live Application Preview"
                          title="Live Preview"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Dot navigation */}
                <div className="flex items-center gap-1.5 pt-2">
                  {projects.map((proj, idx) => (
                    <button
                      key={proj.id}
                      onClick={() => scrollToProject(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeProjectIndex === idx
                          ? 'w-7 bg-[#C8F23D]'
                          : 'w-2 bg-[#3F4739] hover:bg-[#68705A]'
                      }`}
                      aria-label={`Jump to project ${proj.title}`}
                    />
                  ))}
                </div>
              </div>

              {/* Image column */}
              <div className="col-span-7 relative rounded-2xl border border-[#3F4739] overflow-hidden bg-[#1B1E1A] shadow-2xl group" style={{ height: '500px' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width={1200}
                      height={500}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111311]/90 via-transparent to-transparent opacity-60 pointer-events-none" />
                    <button
                      onClick={() => setSelectedProject(activeProject)}
                      className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-[#111311]/85 backdrop-blur-md border border-[#3F4739] text-xs font-mono text-[#E8EAE3] flex items-center gap-2 hover:bg-[#1B1E1A] hover:border-[#68705A] transition-colors shadow-lg"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C8F23D]" />
                      <span>Deep Dive View</span>
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* MOBILE SHOWCASE — single card (< lg)                                */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <div className="lg:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: 'easeOut' }}
                >
                  <SpotlightCard className="p-4 sm:p-5 space-y-3 rounded-2xl border border-[#3F4739] bg-[#1B1E1A] shadow-2xl backdrop-blur-sm">
                    {/* Top bar */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-bold text-[#68705A]">
                        {activeProject.number}
                      </span>
                      <StatusBadge status="tech" text={activeProject.category} />
                    </div>

                    {/* Project image */}
                    <div className="relative rounded-xl overflow-hidden border border-[#3F4739] bg-[#111311]">
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="w-full object-cover object-top"
                        style={{ height: '180px' }}
                        loading="lazy"
                        decoding="async"
                        width={1200}
                        height={180}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111311]/80 via-transparent to-transparent pointer-events-none" />
                      <button
                        onClick={() => setSelectedProject(activeProject)}
                        className="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-full bg-[#111311]/85 backdrop-blur-md border border-[#3F4739] text-[11px] font-mono text-[#E8EAE3] flex items-center gap-1.5 shadow-lg active:scale-95 transition-transform"
                      >
                        <Sparkles className="w-3 h-3 text-[#C8F23D]" />
                        <span>Deep Dive</span>
                      </button>
                    </div>

                    {/* Title + description */}
                    <div>
                      <h3 className="text-xl font-bold text-[#E8EAE3] tracking-tight mb-0.5">
                        {activeProject.title}
                      </h3>
                      <p className="text-[11px] font-mono text-[#969B91] mb-1">{activeProject.subtitle}</p>
                      <p className="text-xs text-[#969B91] font-light line-clamp-2 leading-relaxed">
                        {activeProject.description}
                      </p>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-1.5 py-2 border-y border-[#3F4739]">
                      {activeProject.metrics.slice(0, 3).map((m, idx) => (
                        <div key={idx} className="space-y-0.5 text-center">
                          <span className="block text-[9px] font-mono text-[#68705A] uppercase truncate">
                            {m.label}
                          </span>
                          <span className="block text-[10px] font-bold text-[#E8EAE3] font-mono truncate">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tech chips */}
                    <div className="flex flex-wrap gap-1">
                      {activeProject.technologies.slice(0, 5).map((tech, idx) => (
                        <span key={idx} className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#111311] border border-[#3F4739] text-[#969B91]">
                          {tech}
                        </span>
                      ))}
                      {activeProject.technologies.length > 5 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-[#111311] text-[#68705A]">
                          +{activeProject.technologies.length - 5}
                        </span>
                      )}
                    </div>

                    {/* Action row */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#3F4739]">
                      <button
                        onClick={() => setSelectedProject(activeProject)}
                        className="px-4 py-2 rounded-full bg-[#C8F23D] active:bg-[#D5FF63] text-[#111311] text-xs font-mono font-semibold flex items-center gap-1.5 shadow-md shadow-[#C8F23D]/15"
                      >
                        <span>View Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1.5">
                        {activeProject.githubFrontend && (
                          <a
                            href={activeProject.githubFrontend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-social-github !p-2"
                            aria-label="Frontend Repository"
                            title="Frontend Repository"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {activeProject.githubBackend && (
                          <a
                            href={activeProject.githubBackend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-social-github !p-2"
                            aria-label="Backend Repository"
                            title="Backend Repository"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {activeProject.github && !activeProject.githubFrontend && !activeProject.githubBackend && (
                          <a
                            href={activeProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-social-github !p-2"
                            aria-label="GitHub Repository"
                            title="GitHub Repository"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {activeProject.linkedinPost && (
                          <a
                            href={activeProject.linkedinPost}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-social-linkedin !p-2"
                            aria-label="LinkedIn Post"
                            title="Watch Video Demo on LinkedIn"
                          >
                            <LinkedinIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {activeProject.instagramPost && (
                          <a
                            href={activeProject.instagramPost}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-social-instagram !p-2"
                            aria-label="Instagram Post"
                            title="Watch on Instagram"
                          >
                            <InstagramIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {activeProject.live && (
                          <a
                            href={activeProject.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full border border-[#3F4739] bg-[#1B1E1A] text-[#969B91] hover:text-[#E8EAE3] hover:border-[#68705A] active:text-[#E8EAE3]"
                            aria-label="Live Preview"
                            title="Live Preview"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            </AnimatePresence>

            {/* Centered pagination dots */}
            <div className="flex items-center justify-center gap-1.5 pt-4">
              {projects.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => scrollToProject(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeProjectIndex === idx
                      ? 'w-6 bg-[#C8F23D]'
                      : 'w-1.5 bg-[#3F4739]'
                  }`}
                  aria-label={`Jump to project ${proj.title}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>

    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
  </>
);
};
