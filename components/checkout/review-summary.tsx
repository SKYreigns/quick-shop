"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Store as StoreIcon,
  MessageCircle,
  MapPin,
  Phone,
  Sparkles,
  Info,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { getStoreById } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const emptySubscribe = () => () => {};

export const ReviewSummary: React.FC = () => {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const items = useCartStore((state) => state.items);
  const customRequests = useCartStore((state) => state.customRequests);
  const storeId = useCartStore((state) => state.storeId);
  const address = useCartStore((state) => state.address);

  if (!isMounted) return null;

  const store = storeId ? getStoreById(storeId) : undefined;
  const listedSubtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  if (items.length === 0 && customRequests.length === 0) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-4">
        <h1 className="text-xl font-bold text-[#171717]">
          No active order to review
        </h1>
        <p className="text-xs text-[#6B6B6B]">
          Add products to your cart before proceeding to review.
        </p>
        <Link href="/stores">
          <Button variant="primary" size="md">
            Browse Stores
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12">
      <div>
        <Link
          href="/checkout/address"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B6B6B] hover:text-[#1F6B4F] transition-colors py-1 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Edit delivery address</span>
        </Link>
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">
          Review Your Order
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1">
          Check your items and delivery destination before continuing to
          WhatsApp.
        </p>
      </div>

      <div className="space-y-4">
        {/* Store Card */}
        {store && (
          <Card className="p-4 sm:p-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EBF4F0] flex items-center justify-center text-[#1F6B4F]">
                <StoreIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B] block">
                  Store
                </span>
                <span className="text-sm font-bold text-[#171717]">
                  {store.name}
                </span>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {store.category}
            </Badge>
          </Card>
        )}

        {/* Listed Items */}
        {items.length > 0 && (
          <Card className="p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[#E5E2DA] pb-2">
              <span className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                Items ({items.length})
              </span>
              <span className="text-xs text-[#6B6B6B]">Amount</span>
            </div>

            <div className="divide-y divide-[#E5E2DA]/60">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="py-2.5 flex items-center justify-between gap-2 text-sm"
                >
                  <div className="min-w-0">
                    <span className="font-semibold text-[#171717]">
                      {item.name}
                    </span>
                    <span className="text-xs text-[#6B6B6B] ml-2">
                      × {item.quantity}
                    </span>
                  </div>
                  <span className="font-bold text-[#171717] shrink-0">
                    ₹{item.unitPrice * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#E5E2DA] flex items-center justify-between text-sm">
              <span className="font-medium text-[#6B6B6B]">Items Total</span>
              <span className="font-black text-base text-[#171717]">
                ₹{listedSubtotal}
              </span>
            </div>
          </Card>
        )}

        {/* Custom Requests */}
        {customRequests.length > 0 && (
          <Card className="p-4 sm:p-5 bg-gradient-to-br from-white to-[#FEF8EC]/40 border border-[#F4B942]/40 space-y-2">
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
                  className="py-2 text-sm flex items-center justify-between"
                >
                  <span className="font-medium text-[#171717]">
                    &ldquo;{req.description}&rdquo;
                  </span>
                  <span className="text-xs text-[#9A6700] font-semibold">
                    TBC
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Delivery Address */}
        <Card className="p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-[#E5E2DA] pb-2">
            <span className="text-xs font-bold text-[#171717] uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#1F6B4F]" /> Delivery Address
            </span>
            <Link
              href="/checkout/address"
              className="text-xs text-[#1F6B4F] font-semibold hover:underline"
            >
              Change
            </Link>
          </div>

          {address ? (
            <div className="space-y-1 text-xs sm:text-sm text-[#171717]">
              <p className="font-semibold">{address.fullAddress}</p>
              {address.houseOrBuilding && (
                <p className="text-[#6B6B6B]">{address.houseOrBuilding}</p>
              )}
              {address.areaOrStreet && (
                <p className="text-[#6B6B6B]">{address.areaOrStreet}</p>
              )}
              {address.landmark && (
                <p className="text-[#6B6B6B]">Landmark: {address.landmark}</p>
              )}
              <p className="text-[#1F6B4F] font-medium pt-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> {address.phone}
              </p>
            </div>
          ) : (
            <p className="text-xs text-[#C53D3D]">
              No address provided. Please return and enter address.
            </p>
          )}
        </Card>

        {/* Phase 2 Scope Information & CTA Preview */}
        <Card className="p-4 bg-[#EBF4F0] border border-[#1F6B4F]/20 space-y-3">
          <div className="flex items-start gap-2.5 text-xs text-[#15513C]">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#1F6B4F]" />
            <div className="space-y-1">
              <p className="font-bold">Phase 2 Shopping Experience Complete</p>
              <p className="leading-relaxed">
                Your order summary is ready. Per Phase 2 scope constraints, the
                actual WhatsApp deep link integration and automated handoff will
                be connected in Phase 3.
              </p>
            </div>
          </div>

          <Button
            variant="accent"
            size="lg"
            fullWidth
            className="font-bold gap-2 shadow-xs cursor-default"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Buy Now on WhatsApp (Ready for Phase 3)</span>
          </Button>
        </Card>
      </div>
    </div>
  );
};
