"use server";

interface ProductCheckoutInfo {
  productId: string;
  sizeId: string;
  sizeName: string;
  sizeValue: string;
}

export const checkout = async (
  userId: string | null | undefined,
  products: ProductCheckoutInfo[]
) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!userId) {
    return { error: "Não há informações sobre o usuário!" };
  }

  if (!products || products.length === 0) {
    return { error: "Não há informações sobre produtos!" };
  }

  const checkOutData = {
    userId,
    products,
  };

  try {
    const res = await fetch(`${baseUrl}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkOutData),
    });

    if (!res.ok) {
      throw new Error(`Send checkout data error with status ${res.status}`);
    }

    const data = await res.json();

    if (!data.url) {
      throw new Error("Invalid response data: missing URL.");
    }

    return { url: data.url };
  } catch (error) {
    console.log(`Could not send checkout data. Details: ${error}`);
    return { error: "Não foi possível direcioná-lo ao checkout!" };
  }
};
