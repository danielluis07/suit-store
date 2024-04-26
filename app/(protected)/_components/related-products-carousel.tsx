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
import Image from "next/image";

interface RelatedProductsCarouselProps {
  title: string;
  product: Product;
  products: Product[];
}

export const RelatedProductsCarousel = ({
  title,
  product,
  products,
}: RelatedProductsCarouselProps) => {
  const relatedProducts = products.filter(
    (item) => item.categoryId === product.categoryId
  );
  return (
    <div>
      <div className="flex justify-center mb-10">
        <p className="border-b border-black text-3xl">{title}</p>
      </div>
      <div className="w-full flex justify-center">
        <div className="relative w-full sm:w-[600px] sm1:w-[824px] lg:w-[1032px]">
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {relatedProducts.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-[450px] sm1:basis-[262px] lg:basis-[340px] bg-rose-300">
                  <Card className="mx-auto w-64 sm:w-56" key={index}>
                    <div className="relative w-full h-60">
                      <Image
                        src={item.images[0].url}
                        alt="image"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1280px) 224px, 256px"
                      />
                    </div>
                    <div className="flex flex-col p-4">
                      <p className="text-center">{item.name}</p>
                      <span className="text-center">{item.price}</span>
                      <Button>Ver Detalhes</Button>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-4 sm1:left-0 bg-black text-milky" />
            <CarouselNext className="absolute top-1/2 right-4 sm1:right-0 bg-black text-milky" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};
