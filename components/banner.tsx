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
import banner1 from "@/public/banner/banner-1.jpg";
import banner2 from "@/public/banner/banner-2.jpg";
import banner3 from "@/public/banner/banner-3.jpg";

Autoplay.globalOptions = { delay: 4000 };

const images = [
  {
    src: banner1,
    alt: "banner-1",
  },
  {
    src: banner2,
    alt: "banner-2",
  },
  {
    src: banner3,
    alt: "banner-3",
  },
];

export const Banner = () => {
  return (
    <div className="relative max-w-[2000px] mx-auto">
      <Carousel
        plugins={[Autoplay()]}
        opts={{
          loop: true,
        }}>
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="flex items-center justify-center w-full 2xl:h-[600px]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-0 flex items-center justify-between px-10">
          <div>
            <CarouselPrevious />
          </div>
          <div>
            <CarouselNext />
          </div>
        </div>
      </Carousel>
    </div>
  );
};
