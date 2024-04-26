import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_APP_URL}/categories`;

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${URL}`, { cache: "no-cache" });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
