import React from "react";
import { Metadata } from "next";
import { AddressForm } from "@/components/checkout/address-form";

export const metadata: Metadata = {
  title: "Delivery Address — Quick Shop",
  description: "Provide delivery address for your local store order.",
};

export default function AddressPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <AddressForm />
    </div>
  );
}
