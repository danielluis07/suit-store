"use client";

import { useCart } from "@/hooks/use-cart";
import { Info } from "./info";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { checkout } from "@/actions/checkout";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { convertCentsToReal } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CartProps {
  id: string | null | undefined;
}

export const Cart = ({ id }: CartProps) => {
  const cart = useCart();
  const userId = id;
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Pagamento completado");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Compra cancelada");
    }
  }, [searchParams, removeAll]);

  const onCheckout = () => {
    setIsLoading(true);
    const productsForCheckout = items.map((product) => ({
      productId: product.id,
      sizeId: product.size.id,
      sizeName: product.size.name,
      sizeValue: product.size.value,
    }));

    checkout(userId, productsForCheckout).then((data) => {
      if (data.url) {
        setIsLoading(false);
        window.location = data.url;
      }

      if (data.error) {
        toast.error(data.error);
      }
    });
  };

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between">
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
      <div className="flex flex-col p-5 justify-between w-full h-80 lg:w-[380px] bg-black text-milky">
        <div className="space-y-5">
          <div>
            <p>Total</p>
            <span>{convertCentsToReal(totalPrice)}</span>
          </div>
        </div>
        <div className="flex justify-center">
          <Button onClick={onCheckout} variant="white">
            Confirmar Compra
          </Button>
        </div>
      </div>
    </div>
  );
};
