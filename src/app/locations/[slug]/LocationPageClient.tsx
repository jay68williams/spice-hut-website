"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { EASE_EXPO } from "@/lib/motion";
import { LOCATIONS } from "@/lib/locations";
import type { LocationData } from "@/lib/locations";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function LocationPageClient({
  location,
}: {
  location: LocationData;
}) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">(
    "idle"
  );

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = days[new Date().getDay()];
  const isComingSoon = location.badge === "Coming soon";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("sent");
      setFormState({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1200);
  };

  // Other locations for the "Other Locations" section
  const otherLocations = LOCATIONS.filter((l) => l.slug !== location.slug);

  // OpenStreetMap embed URL
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    location.lng - 0.008
  }%2C${location.lat - 0.005}%2C${location.lng + 0.008}%2C${
    location.lat + 0.005
  }&layer=mapnik&marker=${location.lat}%2C${location.lng}`;

  return (
    <>
      <Navigation />

      {/* Hero */}
      <section
        className="relative pt-32 pb-16 md:pt-40 md:pb-24"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232, 100, 90, 0.1) 0%, transparent 60%), var(--bg-base)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
            className="flex items-center gap-2 mb-8"
          >
            <Link
              href="/#locations"
              className="hover:opacity-80 transition-opacity flex items-center gap-2"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "13px",
                color: "var(--text-muted)",
                textDecoration: "none",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              All Locations
            </Link>
            <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>
              /
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "13px",
                color: "var(--accent)",
              }}
            >
              {location.name}
            </span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.05 }}
          >
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <h1
                className="heading-gradient"
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: "clamp(40px, 6vw, 72px)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Spice Hut {location.name}
              </h1>
              {location.badge && (
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
                  style={{
                    background:
                      isComingSoon
                        ? "rgba(100, 200, 100, 0.15)"
                        : "rgba(232, 100, 90, 0.15)",
                    color: isComingSoon ? "#4ade80" : "var(--accent)",
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                  }}
                >
                  {location.badge}
                </span>
              )}
            </div>
            <p
              className="max-w-2xl mb-6"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "17px",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
              }}
            >
              {location.description}
            </p>

            {/* Quick Info Row */}
            <div className="flex flex-wrap items-center gap-4">
              {location.rating && (
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <span style={{ color: "#f59e0b", fontSize: "14px" }}>★</span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {location.rating}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "12px",
                      color: "var(--text-muted)",
                    }}
                  >
                    ({location.reviewCount} reviews)
                  </span>
                </div>
              )}
              {location.features.map((feat) => (
                <span
                  key={feat}
                  className="px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: "var(--bg-surface)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border)",
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                  }}
                >
                  {feat}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section
        className="relative pb-24"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Column: Map + Hours (3/5) */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.1 }}
              className="lg:col-span-3 space-y-8"
            >
              {/* Map */}
              <div
                className="rounded-[20px] overflow-hidden"
                style={{
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-layer-1)",
                }}
              >
                <div className="relative w-full" style={{ paddingTop: "56%" }}>
                  <iframe
                    src={mapUrl}
                    className="absolute inset-0 w-full h-full"
                    style={{
                      border: "none",
                      filter: "invert(0.9) hue-rotate(180deg) saturate(0.4) brightness(0.8)",
                    }}
                    loading="lazy"
                    title={`Map of Spice Hut ${location.name}`}
                    allowFullScreen
                  />
                  {/* Map overlay gradient at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, var(--bg-surface), transparent)",
                    }}
                  />
                </div>
                {/* Address bar under map */}
                <div
                  className="px-6 py-4 flex items-center justify-between"
                  style={{
                    background: "var(--bg-surface)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(232, 100, 90, 0.12)" }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8 1.5C5.1 1.5 2.75 3.85 2.75 6.75C2.75 10.5 8 14.5 8 14.5C8 14.5 13.25 10.5 13.25 6.75C13.25 3.85 10.9 1.5 8 1.5Z"
                          stroke="#E8645A"
                          strokeWidth="1.2"
                        />
                        <circle
                          cx="8"
                          cy="6.75"
                          r="2"
                          stroke="#E8645A"
                          strokeWidth="1.2"
                        />
                      </svg>
                    </div>
                    <div>
                      <span
                        className="block"
                        style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "var(--text-primary)",
                        }}
                      >
                        {location.address}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 hover:scale-105 flex-shrink-0"
                    style={{
                      background: "rgba(232, 100, 90, 0.15)",
                      color: "var(--accent)",
                      border: "1px solid rgba(232, 100, 90, 0.2)",
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      textDecoration: "none",
                    }}
                  >
                    Open in Maps ↗
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div
                className="rounded-[20px] p-6 md:p-8"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-layer-1)",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(232, 100, 90, 0.12)" }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="6.5"
                        stroke="#E8645A"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M8 4.5V8L10.5 9.5"
                        stroke="#E8645A"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <h2
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    Opening Hours
                  </h2>
                </div>

                <div className="space-y-2">
                  {location.detailedHours.map((h) => {
                    const isToday = h.day === currentDay;
                    const isClosed = h.time === "Closed";
                    return (
                      <div
                        key={h.day}
                        className="flex items-center justify-between py-3 px-4 rounded-xl"
                        style={{
                          background: isToday
                            ? "rgba(232, 100, 90, 0.08)"
                            : "transparent",
                          border: isToday
                            ? "1px solid rgba(232, 100, 90, 0.15)"
                            : "1px solid transparent",
                        }}
                      >
                        <span
                          className="flex items-center gap-2"
                          style={{
                            fontFamily: "'DM Sans', system-ui, sans-serif",
                            fontSize: "15px",
                            fontWeight: isToday ? 600 : 400,
                            color: isToday
                              ? "var(--text-primary)"
                              : "var(--text-secondary)",
                          }}
                        >
                          {h.day}
                          {isToday && (
                            <span
                              className="text-[10px] px-2 py-0.5 rounded-full"
                              style={{
                                background: "rgba(232, 100, 90, 0.2)",
                                color: "#E8645A",
                                fontWeight: 700,
                                letterSpacing: "0.05em",
                              }}
                            >
                              TODAY
                            </span>
                          )}
                        </span>
                        <span
                          style={{
                            fontFamily: "'DM Sans', system-ui, sans-serif",
                            fontSize: "15px",
                            fontWeight: 500,
                            color: isClosed
                              ? "#ef4444"
                              : isToday
                              ? "var(--accent)"
                              : "var(--text-muted)",
                          }}
                        >
                          {h.time}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact Info + Form (2/5) */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Contact Details */}
              <div
                className="rounded-[20px] p-6 md:p-8"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-layer-1)",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(232, 100, 90, 0.12)" }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M14.5 11.08V13.08C14.5 13.62 14.06 14.06 13.52 14.08C10.18 14.36 7.04 13.48 4.44 11.8C3.68 11.28 2.98 10.68 2.36 10.02C1.68 9.3 1.08 8.5 0.58 7.64C-0.34 5.96 -0.5 4.08 0.56 2.58C0.82 2.22 1.22 2 1.66 2H3.66C4.08 2 4.46 2.28 4.56 2.7L4.98 4.54C5.06 4.88 4.94 5.24 4.68 5.46L3.72 6.26C4.8 8.46 6.58 10.24 8.78 11.32L9.58 10.36C9.8 10.1 10.16 9.98 10.5 10.06L12.34 10.48C12.76 10.58 13.04 10.96 13.04 11.38"
                        stroke="#E8645A"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <h2
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    Contact Details
                  </h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <span
                      className="block mb-1.5"
                      style={{
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                      }}
                    >
                      Address
                    </span>
                    <span
                      className="block"
                      style={{
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: "15px",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                      }}
                    >
                      {location.address}
                    </span>
                  </div>

                  {location.phone && (
                    <div>
                      <span
                        className="block mb-1.5"
                        style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--text-muted)",
                        }}
                      >
                        Phone
                      </span>
                      <a
                        href={`tel:${location.phone.replace(/\s/g, "")}`}
                        className="block transition-opacity hover:opacity-80"
                        style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: "15px",
                          color: "var(--accent)",
                          textDecoration: "none",
                        }}
                      >
                        {location.phone}
                      </a>
                    </div>
                  )}

                  <div>
                    <span
                      className="block mb-1.5"
                      style={{
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                      }}
                    >
                      Email
                    </span>
                    <a
                      href={`mailto:${location.email}`}
                      className="block transition-opacity hover:opacity-80"
                      style={{
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: "15px",
                        color: "var(--accent)",
                        textDecoration: "none",
                      }}
                    >
                      {location.email}
                    </a>
                  </div>

                  {location.hours && (
                    <div>
                      <span
                        className="block mb-1.5"
                        style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--text-muted)",
                        }}
                      >
                        Quick Summary
                      </span>
                      <span
                        className="block"
                        style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: "15px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {location.hours}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Form */}
              <div
                className="rounded-[20px] p-6 md:p-8"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-layer-1)",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(232, 100, 90, 0.12)" }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <rect
                        x="2"
                        y="3.5"
                        width="12"
                        height="9"
                        rx="2"
                        stroke="#E8645A"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M2 5.5L8 9L14 5.5"
                        stroke="#E8645A"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </div>
                  <h2
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    Get in Touch
                  </h2>
                </div>

                {isComingSoon ? (
                  <div
                    className="text-center py-8 rounded-xl"
                    style={{
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: "15px",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                      }}
                    >
                      This location is opening soon.
                      <br />
                      <span style={{ color: "var(--accent)" }}>
                        Follow us on socials for updates!
                      </span>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        className="block mb-1.5"
                        style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "var(--text-muted)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, name: e.target.value }))
                        }
                        className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                        style={{
                          background: "var(--bg-elevated)",
                          border: "1px solid var(--border)",
                          color: "var(--text-primary)",
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: "14px",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(232, 100, 90, 0.4)";
                          e.currentTarget.style.boxShadow =
                            "0 0 0 3px rgba(232, 100, 90, 0.08)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(255, 255, 255, 0.06)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block mb-1.5"
                        style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "var(--text-muted)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Your email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, email: e.target.value }))
                        }
                        className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                        style={{
                          background: "var(--bg-elevated)",
                          border: "1px solid var(--border)",
                          color: "var(--text-primary)",
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: "14px",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(232, 100, 90, 0.4)";
                          e.currentTarget.style.boxShadow =
                            "0 0 0 3px rgba(232, 100, 90, 0.08)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(255, 255, 255, 0.06)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block mb-1.5"
                        style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "var(--text-muted)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Phone (optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="Your phone number"
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, phone: e.target.value }))
                        }
                        className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                        style={{
                          background: "var(--bg-elevated)",
                          border: "1px solid var(--border)",
                          color: "var(--text-primary)",
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: "14px",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(232, 100, 90, 0.4)";
                          e.currentTarget.style.boxShadow =
                            "0 0 0 3px rgba(232, 100, 90, 0.08)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(255, 255, 255, 0.06)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block mb-1.5"
                        style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "var(--text-muted)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Message
                      </label>
                      <textarea
                        placeholder={`Message to Spice Hut ${location.name}...`}
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState((s) => ({
                            ...s,
                            message: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 resize-none"
                        style={{
                          background: "var(--bg-elevated)",
                          border: "1px solid var(--border)",
                          color: "var(--text-primary)",
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: "14px",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(232, 100, 90, 0.4)";
                          e.currentTarget.style.boxShadow =
                            "0 0 0 3px rgba(232, 100, 90, 0.08)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(255, 255, 255, 0.06)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer"
                      style={{
                        background:
                          formStatus === "sent"
                            ? "rgba(74, 222, 128, 0.15)"
                            : "linear-gradient(135deg, #E8645A 0%, #d4524a 100%)",
                        color: formStatus === "sent" ? "#4ade80" : "#fff",
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: "15px",
                        border:
                          formStatus === "sent"
                            ? "1px solid rgba(74, 222, 128, 0.3)"
                            : "none",
                        opacity: formStatus === "sending" ? 0.7 : 1,
                      }}
                    >
                      {formStatus === "idle" && "Send Message"}
                      {formStatus === "sending" && "Sending..."}
                      {formStatus === "sent" && "✓ Message Sent!"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other Locations */}
      <section
        className="relative py-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 110%, rgba(232, 100, 90, 0.06) 0%, transparent 70%), var(--bg-base)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_EXPO }}
            className="mb-10"
          >
            <div className="eyebrow mb-3">EXPLORE MORE</div>
            <h2
              className="heading-gradient"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Other locations.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {otherLocations.map((loc, i) => (
              <motion.div
                key={loc.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: EASE_EXPO,
                  delay: i * 0.05,
                }}
              >
                <Link
                  href={`/locations/${loc.slug}`}
                  className="block rounded-[16px] p-5 transition-all duration-300 group"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(232, 100, 90, 0.3)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 16px 48px rgba(0,0,0,0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.06)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: "4px",
                    }}
                  >
                    {loc.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "12px",
                      color: "var(--text-muted)",
                    }}
                  >
                    {loc.hours}
                  </span>
                  <div
                    className="mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "var(--accent)",
                    }}
                  >
                    View location →
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
