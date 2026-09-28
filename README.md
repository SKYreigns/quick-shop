# Quick Shop

Quick Shop is a lightweight, mobile-first local-store ordering platform designed for fast and friction-free neighborhood commerce with WhatsApp checkout. Customers browse local participating stores, add catalog products, optionally include custom unlisted item requests, enter delivery details, and hand off pre-formatted orders directly to merchants via WhatsApp.

## Core User Flow

1. **Store Selection**: Discover and select a local neighborhood store.
2. **Catalog Browsing**: Browse categorized products and manage item quantities.
3. **Custom Item Requests**: Add custom requests for unlisted goods with price to be confirmed.
4. **Conditional Cart Validation**: Check out with minimum ₹200 listed-product subtotal, or bypass subtotal restrictions when custom item requests are present.
5. **Delivery Address**: Provide delivery address and contact information without requiring an account.
6. **Order Review & WhatsApp Handoff**: Review complete order details and initiate checkout via a pre-filled WhatsApp deep link, resetting the shopping session.

## Current Development Status

- **Phase**: MVP Complete — Production Configuration & Vercel Deployment Readiness (Phases 1, 2, 3 & 4)
- **Framework**: Next.js 16 (App Router) with TypeScript & Tailwind CSS v4
- **State Management**: Zustand with client-side localStorage persistence & SSR hydration guards
- **Code Quality**: ESLint, Prettier, TypeScript strict mode with 100% build and typecheck pass rate

## Project Documentation

Comprehensive product and technical specifications are maintained in the [`Quick_Shop_AI_Production_Docs/`](./Quick_Shop_AI_Production_Docs/) directory:

- [README & Overview](./Quick_Shop_AI_Production_Docs/README.md)
- [Project Specification](./Quick_Shop_AI_Production_Docs/spec.md)
- [Tech Stack & Constraints](./Quick_Shop_AI_Production_Docs/tech-stack-and-constraints.md)
- [Implementation Plan](./Quick_Shop_AI_Production_Docs/implementation-plan.md)
- [Acceptance Criteria](./Quick_Shop_AI_Production_Docs/acceptance-criteria.md)
- [Data Schema & API Contracts](./Quick_Shop_AI_Production_Docs/data-schema-and-api-contracts.md)
- [Content & Copy Guide](./Quick_Shop_AI_Production_Docs/content-and-copy.md)
- [Brand Guidelines & Wireframes](./Quick_Shop_AI_Production_Docs/brand-guidelines-and-wireframes.md)
- [Sample Data](./Quick_Shop_AI_Production_Docs/sample-data.json)
- [AI Agent Prompt Guide](./Quick_Shop_AI_Production_Docs/ai-agent-prompt.md)

## Development

### Prerequisites

- Node.js 22.x (`.nvmrc` provided)
- npm (authoritative lockfile: `package-lock.json`)

### Commands

- **Install dependencies**:

  ```bash
  npm install
  ```

- **Start development server**:

  ```bash
  npm run dev
  ```

- **Run code linting**:

  ```bash
  npm run lint
  ```

- **Run TypeScript validation**:

  ```bash
  npm run typecheck
  ```

- **Format code**:

  ```bash
  npm run format
  ```

- **Check code formatting**:

  ```bash
  npm run format:check
  ```

- **Build production bundle**:

  ```bash
  npm run build
  ```

- **Start production server**:

  ```bash
  npm run start
  ```

## Environment Configuration

Configuration is managed via `.env` files (see `.env.example`).

| Variable                              | Purpose                                          | Public / Secret | Local Default           | Production Requirement              |
| ------------------------------------- | ------------------------------------------------ | --------------- | ----------------------- | ----------------------------------- |
| `NEXT_PUBLIC_APP_NAME`                | Display title in browser header and branding     | Public          | `Quick Shop`            | Optional (falls back to Quick Shop) |
| `NEXT_PUBLIC_APP_URL`                 | Base URL for Open Graph, canonical tags, sitemap | Public          | `http://localhost:3000` | Required (Production domain URL)    |
| `NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER` | Fallback WhatsApp destination                    | Public          | `918700914124`          | Demo placeholder (Replace)          |

> **Note on Security**: The Quick Shop MVP does not require or store any backend secrets, API keys, or database credentials. All `NEXT_PUBLIC_*` variables are client-accessible by design. Never add private secrets to `NEXT_PUBLIC_*` variables.

## Merchant WhatsApp Configuration

Stores in Quick Shop are configured in `lib/data.ts`:

- **Sharma General Store** (`store_sharma`): `918700914124` (DEMO PLACEHOLDER)
- **City Fresh Mart** (`store_city_fresh`): `918700914124` (DEMO PLACEHOLDER)

Before customer launch, these numbers must be updated to verified merchant WhatsApp phone numbers in `lib/data.ts`. The review screen automatically displays a "Demo Store Number" warning badge when any demo number is detected.

## Vercel Deployment Checklist

Follow this checklist when preparing to deploy to Vercel:

### 1. Repository

- [ ] GitHub repository connected to Vercel project.
- [ ] Correct deployment branch selected (`main`).
- [ ] Clean git status with no uncommitted changes or secret files.
- [ ] `.gitignore` properly excludes all `.env*` local files except `.env.example`.

### 2. Build Verification

- [ ] `npm install` completes cleanly with no peer dependency conflicts.
- [ ] TypeScript check passes: `npm run typecheck` (zero errors).
- [ ] ESLint check passes: `npm run lint` (zero warnings/errors).
- [ ] Prettier formatting check passes: `npm run format:check`.
- [ ] Production build succeeds: `npm run build` with all static pages generated.

### 3. Environment Configuration

- [ ] `NEXT_PUBLIC_APP_URL` configured in Vercel project settings to production domain (e.g. `https://quick-shop.vercel.app` or custom domain).
- [ ] Merchant WhatsApp numbers configured with real, verified phone numbers in `lib/data.ts` (or retained intentionally for demo deployments).
- [ ] Review screen verified to ensure demo warnings appear only on placeholder numbers.

### 4. Functional Verification

- [ ] Homepage loads cleanly (`/`).
- [ ] Store discovery loads all participating stores (`/stores`).
- [ ] Store catalog loads products and categories (`/stores/[storeId]`).
- [ ] Real-time search and category filtering work smoothly.
- [ ] Cart management works (add, increment, decrement, remove).
- [ ] Single-store restriction works (prompts confirmation when switching stores).
- [ ] ₹200 minimum order rule blocks orders below ₹200 without custom items.
- [ ] Custom item request exception bypasses ₹200 rule as specified.
- [ ] Address form validation enforces required fields and 10-digit mobile number.
- [ ] Review summary screen accurately displays items, subtotal, and address.
- [ ] WhatsApp URL generation correctly formats the message and opens WhatsApp.
- [ ] Session reset clears active cart and preserves order snapshot for post-handoff view.

### 5. Real-Device Verification

- [ ] **Android Browser**: WhatsApp deep link opens native WhatsApp app.
- [ ] **iOS Safari**: WhatsApp deep link opens native WhatsApp app.
- [ ] **Desktop Browser**: WhatsApp deep link opens WhatsApp Web or desktop app.
- [ ] **Pop-up Blocker Fallback**: Inline "Click here to open WhatsApp" link functions when pop-ups are blocked.
