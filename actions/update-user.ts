"use server";

import * as z from "zod";
import { SettingsSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export const updateUser = async (
  values: z.infer<typeof SettingsSchema>,
  userId: string
) => {
  const validatedFields = SettingsSchema.safeParse(values);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL as string;

  if (!validatedFields.success) {
    return { error: "Campos inválidos!" };
  }

  const { username, imageUrl, imageName } = validatedFields.data;

  const userData = {
    username,
    imageUrl,
    imageName,
    userId,
  };

  try {
    await db.user.update({
      where: { id: userId },
      data: {
        username,
        imageUrl,
        imageName,
      },
    });

    const res = await fetch(`${baseUrl}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error(`Send user data error with status ${res.status}`);
    }
    await res.json();
    console.log("User data successfully sent");
    revalidatePath(`/config`);
    return { success: "Alterações feitas com sucesso!" };
  } catch (error) {
    console.log("Could not send user data", error);
    return { error: "Não foi possível realizar as alterações!" };
  }
};
