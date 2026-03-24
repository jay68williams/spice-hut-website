"use client";

import { motion } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";
import { useCart } from "@/context/CartContext";
import type { MenuItem } from "@/lib/menu-data";

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { items, addItem, updateQuantity, removeItem } = useCart();
  const cartItem = items.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE_EXPO }}
      className="relative rounded-[16px] overflow-hidden group"
      style={{
        background: "var(--bg-surface)",
        border: quantity > 0
          ? "1px solid rgba(239, 107, 95, 0.4)"
          : "1px solid var(--border)",
        boxShadow: quantity > 0
          ? "0 0 16px rgba(239, 107, 95, 0.1), 0 4px 16px rgba(0, 0, 0, 0.3)"
          : "0 4px 16px rgba(0, 0, 0, 0.2)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div className="p-5">
        {/* Badge */}
        {item.badge && (
          <div className="mb-2">
            <span
              className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide"
              style={{
                background: "rgba(239, 107, 95, 0.15)",
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

        {/* Add / quantity controls */}
        {quantity === 0 ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE_EXPO }}
            onClick={() =>
              addItem({
                id: item.id,
                name: item.name,
                price: item.price,
                category: item.category,
              })
            }
            className="w-full py-2.5 rounded-xl text-white text-sm font-semibold tracking-wider cursor-pointer"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              background: "var(--accent)",
              fontSize: "12px",
              letterSpacing: "0.08em",
              boxShadow: "0 2px 12px rgba(239, 107, 95, 0.25)",
            }}
          >
            ADD TO ORDER
          </motion.button>
        ) : (
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-0 rounded-xl overflow-hidden"
              style={{
                border: "1px solid var(--border)",
              }}
            >
              <button
                onClick={() =>
                  quantity === 1
                    ? removeItem(item.id)
                    : updateQuantity(item.id, quantity - 1)
                }
                className="w-10 h-10 flex items-center justify-center text-lg cursor-pointer transition-colors duration-200"
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  color: "var(--text-secondary)",
                  background: "var(--bg-elevated)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
              >
                −
              </button>
              <span
                className="w-10 h-10 flex items-center justify-center"
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  background: "var(--bg-surface)",
                }}
              >
                {quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, quantity + 1)}
                className="w-10 h-10 flex items-center justify-center text-lg cursor-pointer transition-colors duration-200"
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  color: "var(--text-secondary)",
                  background: "var(--bg-elevated)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
              >
                +
              </button>
            </div>
            <span
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--accent)",
              }}
            >
              £{(item.price * quantity).toFixed(2)}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
