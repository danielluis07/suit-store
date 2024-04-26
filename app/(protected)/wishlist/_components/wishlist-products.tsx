"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useWishList } from "@/hooks/use-wishlist";
import { X } from "lucide-react";
import { convertCentsToReal } from "@/lib/utils";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";

export const WishListProducts = () => {
  const wishlist = useWishList();
  const router = useRouter();

  const onRemove = (product: Product) => {
    wishlist.removeItem(product.id);
  };

  return (
    <>
      {wishlist.items.length ? (
        <div className="space-y-3">
          {wishlist.items.map((item, index) => (
            <Card className="flex relative w-full" key={index}>
              {/* Image */}
              <div>
                <div className="relative w-[180px] h-[180px]">
                  <Image
                    src={item.images[0].url}
                    alt="product"
                    fill
                    className="object-cover"
                    sizes="(max-width: 3840px) 180px"
                  />
                </div>
              </div>
              {/* Info */}
              <div className="w-full max-w-80 sm:max-w-full py-7 lg:py-3 px-2 space-y-2">
                <p className="line-clamp-1 text-lg">{item.name}</p>
                <div className="line-clamp-2 text-sm text-gray-400">
                  {item.description}
                </div>
                <p>{convertCentsToReal(item.price)}</p>
                <Button
                  onClick={() => {
                    router.push(`/product/${item.id}`);
                  }}>
                  Ver Detalhes
                </Button>
              </div>
              <div
                onClick={() => onRemove(item)}
                className="absolute right-0 h-min cursor-pointer">
                <X />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-96 w-full">
          <div className="text-gray-400 font-extrabold text-xl cursor-default">
            Não há nada por aqui ainda
          </div>
        </div>
      )}
    </>
  );
};
