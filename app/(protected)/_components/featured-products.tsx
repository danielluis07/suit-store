"use client";

import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { convertCentsToReal } from "@/lib/utils";
import { useWishList } from "@/hooks/use-wishlist";
import imagePlaceholder from "@/public/image-placeholder.jpg";
import Heart from "@react-sandbox/heart";
import { Session } from "next-auth";

interface FeaturedProductsProps {
  products: Product[];
  session: Session | null;
}

export const FeaturedProducts = ({
  products,
  session,
}: FeaturedProductsProps) => {
  const [maxImages, setMaxImages] = useState<number>(3);
  const router = useRouter();
  const wishList = useWishList();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const onAddToWishList = (product: Product) => {
    if (!session) {
      router.push("/auth/login");
      return;
    }

    if (wishList.isProductInWishList(product.id)) {
      wishList.removeItem(product.id);
    } else {
      wishList.addItem(product);
    }
  };

  useEffect(() => {
    // Function to update maxImages based on window width
    const updateMaxImages = () => {
      const width = window.innerWidth;
      setMaxImages(width < 640 ? 3 : 6);
    };

    // Initial update
    updateMaxImages();

    // Event listener for window resize
    window.addEventListener("resize", updateMaxImages);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", updateMaxImages);
    };
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {products.length ? (
        <>
          <div className="flex justify-center mb-10">
            <p className="border-b border-black text-3xl">Destaques</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 w-11/12 mx-auto">
            {products.slice(0, maxImages).map((item, index) => (
              <Card className="mx-auto w-64 xl:w-56 group" key={index}>
                <div className="relative w-full h-72">
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
                      item.images[0].url ? item.images[0].url : imagePlaceholder
                    }
                    fill
                    alt="produto"
                    className="object-cover"
                    sizes="(max-width: 1280px) 224px, 256px"
                  />
                </div>
                <div className="flex flex-col p-4 space-y-3">
                  <p className="line-clamp-2 text-center">{item.name}</p>
                  <span className="text-center">
                    {convertCentsToReal(item.price)}
                  </span>
                  <Button
                    onClick={() => {
                      router.push(`/product/${item.id}`);
                    }}>
                    Ver Detalhes
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          {products.length > 6 && (
            <div className="flex justify-center mt-12">
              <Button>Ver mais</Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex w-full h-1/2 justify-center items-center">
          Não há produtos disponíveis ainda
        </div>
      )}
    </>
  );
};
