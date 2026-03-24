"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { EASE_EXPO, staggerContainer, staggerChild } from "@/lib/motion";
import { LOCATIONS } from "@/lib/locations";
import type { LocationData } from "@/lib/locations";

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
          "radial-gradient(ellipse 80% 50% at 50% 110%, rgba(239, 107, 95, 0.08) 0%, transparent 70%), var(--bg-base)",
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
            className="max-w-lg mb-6"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "16px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            6 locations across the North East. Walk in, order up, and sit down
            somewhere that feels right.
          </p>

          {/* Consolidated rating banner */}
          <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    fontSize: "14px",
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
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              4.53
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "12px",
                color: "var(--text-muted)",
              }}
            >
              from 7,000+ reviews across all locations
            </span>
          </div>
        </motion.div>

        {/* Location cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {LOCATIONS.map((loc) => (
            <LocationCard key={loc.name} location={loc} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function LocationCard({ location }: { location: LocationData }) {
  const isComingSoon = location.badge === "Coming soon";

  const cardContent = (
    <motion.div
      variants={staggerChild}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3, ease: EASE_EXPO }}
      className="relative rounded-[20px] overflow-hidden cursor-pointer group h-full"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-layer-1)",
        transition:
          "box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 24px 64px rgba(0, 0, 0, 0.8), 0 4px 16px rgba(239, 107, 95, 0.15)";
        e.currentTarget.style.borderColor = "rgba(239, 107, 95, 0.4)";
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
            "radial-gradient(ellipse at center, rgba(239, 107, 95, 0.15), transparent 70%)",
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
        <div className="flex items-center gap-2 mb-2">
          <h3
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "20px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--text-primary)",
            }}
          >
            {location.name}
          </h3>
          {location.badge && (
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide"
              style={{
                background:
                  isComingSoon
                    ? "rgba(100, 200, 100, 0.15)"
                    : "rgba(239, 107, 95, 0.15)",
                color: isComingSoon ? "#4ade80" : "var(--accent)",
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              {location.badge}
            </span>
          )}
        </div>
        <p
          className="mb-1"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "13px",
            color: "var(--text-secondary)",
            lineHeight: 1.5,
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
          {location.phone && (
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
          )}
        </div>

        {/* "View" indicator on hover */}
        {!isComingSoon && (
          <div
            className="mt-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--accent)",
            }}
          >
            View hours, map & contact →
          </div>
        )}
      </div>
    </motion.div>
  );

  if (isComingSoon) {
    return cardContent;
  }

  return (
    <Link
      href={`/locations/${location.slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      {cardContent}
    </Link>
  );
}
