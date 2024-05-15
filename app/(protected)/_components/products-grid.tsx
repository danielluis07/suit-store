"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/types";
import { convertCentsToReal } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Heart from "@react-sandbox/heart";
import { useWishList } from "@/hooks/use-wishlist";
import imagePlaceholder from "@/public/image-placeholder.jpg";
import { Session } from "next-auth";
import { useMemo } from "react";
import { getProducts } from "@/actions/get-data/get-products";
import { getCategories } from "@/actions/get-data/get-categories";
import { ClipLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";

interface ProductsGridProps {
  session: Session | null;
}

export const ProductsGrid = ({ session }: ProductsGridProps) => {
  const router = useRouter();
  const wishList = useWishList();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    data: categories,
    error: categoriesError,
    isLoading: isLoadingCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const {
    data: products,
    error: productsError,
    isLoading: isLoadingProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts({ isArchived: true }),
  });

  const isLoading = isLoadingProducts || isLoadingCategories;
  const error = productsError || categoriesError;

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

  const filteredProducts = useMemo(() => {
    let filtered = [...(products || [])]; // Start with a copy of products to ensure immutability
    const categoryFilter = searchParams.get("category");
    const sortFilter = searchParams.get("sort");

    if (categoryFilter) {
      const categories = categoryFilter
        .split(",")
        .map((cat) => cat.trim().toLowerCase());
      filtered = filtered.filter((product) =>
        categories.includes(product.category.value.toLowerCase())
      );
    }

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

  // Use filteredProducts directly in your render logic

  const handleCategoryChange = (category: string, isChecked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    let currentCategories = params.get("category")
      ? params.get("category")?.split(",")
      : [];

    if (isChecked) {
      // Add the category if the checkbox is checked and it's not already included
      if (!currentCategories?.includes(category)) {
        currentCategories?.push(category);
      }
    } else {
      // Remove the category if the checkbox is unchecked
      currentCategories = currentCategories?.filter((c) => c !== category);
    }

    // Set the updated categories or remove the parameter if none are left
    if (currentCategories && currentCategories.length > 0) {
      params.set("category", currentCategories.join(","));
    } else {
      params.delete("category");
    }

    router.replace(pathname + "?" + params, { scroll: false });
  };

  const handleSortChange = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortValue) {
      params.set("sort", sortValue);
    } else {
      params.delete("sort");
    }
    router.replace(pathname + "?" + params, { scroll: false });
  };

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Houve um problema ao carregar os produtos
      </div>
    );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader />
      </div>
    );

  return (
    <div className="flex w-full mt-14">
      <div className="mt-28 space-y-5 maxsm:hidden">
        {categories?.map((item, index) => (
          <div key={index} className="flex items-center gap-x-3">
            <Input
              id={item.id}
              type="checkbox"
              className="size-5"
              checked={searchParams.toString().includes(item.value)}
              onChange={(e) =>
                handleCategoryChange(item.value, e.target.checked)
              }
            />
            <Label htmlFor={item.id}>{item.name}</Label>
          </div>
        ))}
      </div>
      <div className="w-full">
        <div className="grid grid-cols-2 gap-2 w-11/12 mx-auto mt-3 sm:hidden">
          {categories?.map((item, index) => (
            <div key={index} className="flex items-center gap-x-3">
              <Input
                id={item.id}
                type="checkbox"
                className="size-5"
                checked={searchParams.toString().includes(item.value)}
                onChange={(e) =>
                  handleCategoryChange(item.value, e.target.checked)
                }
              />
              <Label htmlFor={item.id}>{item.name}</Label>
            </div>
          ))}
        </div>
        {!isLoading && filteredProducts.length > 0 && (
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
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 w-11/12 mx-auto mt-8">
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
                    sizes="(max-width: 1280px) 224px, 256px"
                    alt="produto"
                    className="object-cover"
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
        ) : (
          <div className="flex justify-center items-center h-full text-xl">
            Nenhum produto encontrado com esses parâmetros
          </div>
        )}
      </div>
    </div>
  );
};
