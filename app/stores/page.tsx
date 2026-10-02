import React from "react";
import { Metadata } from "next";
import { getStores } from "@/lib/data";
import { StoreDiscoveryClient } from "@/components/store/store-discovery-client";

export const metadata: Metadata = {
  title: "Local Stores — Quick Shop",
  description:
    "Browse participating neighborhood stores and order essentials for WhatsApp delivery.",
};

export default function StoresPage() {
  const stores = getStores();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <StoreDiscoveryClient initialStores={stores} />
    </div>
  );
}
