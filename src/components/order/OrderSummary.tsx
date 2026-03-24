"use client";

import { motion, AnimatePresence } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";
import { useCart } from "@/context/CartContext";

interface OrderSummaryProps {
  onCheckout: () => void;
}

export default function OrderSummary({ onCheckout }: OrderSummaryProps) {
  const {
    items,
    orderType,
    setOrderType,
    updateQuantity,
    removeItem,
    subtotal,
    serviceCharge,
    deliveryFee,
    orderTotal,
  } = useCart();

  return (
    <div
      className="rounded-[20px] overflow-hidden"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <h3
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: "20px",
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          Your order
        </h3>
      </div>

      {/* Delivery / Collection toggle */}
      <div className="px-5 pt-4 pb-3">
        <div
          className="flex rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          <button
            onClick={() => setOrderType("delivery")}
            className="flex-1 py-2.5 text-center text-sm font-semibold tracking-wider cursor-pointer transition-all duration-300"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "12px",
              letterSpacing: "0.06em",
              background:
                orderType === "delivery" ? "var(--accent)" : "transparent",
              color:
                orderType === "delivery"
                  ? "white"
                  : "var(--text-secondary)",
            }}
          >
            🚗 Delivery
          </button>
          <button
            onClick={() => setOrderType("collection")}
            className="flex-1 py-2.5 text-center text-sm font-semibold tracking-wider cursor-pointer transition-all duration-300"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "12px",
              letterSpacing: "0.06em",
              background:
                orderType === "collection" ? "var(--accent)" : "transparent",
              color:
                orderType === "collection"
                  ? "white"
                  : "var(--text-secondary)",
            }}
          >
            🏪 Collection
          </button>
        </div>
      </div>

      {/* Cart items */}
      <div
        className="px-5 py-3 max-h-[300px] overflow-y-auto"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <AnimatePresence mode="popLayout">
          {items.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-8 text-center"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "14px",
                color: "var(--text-muted)",
              }}
            >
              Your order is empty
            </motion.p>
          ) : (
            items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3, ease: EASE_EXPO }}
                className="flex items-center justify-between py-3"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex-1 min-w-0 mr-3">
                  <p
                    className="truncate"
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "12px",
                      color: "var(--text-muted)",
                    }}
                  >
                    £{item.price.toFixed(2)} each
                  </p>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center rounded-lg overflow-hidden"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    <button
                      onClick={() =>
                        item.quantity === 1
                          ? removeItem(item.id)
                          : updateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-7 h-7 flex items-center justify-center text-xs cursor-pointer"
                      style={{
                        color: "var(--text-secondary)",
                        background: "var(--bg-elevated)",
                      }}
                    >
                      −
                    </button>
                    <span
                      className="w-7 h-7 flex items-center justify-center"
                      style={{
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-7 h-7 flex items-center justify-center text-xs cursor-pointer"
                      style={{
                        color: "var(--text-secondary)",
                        background: "var(--bg-elevated)",
                      }}
                    >
                      +
                    </button>
                  </div>
                  <span
                    className="w-14 text-right"
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    £{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Totals */}
      <div className="px-5 py-4 space-y-2">
        {subtotal > 0 && (
          <>
            <div className="flex items-center justify-between">
              <span
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                }}
              >
                Subtotal
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                }}
              >
                £{subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                }}
              >
                Service charge
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                }}
              >
                £{serviceCharge.toFixed(2)}
              </span>
            </div>
            {orderType === "delivery" && (
              <div className="flex items-center justify-between">
                <span
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Delivery fee
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                  }}
                >
                  £{deliveryFee.toFixed(2)}
                </span>
              </div>
            )}
          </>
        )}

        {/* Total */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: subtotal > 0 ? "1px solid var(--border)" : "none" }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            Order total:
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--accent)",
            }}
          >
            £{orderTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Checkout button */}
      <div className="px-5 pb-5">
        <motion.button
          whileHover={{ scale: items.length > 0 ? 1.02 : 1 }}
          whileTap={{ scale: items.length > 0 ? 0.97 : 1 }}
          transition={{ duration: 0.2, ease: EASE_EXPO }}
          onClick={items.length > 0 ? onCheckout : undefined}
          className="w-full py-3.5 rounded-xl text-white text-sm font-semibold tracking-wider cursor-pointer"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            background: items.length > 0 ? "var(--accent)" : "var(--bg-elevated)",
            color: items.length > 0 ? "white" : "var(--text-muted)",
            fontSize: "13px",
            letterSpacing: "0.06em",
            boxShadow: items.length > 0 ? "0 4px 24px rgba(239, 107, 95, 0.3)" : "none",
            cursor: items.length > 0 ? "pointer" : "not-allowed",
          }}
        >
          CHECKOUT
        </motion.button>
      </div>

      {/* Opening time */}
      <div
        className="px-5 py-3 text-center"
        style={{
          background: "var(--bg-elevated)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--text-secondary)",
          }}
        >
          Opening Time 17:00–23:00
        </p>
      </div>
    </div>
  );
}
