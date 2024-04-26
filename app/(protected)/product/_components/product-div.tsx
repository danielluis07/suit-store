"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn, convertCentsToReal } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Rating } from "react-simple-star-rating";
import { CartProduct, Product, Review, Size } from "@/types";
import { SelectSizeSchema } from "@/schemas";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import imagePlaceholder from "@/public/image-placeholder.jpg";
import { useWishList } from "@/hooks/use-wishlist";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { CategoriesDiv } from "../../_components/categories-div";

interface ProductDivProps {
  reviews: Review[];
  averageReviews: number;
  data: Product;
  session: Session | null;
}

type FormData = {
  sizes: string;
};

export const ProductDiv = ({
  data,
  reviews,
  averageReviews,
  session,
}: ProductDivProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  //  const [value, setValue] = useState(1);
  const [isPending, startTransition] = useTransition();
  const cart = useCart();
  const wishList = useWishList();
  const router = useRouter();

  /*   const increment = (e: React.MouseEvent<HTMLButtonElement>) => {
    setValue((prevValue) => prevValue + 1);
    e.preventDefault();
  };

  const decrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    setValue((prevValue) => Math.max(1, prevValue - 1));
    e.preventDefault();
  }; */

  const onAddToCart = (formData: FormData) => {
    if (!session) {
      router.push("/auth/login");
      return;
    }

    if (formData.sizes === "") {
      setError("Escolha um tamanho");
      return;
    }

    const selectedSize = sizes.find((size) => size.id === formData.sizes);
    if (!selectedSize) {
      setError("Invalid size selected");
      return;
    }

    if (selectedSize) {
      const itemToAdd = {
        ...data,
        size: {
          id: selectedSize.id,
          name: selectedSize.name,
          value: selectedSize.value,
          quantity: selectedSize.quantity,
        },
      } as CartProduct;
      cart.addItem(itemToAdd);
      setError(undefined); // Clear error on successful addition
    }
  };

  const sizes = data.sizes as Size[];

  const productReviews = reviews.filter((item) => item.productId === data.id);

  const form = useForm<z.infer<typeof SelectSizeSchema>>({
    resolver: zodResolver(SelectSizeSchema),
    defaultValues: {
      sizes: "",
    },
  });

  const onAddToWishList = (
    product: Product,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

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

  const onInvalid = (errors: any) => console.error(errors);

  const totalQuantity = sizes.reduce(
    (sum: number, size: Size) => sum + size.quantity,
    0
  );

  const reviewsNumber = Number.isNaN(averageReviews) ? 0 : averageReviews;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex w-full">
      <div className="maxl:hidden">
        <CategoriesDiv />
      </div>
      <div className="flex flex-col pt-8 md:flex-row w-full pb-10 xl:pt-0">
        {/* image */}
        <div className="flex justify-center md:justify-normal">
          <div className="relative w-full h-96 sm:w-96">
            <Image
              src={data.images[0].url ? data.images[0].url : imagePlaceholder}
              alt="produto"
              fill
              className="size-full object-contain sm:object-cover sm:h-auto"
              sizes="(max-width: 640px) 100%, 384px"
            />
          </div>
        </div>
        {/* product */}
        <div className="sm:px-8 md:px-4">
          <div className="my-3 md:my-0 md:mb-3">
            <h1 className="text-center text-xl md:text-start md:text-3xl font-bold">
              {data.name}
            </h1>
          </div>
          <div className="space-y-4">
            <p>{data.description}</p>
            <div className="flex items-center gap-x-2">
              <Rating
                readonly
                size={20}
                initialValue={reviewsNumber}
                allowFraction
              />
              <span>({productReviews.length})</span>
            </div>
            <div>
              {totalQuantity > 0 ? (
                <div className="flex items-center gap-x-4">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onAddToCart, onInvalid)}>
                      <FormField
                        control={form.control}
                        name="sizes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tamanhos</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                className="flex space-x-2">
                                {sizes
                                  .filter((size) => size.quantity > 0)
                                  .map((size) => (
                                    <FormItem key={size.id}>
                                      <FormControl>
                                        <Label
                                          className={cn(
                                            field.value === size.id
                                              ? "ring-4 ring-black font-extrabold text-black"
                                              : "ring-1 ring-slate-500 text-slate-500",
                                            "size-10 flex items-center justify-center rounded-lg cursor-pointer"
                                          )}>
                                          <RadioGroupItem
                                            value={size.id}
                                            className="hidden"
                                          />
                                          {size.value}
                                        </Label>
                                      </FormControl>
                                    </FormItem>
                                  ))}
                              </RadioGroup>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      {error && <p className="text-sm text-red-500">{error}</p>}
                      {/*                     <div className="flex">
                      <Button onClick={decrement}>-</Button>
                      <Input
                        className="w-[55px] text-center"
                        value={value}
                        onChange={(e) => setValue(parseInt(e.target.value))}
                      />
                      <Button onClick={increment}>+</Button>
                    </div> */}
                      <p className="text-xl mt-3">
                        {convertCentsToReal(data.price)}
                      </p>
                      <div className="flex justify-center gap-x-3 md:justify-start mt-8">
                        <Button type="submit">Adicionar ao Carrinho</Button>
                        <Button onClick={(e) => onAddToWishList(data, e)}>
                          Desejo esse produto
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              ) : (
                <div>Sem estoque</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
