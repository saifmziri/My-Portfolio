import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import { MagneticButton } from '../animations/MagneticButton';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      // Section active detection
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Scroll Progress Line */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-zinc-900">
        <div
          className="h-full bg-gradient-to-r from-[#68705A] via-[#C8F23D] to-[#68705A] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Header */}
      <header className="fixed top-4 left-0 right-0 z-40 px-4 sm:px-8 max-w-7xl mx-auto pointer-events-none">
        <div className="flex items-center justify-between">
          {/* Logo Badge */}
          <MagneticButton
            as="a"
            href="#"
            className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full border border-[#3F4739] bg-[#1B1E1A]/85 backdrop-blur-md text-[#E8EAE3] text-sm font-semibold hover:border-[#68705A] transition-all shadow-lg shadow-black/40"
          >
            <div className="p-1 rounded-full bg-[#68705A]/20 text-[#C8F23D]">
              <Code2 className="w-3.5 h-3.5" />
            </div>
            <span className="tracking-tight font-mono">{personalInfo.name}</span>
            <span className="hidden sm:inline-block text-[10px] font-mono text-zinc-500 border-l border-white/10 pl-2">
              PORTFOLIO
            </span>
          </MagneticButton>

          {/* Desktop Navigation Pill */}
          <nav className="pointer-events-auto hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#3F4739] bg-[#1B1E1A]/85 backdrop-blur-md shadow-lg shadow-black/50">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-1.5 text-xs font-mono tracking-wide rounded-full transition-colors ${
                    isActive ? 'text-[#E8EDE5] font-medium' : 'text-[#969B91] hover:text-[#E8EDE5]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-full bg-[#3F4739]/80 border border-[#68705A]/40"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="pointer-events-auto flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full border border-[#293029] bg-[#141814]/90 text-[#969B91] hover:text-[#E8EDE5] backdrop-blur-md shadow-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 pt-24 px-6 bg-[#111311]/95 backdrop-blur-xl border-b border-[#3F4739] md:hidden flex flex-col justify-between pb-12"
          >
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#969B91] uppercase tracking-widest block mb-4">
                Navigation
              </span>
              {navItems.map((item, idx) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-2xl font-bold text-[#E8EAE3] hover:text-[#C8F23D] transition-colors"
                >
                  <span className="text-xs font-mono text-[#68705A] mr-3">0{idx + 1}.</span>
                  {item.name}
                </a>
              ))}
            </div>

            <div className="border-t border-[#3F4739] pt-6 space-y-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="block text-center w-full py-3 rounded-xl bg-[#C8F23D] text-[#111311] font-semibold text-sm hover:bg-[#D5FF63] transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
