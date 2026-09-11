"use client";

import { motion } from 'framer-motion';
import { X, Copy, Mail, Check } from 'lucide-react';
import { useState } from 'react';

import ModalShell from '../UI/ModalShell';
import { contentVariants, itemVariants, respectMotionPreference } from '../../lib/motion';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailModal = ({ isOpen, onClose }: EmailModalProps) => {
  const content = respectMotionPreference(contentVariants);
  const item = respectMotionPreference(itemVariants);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const email = "projects.kayra@gmail.com";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const openMailClient = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} panelClassName="max-w-md" labelledBy="contact-title">
      <motion.div variants={content} className="p-6 md:p-8">
        <motion.div variants={item} className="flex justify-between items-center mb-6">
          <h2 id="contact-title" className="text-2xl font-bold text-white">İletişime Geç</h2>
          <motion.button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-1"
            aria-label="Close modal"
            whileHover={{ rotate: 90 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <X size={22} />
          </motion.button>
        </motion.div>

        <div className="space-y-4">
          <motion.div variants={item} className="space-y-2">
            <label className="text-white/60 text-sm font-medium">E-posta Adresi:</label>
            <div className="aurora-inset flex items-center gap-2 rounded-xl p-3 transition-colors">
              <span className="text-white font-mono text-sm sm:text-base flex-1 truncate">{email}</span>
              <button
                onClick={() => copyToClipboard(email)}
                className="text-white/70 hover:text-white transition-colors p-1"
                title="Kopyala"
              >
                {copiedEmail ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-400">
                    <Check size={18} />
                  </motion.div>
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
          </motion.div>

          <motion.button
            variants={item}
            onClick={openMailClient}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-white text-black hover:bg-white/85 transition-all active:scale-[0.98] font-bold shadow-lg mt-2"
          >
            <Mail size={18} />
            E-posta Uygulamasında Aç
          </motion.button>
        </div>
      </motion.div>
    </ModalShell>
  );
};

export default EmailModal;
