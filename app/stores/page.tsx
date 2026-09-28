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

  return <StoreDiscoveryClient initialStores={stores} />;
}
