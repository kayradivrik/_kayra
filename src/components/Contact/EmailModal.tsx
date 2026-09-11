"use client";

import { motion } from 'framer-motion';
import { X, Copy, Mail, Key, Check } from 'lucide-react';
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
  const [copiedKey, setCopiedKey] = useState(false);

  const email = "kayradivrik@example.com";
  const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----

xjMEaLVhZxYJKwYBBAHaRw8BAQdAYCbxOK9pqLASi7I2+NKDY+evlLxWml/X
7hE6LMHssyLNJ3NsNGRlc2VjQHByb3Rvbi5tZSA8c2w0ZGVzZWNAcHJvdG9u
Lm1lPsLAEQQTFgoAgwWCaLVhZwMLCQcJEDzx1wF4hx8aRRQAAAAAABwAIHNh
bHRAbm90YXRpb25zLm9wZW5wZ3Bqcy5vcmf+BWCvNnU7Xq5ypkLi8dYeHMl0
K1UcXcS4jalPHmiwbQMVCggEFgACAQIZAQKbAwIeARYhBP7OsL1jpgK6CgIe
gTzx1wF4hx8aAADHgQD/QbWVUCYjzw1SOAVZkLmDclT4/iTlH9DCmceVU78i
mdEBAPSNm71n2Q2fENQMI456yvKr9I9DMs1Fzzq1bJZvilEKzjgEaLVhZxIK
KwYBBAGXVQEFAQEHQOELDlOuqQLK3o2p+62gN60DFE2orIE11naXY8GshbQ4
AwEIB8K+BBgWCgBwBYJotWFnCRA88dcBeIcfGkUUAAAAAAAcACBzYWx0QG5v
dGF0aW9ucy5vcGVucGdwanMub3JnLzXn+VdWdLkkJ53nFTErCYmTPqSFOdt7
32EBYipAcJ4CmwwWIQT+zrC9Y6YCugoCHoE88dcBeIcfGgAAfjABAOWcpyHs
y8O2KcV9/GfdQrqqrjcXQtKLyXgjmjN0ZNTYAQCuDI+StG5k5mhuPvXDxwOD
u/XhyWpiDZsKByfZkw3lDw==
=Yacp
-----END PGP PUBLIC KEY BLOCK-----`;

  const copyToClipboard = (text: string, isKey: boolean) => {
    navigator.clipboard.writeText(text);
    if (isKey) {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const openMailClient = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} panelClassName="max-w-md" labelledBy="contact-title">
      <motion.div variants={content} className="p-6 md:p-8">
        <motion.div variants={item} className="flex justify-between items-center mb-6">
          <h2 id="contact-title" className="text-2xl font-bold text-white">Contact via Email</h2>
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
            <label className="text-white/60 text-sm font-medium">Email Me (PGP):</label>
            <div className="aurora-inset flex items-center gap-2 rounded-xl p-3 transition-colors">
              <span className="text-white font-mono text-sm sm:text-base flex-1 truncate">{email}</span>
              <button
                onClick={() => copyToClipboard(email, false)}
                className="text-white/70 hover:text-white transition-colors"
                title="Copy Email"
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
            onClick={() => copyToClipboard(pgpKey, true)}
            className="aurora-inset w-full flex items-center justify-center gap-2 p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/[0.09] transition-all active:scale-[0.98]"
          >
            <Key size={18} />
            <span className="font-medium">{copiedKey ? 'PGP Key Copied!' : 'Copy PGP Key'}</span>
          </motion.button>

          <motion.button
            variants={item}
            onClick={openMailClient}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-white text-black hover:bg-white/85 transition-all active:scale-[0.98] font-bold"
          >
            <Mail size={18} />
            Open Mail Client
          </motion.button>
        </div>
      </motion.div>
    </ModalShell>
  );
};

export default EmailModal;
