import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Layers, Cpu, BarChart2 } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { StatusBadge } from './StatusBadge';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-zinc-950 p-6 md:p-8 shadow-2xl custom-scrollbar"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-zinc-500 text-sm font-semibold">{project.number}</span>
              <StatusBadge status="tech" text={project.category} />
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              {project.title}
            </h2>
            <p className="text-lg text-zinc-400 font-light">{project.subtitle}</p>
          </div>

          <div className="relative rounded-xl border border-white/10 overflow-hidden mb-8 bg-zinc-900 group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto max-h-[400px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-white/5 bg-zinc-900/50">
                <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono uppercase mb-1">
                  <BarChart2 className="w-3.5 h-3.5 text-indigo-400" />
                  {metric.label}
                </div>
                <div className="text-xl font-bold text-white font-mono">{metric.value}</div>
              </div>
            ))}
          </div>

          <div className="space-y-6 mb-8 text-zinc-300 leading-relaxed font-light">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Overview</h3>
              <p>{project.extendedDescription}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Key Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Architecture Notes
              </h3>
              <ul className="space-y-2 text-sm text-zinc-400 list-disc list-inside">
                {project.architectureHighlights.map((highlight, idx) => (
                  <li key={idx} className="marker:text-cyan-400">{highlight}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-mono rounded-md bg-white/5 border border-white/10 text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  View Repository
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Preview
                </a>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Press ESC or click outside to close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
