import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import { MagneticButton } from '../animations/MagneticButton';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../ui/Icons';

const navItems = [
  { name: 'About', href: '#about', desc: 'Bio & Engineering Pillars' },
  { name: 'Projects', href: '#projects', desc: 'Selected Production Systems' },
  { name: 'Skills', href: '#skills', desc: 'Tech Stack & Capabilities' },
  { name: 'Education', href: '#experience', desc: 'Background & Certifications' },
  { name: 'Contact', href: '#contact', desc: 'Direct Message & Inquiries' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;

          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${progress}%`;
          }

          // Section active detection
          const sections = navItems.map(item => item.href.substring(1));
          const scrollPos = window.scrollY + 200;

          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el && el.offsetTop <= scrollPos) {
              setActiveSection(prev => (prev !== sections[i] ? sections[i] : prev));
              break;
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Scroll Progress Line */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-zinc-900">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-[#68705A] via-[#C8F23D] to-[#68705A] transition-all duration-75"
          style={{ width: '0%' }}
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
              className="md:hidden p-2.5 rounded-full border border-[#3F4739] bg-[#1B1E1A]/90 text-[#969B91] hover:text-[#E8EAE3] backdrop-blur-md shadow-lg transition-transform active:scale-95"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#C8F23D]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Sleek Floating Glass Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Floating Dropdown Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -16 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="fixed top-20 inset-x-4 max-w-md mx-auto z-40 rounded-3xl border border-[#3F4739] bg-[#1B1E1A]/95 backdrop-blur-2xl shadow-2xl p-5 space-y-5 md:hidden overflow-hidden"
            >
              {/* Header inside card: Status & Category */}
              <div className="flex items-center justify-between pb-3 border-b border-[#3F4739]">
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#969B91]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C8F23D]" />
                  <span>NAVIGATION</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#C8F23D]/30 bg-[#C8F23D]/10 text-[10px] font-mono text-[#C8F23D]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8F23D] opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C8F23D]" />
                  </span>
                  <span>AVAILABLE</span>
                </div>
              </div>

              {/* Navigation List */}
              <div className="space-y-1.5">
                {navItems.map((item, idx) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`group flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 ${
                        isActive
                          ? 'border-[#68705A] bg-[#222720] text-[#E8EAE3]'
                          : 'border-transparent hover:border-[#3F4739] hover:bg-[#111311]/50 text-[#969B91] hover:text-[#E8EAE3]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#C8F23D] font-bold">
                          0{idx + 1}.
                        </span>
                        <div>
                          <div className="text-base font-bold text-[#E8EAE3] tracking-tight group-hover:text-[#C8F23D] transition-colors">
                            {item.name}
                          </div>
                          <div className="text-[10px] font-mono text-[#787268] group-hover:text-[#969B91] transition-colors">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#68705A] group-hover:text-[#C8F23D] group-hover:translate-x-0.5 transition-all" />
                    </a>
                  );
                })}
              </div>

              {/* Footer Info inside Card */}
              <div className="pt-3 border-t border-[#3F4739] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#787268]">
                  <MapPin className="w-3 h-3 text-[#68705A]" />
                  <span>DUHOK, IRAQ</span>
                </div>

                {/* Quick Social Buttons */}
                <div className="flex items-center gap-2">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-social-github !p-2"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-social-linkedin !p-2"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                  </a>
                  {personalInfo.instagram && (
                    <a
                      href={personalInfo.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-social-instagram !p-2"
                      aria-label="Instagram Profile"
                    >
                      <InstagramIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
