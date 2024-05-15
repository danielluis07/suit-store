"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { User } from "@/types";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL as string;

  const storeId = process.env.STORE_ID as string;

  if (!validatedFields.success) {
    return { error: "Campos inválidos!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Esse email já está sendo utilizado!" };
  }

  const user = await db.user.create({
    data: {
      name,
      storeId,
      email,
      password: hashedPassword,
    },
  });

  const userData: User = {
    id: user.id,
    name,
    email,
    password: hashedPassword,
    storeId,
  };

  try {
    const res = await fetch(`${baseUrl}/register`, {
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error(`Registration failed with status ${res.status}`);
    }
    const data = await res.json();
    console.log("Registration successful", data);
    /*     const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Email de confirmação enviado!" }; */
  } catch (error) {
    console.log("Registration error", error);
    return { error: "Erro ao realizar seu registro!" };
  }
};
