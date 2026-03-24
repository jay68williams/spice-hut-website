"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";

/* ── Types ─────────────────────────────────── */

export interface Location {
  id: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
}

interface LocationContextValue {
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location) => void;
  showPicker: boolean;
  setShowPicker: (show: boolean) => void;
}

/* ── Location Data ─────────────────────────── */

export const LOCATIONS: Location[] = [
  {
    id: "newcastle",
    name: "Newcastle",
    address: "41 West Road, Newcastle upon Tyne, NE4 9PX",
    hours: "5pm - 11pm daily",
    phone: "+44 191 272 7183",
  },
  {
    id: "sunderland",
    name: "Sunderland",
    address: "20 Olive Street, Sunderland, SR1 3PE",
    hours: "12pm - 11pm daily",
    phone: "+44 191 597 3297",
  },
  {
    id: "hartlepool",
    name: "Hartlepool",
    address: "88 York Road, Hartlepool, TS26 8AB",
    hours: "5pm - 11pm daily",
    phone: "+44 1429 866666",
  },
  {
    id: "south-shields",
    name: "South Shields",
    address: "38-40 Ocean Road, South Shields, NE33 2HZ",
    hours: "5pm - 11pm (closed Fridays)",
    phone: "+44 191 524 2512",
  },
  {
    id: "whitley-bay",
    name: "Whitley Bay",
    address: "234 Whitley Road, Whitley Bay, NE26 2TA",
    hours: "5pm - 11pm daily",
    phone: "info@spicehutwhitleybay.co.uk",
  },
  {
    id: "middlesbrough",
    name: "Middlesbrough",
    address: "TS1 District, Middlesbrough, TS1 3QW",
    hours: "5pm - 11pm daily",
    phone: "Coming soon",
  },
];

/* ── Context ───────────────────────────────── */

const LocationContext = createContext<LocationContextValue | null>(null);

const STORAGE_KEY = "spicehut_location";

export function LocationProvider({ children }: { children: ReactNode }) {
  const [selectedLocation, setSelectedLocationState] = useState<Location | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const found = LOCATIONS.find((l) => l.id === parsed.id);
        if (found) {
          setSelectedLocationState(found);
          return;
        }
      }
    } catch {
      // Ignore parse errors
    }
    // No stored location - show picker after a brief delay
    const timer = setTimeout(() => setShowPicker(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const setSelectedLocation = (location: Location) => {
    setSelectedLocationState(location);
    setShowPicker(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: location.id }));
    } catch {
      // Ignore write errors
    }
  };

  return (
    <LocationContext.Provider
      value={{ selectedLocation, setSelectedLocation, showPicker, setShowPicker }}
    >
      {children}
      {mounted && <LocationPickerModal />}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used within a LocationProvider");
  return ctx;
}

/* ── Location Picker Modal ─────────────────── */

function LocationPickerModal() {
  const { showPicker, setSelectedLocation } = useLocation();

  return (
    <AnimatePresence>
      {showPicker && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          style={{
            background: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(12px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.96 }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
            className="w-full max-w-md rounded-[24px] overflow-hidden"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              boxShadow: "0 32px 80px rgba(0, 0, 0, 0.6)",
            }}
          >
            {/* Header */}
            <div className="px-6 pt-8 pb-4 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2, ease: EASE_EXPO }}
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(232, 100, 90, 0.15)" }}
              >
                <span style={{ fontSize: "28px" }}>📍</span>
              </motion.div>
              <h2
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                Choose your location
              </h2>
              <p
                className="mt-2"
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Select your nearest Smok'd N Smash'd to see opening hours and order.
              </p>
            </div>

            {/* Location list */}
            <div className="px-4 pb-6 max-h-[50vh] overflow-y-auto">
              <div className="space-y-2">
                {LOCATIONS.map((loc, i) => (
                  <motion.button
                    key={loc.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.04, ease: EASE_EXPO }}
                    onClick={() => setSelectedLocation(loc)}
                    className="w-full text-left px-5 py-4 rounded-[16px] cursor-pointer group transition-all duration-300"
                    style={{
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(232, 100, 90, 0.4)";
                      e.currentTarget.style.boxShadow = "0 0 16px rgba(232, 100, 90, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          style={{
                            fontFamily: "'DM Sans', system-ui, sans-serif",
                            fontSize: "15px",
                            fontWeight: 600,
                            color: "var(--text-primary)",
                          }}
                        >
                          {loc.name}
                        </p>
                        <p
                          className="mt-0.5"
                          style={{
                            fontFamily: "'DM Sans', system-ui, sans-serif",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {loc.address}
                        </p>
                      </div>
                      <span
                        className="text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ color: "var(--accent)" }}
                      >
                        →
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
