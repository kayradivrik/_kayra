"use client";

import { useState, useEffect } from 'react';
import ProfileCard from '../components/Profile/ProfileCard';
import EmailModal from '../components/Contact/EmailModal';
import FogBackground from '../components/UI/FogBackground';
import { useSecurity } from '../hooks/useSecurity';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { MdMailOutline } from 'react-icons/md';

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
      className="min-h-screen flex flex-col relative w-full"
      style={{ backgroundColor: '#000000' }}
    >
      <FogBackground anchor={0} />

      <main className="z-10 relative w-full flex-1 flex flex-col items-center">
        <div className="w-full min-h-[90dvh] flex flex-col items-center justify-center relative">
          <ProfileCard />

          <motion.div
            initial={false}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="mt-8 flex items-center gap-6 z-20"
          >
            <motion.button
              onClick={() => setIsEmailModalOpen(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-8 py-3 bg-white/[0.06] border border-white/20 hover:border-white rounded-2xl text-white hover:bg-white/[0.09] transition-all duration-500 ease-out shadow-2xl"
            >
              <MdMailOutline size={20} />
              <span className="text-base font-bold tracking-tight">Contact</span>
            </motion.button>

            <motion.a
              href="https://github.com/kayradivrik"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-8 py-3 bg-white/[0.06] border border-white/20 hover:border-white rounded-2xl text-white hover:bg-white/[0.09] transition-all duration-500 ease-out shadow-2xl"
            >
              <Github size={20} />
              <span className="text-base font-bold tracking-tight">GitHub</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Dynamic GitHub Projects Section */}
        <ProjectsSection />
      </main>

      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </div>
  );
}
