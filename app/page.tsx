import React from "react";
import Link from "next/link";
import {
  Store as StoreIcon,
  ArrowRight,
  ShieldCheck,
  ShoppingCart,
  MessageCircle,
} from "lucide-react";
import { getStores } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const stores = getStores();

  return (
    <div className="space-y-10 py-4">
      {/* Hero Section */}
      <section className="text-center max-w-2xl mx-auto space-y-4 pt-4 pb-2">
        <Badge variant="secondary" className="px-3 py-1 text-xs">
          LOCAL SHOPPING, MADE SIMPLE
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171717] tracking-tight leading-tight">
          Get what you need. <br className="hidden sm:inline" />
          <span className="text-[#1F6B4F]">Delivered to your door.</span>
        </h1>
        <p className="text-sm sm:text-base text-[#6B6B6B] max-w-xl mx-auto">
          Browse local neighborhood stores, add what you need, and send your
          structured order directly through WhatsApp.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link href="/stores">
            <Button size="lg" className="gap-2">
              Browse Stores <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="outline" size="lg" className="gap-2">
              <ShoppingCart className="w-4 h-4 text-[#1F6B4F]" /> View Cart
            </Button>
          </Link>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <Card className="flex items-start gap-3.5 p-4 sm:p-5">
          <div className="w-10 h-10 rounded-xl bg-[#EBF4F0] text-[#1F6B4F] flex items-center justify-center shrink-0">
            <StoreIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#171717]">
              Local Stores
            </h2>
            <p className="text-xs text-[#6B6B6B] mt-0.5">
              Direct neighborhood shops you already know and trust.
            </p>
          </div>
        </Card>

        <Card className="flex items-start gap-3.5 p-4 sm:p-5">
          <div className="w-10 h-10 rounded-xl bg-[#FEF8EC] text-[#9A6700] flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#171717]">
              WhatsApp Handoff
            </h2>
            <p className="text-xs text-[#6B6B6B] mt-0.5">
              Pre-formatted order message sent straight to the merchant.
            </p>
          </div>
        </Card>

        <Card className="flex items-start gap-3.5 p-4 sm:p-5">
          <div className="w-10 h-10 rounded-xl bg-[#E7F6EC] text-[#238B57] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#171717]">
              No Account Required
            </h2>
            <p className="text-xs text-[#6B6B6B] mt-0.5">
              Zero login friction. Add delivery details and complete your order.
            </p>
          </div>
        </Card>
      </section>

      {/* Stores Preview Baseline */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#171717] tracking-tight">
              Stores near you
            </h2>
            <p className="text-xs text-[#6B6B6B]">
              Ready for catalog browsing and ordering
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            {stores.length} Available
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stores.map((store) => (
            <Card
              key={store.id}
              hoverable
              className="p-5 flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-[#171717]">
                      {store.name}
                    </h3>
                    <Badge variant="success">Open</Badge>
                  </div>
                  <p className="text-xs font-medium text-[#1F6B4F]">
                    {store.category}
                  </p>
                  <p className="text-xs text-[#6B6B6B] pt-1">
                    {store.description}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#EBF4F0] flex items-center justify-center text-[#1F6B4F] shrink-0">
                  <StoreIcon className="w-6 h-6" />
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5E2DA] flex items-center justify-between">
                <span className="text-xs text-[#6B6B6B]">
                  Delivery available
                </span>
                <Link href={`/stores/${store.id}`}>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="font-semibold gap-1.5"
                  >
                    View Store <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
