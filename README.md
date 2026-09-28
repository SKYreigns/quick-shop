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

- **Phase**: Bootstrap & Environment Setup (Prompt 0 complete)
- **Framework**: Next.js (App Router) with TypeScript & Tailwind CSS
- **Code Quality**: ESLint & Prettier with strict TypeScript verification

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
