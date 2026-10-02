import React from "react";
import { Metadata } from "next";
import { CartClient } from "@/components/cart/cart-client";

export const metadata: Metadata = {
  title: "Your Cart — Quick Shop",
  description:
    "Review items in your active shopping cart and proceed to delivery address.",
};

export default function CartPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <CartClient />
    </div>
  );
}
