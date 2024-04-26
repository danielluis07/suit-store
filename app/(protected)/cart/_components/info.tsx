"use client";

import Image from "next/image";
import imagePlaceholder from "@/public/image-placeholder.jpg";
import { X } from "lucide-react";
import { convertCentsToReal } from "@/lib/utils";
import { CartProduct } from "@/types";
import { useCart } from "@/hooks/use-cart";

interface InfoProps {
  data: CartProduct;
}

export const Info = ({ data }: InfoProps) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <div className="flex relative w-full lg:w-[580px]">
      {/* Image */}
      <div className="relative w-[150px] h-[150px]">
        <Image
          src={data.images[0].url ? data.images[0].url : imagePlaceholder}
          alt="product"
          fill
          className="object-cover"
          sizes="(max-width: 3840px) 150px"
        />
      </div>
      {/* Info */}
      <div className="w-full max-w-80 sm:max-w-full py-7 lg:py-4 px-1 space-y-1">
        <p className="line-clamp-1">{data.name}</p>
        <p>
          Tamanho: <span>{data.size.value}</span>
        </p>
        <p>
          Preço <span>{convertCentsToReal(data.price)}</span>
        </p>
      </div>
      <div onClick={onRemove} className="absolute right-0 h-min">
        <X />
      </div>
    </div>
  );
};
