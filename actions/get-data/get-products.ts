import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_APP_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  isArchived?: boolean;
  isNew?: boolean;
}

export const getProducts = async (query: Query): Promise<Product[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        colorId: query.colorId,
        sizeId: query.sizeId,
        categoryId: query.categoryId,
        isFeatured: query.isFeatured,
        isArchived: query.isArchived,
        isNew: query.isNew,
      },
    });

    const res = await fetch(url, { cache: "no-cache" });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch products with query: ${JSON.stringify(query)}`
      );
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
