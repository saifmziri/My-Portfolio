import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiDotnet,
  SiLaravel,
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiVite,
  SiTailwindcss,
  SiBootstrap,
  SiPostgresql,
  SiSupabase,
  SiJsonwebtokens
} from 'react-icons/si';
import {
  TbBrandCSharp,
  TbBrandCss3,
  TbApi,
  TbLayersIntersect,
  TbDatabase,
  TbStack3,
  TbCode,
  TbShieldCheck,
  TbLayersIntersect2,
  TbCircleCheck,
  TbHierarchy2
} from 'react-icons/tb';
import { skillCategories } from '../../data/skillsData';

// Official SQL Server Database Logo SVG
const SqlServerLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zm0 2c4.42 0 8 1.79 8 3s-3.58 3-8 3-8-1.79-8-3 3.58-3 8-3zm0 5c4.42 0 8 1.79 8 3v1.5c0 1.21-3.58 3-8 3s-8-1.79-8-3V12c0-1.21 3.58-3 8-3zm0 5.5c4.42 0 8 1.79 8 3V17c0 1.21-3.58 3-8 3s-8-1.79-8-3v-1.5c0-1.21 3.58-3 8-3z"/>
  </svg>
);

export const SkillsMatrix: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(skillCategories[0].id);

  const currentCategory =
    skillCategories.find((cat) => cat.id === activeCategory) || skillCategories[0];

  // Specific Icon & Hover Accent Config for EVERY Skill ID
  const getSkillConfig = (iconKey: string, skillId?: string) => {
    const key = skillId || iconKey;
    switch (key) {
      // ── 1. Backend & Desktop ──
      case 'csharp':
        return {
          icon: <TbBrandCSharp className="w-8 h-8 text-[#512BD4] transition-transform group-hover:scale-110" />,
          accent: 'border-purple-500/20 hover:border-purple-500/60 hover:shadow-purple-500/20 hover:bg-purple-950/20'
        };
      case 'dotnet':
        return {
          icon: <SiDotnet className="w-8 h-8 text-[#512BD4] transition-transform group-hover:scale-110" />,
          accent: 'border-indigo-500/20 hover:border-indigo-500/60 hover:shadow-indigo-500/20 hover:bg-indigo-950/20'
        };
      case 'aspnet':
        return {
          icon: <TbApi className="w-8 h-8 text-[#0078D4] transition-transform group-hover:scale-110" />,
          accent: 'border-blue-500/20 hover:border-blue-500/60 hover:shadow-blue-500/20 hover:bg-blue-950/20'
        };
      case 'efcore':
        return {
          icon: <TbLayersIntersect className="w-8 h-8 text-[#512BD4] transition-transform group-hover:scale-110" />,
          accent: 'border-purple-500/20 hover:border-purple-500/60 hover:shadow-purple-500/20 hover:bg-purple-950/20'
        };
      case 'adonet':
        return {
          icon: <TbDatabase className="w-8 h-8 text-[#0078D4] transition-transform group-hover:scale-110" />,
          accent: 'border-blue-500/20 hover:border-blue-500/60 hover:shadow-blue-500/20 hover:bg-blue-950/20'
        };
      case 'laravel':
        return {
          icon: <SiLaravel className="w-8 h-8 text-[#FF2D20] transition-transform group-hover:scale-110" />,
          accent: 'border-rose-500/20 hover:border-rose-500/60 hover:shadow-rose-500/20 hover:bg-rose-950/20'
        };
      case 'wpf':
        return {
          icon: <TbStack3 className="w-8 h-8 text-[#0078D4] transition-transform group-hover:scale-110" />,
          accent: 'border-cyan-500/20 hover:border-cyan-500/60 hover:shadow-cyan-500/20 hover:bg-cyan-950/20'
        };
      case 'winforms':
        return {
          icon: <TbCode className="w-8 h-8 text-[#0078D4] transition-transform group-hover:scale-110" />,
          accent: 'border-sky-500/20 hover:border-sky-500/60 hover:shadow-sky-500/20 hover:bg-sky-950/20'
        };

      // ── 2. Web & Frontend ──
      case 'html5':
        return {
          icon: <SiHtml5 className="w-8 h-8 text-[#E34F26] transition-transform group-hover:scale-110" />,
          accent: 'border-orange-500/20 hover:border-orange-500/60 hover:shadow-orange-500/20 hover:bg-orange-950/20'
        };
      case 'css3':
        return {
          icon: <TbBrandCss3 className="w-8 h-8 text-[#1572B6] transition-transform group-hover:scale-110" />,
          accent: 'border-blue-500/20 hover:border-blue-500/60 hover:shadow-blue-500/20 hover:bg-blue-950/20'
        };
      case 'javascript':
        return {
          icon: <SiJavascript className="w-8 h-8 text-[#F7DF1E] transition-transform group-hover:scale-110" />,
          accent: 'border-yellow-400/20 hover:border-yellow-400/60 hover:shadow-yellow-400/20 hover:bg-yellow-950/20'
        };
      case 'typescript':
        return {
          icon: <SiTypescript className="w-8 h-8 text-[#3178C6] transition-transform group-hover:scale-110" />,
          accent: 'border-blue-500/20 hover:border-blue-500/60 hover:shadow-blue-500/20 hover:bg-blue-950/20'
        };
      case 'react':
        return {
          icon: <SiReact className="w-8 h-8 text-[#61DAFB] transition-transform group-hover:scale-110" />,
          accent: 'border-cyan-400/20 hover:border-cyan-400/60 hover:shadow-cyan-400/20 hover:bg-cyan-950/20'
        };
      case 'vite':
        return {
          icon: <SiVite className="w-8 h-8 text-[#646CFF] transition-transform group-hover:scale-110" />,
          accent: 'border-purple-500/20 hover:border-purple-500/60 hover:shadow-purple-500/20 hover:bg-purple-950/20'
        };
      case 'tailwindcss':
        return {
          icon: <SiTailwindcss className="w-8 h-8 text-[#06B6D4] transition-transform group-hover:scale-110" />,
          accent: 'border-teal-400/20 hover:border-teal-400/60 hover:shadow-teal-400/20 hover:bg-teal-950/20'
        };
      case 'bootstrap':
        return {
          icon: <SiBootstrap className="w-8 h-8 text-[#7952B3] transition-transform group-hover:scale-110" />,
          accent: 'border-purple-500/20 hover:border-purple-500/60 hover:shadow-purple-500/20 hover:bg-purple-950/20'
        };

      // ── 3. Databases ──
      case 'mssql':
        return {
          icon: <SqlServerLogo className="w-8 h-8 text-[#CC292B] transition-transform group-hover:scale-110" />,
          accent: 'border-red-500/20 hover:border-red-500/60 hover:shadow-red-500/20 hover:bg-red-950/20'
        };
      case 'tsql':
        return {
          icon: <TbDatabase className="w-8 h-8 text-[#CC292B] transition-transform group-hover:scale-110" />,
          accent: 'border-amber-500/20 hover:border-amber-500/60 hover:shadow-amber-500/20 hover:bg-amber-950/20'
        };
      case 'postgresql':
        return {
          icon: <SiPostgresql className="w-8 h-8 text-[#4169E1] transition-transform group-hover:scale-110" />,
          accent: 'border-blue-500/20 hover:border-blue-500/60 hover:shadow-blue-500/20 hover:bg-blue-950/20'
        };
      case 'supabase':
        return {
          icon: <SiSupabase className="w-8 h-8 text-[#3ECF8E] transition-transform group-hover:scale-110" />,
          accent: 'border-emerald-400/20 hover:border-emerald-400/60 hover:shadow-emerald-400/20 hover:bg-emerald-950/20'
        };

      // ── 4. Software Engineering & Core Concepts ──
      case 'oop':
        return {
          icon: <TbShieldCheck className="w-8 h-8 text-[#10B981] transition-transform group-hover:scale-110" />,
          accent: 'border-emerald-500/20 hover:border-emerald-500/60 hover:shadow-emerald-500/20 hover:bg-emerald-950/20'
        };
      case 'solid':
        return {
          icon: <TbLayersIntersect2 className="w-8 h-8 text-[#10B981] transition-transform group-hover:scale-110" />,
          accent: 'border-emerald-500/20 hover:border-emerald-500/60 hover:shadow-emerald-500/20 hover:bg-emerald-950/20'
        };
      case 'cleancode':
        return {
          icon: <TbCircleCheck className="w-8 h-8 text-[#10B981] transition-transform group-hover:scale-110" />,
          accent: 'border-emerald-500/20 hover:border-emerald-500/60 hover:shadow-emerald-500/20 hover:bg-emerald-950/20'
        };
      case 'cleanarch':
        return {
          icon: <TbStack3 className="w-8 h-8 text-[#10B981] transition-transform group-hover:scale-110" />,
          accent: 'border-emerald-500/20 hover:border-emerald-500/60 hover:shadow-emerald-500/20 hover:bg-emerald-950/20'
        };
      case 'threetier':
        return {
          icon: <TbHierarchy2 className="w-8 h-8 text-[#10B981] transition-transform group-hover:scale-110" />,
          accent: 'border-emerald-500/20 hover:border-emerald-500/60 hover:shadow-emerald-500/20 hover:bg-emerald-950/20'
        };
      case 'jwt':
        return {
          icon: <SiJsonwebtokens className="w-8 h-8 text-[#E8EAE3] transition-transform group-hover:scale-110" />,
          accent: 'border-pink-500/20 hover:border-pink-500/60 hover:shadow-pink-500/20 hover:bg-pink-950/20'
        };

      default:
        return {
          icon: <TbCode className="w-8 h-8 text-emerald-400 transition-transform group-hover:scale-110" />,
          accent: 'border-white/10 hover:border-emerald-500/40 hover:shadow-emerald-500/10 hover:bg-emerald-950/20'
        };
    }
  };

  return (
    <section id="skills" className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#3F4739]">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8 sm:mb-12">
        <span className="font-mono text-xs text-[#68705A] font-semibold tracking-widest uppercase">
          03 // SKILLS & TECHNICAL STACK
        </span>
        <div className="h-px bg-[#3F4739] flex-grow" />
      </div>

      {/* Header Info */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#E8EAE3] tracking-tight">
          Technical Stack & Engineering Capabilities
        </h2>
        <p className="text-sm text-[#969B91] font-light leading-relaxed">
          Production-tested frameworks, database systems, backend services, and core architectural patterns.
        </p>
      </div>

      {/* Centered max-w-4xl Container wrapping Category Filter Tabs & Grid together */}
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* Top Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-2.5">
          {skillCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-mono text-xs font-medium transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-sky-500/15 border-sky-500/50 text-[#E8EAE3] shadow-lg shadow-sky-500/15'
                    : 'bg-slate-900/60 border-[#3F4739] text-[#969B91] hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`px-1.5 py-0.2 text-[10px] rounded-full ${isActive ? 'bg-sky-400/20 text-sky-300' : 'bg-[#3F4739]/60 text-[#68705A]'}`}>
                  {cat.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Strict 4-Column Grid on Desktop / 2 on Mobile */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {currentCategory.skills.map((skill) => {
              const config = getSkillConfig(skill.icon, skill.id);
              return (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className={`relative group px-4 py-5 sm:py-6 rounded-2xl border border-[#3F4739] bg-[#0F172A]/60 hover:bg-slate-900/80 backdrop-blur-md transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(14,165,233,0.12)] flex flex-col items-center justify-center text-center gap-3 sm:gap-4 ${config.accent}`}
                >
                  {/* Official Tech Icon (TOP) */}
                  <div className="p-2.5 rounded-2xl border border-[#3F4739] bg-[#0B0F17]/80 shadow-inner group-hover:scale-110 transition-transform shrink-0">
                    {config.icon}
                  </div>

                  {/* Skill Name (BELOW) */}
                  <h3 className="text-xs sm:text-sm font-bold text-[#E8EAE3] tracking-tight group-hover:text-[#E8EAE3] transition-colors line-clamp-1 w-full text-center">
                    {skill.name}
                  </h3>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
