# Quick Shop — Implementation Plan

## Phase 1 — Foundation

1. Create Next.js project.
2. Configure TypeScript.
3. Configure Tailwind.
4. Install minimal UI dependencies.
5. Create global layout.
6. Add Quick Shop brand tokens.
7. Add responsive container and typography system.

## Phase 2 — Store Discovery

Build:
- Home page.
- Store card.
- Store listing.
- Store search.
- Store empty state.

Use local demo data initially.

## Phase 3 — Catalog

Build:
- Store page.
- Product grid.
- Product card.
- Category filtering.
- Product search.
- Quantity controls.

## Phase 4 — Cart

Build Zustand cart store.

Required operations:
- `addItem`
- `removeItem`
- `setQuantity`
- `clearCart`
- `addCustomRequest`
- `removeCustomRequest`

Persist the cart locally.

## Phase 5 — Conditional Checkout

Implement exactly:

```text
if customRequests.length > 0:
    allow checkout
else if listedSubtotal >= 200:
    allow checkout
else:
    block checkout
```

Test this before continuing.

## Phase 6 — Address

Build:
- Address form.
- Validation.
- Optional map location.
- Review transition.

No account is required.

## Phase 7 — WhatsApp

Implement:
1. Generate deterministic order message.
2. URL encode message.
3. Build `wa.me` URL.
4. Clear active cart/session.
5. Open WhatsApp.

If popup blockers make a new-tab flow unreliable, use a normal browser navigation fallback.

## Phase 8 — Polish

Add:
- Loading states.
- Empty states.
- Error states.
- Mobile sticky cart.
- Accessible focus states.
- Image optimization.
- Subtle transitions.

## Phase 9 — Verification

Test:
- Mobile 320px.
- Mobile 375px.
- Mobile 430px.
- Tablet.
- Desktop.
- Keyboard navigation.
- Screen-reader labels.
- Refresh during cart.
- Store switching.
- Empty cart.
- ₹199 no custom order.
- ₹200 no custom order.
- ₹0 custom order.
- ₹199 + custom order.
- Address validation.
- WhatsApp URL generation.
- Cart reset after handoff.

## Suggested Component Tree

```text
App
├── Header
├── HomePage
│   ├── Hero
│   ├── StoreSearch
│   └── StoreGrid
│       └── StoreCard
│
├── StorePage
│   ├── StoreHeader
│   ├── ProductSearch
│   ├── CategoryTabs
│   ├── ProductGrid
│   │   └── ProductCard
│   └── CustomOrderCard
│
├── CartPage
│   ├── CartItem
│   ├── CustomRequestItem
│   ├── CartSummary
│   └── CheckoutCTA
│
├── AddressPage
│   └── AddressForm
│
└── ReviewPage
    ├── OrderSummary
    ├── AddressSummary
    └── WhatsAppCTA
```

## Definition of Done

A build is complete when a user can go from the home page to a WhatsApp-ready order without needing an account or payment.

The build must correctly enforce the conditional ₹200 rule and must not introduce unrelated features.
