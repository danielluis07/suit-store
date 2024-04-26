import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_APP_URL}/products`;

const getProduct = async (id: string): Promise<Product> => {
  try {
    const res = await fetch(`${URL}/${id}`, { cache: "no-cache" });

    if (!res.ok) {
      throw new Error(`Failed to fetch product with ID: ${id}`);
    }

    return res.json();
  } catch (error) {
    // Log the error to the console
    console.error("Error while fetching product:", error);
    throw error; // Rethrow the error to allow the caller to handle it further if needed
  }
};

export default getProduct;
