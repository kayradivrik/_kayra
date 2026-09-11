"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
  type TargetAndTransition,
} from 'framer-motion';
import { useEffect, type ReactNode } from 'react';

import { useModalPresence } from '../../lib/modalPresence';
import {
  EASE_OUT,
  PANEL_BLUR_PX,
  PANEL_BLUR_SECONDS,
  panelVariants,
  respectMotionPreference,
  veilVariants,
} from '../../lib/motion';
import FogSurface from './FogSurface';

interface ModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  panelClassName?: string;
  onRequestClose?: () => void;
  animateOverride?: TargetAndTransition;
  labelledBy?: string;
}

const ModalShell = ({
  isOpen,
  onClose,
  children,
  panelClassName = 'max-w-md',
  onRequestClose,
  animateOverride,
  labelledBy,
}: ModalShellProps) => {
  useModalPresence(isOpen);

  const close = onRequestClose ?? onClose;
  const panel = respectMotionPreference(panelVariants);
  const veil = respectMotionPreference(veilVariants);

  const blurPx = useMotionValue(PANEL_BLUR_PX);
  const filter = useTransform(blurPx, (v) => (v < 0.02 ? 'none' : `blur(${v}px)`));

  useEffect(() => {
    if (!isOpen) {
      blurPx.set(PANEL_BLUR_PX);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      blurPx.set(0);
      return;
    }
    const controls = animate(blurPx, 0, {
      duration: PANEL_BLUR_SECONDS,
      ease: EASE_OUT,
    });
    return () => controls.stop();
  }, [isOpen, blurPx]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-shell"
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          <motion.div
            variants={veil}
            onClick={close}
            className="absolute inset-0 bg-black/55 backdrop-blur-[3px]"
            style={{ touchAction: 'none' }}
          />

          <motion.div
            data-selectable
            variants={panel}
            {...(animateOverride ? { animate: animateOverride } : {})}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            {...(labelledBy ? { 'aria-labelledby': labelledBy } : {})}
            className={`relative w-full rounded-3xl z-10 overflow-hidden border border-white/[0.09] ${panelClassName}`}
            style={{
              filter,
              backgroundColor: '#070707',
              boxShadow:
                '0 30px 90px -25px rgba(0,0,0,0.9), 0 0 70px -35px rgba(255,255,255,0.28)',
            }}
          >
            <FogSurface fadeSeconds={1.1} maxScale={0.75} />

            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.16) 25%, rgba(255,255,255,0.32) 50%, rgba(255,255,255,0.16) 75%, transparent)',
              }}
            />

            <div className="relative">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalShell;
