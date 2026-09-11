"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import Image from "next/image";

const ProfileCard = () => {
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
    <>
      <motion.div
        initial={false}
        animate={
          mounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center relative z-30 pt-20"
      >
        <motion.div
          className="mb-10 relative group cursor-pointer"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient Glow Aura */}
          <div
            aria-hidden
            className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-white/20 via-white/10 to-transparent blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          />

          {/* Profile Image Container */}
          <div className="relative w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-full p-[3px] bg-gradient-to-b from-white/40 via-white/15 to-white/5 shadow-[0_0_50px_rgba(255,255,255,0.18)] group-hover:shadow-[0_0_70px_rgba(255,255,255,0.3)] transition-all duration-700">
            <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
              <Image
                src={avatarUrl}
                alt="Sonsuscato (Kayra Divrik)"
                width={240}
                height={240}
                priority
                unoptimized
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-3 flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Sonsuscato</h1>
          <span className="text-sm font-semibold text-cyan-400 font-mono tracking-widest uppercase mt-1">Kayra Divrik</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 mb-6 w-full"
        >
          <div className="text-base md:text-xl text-white/90 font-semibold text-center leading-relaxed tracking-wide">
            <div>Cybersecurity &amp; Linux Systems Engineer</div>
          </div>

          {/* Animated Tech Stack Badges */}
          <motion.div
            initial="hidden"
            animate={mounted ? "show" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.07, delayChildren: 0.4 }
              }
            }}
            className="flex flex-wrap items-center justify-center gap-2 max-w-md pt-2 px-4"
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
                  hidden: { opacity: 0, scale: 0.8, y: 12 },
                  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 22 } }
                }}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-cyan-500/50 text-zinc-300 hover:text-white backdrop-blur-md transition-all duration-300 shadow-md cursor-default flex items-center gap-1.5 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 group-hover:scale-125 group-hover:bg-cyan-300 transition-all duration-300" />
                <span>{tech}</span>
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ProfileCard;
