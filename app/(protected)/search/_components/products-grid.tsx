"use client";

import { Product } from "@/types";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Heart from "@react-sandbox/heart";
import { useWishList } from "@/hooks/use-wishlist";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { convertCentsToReal } from "@/lib/utils";
import imagePlaceholder from "@/public/image-placeholder.jpg";
import { getProducts } from "@/actions/get-data/get-products";
import { ClipLoader } from "react-spinners";

interface SearchedProductsGridProps {
  session: Session | null;
  query: string | undefined;
}

export const SearchedProductsGrid = ({
  session,
  query,
}: SearchedProductsGridProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const wishList = useWishList();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

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
    setIsLoading(true);
    const updatedProducts = async () => {
      await getProducts({ isArchived: true })
        .then((data) => {
          if (query) {
            const filtered = data.filter((product) =>
              product.name.toLowerCase().includes(query?.toLowerCase())
            );
            setFilteredProducts(filtered);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setError("Houve um problema ao mostrar os produtos");
          setIsLoading(false);
        });
    };

    updatedProducts();
  }, [query]);

  return (
    <>
      {error && <div className="text-2xl font-bold text-gray-300">{error}</div>}
      {!error && filteredProducts.length === 0 && !isLoading && (
        <div className="text-2xl font-bold text-gray-300">
          Nenhum produto encontrado
        </div>
      )}
      {!error && isLoading && (
        <div>
          <ClipLoader />
        </div>
      )}
      {!isLoading && filteredProducts.length > 0 && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 w-11/12 mx-auto pt-20 xl:pt-0">
          {filteredProducts.map((item, index) => (
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
      )}
    </>
  );
};
