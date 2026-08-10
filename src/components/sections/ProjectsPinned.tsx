import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { projects } from '../../data/projectsData';
import type { Project } from '../../types/portfolio';
import { SpotlightCard } from '../ui/SpotlightCard';
import { StatusBadge } from '../ui/StatusBadge';
import { MagneticButton } from '../animations/MagneticButton';
import { ProjectModal } from '../ui/ProjectModal';
import { GithubIcon } from '../ui/Icons';
import { useGsapContext } from '../../hooks/useGsapContext';
import gsap from 'gsap';

export const ProjectsPinned: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const pinnedBoxRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= 1024);
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useGsapContext(() => {
    if (!isDesktop || !containerRef.current || !pinnedBoxRef.current) return;

    const totalProjects = projects.length;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: pinnedBoxRef.current,
        start: 'top top',
        end: `+=${totalProjects * 100}%`,
        scrub: 0.8,
        onUpdate: (self) => {
          const index = Math.min(
            totalProjects - 1,
            Math.floor(self.progress * totalProjects)
          );
          setActiveProjectIndex(index);
        }
      }
    });

    return () => {
      tl.kill();
    };
  }, containerRef, [isDesktop]);

  const activeProject = projects[activeProjectIndex];

  return (
    <>
      <section
        ref={containerRef}
        id="projects"
        className="relative min-h-screen bg-zinc-950/40 py-24 sm:py-32 border-t border-white/10"
      >
        <div ref={pinnedBoxRef} className="w-full max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-12">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-cyan-400 font-semibold tracking-widest uppercase">
                02 // FEATURED PROJECTS
              </span>
              <div className="h-px bg-white/10 w-24 sm:w-48" />
            </div>

            <div className="hidden lg:flex items-center gap-3 font-mono text-xs text-zinc-500">
              <button
                onClick={() => setActiveProjectIndex((prev) => Math.max(0, prev - 1))}
                disabled={activeProjectIndex === 0}
                className="p-2 rounded-full border border-white/10 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-white font-bold">{activeProject.number}</span>
              <span>/</span>
              <span>0{projects.length}</span>
              <button
                onClick={() => setActiveProjectIndex((prev) => Math.min(projects.length - 1, prev + 1))}
                disabled={activeProjectIndex === projects.length - 1}
                className="p-2 rounded-full border border-white/10 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-12 gap-8 items-center min-h-[580px]">
            <div className="col-span-5 flex flex-col justify-between h-full space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold font-mono text-zinc-600">
                      {activeProject.number}
                    </span>
                    <StatusBadge status="tech" text={activeProject.category} />
                  </div>

                  <div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
                      {activeProject.title}
                    </h3>
                    <p className="text-sm font-mono text-cyan-400 mb-3">
                      {activeProject.subtitle}
                    </p>
                    <p className="text-zinc-400 text-sm font-light leading-relaxed">
                      {activeProject.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10">
                    {activeProject.metrics.map((m, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <span className="block text-[10px] font-mono text-zinc-500 uppercase">
                          {m.label}
                        </span>
                        <span className="block text-xs font-bold text-white font-mono">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-[11px] font-mono rounded bg-white/5 border border-white/10 text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <MagneticButton
                      onClick={() => setSelectedProject(activeProject)}
                      className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-medium transition-colors shadow-lg shadow-indigo-600/20 flex items-center gap-2"
                    >
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </MagneticButton>

                    {activeProject.github && (
                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {activeProject.live && (
                      <a
                        href={activeProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white transition-colors"
                        aria-label="Live Application Preview"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-2 pt-4">
                {projects.map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProjectIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeProjectIndex === idx
                        ? 'w-8 bg-indigo-500'
                        : 'w-2 bg-zinc-800 hover:bg-zinc-700'
                    }`}
                    aria-label={`Jump to project ${proj.title}`}
                  />
                ))}
              </div>
            </div>

            <div className="col-span-7 relative h-[520px] rounded-2xl border border-white/10 overflow-hidden bg-zinc-900 shadow-2xl group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-50" />

                  <button
                    onClick={() => setSelectedProject(activeProject)}
                    className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/15 text-xs font-mono text-white flex items-center gap-2 hover:bg-white/10 transition-colors shadow-lg"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Deep Dive View</span>
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:hidden space-y-12">
            {projects.map((project) => (
              <SpotlightCard key={project.id} className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-zinc-500">{project.number}</span>
                  <StatusBadge status="tech" text={project.category} />
                </div>

                <div className="rounded-xl overflow-hidden border border-white/10 bg-zinc-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 sm:h-64 object-cover object-top"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-xs font-mono text-cyan-400 mb-2">{project.subtitle}</p>
                  <p className="text-sm text-zinc-400 font-light">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-4 py-2 rounded-full bg-indigo-600 text-white text-xs font-mono font-medium flex items-center gap-1.5"
                  >
                    <span>Deep Dive</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full border border-white/10 text-zinc-400 hover:text-white"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full border border-white/10 text-zinc-400 hover:text-white"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
};
