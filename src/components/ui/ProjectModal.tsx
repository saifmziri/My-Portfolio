import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Layers, Cpu, BarChart2 } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { StatusBadge } from './StatusBadge';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeImage, setActiveImage] = React.useState<string>('');

  React.useEffect(() => {
    if (project) {
      setActiveImage(project.image);
    }
  }, [project]);
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
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#3F4739] bg-[#111311] p-6 md:p-8 shadow-2xl custom-scrollbar"
        >
          <div className="flex items-center justify-between border-b border-[#3F4739] pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[#68705A] text-sm font-semibold">{project.number}</span>
              <StatusBadge status="tech" text={project.category} />
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-[#3F4739] bg-white/5 text-[#969B91] hover:text-[#E8EAE3] hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#E8EAE3] mb-2">
              {project.title}
            </h2>
            <p className="text-lg text-[#969B91] font-light">{project.subtitle}</p>
          </div>

          <div className="relative rounded-xl border border-[#3F4739] overflow-hidden mb-4 bg-[#1B1E1A] group">
            <img
              src={activeImage || project.image}
              alt={project.title}
              className="w-full h-auto max-h-[400px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
          </div>

          {project.images && project.images.length > 1 && (
            <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
              {project.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all w-24 h-16 shrink-0 ${
                    (activeImage || project.image) === imgUrl
                      ? 'border-[#C8F23D] scale-105 shadow-lg shadow-[#C8F23D]/25'
                      : 'border-[#3F4739] opacity-60 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <img src={imgUrl} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-white/5 bg-[#1B1E1A]/50">
                <div className="flex items-center gap-2 text-[#68705A] text-xs font-mono uppercase mb-1">
                  <BarChart2 className="w-3.5 h-3.5 text-indigo-400" />
                  {metric.label}
                </div>
                <div className="text-xl font-bold text-[#E8EAE3] font-mono">{metric.value}</div>
              </div>
            ))}
          </div>

          <div className="space-y-6 mb-8 text-[#969B91] leading-relaxed font-light">
            <div>
              <h3 className="text-lg font-semibold text-[#E8EAE3] mb-2">Overview</h3>
              <p>{project.extendedDescription}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#E8EAE3] mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Key Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-[#969B91]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#E8EAE3] mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Architecture Notes
              </h3>
              <ul className="space-y-2 text-sm text-[#969B91] list-disc list-inside">
                {project.architectureHighlights.map((highlight, idx) => (
                  <li key={idx} className="marker:text-cyan-400">{highlight}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono text-[#68705A] uppercase tracking-wider mb-3">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-mono rounded-md bg-white/5 border border-[#3F4739] text-[#969B91]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#3F4739]">
            <div className="flex flex-wrap items-center gap-3">
              {project.githubFrontend && (
                <a
                  href={project.githubFrontend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge-social-github"
                >
                  <GithubIcon className="w-4 h-4" />
                  Frontend Repo
                </a>
              )}
              {project.githubBackend && (
                <a
                  href={project.githubBackend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge-social-github"
                >
                  <GithubIcon className="w-4 h-4" />
                  Backend Repo
                </a>
              )}
              {project.github && !project.githubFrontend && !project.githubBackend && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge-social-github"
                >
                  <GithubIcon className="w-4 h-4" />
                  View Repository
                </a>
              )}
              {project.linkedinPost && (
                <a
                  href={project.linkedinPost}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge-social-linkedin"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  Watch Video Demo
                </a>
              )}
              {project.instagramPost && (
                <a
                  href={project.instagramPost}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge-social-instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                  Watch on Instagram
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-sm font-medium text-[#E8EAE3] hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Preview
                </a>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-xs font-mono text-[#68705A] hover:text-[#969B91] transition-colors"
            >
              Press ESC or click outside to close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
