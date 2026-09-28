"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Store } from "@/lib/types";
import { StoreCard } from "@/components/store/store-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface StoreDiscoveryClientProps {
  initialStores: Store[];
}

export const StoreDiscoveryClient: React.FC<StoreDiscoveryClientProps> = ({
  initialStores,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract all categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    initialStores.forEach((s) => cats.add(s.category));
    return ["All", ...Array.from(cats)];
  }, [initialStores]);

  // Filter stores
  const filteredStores = useMemo(() => {
    return initialStores.filter((store) => {
      const matchesCategory =
        selectedCategory === "All" || store.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialStores, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
          Discover Local Stores
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1">
          Select a participating neighborhood store to browse fresh everyday
          essentials and place your order.
        </p>
      </div>

      {/* Controls: Search & Category Filter */}
      <div className="space-y-3">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8B82]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by store name, goods, or area..."
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

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
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

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#171717]">
          {selectedCategory === "All" ? "All Stores" : selectedCategory}
        </h2>
        <Badge variant="outline" className="text-xs">
          {filteredStores.length} store{filteredStores.length === 1 ? "" : "s"}
        </Badge>
      </div>

      {/* Stores Grid */}
      {filteredStores.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E5E2DA] p-10 text-center space-y-3">
          <p className="text-base font-bold text-[#171717]">No stores found</p>
          <p className="text-xs text-[#6B6B6B] max-w-sm mx-auto">
            We couldn&apos;t find any store matching &quot;{searchQuery}&quot;.
            Please try a different search term or clear the filter.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};
