"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { EASE_EXPO } from "@/lib/motion";
import { CATEGORIES, MENU_ITEMS, getItemsByCategory } from "@/lib/menu-data";
import type { MenuItem } from "@/lib/menu-data";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const currentItems = getItemsByCategory(activeCategory);
  const currentCategory = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <>
      <Navigation />

      <main className="pt-20 min-h-screen" style={{ background: "var(--bg-base)" }}>
        {/* Hero header */}
        <div
          className="px-6 md:px-12 py-12 md:py-20"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 110%, rgba(232, 100, 90, 0.08) 0%, transparent 70%), var(--bg-base)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_EXPO }}
            >
              <div className="eyebrow mb-3">OUR MENU</div>
              <h1
                className="heading-gradient mb-4"
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: "clamp(36px, 6vw, 64px)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                The full menu.
              </h1>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <p
                  className="max-w-lg"
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "16px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                  }}
                >
                  Everything on our menu, built to make you come back. No filler.
                  No compromises. Just food that slaps.
                </p>
                <span
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "13px",
                    color: "var(--text-muted)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {MENU_ITEMS.length} items across {CATEGORIES.length} categories
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Category tabs */}
        <div
          className="sticky top-[72px] z-30 px-6 md:px-12 py-4"
          style={{
            background: "rgba(8, 8, 8, 0.92)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {CATEGORIES.map((cat) => {
                const isActive = cat.id === activeCategory;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="px-4 py-2 rounded-full whitespace-nowrap text-sm font-semibold tracking-wider cursor-pointer transition-all duration-300 flex-shrink-0"
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "12px",
                      letterSpacing: "0.04em",
                      background: isActive ? "var(--accent)" : "var(--bg-elevated)",
                      color: isActive ? "white" : "var(--text-secondary)",
                      border: isActive
                        ? "1px solid var(--accent)"
                        : "1px solid var(--border)",
                    }}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Menu items */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: EASE_EXPO }}
            >
              {/* Category header */}
              <div className="mb-8">
                <h2
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: "32px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {currentCategory?.name}
                </h2>
                {currentCategory?.description && (
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "15px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {currentCategory.description}
                  </p>
                )}
              </div>

              {/* Items grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentItems.map((item) => (
                  <BrowseMenuCard key={item.id} item={item} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <div
          className="px-6 md:px-12 py-16 text-center"
          style={{ background: "var(--accent)" }}
        >
          <h2
            className="mb-4"
            style={{
              fontFamily: "'Bebas Neue', system-ui, sans-serif",
              fontSize: "clamp(40px, 8vw, 80px)",
              color: "white",
              lineHeight: 1,
            }}
          >
            READY TO ORDER?
          </h2>
          <p
            className="mb-8 max-w-md mx-auto"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "16px",
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.7,
            }}
          >
            Pick your favourites and order online for collection or delivery.
          </p>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/order"
              className="inline-block px-10 py-4 rounded-full font-semibold tracking-wider text-sm select-none"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                background: "white",
                color: "var(--accent)",
                letterSpacing: "0.06em",
                fontSize: "13px",
                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
                textDecoration: "none",
              }}
            >
              START YOUR ORDER
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}

/* ─── Browse-only Menu Card (with subtle Order Now) ─── */
function BrowseMenuCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE_EXPO }}
      className="relative rounded-[16px] overflow-hidden group"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(232, 100, 90, 0.25)";
        e.currentTarget.style.boxShadow =
          "0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(232, 100, 90, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.2)";
      }}
    >
      <div className="p-5">
        {/* Badge */}
        {item.badge && (
          <div className="mb-2">
            <span
              className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide"
              style={{
                background: "rgba(232, 100, 90, 0.15)",
                color: "var(--accent)",
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              {item.badge}
            </span>
          </div>
        )}

        {/* Top row: name + price */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h4
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--text-primary)",
              lineHeight: 1.3,
            }}
          >
            {item.name}
          </h4>
          <span
            className="flex-shrink-0"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "15px",
              fontWeight: 700,
              color: "var(--accent)",
              whiteSpace: "nowrap",
            }}
          >
            £{item.price.toFixed(2)}
          </span>
        </div>

        {/* Description */}
        <p
          className="mb-4"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "13px",
            color: "var(--text-secondary)",
            lineHeight: 1.5,
          }}
        >
          {item.description}
        </p>

        {/* Subtle Order Now link */}
        <Link
          href="/order"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wider transition-all duration-300 opacity-60 group-hover:opacity-100"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            color: "var(--accent)",
            background: "rgba(232, 100, 90, 0.08)",
            border: "1px solid rgba(232, 100, 90, 0.12)",
            textDecoration: "none",
            letterSpacing: "0.06em",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(232, 100, 90, 0.15)";
            e.currentTarget.style.borderColor = "rgba(232, 100, 90, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(232, 100, 90, 0.08)";
            e.currentTarget.style.borderColor = "rgba(232, 100, 90, 0.12)";
          }}
        >
          Order Now
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M3 1.5L7 5L3 8.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}
