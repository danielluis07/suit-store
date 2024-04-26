import { create } from "zustand";
import { toast } from "sonner";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types";

interface WishListStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  isProductInWishList: (productId: string) => boolean;
  removeAll: () => void;
}

export const useWishList = create(
  persist<WishListStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast("Você já selecionou esse produto");
        }

        set({ items: [...get().items, data] });
        toast.success("Item adicionado");
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item removido");
      },
      removeAll: () => set({ items: [] }),
      isProductInWishList: (productId: string) => {
        return get().items.some((item) => item.id === productId);
      },
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
