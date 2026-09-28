"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Store as StoreIcon,
  MessageCircle,
  MapPin,
  Phone,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { getStoreById } from "@/lib/data";
import {
  generateWhatsAppMessage,
  buildWhatsAppUrl,
  OrderHandoffDetails,
} from "@/lib/whatsapp";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const emptySubscribe = () => () => {};

export interface OrderSnapshot {
  storeName: string;
  whatsappUrl: string;
  listedSubtotal: number;
  itemsCount: number;
  customRequestsCount: number;
  fullAddress: string;
  phone: string;
}

export const ReviewSummary: React.FC = () => {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSnapshot, setOrderSnapshot] = useState<OrderSnapshot | null>(
    null
  );
  const [handoffInitiated, setHandoffInitiated] = useState(false);

  const items = useCartStore((state) => state.items);
  const customRequests = useCartStore((state) => state.customRequests);
  const storeId = useCartStore((state) => state.storeId);
  const address = useCartStore((state) => state.address);
  const resetSession = useCartStore((state) => state.resetSession);

  if (!isMounted) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#EBF4F0] animate-pulse mx-auto mb-3" />
        <p className="text-xs text-[#6B6B6B]">Loading order details...</p>
      </div>
    );
  }

  // Post-handoff view: displayed after WhatsApp handoff has been initiated
  if (handoffInitiated && orderSnapshot) {
    return (
      <div className="max-w-xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
        <div className="text-center space-y-3 pt-4">
          <div className="w-16 h-16 rounded-full bg-[#E7F6EC] text-[#238B57] flex items-center justify-center mx-auto shadow-xs border border-[#238B57]/20">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <Badge
            variant="success"
            className="px-3 py-1 text-xs font-bold gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            WhatsApp Handoff Ready
          </Badge>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
            You&apos;re almost done!
          </h1>

          <p className="text-sm text-[#6B6B6B] max-w-md mx-auto leading-relaxed">
            Your order details are ready in WhatsApp. Open WhatsApp and press{" "}
            <strong className="text-[#171717]">Send</strong> to send your order
            to{" "}
            <span className="font-semibold text-[#1F6B4F]">
              {orderSnapshot.storeName}
            </span>
            .
          </p>
        </div>

        {/* WhatsApp Send Instruction Box */}
        <Card className="p-5 bg-gradient-to-br from-white to-[#FEF8EC]/40 border border-[#F4B942]/40 rounded-2xl space-y-3">
          <div className="flex items-start gap-3 text-[#9A6700]">
            <div className="w-10 h-10 rounded-xl bg-[#FEF8EC] flex items-center justify-center shrink-0 border border-[#F4B942]/30">
              <MessageCircle className="w-5 h-5 text-[#E2A730]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-[#171717]">
                Remember to press Send
              </h2>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Quick Shop has prepared your structured order in WhatsApp. The
                store will receive your order only after you press the Send
                button in WhatsApp. No payment has been taken online.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#F4B942]/20 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <span className="text-xs text-[#6B6B6B]">
              Didn&apos;t open WhatsApp automatically?
            </span>
            <a
              href={orderSnapshot.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1F6B4F] hover:text-[#15513C] hover:underline"
            >
              <span>Click here to open WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </Card>

        {/* Prepared Order Snapshot Summary */}
        <Card className="p-5 space-y-3.5">
          <h2 className="text-xs font-bold text-[#171717] uppercase tracking-wider border-b border-[#E5E2DA] pb-2">
            Order Handoff Summary
          </h2>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[#6B6B6B] block">Store</span>
              <span className="font-bold text-[#171717]">
                {orderSnapshot.storeName}
              </span>
            </div>
            <div>
              <span className="text-[#6B6B6B] block">Items</span>
              <span className="font-bold text-[#171717]">
                {orderSnapshot.itemsCount} item
                {orderSnapshot.itemsCount === 1 ? "" : "s"}
                {orderSnapshot.customRequestsCount > 0 &&
                  ` (${orderSnapshot.customRequestsCount} custom)`}
              </span>
            </div>
            <div>
              <span className="text-[#6B6B6B] block">Listed Total</span>
              <span className="font-bold text-[#171717]">
                ₹{orderSnapshot.listedSubtotal}
              </span>
            </div>
            <div>
              <span className="text-[#6B6B6B] block">Contact Phone</span>
              <span className="font-bold text-[#171717]">
                {orderSnapshot.phone}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E5E2DA]/60 text-xs">
            <span className="text-[#6B6B6B] block">Delivery Destination</span>
            <span className="font-medium text-[#171717]">
              {orderSnapshot.fullAddress}
            </span>
          </div>
        </Card>

        {/* Reset / Return Action */}
        <div className="pt-2 text-center space-y-3">
          <Link href="/">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              className="font-bold gap-2 shadow-xs"
            >
              <span>Back to Quick Shop</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <p className="text-[11px] text-[#8E8B82]">
            Your Quick Shop cart has been reset. Returning home starts a clean
            shopping session.
          </p>
        </div>
      </div>
    );
  }

  // Pre-handoff: active order review
  const store = storeId ? getStoreById(storeId) : undefined;
  const listedSubtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  // If cart is empty and no handoff in progress
  if (items.length === 0 && customRequests.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <h1 className="text-xl font-bold text-[#171717]">
          No active order to review
        </h1>
        <p className="text-xs text-[#6B6B6B]">
          Your cart is currently empty. Browse our local stores to start an
          order.
        </p>
        <div className="pt-2">
          <Link href="/stores">
            <Button variant="primary" size="md">
              Browse Stores
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleContinueInWhatsApp = () => {
    // Prevent duplicate handoff attempts
    if (isSubmitting || !store || !address) return;
    setIsSubmitting(true);

    try {
      // 1. Snapshot the complete order state BEFORE resetting session
      const orderDetails: OrderHandoffDetails = {
        storeName: store.name,
        whatsappNumber: store.whatsappNumber,
        items: [...items],
        customRequests: [...customRequests],
        address: { ...address },
      };

      // 2. Generate WhatsApp message using existing utility
      const message = generateWhatsAppMessage(orderDetails);

      // 3. Build WhatsApp deep link URL using existing utility
      const whatsappUrl = buildWhatsAppUrl(store.whatsappNumber, message);

      // 4. Save order snapshot for post-handoff experience
      const snapshot: OrderSnapshot = {
        storeName: store.name,
        whatsappUrl,
        listedSubtotal,
        itemsCount: items.reduce((sum, i) => sum + i.quantity, 0),
        customRequestsCount: customRequests.length,
        fullAddress: address.fullAddress,
        phone: address.phone,
      };
      setOrderSnapshot(snapshot);

      // 5. Initiate WhatsApp handoff
      // Use window.open to open WhatsApp in a new tab/app without forced redirect
      try {
        const newTab = window.open(whatsappUrl, "_blank");
        if (newTab) {
          newTab.opener = null;
        }
      } catch (err) {
        // If window.open is blocked or fails, the user can use the explicit fallback link on the post-handoff view
        console.warn("Could not auto-open WhatsApp tab:", err);
      }

      // 6. Reset Quick Shop checkout/cart session
      resetSession();

      // 7. Transition to post-handoff view
      setHandoffInitiated(true);
    } catch (error) {
      console.error("Failed to initiate WhatsApp handoff:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12">
      {/* Navigation & Header */}
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
          <Card className="p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between gap-3">
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
            </div>

            <div className="pt-2 border-t border-[#E5E2DA]/60 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-[#6B6B6B]">
                <MessageCircle className="w-3.5 h-3.5 text-[#1F6B4F]" />
                <span>WhatsApp Destination:</span>
                <span className="font-mono font-semibold text-[#171717]">
                  +{store.whatsappNumber}
                </span>
              </div>
              {(store.whatsappNumber === "919999999999" ||
                store.whatsappNumber === "919888888888") && (
                <Badge variant="accent" className="text-[10px]">
                  Demo Store Number
                </Badge>
              )}
            </div>
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
                    Price to be confirmed
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
            <div className="flex items-center justify-between text-xs text-[#C53D3D]">
              <span className="flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Address details
                missing.
              </span>
              <Link href="/checkout/address">
                <Button variant="outline" size="sm">
                  Add Address
                </Button>
              </Link>
            </div>
          )}
        </Card>

        {/* WhatsApp Handoff Information & Primary CTA */}
        <Card className="p-5 bg-white border border-[#E5E2DA] space-y-4 shadow-sm">
          <div className="space-y-1.5 text-xs text-[#6B6B6B]">
            <p className="font-bold text-[#171717] flex items-center gap-1.5 text-sm">
              <MessageCircle className="w-4 h-4 text-[#1F6B4F]" />
              Ready to send your order through WhatsApp
            </p>
            <p className="leading-relaxed">
              Quick Shop will prepare your structured order message and launch
              WhatsApp. You must press{" "}
              <strong className="text-[#171717]">Send</strong> inside WhatsApp
              to submit your order to the store.
            </p>
            <p className="leading-relaxed text-[#8E8B82]">
              The store receives your order only after the message is sent. Your
              delivery address and contact phone will be included in the
              message. No payment has been taken online.
            </p>
          </div>

          <Button
            onClick={handleContinueInWhatsApp}
            disabled={isSubmitting || !store || !address}
            variant="primary"
            size="lg"
            fullWidth
            className="font-bold gap-2 text-base shadow-sm cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Opening WhatsApp...</span>
              </>
            ) : (
              <>
                <MessageCircle className="w-5 h-5" />
                <span>Continue in WhatsApp</span>
              </>
            )}
          </Button>

          <div className="text-[11px] text-[#8E8B82] text-center">
            <span>Direct merchant ordering • No advance payment taken</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
