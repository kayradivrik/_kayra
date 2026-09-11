"use client";

import { useState, useEffect } from 'react';
import ProfileCard from '../components/Profile/ProfileCard';
import EmailModal from '../components/Contact/EmailModal';
import FogBackground from '../components/UI/FogBackground';
import { useSecurity } from '../hooks/useSecurity';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { MdMailOutline } from 'react-icons/md';

import Navbar from '../components/Navigation/Navbar';
import Footer from '../components/Footer/Footer';
import ExperienceSection from '../components/Experience/ExperienceSection';
import ProjectsSection from '../components/Projects/ProjectsSection';

export default function Home() {
  useSecurity();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#000000]" />;
  }

  return (
    <div
      className="min-h-screen flex flex-col relative w-full overflow-x-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Sticky High-Contrast Navbar */}
      <Navbar onOpenContact={() => setIsEmailModalOpen(true)} />

      <FogBackground anchor={0} />

      <main className="z-10 relative w-full flex-1 flex flex-col items-center pt-16">
        <div id="hero" className="w-full min-h-[75dvh] flex flex-col items-center justify-center relative py-12">
          <ProfileCard onOpenContact={() => setIsEmailModalOpen(true)} />
        </div>

        {/* Education & Journey Section */}
        <div id="experience" className="w-full">
          <ExperienceSection />
        </div>

        {/* Dynamic GitHub Projects Section */}
        <div id="projects" className="w-full">
          <ProjectsSection />
        </div>
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
