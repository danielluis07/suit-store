"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Rating } from "react-simple-star-rating";
import { Card } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { useState, useTransition, useEffect } from "react";
import { ReviewSchema } from "@/schemas";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/use-current-user";
import { review } from "@/actions/review";
import { toast } from "sonner";
import { Review } from "@/types";
import placeholder from "@/public/placeholders/placeholder-logo.jpg";
import Image from "next/image";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

interface ReviewProps {
  reviews: Review[];
  productId: string;
  session: Session | null;
}

export const Reviews = ({ productId, reviews, session }: ReviewProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const user = useCurrentUser();
  const router = useRouter();

  const alreadyReviewed = reviews.some(
    (item) => item.userId === session?.user.id
  );

  const productHasReview = reviews.some((item) => item.productId === productId);

  const form = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      text: "",
      rating: 0,
    },
  });

  const onInvalid = (errors: any) => console.error(errors);

  const onSubmit = (values: z.infer<typeof ReviewSchema>) => {
    if (!session) {
      router.push("/auth/login");
      return;
    }

    /*     if (alreadyReviewed) {
      toast.error("Você já avaliou esse produto");
      return;
    } */

    startTransition(() => {
      review(values, productId, session.user.id)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            toast.error("Não foi possível enviar seu comentário!");
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
            toast.success("Obrigado pelo feedback!");
          }
        })
        .catch(() => setError("Algo deu errado!"));
    });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="space-y-5">
      <div className="text-xl">Comentários</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Escreva um comentário aqui..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-x-2 mt-3">
            <p>Dê sua nota (opcional):</p>
            <FormField
              control={form.control}
              name="rating"
              defaultValue={0}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Rating
                      transition
                      allowFraction
                      size={20}
                      onClick={(newValue) => field.onChange(newValue)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="mt-10">
            <Button disabled={isPending} type="submit">
              Enviar
            </Button>
          </div>
        </form>
      </Form>
      {reviews.length > 0 && productHasReview ? (
        <div className="bg-gray-200 h-full rounded-lg p-2 space-y-3">
          {reviews.map((item, index) => (
            <Card key={index} className="pb-5">
              <div className="flex w-full justify-end pr-2">
                <Rating
                  readonly
                  size={20}
                  initialValue={item.rating}
                  allowFraction
                />
              </div>
              <div className="flex gap-x-4 p-3">
                <div className="w-12">
                  <div className="relative flex size-14">
                    <Image
                      src={
                        item.user?.imageUrl ? item.user.imageUrl : placeholder
                      }
                      alt="usuário"
                      fill
                      className=" object-cover"
                      sizes="(max-width: 3840px) 56px"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-bold">{item.user?.name}</div>
                  <div>{item.text}</div>
                </div>
              </div>
              {item.hasReply && (
                <div className="mt-2 ml-10 pl-2 py-2 border-black w-11/12 space-y-2 rounded-md bg-gray-100">
                  <div className="font-bold">Corpo Plaza</div>
                  <div>{item.reply}</div>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center bg-gray-100 rounded-lg py-10">
          <div className="text-center text-2xl font-bold text-gray-400">
            Esse produto ainda não possui avaliações!
          </div>
        </div>
      )}
    </div>
  );
};
