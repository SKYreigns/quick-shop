"use client";

import React, { useSyncExternalStore } from "react";
import { Plus, Minus, Package } from "lucide-react";
import { Product } from "@/lib/types";
import { useCartStore } from "@/store/cart-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ProductCardProps {
  product: Product;
  onStoreSwitchRequest?: (product: Product) => void;
}

const emptySubscribe = () => () => {};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onStoreSwitchRequest,
}) => {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const items = useCartStore((state) => state.items);
  const currentStoreId = useCartStore((state) => state.storeId);
  const addItem = useCartStore((state) => state.addItem);
  const setQuantity = useCartStore((state) => state.setQuantity);

  const cartItem = isMounted
    ? items.find((i) => i.productId === product.id)
    : undefined;
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    // Check if store switch confirmation is needed
    if (
      currentStoreId &&
      currentStoreId !== product.storeId &&
      items.length > 0
    ) {
      if (onStoreSwitchRequest) {
        onStoreSwitchRequest(product);
      }
      return;
    }

    try {
      addItem(product, 1);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "CANNOT_MIX_STORES") {
        onStoreSwitchRequest?.(product);
      }
    }
  };

  const handleIncrement = () => {
    setQuantity(product.id, quantityInCart + 1);
  };

  const handleDecrement = () => {
    setQuantity(product.id, quantityInCart - 1);
  };

  return (
    <Card
      hoverable
      className="p-3.5 sm:p-4 flex flex-col justify-between h-full bg-white space-y-3"
    >
      {/* Product Image / Placeholder Graphic */}
      <div className="relative aspect-4/3 w-full rounded-xl bg-gradient-to-br from-[#F8F7F3] to-[#EBF4F0] border border-[#E5E2DA]/60 flex items-center justify-center overflow-hidden group">
        <div className="flex flex-col items-center justify-center text-center p-3">
          <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-[#1F6B4F] mb-1.5 transition-transform group-hover:scale-110">
            <Package className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-[#6B6B6B] truncate max-w-[120px]">
            {product.category}
          </span>
        </div>

        {/* Available Badge */}
        {product.isAvailable ? (
          <Badge
            variant="outline"
            className="absolute top-2 right-2 text-[10px] bg-white/90 backdrop-blur-xs py-0 px-1.5"
          >
            {product.unit}
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="absolute top-2 right-2 text-[10px] bg-[#FDEDED] text-[#C53D3D] py-0 px-1.5"
          >
            Out of stock
          </Badge>
        )}
      </div>

      {/* Product Information */}
      <div className="space-y-1">
        <h3 className="font-bold text-sm sm:text-base text-[#171717] line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-[#6B6B6B] font-medium">{product.unit}</p>
      </div>

      {/* Price & Add to Cart Controls */}
      <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#E5E2DA]/70">
        <div>
          <span className="text-base sm:text-lg font-black text-[#171717]">
            ₹{product.price}
          </span>
        </div>

        <div>
          {quantityInCart === 0 ? (
            <button
              onClick={handleAdd}
              disabled={!product.isAvailable}
              aria-label={`Add ${product.name} to cart`}
              className="inline-flex items-center justify-center gap-1 h-9 px-3.5 rounded-xl font-bold text-xs bg-[#EBF4F0] text-[#1F6B4F] hover:bg-[#1F6B4F] hover:text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          ) : (
            <div className="inline-flex items-center bg-[#1F6B4F] text-white rounded-xl shadow-xs overflow-hidden h-9">
              <button
                onClick={handleDecrement}
                aria-label={`Decrease quantity of ${product.name}`}
                className="w-8 h-full flex items-center justify-center hover:bg-[#15513C] transition-colors active:scale-90 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center font-bold text-xs select-none">
                {quantityInCart}
              </span>
              <button
                onClick={handleIncrement}
                aria-label={`Increase quantity of ${product.name}`}
                className="w-8 h-full flex items-center justify-center hover:bg-[#15513C] transition-colors active:scale-90 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
