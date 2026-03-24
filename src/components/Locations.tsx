"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_EXPO, staggerContainer, staggerChild } from "@/lib/motion";

const LOCATIONS = [
  {
    name: "Newcastle City Centre",
    address: "41 Grainger Street, NE1 5JE",
    hours: "11am — 11pm daily",
    phone: "0191 123 4567",
  },
  {
    name: "Durham",
    address: "12 Saddler Street, DH1 3NP",
    hours: "11am — 10pm daily",
    phone: "0191 234 5678",
  },
  {
    name: "Sunderland",
    address: "8 High Street West, SR1 3DP",
    hours: "11am — 10pm daily",
    phone: "0191 345 6789",
  },
  {
    name: "Gateshead Quays",
    address: "Baltic Quarter, NE8 3BA",
    hours: "12pm — 11pm daily",
    phone: "0191 456 7890",
  },
];

export default function Locations() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="locations"
      ref={ref}
      className="relative py-24 md:py-32"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 110%, rgba(232, 100, 90, 0.08) 0%, transparent 70%), var(--bg-base)",
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
          <div className="eyebrow mb-4">OUR LOCATIONS</div>
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
            Find your nearest.
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
            8 locations across the North East. Walk in, order up, and sit down
            somewhere that feels right.
          </p>
        </motion.div>

        {/* Location cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {LOCATIONS.map((loc) => (
            <LocationCard key={loc.name} location={loc} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function LocationCard({
  location,
}: {
  location: (typeof LOCATIONS)[0];
}) {
  return (
    <motion.div
      variants={staggerChild}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3, ease: EASE_EXPO }}
      className="relative rounded-[20px] overflow-hidden cursor-pointer group"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-layer-1)",
        transition:
          "box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 24px 64px rgba(0, 0, 0, 0.8), 0 4px 16px rgba(232, 100, 90, 0.15)";
        e.currentTarget.style.borderColor = "rgba(232, 100, 90, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "0 8px 32px rgba(0, 0, 0, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4)";
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
      }}
    >
      {/* Hover glow */}
      <div
        className="card-glow absolute inset-[-1px] rounded-[21px] pointer-events-none z-0 opacity-0 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(232, 100, 90, 0.15), transparent 70%)",
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Coral left border accent */}
      <div
        className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full z-[1]"
        style={{ background: "var(--accent)" }}
      />

      {/* Content */}
      <div className="relative z-[1] p-6 pl-8">
        <h3
          className="mb-2"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "22px",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "var(--text-primary)",
          }}
        >
          {location.name}
        </h3>
        <p
          className="mb-1"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "14px",
            color: "var(--text-secondary)",
          }}
        >
          {location.address}
        </p>
        <div className="flex items-center gap-4 mt-3">
          <span
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: "var(--text-muted)",
              letterSpacing: "0.04em",
            }}
          >
            {location.hours}
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: "var(--accent)",
            }}
          >
            {location.phone}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
