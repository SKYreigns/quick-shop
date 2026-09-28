# Quick Shop — Master Prompt for a Coding Agent

You are implementing **Quick Shop**, a mobile-first local-store ordering website.

Read all files in this documentation package before writing code. Treat them as the product source of truth.

## Your priorities

1. Match the documented UX and visual system.
2. Keep the implementation simple.
3. Implement the custom-order checkout rule exactly.
4. Make the site responsive and accessible.
5. Do not add features outside the documented MVP.

## Critical rule

A cart without a custom request requires at least ₹200 in listed products.

A cart with one or more custom requests can proceed regardless of listed-product subtotal.

Therefore:

```ts
canProceed = customRequests.length > 0 || listedSubtotal >= 200;
```

Do not alter this logic.

## Core journey

Home → Store → Catalog → Cart → Address → Review → Buy Now → WhatsApp

## WhatsApp behavior

Generate a complete URL-encoded message and open the store's designated WhatsApp number. The user manually presses Send.

After initiating the handoff, clear the active cart and checkout state.

## Don't invent

Do not add:
- Authentication
- Payments
- Merchant dashboard
- Driver tracking
- WhatsApp Business API
- Complex order statuses
- Inventory synchronization
- Coupons
- Loyalty
- Ratings
- AI recommendations
- Multi-store cart

Build the smallest polished product that satisfies the acceptance criteria.

## Before declaring completion

Run through every test in `acceptance-criteria.md`, especially:
- ₹199 without custom order → blocked.
- ₹200 without custom order → allowed.
- ₹0 with custom order → allowed.
- ₹199 with custom order → allowed.
- WhatsApp message correctness.
- Cart reset after handoff.

If a requirement is ambiguous, prefer the simplest implementation that preserves the documented user journey.
