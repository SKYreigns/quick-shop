"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Store as StoreIcon,
  ArrowRight,
  ShoppingCart,
  MessageCircle,
  Truck,
  Sparkles,
} from "lucide-react";
import { Store } from "@/lib/types";
import { StoreCard } from "@/components/store/store-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface HomeClientProps {
  stores: Store[];
}

export const HomeClient: React.FC<HomeClientProps> = ({ stores }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStores = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return stores;
    return stores.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }, [stores, searchQuery]);

  return (
    <div className="space-y-12 py-2">
      {/* Hero Section */}
      <section className="text-center max-w-2xl mx-auto space-y-4 pt-2 sm:pt-6 pb-2">
        <Badge
          variant="secondary"
          className="px-3.5 py-1 text-xs gap-1.5 font-bold"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#1F6B4F]" />
          LOCAL SHOPPING, MADE SIMPLE
        </Badge>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171717] tracking-tight leading-tight">
          Get what you need. <br className="hidden sm:inline" />
          <span className="text-[#1F6B4F]">Delivered to your door.</span>
        </h1>

        <p className="text-sm sm:text-base text-[#6B6B6B] max-w-xl mx-auto leading-relaxed">
          Browse local neighborhood stores, add what you need, and send your
          structured order directly through WhatsApp.
        </p>

        {/* Functional Hero Search Bar */}
        <div className="pt-2 max-w-lg mx-auto">
          <div className="relative shadow-xs rounded-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8E8B82]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stores or products (e.g. Sharma General, Milk, Atta)..."
              className="w-full h-13 pl-12 pr-24 text-sm sm:text-base rounded-2xl bg-white border border-[#E5E2DA] text-[#171717] placeholder:text-[#8E8B82] focus:outline-none focus:ring-2 focus:ring-[#1F6B4F] focus:border-transparent transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#8E8B82] hover:text-[#171717] px-2 py-1 rounded-md"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Fast Action Links */}
        <div className="pt-1 flex flex-wrap items-center justify-center gap-3">
          <Link href="/stores">
            <Button size="md" className="gap-2 font-bold shadow-xs">
              Browse Stores <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="outline" size="md" className="gap-2">
              <ShoppingCart className="w-4 h-4 text-[#1F6B4F]" /> View Cart
            </Button>
          </Link>
        </div>
      </section>

      {/* Value Pillars / How it works */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-[#E5E2DA] p-5 shadow-2xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#EBF4F0] text-[#1F6B4F] flex items-center justify-center shrink-0">
            <StoreIcon className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-sm font-bold text-[#171717]">
              1. Pick a Store
            </h2>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Order directly from neighborhood shops you know and trust.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E2DA] p-5 shadow-2xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#FEF8EC] text-[#9A6700] flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 text-[#E2A730]" />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-sm font-bold text-[#171717]">
              2. Add Items & Custom Requests
            </h2>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Select catalog items or request unlisted goods with one click.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E2DA] p-5 shadow-2xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#E7F6EC] text-[#238B57] flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5 text-[#238B57]" />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-sm font-bold text-[#171717]">
              3. WhatsApp Checkout
            </h2>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Pre-filled order sent to the store. No accounts or online prepay.
            </p>
          </div>
        </div>
      </section>

      {/* Stores Discovery Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#171717] tracking-tight">
              Stores near you
            </h2>
            <p className="text-xs text-[#6B6B6B] mt-0.5">
              Available local merchants ready for immediate delivery
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            {filteredStores.length}{" "}
            {filteredStores.length === 1 ? "store" : "stores"}
          </Badge>
        </div>

        {filteredStores.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredStores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E5E2DA] p-10 text-center space-y-3">
            <p className="text-base font-bold text-[#171717]">
              No stores found
            </p>
            <p className="text-xs text-[#6B6B6B] max-w-sm mx-auto">
              No store matches &quot;{searchQuery}&quot;. Please try a different
              search or clear the query to view all local stores.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchQuery("")}
            >
              View All Stores
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};
