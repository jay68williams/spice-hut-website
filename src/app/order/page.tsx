"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { EASE_EXPO } from "@/lib/motion";
import { CATEGORIES, getItemsByCategory } from "@/lib/menu-data";
import MenuSidebar from "@/components/order/MenuSidebar";
import MenuItemCard from "@/components/order/MenuItemCard";
import OrderSummary from "@/components/order/OrderSummary";
import CheckoutModal from "@/components/order/CheckoutModal";
import { useCart } from "@/context/CartContext";

export default function OrderPage() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { itemCount } = useCart();

  const currentItems = getItemsByCategory(activeCategory);
  const currentCategory = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <>
      {/* Top bar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-12"
        style={{
          background: "rgba(10, 10, 10, 0.88)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <Link
          href="/"
          className="text-white text-xl tracking-tight select-none"
          style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "20px", textDecoration: "none" }}
        >
          Smok'd N Smash'd
        </Link>

        <div className="flex items-center gap-4">
          {/* Cart count badge (mobile) */}
          {itemCount > 0 && (
            <div className="md:hidden flex items-center gap-2">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: "var(--accent)", fontSize: "11px" }}
              >
                {itemCount}
              </span>
            </div>
          )}
          <Link
            href="/"
            className="text-xs font-semibold tracking-wider"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              color: "var(--text-secondary)",
              textDecoration: "none",
              letterSpacing: "0.06em",
            }}
          >
            ← BACK TO SITE
          </Link>
        </div>
      </header>

      <main
        className="pt-16 min-h-screen"
        style={{ background: "var(--bg-base)" }}
      >
        {/* Page header */}
        <div
          className="px-6 md:px-12 py-8 md:py-12"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_EXPO }}
            >
              <div className="eyebrow mb-3">ONLINE ORDER</div>
              <h1
                className="heading-gradient"
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: "clamp(32px, 5vw, 52px)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Order online.
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Three-column layout */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left - Categories sidebar */}
            <div className="md:w-56 flex-shrink-0 md:sticky md:top-24 md:self-start">
              <MenuSidebar
                categories={CATEGORIES}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />
            </div>

            {/* Center - Menu items */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: EASE_EXPO }}
                >
                  {/* Category header */}
                  <div className="mb-6">
                    <h2
                      style={{
                        fontFamily: "'Fraunces', Georgia, serif",
                        fontSize: "28px",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {currentCategory?.name}
                    </h2>
                    {currentCategory?.description && (
                      <p
                        className="mt-1"
                        style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {currentCategory.description}
                      </p>
                    )}
                  </div>

                  {/* Items grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentItems.map((item) => (
                      <MenuItemCard key={item.id} item={item} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right - Order summary (desktop) */}
            <div className="hidden md:block md:w-80 flex-shrink-0 md:sticky md:top-24 md:self-start">
              <OrderSummary onCheckout={() => setCheckoutOpen(true)} />
            </div>
          </div>
        </div>

        {/* Mobile sticky cart bar */}
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ duration: 0.4, ease: EASE_EXPO }}
              className="fixed bottom-0 left-0 right-0 md:hidden p-4 z-40"
              style={{
                background: "rgba(10, 10, 10, 0.95)",
                backdropFilter: "blur(24px)",
                borderTop: "1px solid var(--border)",
              }}
            >
              <button
                onClick={() => setCheckoutOpen(true)}
                className="w-full py-3.5 rounded-xl text-white text-sm font-semibold tracking-wider cursor-pointer flex items-center justify-center gap-3"
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  background: "var(--accent)",
                  fontSize: "13px",
                  letterSpacing: "0.06em",
                  boxShadow: "0 4px 24px rgba(232, 100, 90, 0.3)",
                }}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "rgba(255,255,255,0.25)" }}
                >
                  {itemCount}
                </span>
                VIEW ORDER & CHECKOUT
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Checkout modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </>
  );
}
