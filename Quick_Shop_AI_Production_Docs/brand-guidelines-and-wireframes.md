# Quick Shop — Brand Guidelines & Wireframes

## 1. Brand Personality

Quick Shop should feel:
- Friendly
- Reliable
- Fast
- Local
- Modern
- Straightforward

It should not feel:
- Corporate
- Luxury
- Aggressively promotional
- Overly futuristic
- Cluttered

## 2. Color System

Primary:
`#1F6B4F` — Quick Shop Green

Primary dark:
`#15513C`

Accent:
`#F4B942` — warm order/action accent

Background:
`#F8F7F3`

Surface:
`#FFFFFF`

Text:
`#171717`

Secondary text:
`#6B6B6B`

Border:
`#E5E2DA`

Success:
`#238B57`

Error:
`#C53D3D`

Use the green primarily for primary actions, links, selected states, and brand elements.

## 3. Typography

Recommended:
- Inter
- Geist
- Or another clean sans-serif with strong mobile readability.

Hierarchy:
- Hero: 48–64px desktop, 36–42px mobile.
- Page heading: 32–40px.
- Section heading: 22–28px.
- Card title: 16–18px.
- Body: 14–16px.
- Supporting text: 13–14px.

Use font weight rather than excessive color variation to establish hierarchy.

## 4. Shape Language

- Border radius: 12–18px for cards.
- Buttons: 10–12px.
- Inputs: 10–12px.
- Avoid excessive pill-shaped UI except tags/status labels.

## 5. Spacing

Use a consistent 4px base spacing system.

Primary page padding:
- Mobile: 16–20px.
- Desktop: 32–64px.

Product grid:
- Mobile: 2 columns.
- Tablet: 3 columns.
- Desktop: 4 columns.

## 6. Home Wireframe — Desktop

```text
┌─────────────────────────────────────────────────────────────┐
│ QUICK SHOP        Stores     How it works          🛒 Cart │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│             LOCAL SHOPPING, MADE SIMPLE                    │
│                                                             │
│        Get what you need. Delivered to your door.           │
│                                                             │
│       Browse local stores and order through WhatsApp.       │
│                                                             │
│      ┌─────────────────────────────────────────────┐        │
│      │ 🔍 Search stores or products...             │        │
│      └─────────────────────────────────────────────┘        │
│                                                             │
│                      STORES                                 │
│                                                             │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────┐ │
│  │   IMAGE    │ │   IMAGE    │ │   IMAGE    │ │  IMAGE   │ │
│  │            │ │            │ │            │ │          │ │
│  │ Store Name │ │ Store Name │ │ Store Name │ │ Store    │ │
│  │ Category   │ │ Category   │ │ Category   │ │          │ │
│  │ View Store │ │ View Store │ │ View Store │ │ View     │ │
│  └────────────┘ └────────────┘ └────────────┘ └──────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 7. Store Page — Desktop

```text
┌─────────────────────────────────────────────────────────────┐
│ ← Stores                         Store Name             🛒  │
├───────────────┬─────────────────────────────────────────────┤
│               │                                             │
│ CATEGORIES    │ Search products...                          │
│               │                                             │
│ All           │ PRODUCTS                                    │
│ Groceries     │                                             │
│ Snacks        │ [ PRODUCT ] [ PRODUCT ] [ PRODUCT ] [ ... ]│
│ Beverages     │                                             │
│ Household     │ [ PRODUCT ] [ PRODUCT ] [ PRODUCT ] [ ... ]│
│               │                                             │
│               │                                             │
│               │ CUSTOM ORDER                                │
│               │ Can't find what you need?                   │
│               │ [ Add a Custom Order ]                      │
└───────────────┴─────────────────────────────────────────────┘
```

## 8. Store Page — Mobile

```text
┌────────────────────────┐
│ ← Store Name       🛒 │
├────────────────────────┤
│ 🔍 Search products     │
├────────────────────────┤
│ All Grocery Snacks     │
├────────────────────────┤
│ ┌────────┐ ┌────────┐ │
│ │ IMAGE  │ │ IMAGE  │ │
│ │        │ │        │ │
│ │ Milk   │ │ Bread  │ │
│ │ ₹62    │ │ ₹45    │ │
│ │ + ADD  │ │ + ADD  │ │
│ └────────┘ └────────┘ │
│                        │
│ ┌────────────────────┐ │
│ │ Can't find it?     │ │
│ │ Add Custom Order   │ │
│ └────────────────────┘ │
├────────────────────────┤
│ 🛒 3 items    ₹264     │
│       VIEW CART →      │
└────────────────────────┘
```

## 9. Cart Wireframe

```text
┌────────────────────────────────────┐
│ ← Your Cart                        │
├────────────────────────────────────┤
│ Sharma General Store               │
│                                    │
│ Milk 1L                    ₹62     │
│                  −  2  +           │
│                                    │
│ Bread                      ₹45     │
│                  −  1  +           │
│                                    │
│ CUSTOM REQUEST                     │
│ "2 packets of XYZ detergent"      │
│ Price to be confirmed              │
│                                    │
│ Items total              ₹169      │
│                                    │
│ [ Proceed to Address ]             │
└────────────────────────────────────┘
```

If there is no custom request and subtotal is ₹169, the CTA is disabled and the message says:

> Add ₹31 more to your cart to continue.

If a custom request exists, the CTA is enabled despite the ₹169 subtotal.

## 10. Address Wireframe

```text
┌────────────────────────────────────┐
│ ← Delivery Address                 │
├────────────────────────────────────┤
│ Tell us where to deliver.          │
│                                    │
│ Full address                       │
│ ┌────────────────────────────────┐ │
│ │                                │ │
│ └────────────────────────────────┘ │
│                                    │
│ House / Flat / Building            │
│ ┌────────────────────────────────┐ │
│ │                                │ │
│ └────────────────────────────────┘ │
│                                    │
│ Area / Street                      │
│ ┌────────────────────────────────┐ │
│ │                                │ │
│ └────────────────────────────────┘ │
│                                    │
│ Landmark (optional)                │
│ ┌────────────────────────────────┐ │
│ │                                │ │
│ └────────────────────────────────┘ │
│                                    │
│ Phone number                       │
│ ┌────────────────────────────────┐ │
│ │                                │ │
│ └────────────────────────────────┘ │
│                                    │
│ [ Review Order ]                   │
└────────────────────────────────────┘
```

## 11. Review Wireframe

```text
┌────────────────────────────────────┐
│ ← Review Your Order               │
├────────────────────────────────────┤
│ STORE                              │
│ Sharma General Store               │
│                                    │
│ ITEMS                              │
│ Milk × 2                   ₹124    │
│ Bread × 1                   ₹45    │
│                                    │
│ CUSTOM REQUEST                     │
│ 2 packets of XYZ detergent        │
│ Price to be confirmed              │
│                                    │
│ ITEMS TOTAL                ₹169    │
│                                    │
│ DELIVERY ADDRESS                   │
│ House 21, ABC Colony              │
│ Jaipur                             │
│                                    │
│ [ BUY NOW ON WHATSAPP ]            │
└────────────────────────────────────┘
```

## 12. Interaction Rules

- Primary CTA is visually dominant.
- Disabled CTA must be obviously disabled.
- Add-to-cart should provide immediate feedback.
- Quantity changes should be instant.
- Cart count should update immediately.
- Avoid full-page reloads for ordinary cart operations.
- Use subtle transitions, not elaborate animation.
- On mobile, keep the cart CTA visible when useful.
