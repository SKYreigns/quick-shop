"use client";

import React, { useState } from "react";
import { MessageSquarePlus, Check, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface CustomOrderCardProps {
  storeId: string;
  storeName?: string;
  onStoreSwitchRequest?: (dummyProductForStore: { storeId: string }) => void;
}

export const CustomOrderCard: React.FC<CustomOrderCardProps> = ({
  storeId,
}) => {
  const [requestText, setRequestText] = useState("");
  const [justAdded, setJustAdded] = useState(false);
  const [error, setError] = useState("");

  const currentStoreId = useCartStore((state) => state.storeId);
  const items = useCartStore((state) => state.items);
  const setStoreId = useCartStore((state) => state.setStoreId);
  const addCustomRequest = useCartStore((state) => state.addCustomRequest);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = requestText.trim();

    if (!trimmed) {
      setError("Please describe the item you want.");
      return;
    }

    // Set active store if not set yet
    if (!currentStoreId && items.length === 0) {
      setStoreId(storeId);
    }

    addCustomRequest(trimmed, 1);
    setRequestText("");
    setError("");
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 3000);
  };

  return (
    <Card className="p-5 sm:p-6 bg-gradient-to-br from-white to-[#FEF8EC]/40 border border-[#F4B942]/40 rounded-2xl shadow-xs space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#FEF8EC] text-[#9A6700] flex items-center justify-center shrink-0 border border-[#F4B942]/30">
            <MessageSquarePlus className="w-5 h-5 text-[#E2A730]" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#171717] flex items-center gap-2">
              Can&apos;t find what you need?
              <Sparkles className="w-4 h-4 text-[#F4B942]" />
            </h3>
            <p className="text-xs text-[#6B6B6B]">
              Tell us what you&apos;re looking for and we&apos;ll include it in
              your order.
            </p>
          </div>
        </div>
        <Badge variant="accent" className="shrink-0 text-[11px]">
          Price to be confirmed
        </Badge>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="custom-item-input" className="sr-only">
            Describe the unlisted item
          </label>
          <div className="relative">
            <input
              id="custom-item-input"
              type="text"
              value={requestText}
              onChange={(e) => {
                setRequestText(e.target.value);
                if (error) setError("");
              }}
              placeholder="Type what you need (e.g., 2 packets of specific detergent or local snack)..."
              className="w-full h-11 px-3.5 text-sm rounded-xl bg-white border border-[#E5E2DA] text-[#171717] placeholder:text-[#8E8B82] focus:outline-none focus:ring-2 focus:ring-[#1F6B4F] focus:border-transparent transition-colors"
            />
          </div>
          {error && (
            <p className="text-xs text-[#C53D3D] font-medium mt-1">{error}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pt-1">
          <div className="text-[11px] text-[#6B6B6B] leading-tight">
            <span>
              💡 Custom requests bypass the ₹200 minimum order requirement!
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {justAdded && (
              <span className="text-xs font-semibold text-[#238B57] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Added to cart
              </span>
            )}
            <Button
              type="submit"
              variant="accent"
              size="sm"
              className="font-bold gap-1.5 shadow-2xs"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Add Custom Order</span>
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};
