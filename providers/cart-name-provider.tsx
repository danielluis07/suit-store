"use client";

import { useCart } from "@/hooks/use-cart";
import { Session } from "next-auth";
import { useEffect } from "react";

interface CartNameProviderProps {
  children: React.ReactNode;
  session: Session | null;
}

export const CartNameProvider = ({
  children,
  session,
}: CartNameProviderProps) => {
  useEffect(() => {
    useCart?.persist.setOptions({
      name: `cart-storage-${session?.user.id}`,
    });
    useCart?.persist.rehydrate();
    localStorage.removeItem("cart-storage");
  }, [session]);
  return <>{children}</>;
};
