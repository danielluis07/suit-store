"use client";

import getCategory from "@/actions/get-data/get-category";
import { getProducts } from "@/actions/get-data/get-products";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useWishList } from "@/hooks/use-wishlist";
import { convertCentsToReal } from "@/lib/utils";
import { Category, Product } from "@/types";
import Heart from "@react-sandbox/heart";
import imagePlaceholder from "@/public/image-placeholder.jpg";
import { Session } from "next-auth";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ClipLoader } from "react-spinners";

interface VestsGridProps {
  session: Session | null;
}

export const VestsGrid = ({ session }: VestsGridProps) => {
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const wishList = useWishList();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    let isMounted = true;
    setIsLoading(true);
    const fetchProducts = async () => {
      try {
        const products = await getProducts({
          categoryId: "6eab56b3-87c0-4752-8ef5-c572ce0a1706",
        });
        const category = await getCategory(
          "6eab56b3-87c0-4752-8ef5-c572ce0a1706"
        );
        setProducts(products);
        setCategory(category);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError("Houve um problema ao mostrar as informações");
        setIsLoading(false);
      }
    };
    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products]; // Start with a copy of products to ensure immutability
    const sortFilter = searchParams.get("sort");

    if (sortFilter) {
      filtered.sort((a, b) => {
        if (sortFilter === "lowest") {
          return a.price - b.price;
        } else if (sortFilter === "highest") {
          return b.price - a.price;
        }
        return 0;
      });
    }

    return filtered;
  }, [products, searchParams]);

  const handleSortChange = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortValue) {
      params.set("sort", sortValue);
    } else {
      params.delete("sort");
    }
    router.push(pathname + "?" + params, { scroll: false });
  };

  return (
    <>
      {error && <div className="text-2xl font-bold text-gray-300">{error}</div>}
      {!error && isLoading && (
        <div className="flex items-center justify-center h-full">
          <ClipLoader />
        </div>
      )}
      {!isLoading && !error && filteredProducts.length > 0 && (
        <>
          <div className="relative w-full h-[300px] 2xl:w-[1200px] 2xl:mx-auto">
            <Image
              src={category?.imageUrl ?? imagePlaceholder}
              alt="sapatos"
              fill
              className="object-cover"
              sizes="(max-width: 1536px) 100%, 1200px"
            />
          </div>
          <h1 className="py-14 font-bold underline text-2xl text-center">
            {category?.name}
          </h1>
          {!isLoading && (
            <div className="flex justify-center sm:justify-end w-full sm:w-11/12 mt-8">
              <select
                value={searchParams.get("sort") || ""}
                onChange={(e) => handleSortChange(e.target.value)}>
                <option value="">Organizar por</option>
                <option value="highest">Maior Preço</option>
                <option value="lowest">Menor Preço</option>
              </select>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 w-11/12 mx-auto mt-20">
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
                    className="w-full h-full object-cover"
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
            {!isLoading && !error && !filteredProducts && (
              <div className="flex w-full h-1/2 justify-center items-center">
                Não há produtos disponíveis ainda
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
