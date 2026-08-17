import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { CustomCursor } from './components/layout/CustomCursor';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { ProjectsPinned } from './components/sections/ProjectsPinned';
import { SkillsMatrix } from './components/sections/SkillsMatrix';
import { ExperienceTimeline } from './components/sections/ExperienceTimeline';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#111311] text-[#E8EAE3] selection:bg-[#C8F23D]/25 selection:text-[#E8EAE3] font-sans antialiased">
      {/* Custom Precision Cursor */}
      <CustomCursor />

      {/* Floating Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <ProjectsPinned />
        <SkillsMatrix />
        <ExperienceTimeline />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
