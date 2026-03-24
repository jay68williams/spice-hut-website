"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { EASE_EXPO, staggerContainer, staggerChild } from "@/lib/motion";

const MENU_ITEMS = [
  {
    title: "The O.G. Smash",
    description: "Double patty, American cheese, pickles, house sauce, brioche bun.",
    price: "£8.50",
    image: "/menu-burger.png",
  },
  {
    title: "Loaded Dirty Fries",
    description: "Skin-on fries, cheese sauce, jalapeños, crispy bacon, spring onion.",
    price: "£6.50",
    image: "/menu-fries.png",
  },
  {
    title: "Honey Sriracha Wings",
    description: "Crispy fried wings, honey sriracha glaze, sesame, spring onion.",
    price: "£7.50",
    image: "/menu-wings.png",
  },
];

export default function MenuTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="menu"
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ background: "var(--bg-light)" }}
    >
      {/* Subtle warm glow at top */}
      <div
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(232, 100, 90, 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
          className="mb-16 md:mb-20"
        >
          <div className="eyebrow mb-4" style={{ color: "#666" }}>
            WHAT WE SERVE
          </div>
          <h2
            className="mb-4"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#1a1a1a",
              lineHeight: 1.1,
            }}
          >
            The menu.
          </h2>
          <p
            className="max-w-lg"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "16px",
              color: "#666",
              lineHeight: 1.7,
            }}
          >
            Every item on our menu is built to make you come back. No filler.
            No compromises. Just food that slaps.
          </p>
        </motion.div>

        {/* Card grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {MENU_ITEMS.map((item) => (
            <MenuCard key={item.title} item={item} />
          ))}
        </motion.div>

        {/* View full menu link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE_EXPO }}
          className="mt-14 text-center"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE_EXPO }}
            className="inline-block px-8 py-3 rounded-full text-sm font-semibold tracking-wider"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              color: "#1a1a1a",
              border: "1px solid rgba(0, 0, 0, 0.15)",
              letterSpacing: "0.06em",
              fontSize: "13px",
            }}
          >
            VIEW FULL MENU
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function MenuCard({ item }: { item: (typeof MENU_ITEMS)[0] }) {
  return (
    <motion.div
      variants={staggerChild}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3, ease: EASE_EXPO }}
      className="relative rounded-[20px] overflow-hidden cursor-pointer group"
      style={{
        background: "#ECEAE6",
        border: "1px solid rgba(0, 0, 0, 0.06)",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
        transition:
          "box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 24px 64px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(232, 100, 90, 0.12)";
        e.currentTarget.style.borderColor = "rgba(232, 100, 90, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)";
        e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.06)";
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-[-1px] rounded-[21px] pointer-events-none z-0 opacity-0 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(232, 100, 90, 0.12), transparent 70%)",
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Image */}
      <div className="relative h-52 md:h-56 overflow-hidden z-[1]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover food-image transition-transform duration-500 group-hover:scale-[1.06]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Gradient fade into card */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 50%, #ECEAE6 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-[1] px-5 pb-6 pt-1">
        <div className="flex items-start justify-between gap-4">
          <h3
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "20px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "#1a1a1a",
            }}
          >
            {item.title}
          </h3>
          <span
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--accent)",
              whiteSpace: "nowrap",
            }}
          >
            {item.price}
          </span>
        </div>
        <p
          className="mt-2"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "14px",
            color: "#888",
            lineHeight: 1.6,
          }}
        >
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}
