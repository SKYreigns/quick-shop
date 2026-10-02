import React from "react";
import { Metadata } from "next";
import { ReviewSummary } from "@/components/checkout/review-summary";

export const metadata: Metadata = {
  title: "Review Order — Quick Shop",
  description:
    "Review order details, items, and address before WhatsApp handoff.",
};

export default function ReviewPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <ReviewSummary />
    </div>
  );
}
