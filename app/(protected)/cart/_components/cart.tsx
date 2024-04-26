"use client";

import { useCart } from "@/hooks/use-cart";
import { Info } from "./info";
import { Summary } from "./summary";

interface CartProps {
  id: string | null | undefined;
}

export const Cart = ({ id }: CartProps) => {
  const cart = useCart();
  const userId = id;
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between mt-20">
      {cart.items.length ? (
        <div className="h-96 space-y-2 overflow-auto">
          {cart.items.map((item, index) => (
            <div key={index}>
              <Info data={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-96 w-full">
          <div className="text-gray-400 font-extrabold text-xl cursor-default">
            Não há itens no carrinho
          </div>
        </div>
      )}
      <div>
        <Summary items={items} removeAll={removeAll} userId={userId} />
      </div>
    </div>
  );
};
