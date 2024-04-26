"use client";

import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { CiShoppingCart } from "react-icons/ci";
import { CartCard } from "./cart-card";
import { useCart } from "@/hooks/use-cart";
import { Button } from "./ui/button";
import { useState } from "react";
import { CartProduct } from "@/types";
import { Session } from "next-auth";

interface CartDivProps {
  session: Session | null;
}

export const CartDiv = ({ session }: CartDivProps) => {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const router = useRouter();
  const cart = useCart();
  const cartItems: CartProduct[] = cart.items;

  const handleSheetTriggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!session) {
      router.push("/auth/login");
      return;
    }

    setSheetOpen(true);
  };

  const handleButtonClick = () => {
    router.push("/cart");
    setSheetOpen(false);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild onClick={handleSheetTriggerClick}>
        <div className="relative cursor-pointer">
          {session && (
            <span className="absolute left-4 bottom-3 flex justify-center bg-black rounded-full size-4 text-xs text-milky">
              {cart.items.length}
            </span>
          )}
          <CiShoppingCart className="text-2xl" />
        </div>
      </SheetTrigger>
      <SheetContent side="cart">
        {cart.items.length ? (
          <div className="flex flex-col justify-between h-full">
            <div className="pt-8 space-y-3 h-[600px] max-h-[600px] overflow-y-auto">
              {cartItems.map((item, index) => (
                <div key={index}>
                  <CartCard data={item} />
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button onClick={handleButtonClick}>Confirmar</Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400 font-extrabold text-xl cursor-default">
              Não há itens no carrinho
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
