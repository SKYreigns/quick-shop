import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#E5E2DA] bg-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B6B6B]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#171717]">Quick Shop</span>
          <span>•</span>
          <span>Lightweight local store ordering with WhatsApp handoff</span>
        </div>
        <div>
          <span>Direct order dispatch • No hidden commissions</span>
        </div>
      </div>
    </footer>
  );
};
