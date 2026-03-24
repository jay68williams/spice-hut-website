"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { EASE_EXPO } from "@/lib/motion";
import { useLocation } from "@/context/LocationContext";

const NAV_LINKS = [
  { label: "MENU", href: "/menu" },
  { label: "LOCATIONS", href: "/#locations" },
  { label: "ABOUT", href: "/#about" },
  { label: "SOCIALS", href: "/#socials" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { selectedLocation, setShowPicker } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 transition-all duration-400"
        style={{
          background: scrolled
            ? "rgba(10, 10, 10, 0.88)"
            : "rgba(10, 10, 10, 0.75)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          borderBottom: scrolled
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="font-heading text-white text-xl tracking-tight select-none"
          style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "20px", textDecoration: "none" }}
        >
          Smok'd N Smash'd
        </Link>

        {/* Location indicator */}
        {selectedLocation && (
          <button
            onClick={() => setShowPicker(true)}
            className="hidden md:flex items-center gap-1.5 cursor-pointer"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--text-muted)",
              background: "none",
              border: "none",
              padding: 0,
            }}
          >
            <span style={{ fontSize: "12px" }}>📍</span>
            <span style={{ color: "var(--accent)", fontWeight: 500 }}>
              {selectedLocation.name}
            </span>
          </button>
        )}

        {/* Centre nav links - desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.label} href={link.href} label={link.label} />
          ))}
        </div>

        {/* Right side - CTA + Hamburger */}
        <div className="flex items-center gap-4">
          {/* CTA button */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.3, ease: EASE_EXPO }}>
            <Link
              href="/order"
              className="hidden md:inline-flex text-white text-xs font-semibold tracking-wider px-6 py-2.5 rounded-full select-none"
              style={{
                background: "var(--accent)",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                letterSpacing: "0.06em",
                textDecoration: "none",
              }}
            >
              ORDER NOW
            </Link>
          </motion.div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: EASE_EXPO }}
              className="block w-5 h-[1.5px] bg-white origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-[1.5px] bg-white"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: EASE_EXPO }}
              className="block w-5 h-[1.5px] bg-white origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_EXPO }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{
              background: "rgba(8, 8, 8, 0.96)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.06,
                    ease: EASE_EXPO,
                  }}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: "'Bebas Neue', system-ui, sans-serif",
                    fontSize: "48px",
                    color: "var(--text-primary)",
                    textDecoration: "none",
                    lineHeight: 1.2,
                    letterSpacing: "0.02em",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{
                  duration: 0.4,
                  delay: NAV_LINKS.length * 0.06,
                  ease: EASE_EXPO,
                }}
              >
                <Link
                  href="/order"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 px-10 py-4 rounded-full text-white text-sm font-semibold tracking-wider inline-block"
                  style={{
                    background: "var(--accent)",
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    letterSpacing: "0.06em",
                    fontSize: "14px",
                    boxShadow: "0 4px 24px rgba(239, 107, 95, 0.3)",
                    textDecoration: "none",
                  }}
                >
                  ORDER NOW
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="relative group"
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.12em",
        color: "var(--text-secondary)",
        textDecoration: "none",
        transition: "color 0.3s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.color = "var(--text-primary)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.color = "var(--text-secondary)")
      }
    >
      {label}
      {/* Coral underline that slides in from left */}
      <span
        className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
        style={{
          background: "var(--accent)",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </a>
  );
}
