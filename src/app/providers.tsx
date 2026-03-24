"use client";

import { CartProvider } from "@/context/CartContext";
import { LocationProvider } from "@/context/LocationContext";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LocationProvider>
      <CartProvider>{children}</CartProvider>
    </LocationProvider>
  );
}
