"use client";

import { useState, useEffect } from 'react';
import ProfileCard from '../components/Profile/ProfileCard';
import EmailModal from '../components/Contact/EmailModal';
import FogBackground from '../components/UI/FogBackground';
import { useSecurity } from '../hooks/useSecurity';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from '../components/Navigation/Navbar';
import Footer from '../components/Footer/Footer';
import ExperienceSection from '../components/Experience/ExperienceSection';
import ProjectsSection from '../components/Projects/ProjectsSection';

export default function Home() {
  useSecurity();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sectionsExpanded, setSectionsExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const handleToggleExplore = () => {
    if (!sectionsExpanded) {
      setSectionsExpanded(true);
      setTimeout(() => {
        const expElement = document.getElementById('experience');
        if (expElement) {
          expElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      setSectionsExpanded(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-[#000000]" />;
  }

  return (
    <div
      className="min-h-screen flex flex-col relative w-full overflow-x-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Sticky High-Contrast Navbar */}
      <Navbar
        onOpenContact={() => setIsEmailModalOpen(true)}
        onExpandSections={() => setSectionsExpanded(true)}
      />

      <FogBackground anchor={0} />

      <main className="z-10 relative w-full flex-1 flex flex-col items-center pt-16">
        <div id="hero" className="w-full min-h-[75dvh] flex flex-col items-center justify-center relative py-12">
          <ProfileCard
            onOpenContact={() => setIsEmailModalOpen(true)}
            onExploreClick={handleToggleExplore}
            isExpanded={sectionsExpanded}
          />
        </div>

        {/* Expandable Lower Content Sections */}
        <AnimatePresence>
          {sectionsExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 40 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full flex flex-col items-center overflow-hidden"
            >
              {/* Education & Journey Section */}
              <div id="experience" className="w-full">
                <ExperienceSection />
              </div>

              {/* Dynamic GitHub Projects Section */}
              <div id="projects" className="w-full">
                <ProjectsSection />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* High-Contrast Footer */}
      <Footer onOpenContact={() => setIsEmailModalOpen(true)} />

      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </div>
  );
}
