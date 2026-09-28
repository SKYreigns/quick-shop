"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Store as StoreIcon,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { getStoreById } from "@/lib/data";
import {
  canProceedToAddress,
  getRemainingSubtotalForMinOrder,
} from "@/lib/validation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const emptySubscribe = () => () => {};

export const CartClient: React.FC = () => {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const items = useCartStore((state) => state.items);
  const customRequests = useCartStore((state) => state.customRequests);
  const storeId = useCartStore((state) => state.storeId);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const removeCustomRequest = useCartStore(
    (state) => state.removeCustomRequest
  );
  const clearCart = useCartStore((state) => state.clearCart);

  if (!isMounted) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#EBF4F0] animate-pulse mx-auto mb-3" />
        <p className="text-xs text-[#6B6B6B]">Loading your cart...</p>
      </div>
    );
  }

  const activeStore = storeId ? getStoreById(storeId) : undefined;
  const listedSubtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const isEligibleForCheckout = canProceedToAddress(
    listedSubtotal,
    customRequests.length
  );
  const remainingForMinOrder = getRemainingSubtotalForMinOrder(
    listedSubtotal,
    customRequests.length
  );

  // Empty cart view
  if (items.length === 0 && customRequests.length === 0) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-white border border-[#E5E2DA] flex items-center justify-center mx-auto text-[#8E8B82] shadow-2xs">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-[#171717]">
            Your cart is empty
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-xs mx-auto">
            Browse a store and add something you&apos;d like delivered.
          </p>
        </div>
        <div className="pt-2">
          <Link href="/stores">
            <Button variant="primary" size="md" className="gap-2">
              Browse Stores <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Header & Store Origin */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E2DA]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">
            Your Cart
          </h1>
          {activeStore && (
            <div className="flex items-center gap-1.5 text-xs text-[#6B6B6B] mt-0.5">
              <StoreIcon className="w-3.5 h-3.5 text-[#1F6B4F]" />
              <span>Ordering from </span>
              <Link
                href={`/stores/${activeStore.id}`}
                className="font-bold text-[#171717] hover:text-[#1F6B4F] underline underline-offset-2"
              >
                {activeStore.name}
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => clearCart()}
            className="text-xs font-semibold text-[#C53D3D] hover:text-[#A93232] flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-[#FDEDED] transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear cart</span>
          </button>
        </div>
      </div>

      {/* Cart Content */}
      <div className="space-y-4">
        {/* Listed Products */}
        {items.length > 0 && (
          <Card className="p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[#E5E2DA] pb-2">
              <span className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                Listed Products ({items.length})
              </span>
              <span className="text-xs text-[#6B6B6B]">Price & Qty</span>
            </div>

            <div className="divide-y divide-[#E5E2DA]/60">
              {items.map((item) => {
                const lineTotal = item.unitPrice * item.quantity;
                return (
                  <div
                    key={item.productId}
                    className="py-3.5 first:pt-1 last:pb-1 flex items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <h2 className="text-sm font-bold text-[#171717] truncate">
                        {item.name}
                      </h2>
                      <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
                        <span>{item.unit}</span>
                        <span>•</span>
                        <span>₹{item.unitPrice} each</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {/* Quantity Controls */}
                      <div className="inline-flex items-center border border-[#E5E2DA] rounded-xl overflow-hidden bg-white shadow-2xs">
                        <button
                          onClick={() =>
                            setQuantity(item.productId, item.quantity - 1)
                          }
                          aria-label={`Decrease ${item.name}`}
                          className="w-7 h-7 flex items-center justify-center hover:bg-[#F8F7F3] text-[#171717] transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-bold text-xs select-none text-[#171717]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            setQuantity(item.productId, item.quantity + 1)
                          }
                          aria-label={`Increase ${item.name}`}
                          className="w-7 h-7 flex items-center justify-center hover:bg-[#F8F7F3] text-[#171717] transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Total */}
                      <span className="font-bold text-sm text-[#171717] w-14 text-right">
                        ₹{lineTotal}
                      </span>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.productId)}
                        aria-label={`Remove ${item.name}`}
                        className="text-[#8E8B82] hover:text-[#C53D3D] p-1 rounded-md transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Custom Item Requests */}
        {customRequests.length > 0 && (
          <Card className="p-4 sm:p-5 bg-gradient-to-br from-white to-[#FEF8EC]/40 border border-[#F4B942]/40 space-y-3">
            <div className="flex items-center justify-between border-b border-[#F4B942]/30 pb-2">
              <span className="text-xs font-bold text-[#9A6700] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Custom Requests (
                {customRequests.length})
              </span>
              <Badge variant="accent" className="text-[10px]">
                Price to be confirmed
              </Badge>
            </div>

            <div className="divide-y divide-[#F4B942]/20">
              {customRequests.map((req) => (
                <div
                  key={req.id}
                  className="py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-[#171717]">
                      &ldquo;{req.description}&rdquo;
                    </p>
                    <p className="text-xs text-[#9A6700] font-medium">
                      Price to be confirmed by store
                    </p>
                  </div>

                  <button
                    onClick={() => removeCustomRequest(req.id)}
                    aria-label={`Remove custom request`}
                    className="text-[#8E8B82] hover:text-[#C53D3D] p-1.5 rounded-md transition-colors cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Pricing Summary & Validation */}
        <Card className="p-5 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6B6B6B]">Items total</span>
              <span className="font-bold text-[#171717]">
                ₹{listedSubtotal}
              </span>
            </div>

            {customRequests.length > 0 && (
              <div className="flex items-center justify-between text-xs text-[#9A6700]">
                <span>Custom requests ({customRequests.length})</span>
                <span className="font-medium">Price to be confirmed</span>
              </div>
            )}

            <div className="border-t border-[#E5E2DA] pt-2 flex items-center justify-between">
              <span className="text-base font-bold text-[#171717]">Total</span>
              <div className="text-right">
                <span className="text-lg font-black text-[#171717]">
                  ₹{listedSubtotal}
                </span>
                {customRequests.length > 0 && (
                  <span className="text-[11px] text-[#6B6B6B] block font-medium">
                    + custom items to be confirmed
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Conditional ₹200 Rule Messaging */}
          {!isEligibleForCheckout && (
            <div className="p-3.5 rounded-xl bg-[#FDEDED] border border-[#C53D3D]/30 flex items-start gap-2.5 text-[#C53D3D]">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-xs">
                <p className="font-bold">Minimum order not met</p>
                <p>
                  Add ₹{remainingForMinOrder} more to your cart to continue, or
                  request an unlisted custom item.
                </p>
              </div>
            </div>
          )}

          {isEligibleForCheckout &&
            customRequests.length > 0 &&
            listedSubtotal < 200 && (
              <div className="p-3 rounded-xl bg-[#E7F6EC] border border-[#238B57]/30 flex items-center gap-2 text-[#238B57] text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  Custom order included — eligible for checkout regardless of
                  subtotal!
                </span>
              </div>
            )}

          {/* Checkout CTA */}
          <div className="pt-2">
            {isEligibleForCheckout ? (
              <Link href="/checkout/address">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="font-bold gap-2 shadow-xs"
                >
                  <span>Proceed to Address</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <Button
                variant="primary"
                size="lg"
                fullWidth
                disabled
                className="font-bold gap-2 cursor-not-allowed opacity-60"
              >
                <span>Add ₹{remainingForMinOrder} more to continue</span>
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
