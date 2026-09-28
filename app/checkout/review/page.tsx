import React from "react";
import { Metadata } from "next";
import { ReviewSummary } from "@/components/checkout/review-summary";

export const metadata: Metadata = {
  title: "Review Order — Quick Shop",
  description:
    "Review order details, items, and address before WhatsApp handoff.",
};

export default function ReviewPage() {
  return <ReviewSummary />;
}
