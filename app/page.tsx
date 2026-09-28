import React from "react";
import { getStores } from "@/lib/data";
import { HomeClient } from "@/components/home/home-client";

export default function HomePage() {
  const stores = getStores();

  return <HomeClient stores={stores} />;
}
