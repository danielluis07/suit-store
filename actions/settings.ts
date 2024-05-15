"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { SettingsSchema, UpdatePasswordSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { revalidatePath } from "next/cache";

export const settings = async (
  values: z.infer<typeof SettingsSchema>,
  userId: string | undefined
) => {
  const user = await currentUser();

  const validatedFields = SettingsSchema.safeParse(values);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL as string;

  if (!user) {
    return { error: "Não autorizado!" };
  }

  if (!validatedFields.success) {
    return { error: "Campos inválidos!" };
  }

  const {
    username,
    imageUrl,
    imageName,
    isTwoFactorEnabled,
    email,
    address1,
    address2,
    state,
    city,
    phone,
    country,
    postalCode,
  } = validatedFields.data;

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Não autorizado!" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Esse email já está em uso!" };
    }

    /*     const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    ); */

    /*     return { success: "Email de verificação enviado!" }; */
    return { success: "Email modificado com sucesso!" };
  }

  const userData = {
    username,
    imageUrl,
    imageName,
    userId,
    isTwoFactorEnabled,
    email,
    address1,
    address2,
    state,
    city,
    phone,
    country,
    postalCode,
  };

  try {
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

    await db.user.update({
      where: { id: dbUser.id },
      data: {
        username,
        imageUrl,
        imageName,
        email,
        isTwoFactorEnabled,
        address1,
        address2,
        state,
        city,
        phone,
        country,
        postalCode,
      },
    });

    revalidatePath(`/config`);
  } catch (error) {
    console.log(error);
    return { error: "Erro ao atualizar as informações" };
  }

  return { success: "Alterações feitas com sucesso!" };
};

export const updatePassword = async (
  values: z.infer<typeof UpdatePasswordSchema>,
  params: { storeId: string }
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Não autorizado!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Não autorizado!" };
  }

  if (user.isOAuth) {
    values.password = undefined;
    values.newPassword = undefined;
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordsMatch) {
      return { error: "Senha incorreta!" };
    }

    try {
      const hashedPassword = await bcrypt.hash(values.newPassword, 10);
      values.password = hashedPassword;
      values.newPassword = undefined;

      await db.user.update({
        where: { id: dbUser.id },
        data: {
          password: hashedPassword,
        },
      });
    } catch (error) {
      console.log(error);
      return { error: "Erro ao atualizar as informações" };
    }
  }

  revalidatePath(`/dashboard/${params.storeId}/settings`);
  return { success: "Informações atualizadas!" };
};
