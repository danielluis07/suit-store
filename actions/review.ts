"use server";

import * as z from "zod";
import { Review } from "@/types";
import { ReviewSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export const review = async (
  values: z.infer<typeof ReviewSchema>,
  productId: string,
  userId: string
) => {
  const validatedFields = ReviewSchema.safeParse(values);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL as string;

  if (!validatedFields.success) {
    return { error: "Campos inválidos!" };
  }

  const { text, rating } = validatedFields.data;

  const reviewData = {
    text,
    rating: rating !== null ? rating : 0,
    productId,
    userId,
  };

  console.log(reviewData);

  try {
    const res = await fetch(`${baseUrl}/reviews`, {
      method: "POST",
      body: JSON.stringify(reviewData),
    });

    if (!res.ok) {
      throw new Error(`Send review error with status ${res.status}`);
    }
    await res.json();
    console.log("Review successfully sent");
    revalidatePath(`/product/${productId}`);
    return { success: "Obrigado pelo feedback!" };
  } catch (error) {
    console.log("Could not send review", error);
    return { error: "Não foi possível enviar seu comentário!" };
  }
};
