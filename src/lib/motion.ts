"use client";

import { useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";

/**
 * Default easing curve from the design brief — ease-out-expo
 * "starts fast and settles gently. It feels expensive."
 */
export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Returns a Framer Motion transition object that respects
 * prefers-reduced-motion. If reduced motion is preferred,
 * all durations become instant (0).
 */
export function useMotionTransition(
  duration: number = 0.6,
  delay: number = 0,
  ease: [number, number, number, number] = EASE_EXPO
): Transition {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return { duration: 0, delay: 0 };
  }

  return { duration, delay, ease };
}

/**
 * Standard scroll-reveal animation variants
 */
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_EXPO },
  },
};

/**
 * Card stagger container
 */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

/**
 * Card stagger child
 */
export const staggerChild = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_EXPO },
  },
};
