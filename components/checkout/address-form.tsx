"use client";

import React, { useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import {
  deliveryAddressSchema,
  DeliveryAddressFormData,
  canProceedToAddress,
} from "@/lib/validation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const emptySubscribe = () => () => {};

export const AddressForm: React.FC = () => {
  const router = useRouter();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const items = useCartStore((state) => state.items);
  const customRequests = useCartStore((state) => state.customRequests);
  const existingAddress = useCartStore((state) => state.address);
  const setAddress = useCartStore((state) => state.setAddress);

  const listedSubtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const isEligible = canProceedToAddress(listedSubtotal, customRequests.length);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeliveryAddressFormData>({
    resolver: zodResolver(deliveryAddressSchema),
    defaultValues: {
      fullAddress: existingAddress?.fullAddress || "",
      houseOrBuilding: existingAddress?.houseOrBuilding || "",
      areaOrStreet: existingAddress?.areaOrStreet || "",
      landmark: existingAddress?.landmark || "",
      phone: existingAddress?.phone || "",
      mapUrl: existingAddress?.mapUrl || "",
    },
  });

  const onSubmit = (data: DeliveryAddressFormData) => {
    setAddress({
      fullAddress: data.fullAddress,
      houseOrBuilding: data.houseOrBuilding || undefined,
      areaOrStreet: data.areaOrStreet || undefined,
      landmark: data.landmark || undefined,
      phone: data.phone,
      mapUrl: data.mapUrl || undefined,
    });
    router.push("/checkout/review");
  };

  if (!isMounted) return null;

  if (items.length === 0 && customRequests.length === 0) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-4">
        <h1 className="text-xl font-bold text-[#171717]">
          No active cart found
        </h1>
        <p className="text-xs text-[#6B6B6B]">
          Add items to your cart before entering an address.
        </p>
        <Link href="/stores">
          <Button variant="primary" size="md">
            Browse Stores
          </Button>
        </Link>
      </div>
    );
  }

  if (!isEligible) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-4">
        <h1 className="text-xl font-bold text-[#C53D3D]">
          Minimum Order Not Met
        </h1>
        <p className="text-xs text-[#6B6B6B]">
          Your cart subtotal must be at least ₹200 or contain a custom order to
          proceed to address.
        </p>
        <Link href="/cart">
          <Button variant="outline" size="md">
            Return to Cart
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12">
      <div>
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B6B6B] hover:text-[#1F6B4F] transition-colors py-1 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to cart</span>
        </Link>
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">
          Delivery Address
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1">
          Tell us where you&apos;d like your order delivered. No account or
          password required.
        </p>
      </div>

      <Card className="p-5 sm:p-6 space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Delivery Address *"
            placeholder="e.g., Flat 402, Block B, Silver Palms, Main Road..."
            error={errors.fullAddress?.message}
            {...register("fullAddress")}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Input
              label="House / Flat / Building"
              placeholder="e.g., Flat 402, Block B"
              error={errors.houseOrBuilding?.message}
              {...register("houseOrBuilding")}
            />

            <Input
              label="Area / Street"
              placeholder="e.g., MG Road, Sector 14"
              error={errors.areaOrStreet?.message}
              {...register("areaOrStreet")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Input
              label="Landmark (Optional)"
              placeholder="e.g., Near City Hospital"
              error={errors.landmark?.message}
              {...register("landmark")}
            />

            <Input
              label="Phone Number *"
              placeholder="e.g., 9876543210"
              error={errors.phone?.message}
              helperText="Merchant will contact this number via WhatsApp"
              {...register("phone")}
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              className="font-bold gap-2 shadow-xs"
            >
              <span>Review Order</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
