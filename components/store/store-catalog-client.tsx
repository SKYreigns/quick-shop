"use client";

import React, { useState, useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { Search, ShoppingBag, ArrowRight } from "lucide-react";
import { Store, Product } from "@/lib/types";
import { useCartStore } from "@/store/cart-store";
import { getStoreById } from "@/lib/data";
import { StoreHeader } from "@/components/store/store-header";
import { ProductCard } from "@/components/product/product-card";
import { CustomOrderCard } from "@/components/store/custom-order-card";
import { StoreSwitchModal } from "@/components/store/store-switch-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface StoreCatalogClientProps {
  store: Store;
  products: Product[];
  categories: string[];
}

const emptySubscribe = () => () => {};

export const StoreCatalogClient: React.FC<StoreCatalogClientProps> = ({
  store,
  products,
  categories,
}) => {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Store switch modal state
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);
  const [switchModalOpen, setSwitchModalOpen] = useState(false);

  const cartStoreId = useCartStore((state) => state.storeId);
  const switchStoreAndAdd = useCartStore((state) => state.switchStoreAndAdd);
  const totalItemCount = useCartStore((state) => state.getTotalItemCount());
  const listedSubtotal = useCartStore((state) => state.getListedSubtotal());

  // Existing store name if different
  const existingStore = useMemo(() => {
    if (!cartStoreId || cartStoreId === store.id) return undefined;
    return getStoreById(cartStoreId);
  }, [cartStoreId, store.id]);

  // Filter products by category and search
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleStoreSwitchRequest = (product: Product) => {
    setPendingProduct(product);
    setSwitchModalOpen(true);
  };

  const handleConfirmStoreSwitch = () => {
    if (pendingProduct) {
      switchStoreAndAdd(pendingProduct, 1);
      setPendingProduct(null);
    }
  };

  const isCartBelongingToThisStore =
    isMounted && cartStoreId === store.id && totalItemCount > 0;

  return (
    <div className="space-y-6 pb-20 sm:pb-8">
      {/* Store Header */}
      <StoreHeader store={store} />

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        {/* Search input */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8B82]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products in this store..."
            className="w-full h-11 pl-10 pr-4 text-sm rounded-xl bg-white border border-[#E5E2DA] text-[#171717] placeholder:text-[#8E8B82] focus:outline-none focus:ring-2 focus:ring-[#1F6B4F] focus:border-transparent transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8E8B82] hover:text-[#171717] px-1 py-0.5"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#1F6B4F] text-white shadow-2xs"
                    : "bg-white text-[#6B6B6B] hover:text-[#171717] hover:bg-[#F8F7F3] border border-[#E5E2DA]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#171717]">
            {selectedCategory === "All" ? "All Products" : selectedCategory}
          </h2>
          <Badge variant="outline" className="text-xs">
            {filteredProducts.length} item
            {filteredProducts.length === 1 ? "" : "s"}
          </Badge>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onStoreSwitchRequest={handleStoreSwitchRequest}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E5E2DA] p-8 text-center space-y-3">
            <p className="text-sm font-bold text-[#171717]">
              No products found
            </p>
            <p className="text-xs text-[#6B6B6B] max-w-sm mx-auto">
              We couldn&apos;t find any item matching &quot;{searchQuery}&quot;.
              Try another search or submit a custom request below.
            </p>
            {searchQuery && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="mt-1"
              >
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Custom Item Request Card */}
      <div className="pt-4">
        <CustomOrderCard storeId={store.id} storeName={store.name} />
      </div>

      {/* Store Switch Confirmation Modal */}
      <StoreSwitchModal
        isOpen={switchModalOpen}
        onClose={() => setSwitchModalOpen(false)}
        onConfirm={handleConfirmStoreSwitch}
        currentStoreName={existingStore?.name || "your previous store"}
        newStoreName={store.name}
      />

      {/* Mobile Sticky Cart Bar (Brand Guidelines Section 8) */}
      {isCartBelongingToThisStore && (
        <div className="fixed bottom-4 inset-x-4 z-40 sm:hidden animate-in slide-in-from-bottom duration-200">
          <Link
            href="/cart"
            className="flex items-center justify-between bg-[#1F6B4F] text-white px-4 py-3 rounded-2xl shadow-xl active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-xs font-bold block">
                  {totalItemCount} item{totalItemCount === 1 ? "" : "s"}
                </span>
                <span className="text-[11px] text-white/80 block">
                  Subtotal: ₹{listedSubtotal}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold bg-white text-[#1F6B4F] px-3 py-1.5 rounded-xl shadow-xs">
              <span>View Cart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};
