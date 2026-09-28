import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, CustomRequest, DeliveryAddress, Product } from "@/lib/types";

export interface CartStoreState {
  storeId: string | null;
  items: CartItem[];
  customRequests: CustomRequest[];
  address: DeliveryAddress | null;

  // Actions
  setStoreId: (storeId: string | null) => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  addCustomRequest: (description: string, quantity?: number) => void;
  removeCustomRequest: (id: string) => void;
  setAddress: (address: DeliveryAddress | null) => void;
  clearCart: () => void;
  resetSession: () => void;

  // Computed helpers
  getListedSubtotal: () => number;
  getTotalItemCount: () => number;
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      storeId: null,
      items: [],
      customRequests: [],
      address: null,

      setStoreId: (storeId) => set({ storeId }),

      addItem: (product, quantity = 1) => {
        const { items, storeId } = get();

        // If cart has items from another store, do not mix
        if (storeId && storeId !== product.storeId && items.length > 0) {
          throw new Error("CANNOT_MIX_STORES");
        }

        const existingIndex = items.findIndex(
          (i) => i.productId === product.id
        );

        if (existingIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingIndex] = {
            ...updatedItems[existingIndex],
            quantity: updatedItems[existingIndex].quantity + quantity,
          };
          set({ items: updatedItems, storeId: product.storeId });
        } else {
          const newItem: CartItem = {
            productId: product.id,
            name: product.name,
            unit: product.unit,
            unitPrice: product.price,
            quantity,
          };
          set({
            items: [...items, newItem],
            storeId: product.storeId,
          });
        }
      },

      removeItem: (productId) => {
        const { items } = get();
        const updated = items.filter((i) => i.productId !== productId);
        set({
          items: updated,
          storeId:
            updated.length === 0 && get().customRequests.length === 0
              ? null
              : get().storeId,
        });
      },

      setQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const { items } = get();
        const updated = items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
        set({ items: updated });
      },

      addCustomRequest: (description, quantity = 1) => {
        const trimmed = description.trim();
        if (!trimmed) return;

        const newRequest: CustomRequest = {
          id: `custom_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          description: trimmed,
          quantity,
        };

        set((state) => ({
          customRequests: [...state.customRequests, newRequest],
        }));
      },

      removeCustomRequest: (id) => {
        set((state) => {
          const updated = state.customRequests.filter((r) => r.id !== id);
          return {
            customRequests: updated,
            storeId:
              state.items.length === 0 && updated.length === 0
                ? null
                : state.storeId,
          };
        });
      },

      setAddress: (address) => set({ address }),

      clearCart: () => {
        set({
          items: [],
          customRequests: [],
          storeId: null,
        });
      },

      resetSession: () => {
        set({
          items: [],
          customRequests: [],
          address: null,
          storeId: null,
        });
      },

      getListedSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.unitPrice * item.quantity,
          0
        );
      },

      getTotalItemCount: () => {
        const itemCount = get().items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        return itemCount + get().customRequests.length;
      },
    }),
    {
      name: "quick-shop-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
