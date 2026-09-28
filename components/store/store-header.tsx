import React from "react";
import Link from "next/link";
import { ArrowLeft, Store as StoreIcon, ShieldCheck } from "lucide-react";
import { Store } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export interface StoreHeaderProps {
  store: Store;
}

export const StoreHeader: React.FC<StoreHeaderProps> = ({ store }) => {
  return (
    <div className="space-y-4 pb-4 border-b border-[#E5E2DA]">
      {/* Back to Stores Link */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B6B6B] hover:text-[#1F6B4F] transition-colors py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to stores</span>
        </Link>
      </div>

      {/* Store Banner & Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#EBF4F0] border border-[#1F6B4F]/15 flex items-center justify-center text-[#1F6B4F] shrink-0 shadow-xs">
            <StoreIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#171717] tracking-tight">
                {store.name}
              </h1>
              {store.isOpen ? (
                <Badge variant="success" className="gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#238B57]" />
                  Open
                </Badge>
              ) : (
                <Badge variant="outline">Closed</Badge>
              )}
            </div>
            <p className="text-xs font-semibold text-[#1F6B4F]">
              {store.category}
            </p>
            <p className="text-xs text-[#6B6B6B] max-w-xl leading-relaxed">
              {store.description}
            </p>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 text-xs text-[#6B6B6B] bg-white sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-[#E5E2DA]">
          <div className="flex items-center gap-1 text-[#1F6B4F] font-semibold text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Local Merchant</span>
          </div>
          <span className="text-[11px] text-[#8E8B82]">
            WhatsApp Checkout Enabled
          </span>
        </div>
      </div>
    </div>
  );
};
