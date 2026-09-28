# Quick Shop — Tech Stack & Constraints

## Recommended Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui or a similarly small accessible component layer
- Zustand for cart state
- React Hook Form for address forms
- Zod for validation
- PostgreSQL if persistence is required
- Prisma or Drizzle if an ORM is desired
- Vercel-compatible deployment

## Architecture

Prefer a simple Next.js application.

Suggested structure:

```text
app/
  page.tsx
  stores/
    [storeId]/
      page.tsx
  cart/
    page.tsx
  checkout/
    address/
      page.tsx
    review/
      page.tsx
  api/
    stores/
    orders/

components/
  store/
  product/
  cart/
  checkout/
  ui/

lib/
  whatsapp.ts
  validation.ts
  pricing.ts
  data.ts

store/
  cart-store.ts
```

## State

Cart state should contain only what is necessary:

```ts
type CartState = {
  storeId: string | null;
  items: CartItem[];
  customRequests: CustomRequest[];
  address: DeliveryAddress | null;
};
```

Persist cart state locally so refreshes do not accidentally erase an active cart before checkout.

## Required Validation

The central rule should be represented by a small deterministic function:

```ts
function canProceedToAddress(
  listedProductSubtotal: number,
  customRequestCount: number
): boolean {
  if (customRequestCount > 0) return true;
  return listedProductSubtotal >= 200;
}
```

Do not duplicate conflicting versions of this rule across many components.

## WhatsApp

Use a normal WhatsApp deep link for MVP.

Do not introduce WhatsApp Business API unless explicitly requested later.

The message must be URL encoded.

## Performance Targets

Aim for:
- Lighthouse Performance: 90+ on a reasonable production deployment.
- Avoid unnecessary JavaScript.
- Optimize images.
- Avoid blocking fonts.
- Use server components by default where practical.
- Use client components only where interactivity requires them.

## Accessibility

Target WCAG 2.2 AA practices:
- Semantic HTML.
- Labels for every form control.
- Keyboard navigation.
- Visible focus.
- Sufficient contrast.
- Accessible error messages.
- Buttons must communicate disabled state.
- Do not rely on color alone.

## MUST NOT

The coding agent must not:
- Add authentication without a requirement.
- Add online payments.
- Add a merchant dashboard.
- Add driver tracking.
- Add a delivery routing engine.
- Add a full order state machine.
- Add a WhatsApp API integration.
- Add a multi-vendor marketplace cart.
- Add subscriptions.
- Add unnecessary animations.
- Add excessive modal dialogs.
- Add stock management.
- Add recommendation algorithms.
- Add an admin panel in the first build.
- Invent business rules.
- Treat custom-order price as part of the ₹200 threshold.
- Prevent a custom-order-only cart from proceeding.
- Mark an order as "placed" before WhatsApp is sent by the customer.
- Use fake external API calls merely to make the demo look functional.

## Design Constraint

The product should feel like a polished local ordering website, not an enterprise commerce dashboard.

Simple, fast, warm, and trustworthy.
