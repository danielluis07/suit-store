"use server";

import { db } from "@/lib/db";
import { signOut } from "@/auth";

export const deleteUser = async (userId: string | undefined) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL as string;

  if (!userId) {
    return { error: "É necessário a Id do usuário0" };
  }

  const userData = {
    userId,
  };

  try {
    const res = await fetch(`${baseUrl}/users/${userId}`, {
      method: "DELETE",
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error(`Send user data error with status ${res.status}`);
    }
    await res.json();

    console.log("User data successfully sent");

    await db.user.delete({
      where: {
        id: userId,
      },
    });

    return { success: "Alterações feitas com sucesso!" };
  } catch (error) {
    console.log("Could not send user data", error);
    return { error: "Não foi possível realizar as alterações!" };
  }
};
