"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { EASE_EXPO } from "@/lib/motion";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: background moves at 0.4x scroll speed
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      id="hero"
    >
      {/* Parallax Background Image */}
      <motion.div className="absolute inset-0 w-full h-[140%]" style={{ y: bgY }}>
        <Image
          src="/hero-bg.png"
          alt="Smash burger on the grill"
          fill
          priority
          className="object-cover food-image"
          sizes="100vw"
        />
        {/* Dark overlay at 55% */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0, 0, 0, 0.55)" }}
        />
        {/* Warm radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 80%, rgba(232, 100, 90, 0.08) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE_EXPO }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
      >
        {/* Eyebrow */}
        <div
          className="mb-6"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            color: "var(--text-secondary)",
          }}
        >
          <span style={{ color: "var(--accent)" }}>·</span>
          &nbsp;&nbsp;EST. 2018&nbsp;&nbsp;
          <span style={{ color: "var(--accent)" }}>·</span>
          &nbsp;&nbsp;8 LOCATIONS&nbsp;&nbsp;
          <span style={{ color: "var(--accent)" }}>·</span>
          &nbsp;&nbsp;NORTH EAST
        </div>

        {/* Headline — Bebas Neue */}
        <h1
          className="leading-none select-none"
          style={{
            fontFamily: "'Bebas Neue', system-ui, sans-serif",
            letterSpacing: "0",
          }}
        >
          <span
            className="block text-white"
            style={{ fontSize: "clamp(80px, 12vw, 160px)" }}
          >
            BUILT
          </span>
          <span
            className="block"
            style={{
              fontSize: "clamp(80px, 12vw, 160px)",
              color: "var(--accent)",
            }}
          >
            DIFFERENT.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="mt-6 max-w-md"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "16px",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
          }}
        >
          Bold flavours, zero compromise. Smash burgers, loaded fries and food
          that hits different.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-10">
          <MagneticButton />
          <motion.a
            href="#locations"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE_EXPO }}
            className="px-8 py-3.5 rounded-full text-sm font-semibold tracking-wider select-none"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              color: "var(--text-primary)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              letterSpacing: "0.06em",
              fontSize: "13px",
            }}
          >
            FIND US
          </motion.a>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2, ease: EASE_EXPO }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "var(--accent)" }}
        />
        <span
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.16em",
            color: "var(--text-muted)",
          }}
        >
          SCROLL
        </span>
      </motion.div>
    </section>
  );
}

/**
 * Magnetic CTA Button
 * Gently pulls toward the cursor when within 80px.
 * Uses Framer Motion's useMotionValue + useSpring.
 */
function MagneticButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const dist = Math.sqrt(distX * distX + distY * distY);
    if (dist < 80) {
      x.set(distX * 0.15);
      y.set(distY * 0.15);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href="#order"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3, ease: EASE_EXPO }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="px-8 py-3.5 rounded-full text-white text-sm font-semibold tracking-wider select-none cursor-pointer"
      style={{
        x: springX,
        y: springY,
        background: "var(--accent)",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        letterSpacing: "0.06em",
        fontSize: "13px",
        boxShadow: "0 4px 24px rgba(232, 100, 90, 0.3)",
      }}
    >
      ORDER NOW
    </motion.a>
  );
}
