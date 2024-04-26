"use client";

import { checkout } from "@/actions/checkout";
import { Button } from "@/components/ui/button";
import { CartProduct } from "@/types";
import { convertCentsToReal } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface SummaryProps {
  items: CartProduct[];
  removeAll: () => void;
  userId: string | null | undefined;
}

export const Summary = ({ items, removeAll, userId }: SummaryProps) => {
  const searchParams = useSearchParams();

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
    const productsForCheckout = items.map((product) => ({
      productId: product.id,
      sizeId: product.size.id,
      sizeName: product.size.name,
      sizeValue: product.size.value,
    }));

    checkout(userId, productsForCheckout).then((data) => {
      if (data.url) {
        window.location = data.url;
      }

      if (data.error) {
        toast.error(data.error);
      }
    });
    removeAll();
  };

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  return (
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
  );
};
