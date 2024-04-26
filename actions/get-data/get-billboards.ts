import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_APP_URL}/billboards`;

export const getBillboards = async (): Promise<Billboard[]> => {
  try {
    const res = await fetch(`${URL}`, { cache: "no-cache" });

    if (!res.ok) {
      throw new Error(`Failed to fetch billboards`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching billboards:", error);
    throw error;
  }
};
