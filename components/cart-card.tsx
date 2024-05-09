"use client";

import Image from "next/image";
import { Card } from "./ui/card";
import imagePlaceholder from "@/public/image-placeholder.jpg";
import { convertCentsToReal } from "@/lib/utils";
import { X } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { CartProduct } from "@/types";

interface CardCardProps {
  data: CartProduct;
}

export const CartCard = ({ data }: CardCardProps) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <Card className="relative">
      <div className="flex">
        <div className="relative size-24">
          <Image
            src={data.images[0].url ? data.images[0].url : imagePlaceholder}
            alt="produto"
            fill
            className="object-cover"
            sizes="(max-width: 3840px) 96px"
          />
        </div>
        <div className="flex flex-col gap-y-1 p-2 text-sm">
          <p>{data.name}</p>
          <p>Tamanho: {data.size.value}</p>
          <p>{convertCentsToReal(data.price)}</p>
        </div>
        <div onClick={onRemove} className="absolute right-0 cursor-pointer">
          <X />
        </div>
      </div>
    </Card>
  );
};
