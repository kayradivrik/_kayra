import type { Transition, Variants } from 'framer-motion';

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const EASE_SOFT = [0.4, 0, 0.2, 1] as const;

const DURATION = {
  quick: 0.22,
  veil: 0.62,
} as const;

const SPRING_PANEL: Transition = {
  type: 'spring',
  stiffness: 240,
  damping: 26,
  mass: 0.9,
};

const SPRING_ITEM: Transition = {
  type: 'spring',
  stiffness: 320,
  damping: 30,
  mass: 0.7,
};

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const panelVariants: Variants = {
  hidden: {
    scale: 0.955,
    y: 26,
  },
  visible: {
    scale: 1,
    y: 0,
    transition: SPRING_PANEL,
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 12,
    transition: { duration: DURATION.quick, ease: EASE_SOFT },
  },
};

export const PANEL_BLUR_PX = 14;
export const PANEL_BLUR_SECONDS = DURATION.veil;

export const veilVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.veil, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: DURATION.quick, ease: EASE_SOFT } },
};

export const contentVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.1 },
  },
  exit: {},
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: SPRING_ITEM },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

const reducedCache = new WeakMap<Variants, Variants>();

export function respectMotionPreference(variants: Variants): Variants {
  if (!prefersReducedMotion()) return variants;

  const cached = reducedCache.get(variants);
  if (cached) return cached;

  const flatten = (state: unknown) => {
    if (typeof state !== 'object' || state === null) return state;
    const { opacity } = state as { opacity?: number };
    return { opacity: opacity ?? 1, transition: { duration: 0.15 } };
  };
  const reduced = Object.fromEntries(
    Object.entries(variants).map(([key, value]) => [key, flatten(value)]),
  ) as Variants;

  reducedCache.set(variants, reduced);
  return reduced;
}
