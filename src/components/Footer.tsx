"use client";

import { motion } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";

const FOOTER_LINKS = {
  Company: ["About Us", "Careers", "Press"],
  Menu: ["Burgers", "Sides", "Drinks", "Desserts"],
  Support: ["FAQs", "Contact", "Allergen Info"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

function TikTokIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.11a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.54z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIALS = [
  { name: "TikTok", Icon: TikTokIcon },
  { name: "Instagram", Icon: InstagramIcon },
  { name: "Twitter", Icon: XIcon },
];

export default function Footer() {
  return (
    <footer
      className="relative pt-20 pb-8"
      style={{
        background: "var(--bg-base)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Warm glow */}
      <div
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(232, 100, 90, 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Top row: branding + links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 mb-16">
          {/* Brand column */}
          <div className="md:col-span-1">
            <h3
              className="mb-4"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "24px",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              Spice Hut
            </h3>
            <p
              className="mb-6 max-w-xs"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "14px",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
              }}
            >
              Street food soul, luxury finish. Serving the North East since
              2018.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.name}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: EASE_EXPO }}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    background: "var(--bg-surface)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border)",
                    transition: "border-color 0.3s ease, color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-hover)";
                    e.currentTarget.style.color = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--text-secondary)";
                  }}
                  aria-label={s.name}
                >
                  <s.Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4
                className="mb-4"
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                }}
              >
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="block"
                      style={{
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        textDecoration: "none",
                        transition: "color 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color =
                          "var(--text-primary)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color =
                          "var(--text-secondary)")
                      }
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "12px",
              color: "var(--text-muted)",
            }}
          >
            © 2026 Spice Hut. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "12px",
              color: "var(--text-muted)",
            }}
          >
            Built by Fusion Creative
          </p>
        </div>
      </div>
    </footer>
  );
}
