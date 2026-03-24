"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--accent)" }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
          className="mb-6"
          style={{
            fontFamily: "'Bebas Neue', system-ui, sans-serif",
            fontSize: "clamp(56px, 10vw, 120px)",
            color: "white",
            lineHeight: 1,
            letterSpacing: "0",
          }}
        >
          HUNGRY YET?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_EXPO }}
          className="mb-10 max-w-md mx-auto"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "16px",
            color: "rgba(255, 255, 255, 0.8)",
            lineHeight: 1.7,
          }}
        >
          Order online for collection or delivery. No waiting. No compromises.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_EXPO }}
        >
          <motion.a
            href="/order"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE_EXPO }}
            className="inline-block px-10 py-4 rounded-full font-semibold tracking-wider text-sm select-none"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              background: "white",
              color: "var(--accent)",
              letterSpacing: "0.06em",
              fontSize: "13px",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
            }}
          >
            ORDER NOW
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
