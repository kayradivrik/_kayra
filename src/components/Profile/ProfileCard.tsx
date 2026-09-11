"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Github } from "lucide-react";
import { MdMailOutline } from "react-icons/md";

interface ProfileCardProps {
  onOpenContact?: () => void;
}

const ProfileCard = ({ onOpenContact }: ProfileCardProps) => {
  const [mounted, setMounted] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("https://github.com/kayradivrik.png");

  useEffect(() => {
    setMounted(true);
    async function fetchGithubAvatar() {
      try {
        const res = await fetch("https://api.github.com/users/kayradivrik");
        if (res.ok) {
          const data = await res.json();
          if (data.avatar_url) {
            setAvatarUrl(data.avatar_url);
          }
        }
      } catch (err) {
        console.warn("GitHub avatar load fallback:", err);
      }
    }
    fetchGithubAvatar();
  }, []);

  return (
    <motion.div
      initial={false}
      animate={mounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto px-4 z-30 pt-12 md:pt-16"
    >
      <div className="flex flex-col md:flex-row items-center justify-center md:items-center text-center md:text-left gap-8 md:gap-12 p-6 sm:p-10 rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Subtle Background Glow Accent */}
        <div aria-hidden className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        {/* Profile Image Container */}
        <motion.div
          className="relative group cursor-pointer shrink-0"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient Glow Aura */}
          <div
            aria-hidden
            className="absolute -inset-4 rounded-full bg-gradient-to-tr from-white/20 via-white/10 to-transparent blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          />

          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full p-[3px] bg-gradient-to-b from-white/40 via-white/15 to-white/5 shadow-[0_0_50px_rgba(255,255,255,0.18)] group-hover:shadow-[0_0_70px_rgba(255,255,255,0.3)] transition-all duration-700">
            <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
              <Image
                src={avatarUrl}
                alt="Sonsuscato (Kayra Divrik)"
                width={200}
                height={200}
                priority
                unoptimized
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </motion.div>

        {/* Right Info Section */}
        <div className="flex flex-col items-center md:items-start flex-1">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center md:items-start mb-2"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Sonsuscato
            </h1>
            <span className="text-xs sm:text-sm font-semibold text-cyan-400 font-mono tracking-widest uppercase mt-1">
              Kayra Divrik
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-zinc-300 font-medium leading-relaxed tracking-wide mb-4"
          >
            Cybersecurity &amp; Linux Systems Engineer
          </motion.div>

          {/* Animated Tech Stack Badges */}
          <motion.div
            initial="hidden"
            animate={mounted ? "show" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.06, delayChildren: 0.35 }
              }
            }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-6 max-w-lg"
          >
            {[
              "C++",
              "Linux",
              "Next.js",
              "Cybersecurity",
              "Python",
              "TypeScript",
              "Bash"
            ].map((tech) => (
              <motion.span
                key={tech}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 10 },
                  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 22 } }
                }}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-cyan-500/50 text-zinc-300 hover:text-white backdrop-blur-md transition-all duration-300 shadow-md cursor-default flex items-center gap-1.5 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 group-hover:scale-125 group-hover:bg-cyan-300 transition-all duration-300" />
                <span>{tech}</span>
              </motion.span>
            ))}
          </motion.div>

          {/* Contact & GitHub Actions Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-4"
          >
            {onOpenContact && (
              <motion.button
                onClick={onOpenContact}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-6 py-2.5 bg-white text-black font-bold rounded-xl text-xs sm:text-sm hover:bg-white/90 transition-all duration-300 shadow-xl"
              >
                <MdMailOutline size={18} />
                <span>Contact</span>
              </motion.button>
            )}

            <motion.a
              href="https://github.com/kayradivrik"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-6 py-2.5 bg-white/[0.06] border border-white/20 hover:border-white/50 rounded-xl text-white hover:bg-white/[0.09] transition-all duration-300 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-xl"
            >
              <Github size={18} />
              <span>GitHub</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;

