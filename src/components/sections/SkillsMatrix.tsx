import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, CheckCircle } from 'lucide-react';
import { skillCategories } from '../../data/skillsData';
import { SpotlightCard } from '../ui/SpotlightCard';

export const SkillsMatrix: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(skillCategories[0].id);
  const [hoveredSkillName, setHoveredSkillName] = useState<string | null>(null);

  const currentCategory =
    skillCategories.find((cat) => cat.id === activeCategoryId) || skillCategories[0];

  const activeSkill = hoveredSkillName
    ? currentCategory.skills.find((s) => s.name === hoveredSkillName)
    : currentCategory.skills[0];

  return (
    <section id="skills" className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex items-center gap-3 mb-12">
        <span className="font-mono text-xs text-emerald-400 font-semibold tracking-widest uppercase">
          03 // INTERACTIVE SKILLS MATRIX
        </span>
        <div className="h-px bg-white/10 flex-grow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
            Technical Stack & Capabilities Matrix
          </h2>
          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            Hover over any technical domain to inspect detailed proficiency meters, experience depth, and implementation highlights.
          </p>

          <div className="space-y-2 pt-2">
            {skillCategories.map((category) => {
              const isActive = category.id === activeCategoryId;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategoryId(category.id);
                    setHoveredSkillName(null);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? 'border-emerald-500/40 bg-emerald-950/20 text-white shadow-lg shadow-emerald-950/30'
                      : 'border-white/10 bg-zinc-950/60 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="block text-xs font-mono text-emerald-400">
                      {category.skills.length} MODULES
                    </span>
                    <span className="block font-semibold text-sm">{category.name}</span>
                  </div>
                  <Sparkles
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-emerald-400 scale-110' : 'text-zinc-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <SpotlightCard className="p-6 sm:p-8 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{currentCategory.name}</h3>
                <p className="text-xs text-zinc-400 font-light">{currentCategory.description}</p>
              </div>
              <span className="font-mono text-xs text-zinc-500">
                ACTIVE FOCUS: {currentCategory.skills.length} SKILLS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentCategory.skills.map((skill) => {
                const isHovered = hoveredSkillName === skill.name;
                return (
                  <motion.div
                    key={skill.name}
                    onMouseEnter={() => setHoveredSkillName(skill.name)}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isHovered
                        ? 'border-indigo-500/60 bg-indigo-950/30 shadow-lg shadow-indigo-950/40'
                        : 'border-white/10 bg-zinc-900/50 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-sm text-white">{skill.name}</span>
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-zinc-300">
                        {skill.tag}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                        <span>Proficiency</span>
                        <span className="text-indigo-400 font-bold">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {activeSkill && (
                <motion.div
                  key={activeSkill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-5 rounded-xl border border-indigo-500/30 bg-zinc-900/80 backdrop-blur-md space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-indigo-400">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" />
                      SKILL TELEMETRY INSPECTOR
                    </span>
                    <span>EXPERIENCE: {activeSkill.yearsOfExp}</span>
                  </div>

                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{activeSkill.name}</h4>
                      <p className="text-xs text-zinc-300 font-light">
                        {activeSkill.highlight || 'Advanced client architecture and production usage.'}
                      </p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 ml-4" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
