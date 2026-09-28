import React from "react";
import { Metadata } from "next";
import { AddressForm } from "@/components/checkout/address-form";

export const metadata: Metadata = {
  title: "Delivery Address — Quick Shop",
  description: "Provide delivery address for your local store order.",
};

export default function AddressPage() {
  return <AddressForm />;
}
