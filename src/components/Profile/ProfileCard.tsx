"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import Image from "next/image";

const ProfileCard = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
                src="/profile.jpg"
                alt="Kayra Divrik"
                width={240}
                height={240}
                priority
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
            <div>Siber Güvenlik &amp; Linux</div>
          </div>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-md pt-2 px-4">
            {[
              { name: "C++", color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-300" },
              { name: "Linux", color: "from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-300" },
              { name: "Next.js", color: "from-zinc-500/20 to-white/10 border-white/20 text-white" },
              { name: "Siber Güvenlik", color: "from-red-500/20 to-rose-500/20 border-red-500/30 text-red-300" },
              { name: "Python", color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300" },
              { name: "TypeScript", color: "from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-300" },
              { name: "Bash", color: "from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-300" },
            ].map((tech) => (
              <motion.span
                key={tech.name}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-full bg-gradient-to-r ${tech.color} border backdrop-blur-md transition-all shadow-md cursor-default`}
              >
                {tech.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ProfileCard;
