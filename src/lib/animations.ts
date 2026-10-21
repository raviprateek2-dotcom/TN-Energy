import type { Variants, Transition } from "framer-motion";

export const defaultTransition: Transition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1], // easeOutExpo
};

export const gentleTransition: Transition = {
  duration: 0.7,
  ease: [0.25, 0.1, 0.25, 1],
};

export const springTransition: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
};

// Fade In + Up (Standard entrance for headlines, cards, text blocks)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

// Fade In + Down (For alerts, dropdowns, headers)
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

// Fade In + Left
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

// Fade In + Right
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

// Scale In (For badges, modal dialogs, highlight pills)
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
};

// Staggered Container for Grids, Lists, Metric Blocks
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Slide Down Dropdown Variant
export const slideDown: Variants = {
  hidden: { opacity: 0, y: -8, scaleY: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -6,
    scaleY: 0.96,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

// Interactive Hover Physics for Cards
export const cardHoverMotion = {
  whileHover: { y: -6, transition: { duration: 0.25, ease: "easeOut" } },
  whileTap: { y: -2, transition: { duration: 0.1 } },
};

// Button Press Feedback
export const buttonTapMotion = {
  whileHover: { scale: 1.02, transition: { duration: 0.15 } },
  whileTap: { scale: 0.97, transition: { duration: 0.1 } },
};
