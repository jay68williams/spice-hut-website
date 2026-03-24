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
              "radial-gradient(ellipse 60% 40% at 50% 80%, rgba(239, 107, 95, 0.08) 0%, transparent 70%)",
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
          &nbsp;&nbsp;EST. 2020&nbsp;&nbsp;
          <span style={{ color: "var(--accent)" }}>·</span>
          &nbsp;&nbsp;6 LOCATIONS&nbsp;&nbsp;
          <span style={{ color: "var(--accent)" }}>·</span>
          &nbsp;&nbsp;NORTH EAST
        </div>

        {/* Headline - Bebas Neue */}
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
            SMOK'D N SMASH'D
          </span>
        </h1>
        <h2
          className="leading-none select-none mt-2"
          style={{
            fontFamily: "'Bebas Neue', system-ui, sans-serif",
            letterSpacing: "0.02em",
            fontSize: "clamp(36px, 5vw, 64px)",
            color: "var(--accent)",
          }}
        >
          BUILT DIFFERENT.
        </h2>

        {/* Subtitle */}
        <p
          className="mt-6 max-w-md"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "16px",
            color: "#FFFFFF",
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

      {/* Floating Rating Pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: EASE_EXPO }}
        className="absolute z-10 hidden md:flex"
        style={{ bottom: "120px", right: "48px" }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex items-center gap-3 px-5 py-3 rounded-full"
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
          }}
        >
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  fontSize: "13px",
                  color:
                    star <= 4 ? "#f59e0b" : "rgba(245, 158, 11, 0.4)",
                }}
              >
                ★
              </span>
            ))}
          </div>
          <span
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              color: "white",
            }}
          >
            4.53
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "11px",
              color: "rgba(255, 255, 255, 0.5)",
              letterSpacing: "0.02em",
            }}
          >
            7,000+ reviews
          </span>
        </motion.div>
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
  const ref = useRef<HTMLDivElement>(null);
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
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3, ease: EASE_EXPO }}
      style={{ x: springX, y: springY, display: "inline-block" }}
    >
      <a
        href="/order"
        className="px-8 py-3.5 rounded-full text-white text-sm font-semibold tracking-wider select-none cursor-pointer inline-block"
        style={{
          background: "var(--accent)",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          letterSpacing: "0.06em",
          fontSize: "13px",
          boxShadow: "0 4px 24px rgba(239, 107, 95, 0.3)",
          textDecoration: "none",
        }}
      >
        ORDER NOW
      </a>
    </motion.div>
  );
}
