"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";

const STATS = [
  { number: 2000000, suffix: "+", label: "Burgers Served", display: "2M" },
  { number: 8, suffix: "", label: "Locations", display: "8" },
  { number: 4.9, suffix: "", label: "Average Rating", display: "4.9" },
  { number: 98, suffix: "%", label: "Would Recommend", display: "98" },
];

function useCountUp(
  target: number,
  isInView: boolean,
  duration: number = 1.2
) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3);

      if (Number.isInteger(target)) {
        setCount(Math.round(eased * target));
      } else {
        setCount(
          parseFloat((eased * target).toFixed(1))
        );
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return count;
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-24"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(239, 107, 95, 0.12) 0%, transparent 70%), var(--bg-base)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {STATS.map((stat, i) => (
            <StatItem
              key={stat.label}
              stat={stat}
              isInView={isInView}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  stat,
  isInView,
  index,
}: {
  stat: (typeof STATS)[0];
  isInView: boolean;
  index: number;
}) {
  const count = useCountUp(
    stat.number > 10000 ? 2 : stat.number,
    isInView,
    1.2
  );

  const displayNum =
    stat.number > 10000
      ? `${count}M`
      : `${count}${stat.suffix}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: EASE_EXPO,
      }}
      className="flex flex-col items-center text-center"
    >
      {/* Number */}
      <span
        style={{
          fontFamily: "'Bebas Neue', system-ui, sans-serif",
          fontSize: "clamp(48px, 6vw, 80px)",
          color: "var(--accent)",
          lineHeight: 1,
        }}
      >
        {displayNum}
      </span>

      {/* Animated underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{
          duration: 0.6,
          delay: 0.3 + index * 0.1,
          ease: EASE_EXPO,
        }}
        className="h-px w-16 mt-3 origin-left"
        style={{ background: "var(--accent)" }}
      />

      {/* Label */}
      <span
        className="mt-3"
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: "13px",
          fontWeight: 500,
          color: "var(--text-secondary)",
        }}
      >
        {stat.label}
      </span>
    </motion.div>
  );
}
