import React from "react";
import Link from "next/link";
import { Store as StoreIcon, ArrowRight, Clock } from "lucide-react";
import { Store } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface StoreCardProps {
  store: Store;
}

export const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  return (
    <Card
      hoverable
      className="p-5 flex flex-col justify-between h-full space-y-4"
    >
      <div className="space-y-3">
        {/* Top Header with Visual and Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#EBF4F0] flex items-center justify-center text-[#1F6B4F] shrink-0 border border-[#1F6B4F]/10">
            <StoreIcon className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-1.5">
            {store.isOpen ? (
              <Badge variant="success" className="gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#238B57]" />
                Open
              </Badge>
            ) : (
              <Badge variant="outline">Closed</Badge>
            )}
          </div>
        </div>

        {/* Store Title & Metadata */}
        <div>
          <h3 className="font-bold text-base sm:text-lg text-[#171717] group-hover:text-[#1F6B4F] transition-colors">
            {store.name}
          </h3>
          <p className="text-xs font-medium text-[#1F6B4F] mt-0.5">
            {store.category}
          </p>
          <p className="text-xs text-[#6B6B6B] mt-1.5 line-clamp-2 leading-relaxed">
            {store.description}
          </p>
        </div>
      </div>

      {/* Footer Info & View Store CTA */}
      <div className="pt-3 border-t border-[#E5E2DA] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-[11px] font-medium text-[#6B6B6B]">
          <Clock className="w-3.5 h-3.5 text-[#1F6B4F]" />
          <span>Delivery available</span>
        </div>
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
  );
};
