"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { EASE_EXPO, staggerContainer, staggerChild } from "@/lib/motion";

const SOCIAL_TILES = [
  { title: "Smash Burger Tutorial", views: "2.4M views", image: "/social-1.png" },
  { title: "Behind the Counter", views: "890K views", image: "/social-2.png" },
  { title: "The Secret Sauce", views: "1.1M views", image: "/social-3.png" },
  { title: "Customer Reactions", views: "3.2M views", image: "/social-4.png" },
  { title: "New Location Reveal", views: "640K views", image: "/social-5.png" },
  { title: "Late Night Service", views: "1.7M views", image: "/social-6.png" },
];

export default function SocialGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="socials"
      ref={ref}
      className="relative py-24 md:py-32"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(232, 100, 90, 0.08) 0%, transparent 70%), var(--bg-base)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
          className="mb-16 md:mb-20"
        >
          <div className="eyebrow mb-4">ON SOCIAL</div>
          <h2
            className="heading-gradient mb-4"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Going viral daily.
          </h2>
          <p
            className="max-w-lg"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "16px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            We don&apos;t just serve food - we create content. Follow the journey
            across TikTok and Instagram.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {SOCIAL_TILES.map((tile) => (
            <SocialTile key={tile.title} tile={tile} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SocialTile({
  tile,
}: {
  tile: (typeof SOCIAL_TILES)[0];
}) {
  return (
    <motion.div
      variants={staggerChild}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: EASE_EXPO }}
      className="relative aspect-[4/5] rounded-[16px] overflow-hidden cursor-pointer group"
      style={{
        border: "1px solid var(--border)",
        transition:
          "border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(232, 100, 90, 0.4)";
        e.currentTarget.style.boxShadow =
          "0 0 24px rgba(232, 100, 90, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Actual image */}
      <Image
        src={tile.image}
        alt={tile.title}
        fill
        className="object-cover food-image transition-transform duration-500 group-hover:scale-[1.06]"
        sizes="(max-width: 768px) 50vw, 33vw"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
        }}
      />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center z-[2]">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center opacity-60 group-hover:opacity-90 transition-opacity duration-300"
          style={{ background: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(8px)" }}
        >
          <svg
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            className="ml-1"
          >
            <path d="M15 9L1 17V1L15 9Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Info overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-[2]">
        <p
          className="mb-1"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          {tile.title}
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "11px",
            color: "var(--text-secondary)",
          }}
        >
          {tile.views}
        </p>
      </div>
    </motion.div>
  );
}
