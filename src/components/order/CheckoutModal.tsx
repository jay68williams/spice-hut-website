"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";
import { useCart } from "@/context/CartContext";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentMethod = "cash" | "card";
type CheckoutStep = "details" | "success";

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const {
    items,
    orderType,
    subtotal,
    serviceCharge,
    deliveryFee,
    orderTotal,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<CheckoutStep>("details");
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    postcode: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
    clearCart();
  };

  const handleClose = () => {
    setStep("details");
    setFormData({ name: "", phone: "", email: "", address: "", postcode: "", notes: "" });
    onClose();
  };

  const updateField = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: "rgba(0, 0, 0, 0.8)", backdropFilter: "blur(8px)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.96 }}
            transition={{ duration: 0.4, ease: EASE_EXPO }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[20px]"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.6)",
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center z-10 cursor-pointer"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
                fontSize: "16px",
              }}
            >
              ×
            </button>

            {step === "details" ? (
              <form onSubmit={handleSubmit}>
                {/* Header */}
                <div
                  className="px-6 py-5"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <h2
                    style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontSize: "24px",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    Checkout
                  </h2>
                  <p
                    className="mt-1"
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "13px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {orderType === "delivery" ? "Delivery order" : "Collection order"} •{" "}
                    {items.reduce((sum, i) => sum + i.quantity, 0)} items
                  </p>
                </div>

                <div className="px-6 py-5 space-y-5">
                  {/* Contact details */}
                  <div>
                    <SectionLabel>Contact Details</SectionLabel>
                    <div className="space-y-3 mt-3">
                      <Input
                        label="Full name"
                        value={formData.name}
                        onChange={(v) => updateField("name", v)}
                        required
                      />
                      <Input
                        label="Phone number"
                        type="tel"
                        value={formData.phone}
                        onChange={(v) => updateField("phone", v)}
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(v) => updateField("email", v)}
                        required
                      />
                    </div>
                  </div>

                  {/* Delivery address */}
                  {orderType === "delivery" && (
                    <div>
                      <SectionLabel>Delivery Address</SectionLabel>
                      <div className="space-y-3 mt-3">
                        <Input
                          label="Address"
                          value={formData.address}
                          onChange={(v) => updateField("address", v)}
                          required
                        />
                        <Input
                          label="Postcode"
                          value={formData.postcode}
                          onChange={(v) => updateField("postcode", v)}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Order notes */}
                  <div>
                    <SectionLabel>Order Notes (optional)</SectionLabel>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => updateField("notes", e.target.value)}
                      rows={2}
                      className="w-full mt-3 px-4 py-3 rounded-xl resize-none"
                      placeholder="Any special requests..."
                      style={{
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: "14px",
                        background: "var(--bg-elevated)",
                        color: "var(--text-primary)",
                        border: "1px solid var(--border)",
                        outline: "none",
                      }}
                    />
                  </div>

                  {/* Payment method */}
                  <div>
                    <SectionLabel>Payment Method</SectionLabel>
                    <div className="flex gap-3 mt-3">
                      <PaymentButton
                        label="💳 Card Payment"
                        active={payment === "card"}
                        onClick={() => setPayment("card")}
                      />
                      <PaymentButton
                        label="💵 Cash"
                        active={payment === "cash"}
                        onClick={() => setPayment("cash")}
                      />
                    </div>
                  </div>

                  {/* Order summary */}
                  <div
                    className="pt-4 space-y-2"
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    <SummaryRow label="Subtotal" value={`£${subtotal.toFixed(2)}`} />
                    <SummaryRow
                      label="Service charge"
                      value={`£${serviceCharge.toFixed(2)}`}
                    />
                    {orderType === "delivery" && (
                      <SummaryRow
                        label="Delivery fee"
                        value={`£${deliveryFee.toFixed(2)}`}
                      />
                    )}
                    <div
                      className="flex items-center justify-between pt-2"
                      style={{ borderTop: "1px solid var(--border)" }}
                    >
                      <span
                        style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                        }}
                      >
                        Total
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: "20px",
                          fontWeight: 700,
                          color: "var(--accent)",
                        }}
                      >
                        £{orderTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="px-6 pb-6">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2, ease: EASE_EXPO }}
                    className="w-full py-4 rounded-xl text-white font-semibold tracking-wider cursor-pointer"
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      background: "var(--accent)",
                      fontSize: "14px",
                      letterSpacing: "0.06em",
                      boxShadow: "0 4px 24px rgba(232, 100, 90, 0.3)",
                    }}
                  >
                    {payment === "card" ? "PAY & PLACE ORDER" : "PLACE ORDER"}
                  </motion.button>
                </div>
              </form>
            ) : (
              /* Success state */
              <div className="px-6 py-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE_EXPO }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: "rgba(232, 100, 90, 0.15)" }}
                >
                  <span style={{ fontSize: "40px" }}>🔥</span>
                </motion.div>
                <h2
                  className="mb-3"
                  style={{
                    fontFamily: "'Bebas Neue', system-ui, sans-serif",
                    fontSize: "48px",
                    color: "var(--accent)",
                    lineHeight: 1,
                  }}
                >
                  ORDER PLACED!
                </h2>
                <p
                  className="mb-2"
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: "20px",
                    color: "var(--text-primary)",
                  }}
                >
                  Get ready, it&apos;s coming.
                </p>
                <p
                  className="mb-8 max-w-xs mx-auto"
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {orderType === "delivery"
                    ? "Your food will be with you in approximately 30–45 minutes."
                    : "Your order will be ready for collection in approximately 15–20 minutes."}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleClose}
                  className="px-8 py-3 rounded-full text-sm font-semibold tracking-wider cursor-pointer"
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border)",
                    letterSpacing: "0.06em",
                    fontSize: "13px",
                  }}
                >
                  BACK TO MENU
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Sub-components ──────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.12em",
        color: "var(--text-muted)",
        textTransform: "uppercase",
      }}
    >
      {children}
    </h4>
  );
}

function Input({
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full px-4 py-3 rounded-xl"
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: "14px",
        background: "var(--bg-elevated)",
        color: "var(--text-primary)",
        border: "1px solid var(--border)",
        outline: "none",
      }}
    />
  );
}

function PaymentButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 py-3 rounded-xl text-center text-sm font-semibold tracking-wider cursor-pointer transition-all duration-300"
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: "13px",
        background: active ? "var(--accent)" : "var(--bg-elevated)",
        color: active ? "white" : "var(--text-secondary)",
        border: active
          ? "1px solid var(--accent)"
          : "1px solid var(--border)",
      }}
    >
      {label}
    </button>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: "13px",
          color: "var(--text-secondary)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: "13px",
          color: "var(--text-secondary)",
        }}
      >
        {value}
      </span>
    </div>
  );
}
