"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Billboard } from "@/types";

interface BannerProps {
  billboards: Billboard[];
}

Autoplay.globalOptions = { delay: 4000 };

export const Banner = ({ billboards }: BannerProps) => {
  return (
    <div className="relative max-w-[2000px] mx-auto group overflow-x-hidden mt-20">
      <Carousel
        plugins={[Autoplay()]}
        opts={{
          loop: true,
          breakpoints: {},
        }}>
        <CarouselContent>
          {billboards.map((item, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative flex items-center justify-center w-full h-96 2xl:h-[600px]">
                <Image
                  src={item.imageUrl}
                  alt={item.label}
                  priority
                  fill
                  className="object-cover"
                  sizes="(max-width: 1536px) 100%, 600px"
                />
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                <div className="absolute size-full inset-0 flex items-center justify-center text-white z-20">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl w-1/2 text-center cursor-default">
                    {item.description}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute rounded-md top-1/2 left-8 opacity-50 -translate-y-1/2 transition transform duration-300 -translate-x-20 group-hover:translate-x-0 z-20">
          <CarouselPrevious />
        </div>
        <div className="absolute rounded-md top-1/2 right-8 opacity-50 -translate-y-1/2 transiton transform duration-300 translate-x-20 group-hover:-translate-x-0 z-20">
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};
