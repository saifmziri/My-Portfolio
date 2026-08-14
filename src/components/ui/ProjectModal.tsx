import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Layers, Cpu, BarChart2 } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { StatusBadge } from './StatusBadge';
import { GithubIcon, LinkedinIcon } from './Icons';

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

          <div className="relative rounded-xl border border-white/10 overflow-hidden mb-4 bg-zinc-900 group">
            <img
              src={activeImage || project.image}
              alt={project.title}
              className="w-full h-auto max-h-[400px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
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
                      ? 'border-indigo-500 scale-105 shadow-lg shadow-indigo-500/30'
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <img src={imgUrl} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

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
            <div className="flex flex-wrap items-center gap-3">
              {project.githubFrontend && (
                <a
                  href={project.githubFrontend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-cyan-500/30 bg-cyan-950/30 text-sm font-medium text-cyan-300 hover:bg-cyan-900/50 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-cyan-400" />
                  Frontend Repo
                </a>
              )}
              {project.githubBackend && (
                <a
                  href={project.githubBackend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-indigo-500/30 bg-indigo-950/30 text-sm font-medium text-indigo-300 hover:bg-indigo-900/50 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-indigo-400" />
                  Backend Repo
                </a>
              )}
              {project.github && !project.githubFrontend && !project.githubBackend && (
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
              {project.linkedinPost && (
                <a
                  href={project.linkedinPost}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-blue-500/30 bg-blue-950/30 text-sm font-medium text-blue-300 hover:bg-blue-900/50 hover:text-white transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-blue-400" />
                  Watch Video Demo
                </a>
              )}
              {project.instagramPost && (
                <a
                  href={project.instagramPost}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-pink-500/30 bg-pink-950/30 text-sm font-medium text-pink-300 hover:bg-pink-900/50 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                  Watch on Instagram
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
