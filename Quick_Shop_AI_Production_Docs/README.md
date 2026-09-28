# Quick Shop — AI Implementation Documentation Package

Quick Shop is a lightweight local-store delivery ordering web experience.

## Core flow

Store selection → Store catalog → Cart / optional Custom Order → Address → Buy Now → WhatsApp

The website is intentionally not a full e-commerce or delivery-management platform.

## Critical business rule

There are two checkout cases:

1. **Normal cart only:** the listed-product subtotal must be at least ₹200 before the user can proceed to the address step.
2. **Custom order present:** the ₹200 minimum does NOT apply. The user can proceed to address even if the listed-product subtotal is ₹0.

Examples:

- ₹250 listed products → valid.
- ₹150 listed products and no custom order → blocked.
- ₹150 listed products + custom order → valid.
- ₹0 listed products + custom order → valid.

## Required handoff

The final Buy Now action opens WhatsApp with a URL-encoded, pre-filled order message. The customer manually presses Send in WhatsApp.

After the handoff is initiated, reset the active cart/session so that returning to Quick Shop starts a fresh shopping session.

## Documentation order

1. `spec.md` — product and functional specification.
2. `tech-stack-and-constraints.md` — implementation stack and anti-overengineering rules.
3. `content-and-copy.md` — production-ready copy and sample data.
4. `brand-guidelines-and-wireframes.md` — visual system and layouts.
5. `data-schema-and-api-contracts.md` — minimal data structures and contracts.
6. `implementation-plan.md` — build sequence and architecture.
7. `acceptance-criteria.md` — testable completion criteria.

## Instruction to the coding agent

Treat these documents as the source of truth. Do not invent features that are outside scope. When a requirement conflicts with a generic e-commerce convention, follow Quick Shop's documented requirement.
