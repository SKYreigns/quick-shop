"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { ShoppingBag, Store as StoreIcon } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

const emptySubscribe = () => () => {};

export const Header: React.FC = () => {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const itemCount = useCartStore((state) => state.getTotalItemCount());

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-sm border-b border-[#E5E2DA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#1F6B4F] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <StoreIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold text-[#171717] tracking-tight block leading-tight">
              Quick Shop
            </span>
            <span className="text-[10px] font-medium text-[#6B6B6B] block tracking-wide uppercase">
              Local Store Checkout
            </span>
          </div>
        </Link>

        {/* Navigation & Cart Action */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs font-semibold text-[#6B6B6B] hover:text-[#171717] px-3 py-1.5 rounded-lg hover:bg-[#F8F7F3] transition-colors hidden sm:inline-flex"
          >
            Stores
          </Link>

          <Link
            href="/cart"
            aria-label="View Cart"
            className="flex items-center gap-2 h-10 px-3.5 rounded-xl bg-[#F8F7F3] hover:bg-[#EBF4F0] border border-[#E5E2DA] transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-[#1F6B4F]" />
            <span className="text-xs font-semibold text-[#171717]">Cart</span>
            {isMounted && itemCount > 0 && (
              <span className="bg-[#1F6B4F] text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center ml-0.5">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
