import React, { useState, useEffect } from 'react';
import { ArrowUp, Clock, Terminal } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Baghdad',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }) + ' AST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#3F4739] bg-[#111311]/90 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-[#969B91]">
        {/* Left Column: Copyright & Status */}
        <div className="flex flex-wrap items-center gap-4 text-center md:text-left">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <Terminal className="w-3.5 h-3.5 text-[#68705A]" />
            © {new Date().getFullYear()} {personalInfo.name}
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="text-zinc-500">ENGINEERED WITH REACT, TS, TAILWIND & GSAP</span>
        </div>

        {/* Center: Live Clock */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3F4739] bg-[#1B1E1A]/70 text-[#E8EAE3]">
          <Clock className="w-3.5 h-3.5 text-[#68705A] animate-pulse" />
          <span>LOCAL TIME: {time || '12:00:00 PST'}</span>
        </div>

        {/* Right: Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#3F4739] bg-[#1B1E1A]/70 text-[#969B91] hover:text-[#E8EAE3] hover:border-[#68705A] hover:text-[#E8EAE3] transition-all"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
