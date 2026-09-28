import React from "react";
import { Metadata } from "next";
import { CartClient } from "@/components/cart/cart-client";

export const metadata: Metadata = {
  title: "Your Cart — Quick Shop",
  description:
    "Review items in your active shopping cart and proceed to delivery address.",
};

export default function CartPage() {
  return <CartClient />;
}
