"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface StoreSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentStoreName?: string;
  newStoreName?: string;
}

export const StoreSwitchModal: React.FC<StoreSwitchModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentStoreName = "your previous store",
  newStoreName = "this store",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-[#E5E2DA] p-6 max-w-md w-full shadow-xl space-y-4">
        <div className="flex items-center gap-3 text-[#9A6700]">
          <div className="w-10 h-10 rounded-xl bg-[#FEF8EC] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-[#E2A730]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#171717]">
              Replace cart items?
            </h3>
            <p className="text-xs text-[#6B6B6B]">
              Quick Shop orders are store-specific
            </p>
          </div>
        </div>

        <p className="text-sm text-[#171717] leading-relaxed">
          Your cart contains items from{" "}
          <span className="font-semibold">{currentStoreName}</span>. Adding
          items from <span className="font-semibold">{newStoreName}</span> will
          start a fresh cart for this store.
        </p>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button variant="outline" size="md" onClick={onClose}>
            Keep Current Cart
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Start New Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
