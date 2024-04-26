import { Review } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_APP_URL}/reviews`;

interface Query {
  productId: string;
}

export const getReviewsByProduct = async (query: Query): Promise<Review[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        productId: query.productId,
      },
    });

    const res = await fetch(url, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch review of product with ID: ${JSON.stringify(query)}`
      );
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching review:", error);
    throw error;
  }
};
