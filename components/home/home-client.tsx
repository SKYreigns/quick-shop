"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <div className="w-full">
      {/* Hero Section with Warm Cream & Orange Background */}
      <section className="relative w-full bg-hero-pattern overflow-hidden border-b border-[#F0E6D8]/80">
        {/* Decorative Dotted Grid overlay (Top-Right) */}
        <div
          className="absolute top-0 right-0 w-full sm:w-2/3 h-full bg-dot-grid opacity-20 pointer-events-none"
          aria-hidden="true"
        />

        {/* Translucent Glowing Blobs & Concentric Ring Accents */}
        <div
          className="absolute right-[-8%] top-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-gradient-to-br from-[#FF9238]/30 via-[#FF6B00]/20 to-[#FF4500]/5 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute right-[2%] top-1/2 -translate-y-1/2 w-[460px] h-[460px] border border-[#FF7700]/15 rounded-full pointer-events-none hidden lg:block"
          aria-hidden="true"
        />
        <div
          className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[340px] h-[340px] border border-[#FF7700]/20 rounded-full pointer-events-none hidden lg:block"
          aria-hidden="true"
        />

        {/* Organic Wave/Arc extending from lower-right */}
        <div
          className="absolute right-0 bottom-0 w-full lg:w-3/4 h-72 bg-gradient-to-tl from-[#FFA767]/25 via-transparent to-transparent rounded-tl-full pointer-events-none"
          aria-hidden="true"
        />

        {/* Main Hero Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-14 pb-20 sm:pb-28 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LEFT SIDE: Marketing Content & Search */}
            <div className="lg:col-span-7 space-y-5 text-left z-10">
              <Badge
                variant="secondary"
                className="px-3.5 py-1.5 text-xs gap-2 font-bold bg-[#1F6B4F]/10 text-[#1F6B4F] border border-[#1F6B4F]/20 rounded-full inline-flex items-center shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#1F6B4F]" />
                LOCAL SHOPPING, MADE SIMPLE
              </Badge>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight leading-[1.15]">
                Get what you need. <br className="hidden sm:inline" />
                <span className="text-[#1F6B4F] inline-block">
                  Delivered to your door.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#525252] max-w-xl leading-relaxed font-medium">
                Browse local neighborhood stores, add what you need, and send
                your structured order directly through WhatsApp.
              </p>

              {/* Functional Search Bar */}
              <div className="pt-2 max-w-lg">
                <div className="relative shadow-md shadow-amber-950/5 rounded-2xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8E8B82]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search stores or products (e.g. Sharma General, Milk, Atta)..."
                    className="w-full h-13 sm:h-14 pl-12 pr-24 text-sm sm:text-base rounded-2xl bg-white border border-[#E2DDD3] text-[#171717] placeholder:text-[#8E8B82] focus:outline-none focus:ring-2 focus:ring-[#1F6B4F] focus:border-transparent transition-all shadow-xs"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#8E8B82] hover:text-[#171717] px-2.5 py-1 rounded-md bg-[#F4F1EA] hover:bg-[#EAE5D9] transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Link href="/stores">
                  <Button
                    size="md"
                    className="gap-2 font-bold shadow-sm h-11 px-5 rounded-xl bg-[#1F6B4F] hover:bg-[#15513C] text-white transition-all"
                  >
                    Browse Stores <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/cart">
                  <Button
                    variant="outline"
                    size="md"
                    className="gap-2 h-11 px-5 rounded-xl bg-white/90 hover:bg-white border-[#D8D2C5] text-[#171717] font-semibold shadow-2xs"
                  >
                    <ShoppingCart className="w-4 h-4 text-[#1F6B4F]" /> View
                    Cart
                  </Button>
                </Link>
              </div>
            </div>

            {/* RIGHT SIDE: Shopping Cart Visual */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end z-10 mt-6 lg:mt-0">
              <div className="relative w-full max-w-[360px] sm:max-w-[440px] lg:max-w-none animate-hero-float">
                {/* Glow behind the cart visual */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-[#FF9843]/20 via-[#FF7700]/30 to-transparent rounded-full filter blur-2xl opacity-75 -z-10"
                  aria-hidden="true"
                />

                <Image
                  src="/hero-shopping-cart.webp"
                  alt="Shopping cart filled with local shopping bags and packages"
                  width={560}
                  height={560}
                  priority
                  className="w-full h-auto object-contain drop-shadow-2xl max-h-[340px] sm:max-h-[440px] lg:max-h-[500px] mx-auto select-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Soft Organic Wave Boundary Fading into #F8F7F3 */}
        <div
          className="w-full overflow-hidden leading-none text-[#F8F7F3] -mb-1"
          aria-hidden="true"
        >
          <svg
            className="relative block w-full h-10 sm:h-14 md:h-16"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,60 350,-30 500,40 C650,110 900,20 1200,50 L1200,120 L0,120 Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </section>

      {/* Feature Cards Floating Over Hero Transition */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 -mt-10 sm:-mt-14 lg:-mt-16 relative z-20">
          <div className="bg-white rounded-2xl border border-[#E5E2DA] p-5.5 shadow-md shadow-neutral-900/5 hover:shadow-lg transition-all flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#EBF4F0] text-[#1F6B4F] flex items-center justify-center shrink-0 shadow-2xs">
              <StoreIcon className="w-5.5 h-5.5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-[#171717]">
                1. Pick a Store
              </h2>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Order directly from neighborhood shops you know and trust.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E2DA] p-5.5 shadow-md shadow-neutral-900/5 hover:shadow-lg transition-all flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#FEF8EC] text-[#9A6700] flex items-center justify-center shrink-0 shadow-2xs">
              <MessageCircle className="w-5.5 h-5.5 text-[#E2A730]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-[#171717]">
                2. Add Items & Custom Requests
              </h2>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Select catalog items or request unlisted goods with one click.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E2DA] p-5.5 shadow-md shadow-neutral-900/5 hover:shadow-lg transition-all flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#E7F6EC] text-[#238B57] flex items-center justify-center shrink-0 shadow-2xs">
              <Truck className="w-5.5 h-5.5 text-[#238B57]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-[#171717]">
                3. WhatsApp Checkout
              </h2>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Pre-filled order sent to the store. No accounts or online
                prepay.
              </p>
            </div>
          </div>
        </section>

        {/* Stores Discovery Section */}
        <section className="space-y-6 pt-12 sm:pt-16 pb-12 sm:pb-16">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#171717] tracking-tight">
                Stores near you
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5">
                Available local merchants ready for immediate delivery
              </p>
            </div>
            <Badge
              variant="outline"
              className="text-xs font-semibold px-3 py-1 bg-white border-[#E5E2DA]"
            >
              {filteredStores.length}{" "}
              {filteredStores.length === 1 ? "store" : "stores"}
            </Badge>
          </div>

          {filteredStores.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
              {filteredStores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E5E2DA] p-10 text-center space-y-3 shadow-2xs">
              <p className="text-base font-bold text-[#171717]">
                No stores found
              </p>
              <p className="text-xs text-[#6B6B6B] max-w-sm mx-auto">
                No store matches &quot;{searchQuery}&quot;. Please try a
                different search or clear the query to view all local stores.
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
    </div>
  );
};
