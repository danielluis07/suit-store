"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types";
import { convertCentsToReal } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import imagePlaceholder from "@/public/image-placeholder.jpg";
import { useEffect, useState } from "react";
import Heart from "@react-sandbox/heart";
import { useWishList } from "@/hooks/use-wishlist";
import { Session } from "next-auth";

interface ProductsCarouselProps {
  title: string;
  products: Product[];
  session: Session | null;
}

export const ProductsCarousel = ({
  title,
  products,
  session,
}: ProductsCarouselProps) => {
  const route = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const wishList = useWishList();

  const onAddToWishList = (product: Product) => {
    if (!session) {
      route.push("/auth/login");
      return;
    }

    if (wishList.isProductInWishList(product.id)) {
      wishList.removeItem(product.id);
    } else {
      wishList.addItem(product);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="flex justify-center mb-10">
        <p className="border-b border-black text-3xl">{title}</p>
      </div>
      <div className="w-full flex justify-center">
        <div className="relative w-[350px] sm:w-[600px] lg:w-[1032px]">
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {products.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full lg:basis-[350px]">
                  <Card className="mx-auto w-64 h-96 sm:w-56 group" key={index}>
                    <div className="relative w-full h-60">
                      {item.images[0].url && (
                        <div className="absolute hidden group-hover:flex w-full justify-end z-10 pt-[5px] px-[5px]">
                          <div className="bg-milky p-2 rounded-full cursor-pointer">
                            <Heart
                              width={24}
                              height={24}
                              active={wishList.isProductInWishList(item.id)}
                              onClick={() => onAddToWishList(item)}
                            />
                          </div>
                        </div>
                      )}
                      <Image
                        src={
                          item.images[0].url
                            ? item.images[0].url
                            : imagePlaceholder
                        }
                        alt="produto"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1280px) 224px, 256px"
                      />
                    </div>
                    <div className="flex flex-col gap-y-3 p-4">
                      <p className="text-center">{item.name}</p>
                      <span className="text-center">
                        {convertCentsToReal(item.price)}
                      </span>
                      <Button onClick={() => route.push(`/product/${item.id}`)}>
                        Ver Detalhes
                      </Button>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute size-10 sm:size-12 top-1/2 left-0 bg-black text-milky" />
            <CarouselNext className="absolute size-10 sm:size-12 top-1/2 right-0 bg-black text-milky" />
          </Carousel>
        </div>
      </div>
    </>
  );
};
