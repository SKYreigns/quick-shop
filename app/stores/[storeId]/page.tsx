import React from "react";
import Link from "next/link";
import {
  getStoreById,
  getProductsByStore,
  getStoreCategories,
  getStores,
} from "@/lib/data";
import { StoreCatalogClient } from "@/components/store/store-catalog-client";
import { Button } from "@/components/ui/button";

export interface StorePageProps {
  params: Promise<{
    storeId: string;
  }>;
}

export async function generateStaticParams() {
  const stores = getStores();
  return stores.map((store) => ({
    storeId: store.id,
  }));
}

export default async function StorePage({ params }: StorePageProps) {
  const { storeId } = await params;
  const store = getStoreById(storeId);

  if (!store) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <h1 className="text-xl font-bold text-[#171717]">Store Not Found</h1>
        <p className="text-xs text-[#6B6B6B]">
          We couldn&apos;t find the store you are looking for. It may have moved
          or is temporarily unavailable.
        </p>
        <Link href="/">
          <Button variant="primary" size="md">
            Browse All Stores
          </Button>
        </Link>
      </div>
    );
  }

  const products = getProductsByStore(store.id);
  const categories = getStoreCategories(store.id);

  return (
    <StoreCatalogClient
      store={store}
      products={products}
      categories={categories}
    />
  );
}
