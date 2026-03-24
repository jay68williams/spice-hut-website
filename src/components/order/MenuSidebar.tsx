"use client";

import { motion } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";
import type { MenuCategory } from "@/lib/menu-data";

interface MenuSidebarProps {
  categories: MenuCategory[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function MenuSidebar({
  categories,
  activeCategory,
  onSelectCategory,
}: MenuSidebarProps) {
  return (
    <nav className="w-full">
      <h3
        className="mb-6 hidden md:block"
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.12em",
          color: "var(--text-muted)",
          textTransform: "uppercase",
        }}
      >
        Categories
      </h3>

      {/* Mobile: horizontal scroll */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
        {categories.map((cat) => {
          const isActive = cat.id === activeCategory;
          return (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE_EXPO }}
              onClick={() => onSelectCategory(cat.id)}
              className="relative text-left px-4 py-3 rounded-xl whitespace-nowrap md:whitespace-normal transition-all duration-300 flex-shrink-0"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "14px",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                background: isActive ? "var(--bg-elevated)" : "transparent",
                border: isActive
                  ? "1px solid var(--border-hover)"
                  : "1px solid transparent",
              }}
            >
              {/* Coral left accent — desktop only */}
              {isActive && (
                <motion.div
                  layoutId="categoryIndicator"
                  className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full hidden md:block"
                  style={{ background: "var(--accent)" }}
                  transition={{ duration: 0.3, ease: EASE_EXPO }}
                />
              )}
              {cat.name}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
