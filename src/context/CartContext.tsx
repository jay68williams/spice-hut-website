"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";

/* ── Types ─────────────────────────────────── */

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export type OrderType = "delivery" | "collection";

interface CartState {
  items: CartItem[];
  orderType: OrderType;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_ORDER_TYPE"; payload: OrderType };

interface CartContextValue extends CartState {
  dispatch: React.Dispatch<CartAction>;
  itemCount: number;
  subtotal: number;
  serviceCharge: number;
  deliveryFee: number;
  orderTotal: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setOrderType: (type: OrderType) => void;
}

/* ── Reducer ───────────────────────────────── */

const initialState: CartState = {
  items: [],
  orderType: "collection",
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "SET_ORDER_TYPE":
      return { ...state, orderType: action.payload };
    default:
      return state;
  }
}

/* ── Context ───────────────────────────────── */

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const serviceCharge = subtotal > 0 ? 0.7 : 0;
  const deliveryFee = state.orderType === "delivery" && subtotal > 0 ? 2.5 : 0;
  const orderTotal = subtotal + serviceCharge + deliveryFee;

  const addItem = (item: Omit<CartItem, "quantity">) =>
    dispatch({ type: "ADD_ITEM", payload: item });
  const removeItem = (id: string) =>
    dispatch({ type: "REMOVE_ITEM", payload: id });
  const updateQuantity = (id: string, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const setOrderType = (type: OrderType) =>
    dispatch({ type: "SET_ORDER_TYPE", payload: type });

  return (
    <CartContext.Provider
      value={{
        ...state,
        dispatch,
        itemCount,
        subtotal,
        serviceCharge,
        deliveryFee,
        orderTotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        setOrderType,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
