import { Order, Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_APP_URL}/orders`;

interface Query {
  userId: string | undefined;
}

export const getOrders = async (query: Query): Promise<Order[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        userId: query.userId,
      },
    });

    const res = await fetch(url, { cache: "no-cache" });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch orders with query: ${JSON.stringify(query)}`
      );
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
