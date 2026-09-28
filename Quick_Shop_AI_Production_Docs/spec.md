# Quick Shop — Project Specification

## 1. Product Definition

**Quick Shop** is a simple local-store ordering website. Customers browse participating stores, select products, optionally request an item that is not listed, provide a precise delivery address, and hand the complete order to a designated WhatsApp number.

The website is a **catalog, cart, address, and WhatsApp handoff layer**. It is not intended to become a complete marketplace in the first version.

## 2. Primary Objective

Make ordering from a local store possible in a few obvious steps:

1. Choose a store.
2. Browse its products.
3. Add products to the cart.
4. Optionally add a custom request.
5. Provide the delivery address.
6. Review the order.
7. Press Buy Now.
8. Open WhatsApp with the order already written.
9. Customer sends the message.
10. Quick Shop resets the active shopping session.

## 3. Target Audience

- Local residents ordering everyday goods.
- Users who prefer WhatsApp for communicating orders.
- Users who may not know the exact product name in the catalog.
- Mobile-first users.
- Users with low tolerance for complicated checkout forms.

## 4. Product Principles

- Simple over feature-rich.
- Mobile-first.
- Clear actions.
- Minimal checkout friction.
- No account required for MVP.
- WhatsApp is the final communication channel.
- Custom orders are first-class functionality.
- Never make the customer understand technical concepts.
- Do not force a customer to pay online in MVP.

## 5. User Journey

### 5.1 Home

The user sees:
- Quick Shop branding.
- Search.
- Available stores.
- Store cards.
- A short explanation of the service.

### 5.2 Store selection

Selecting a store opens that store's catalog.

The cart belongs to one store at a time.

If the user already has cart items and tries to switch stores, ask for confirmation before replacing the cart.

### 5.3 Catalog

Show:
- Store header.
- Store status.
- Search field.
- Category filters.
- Product cards.
- Product image.
- Product name.
- Unit/size where applicable.
- Price.
- Add button.
- Quantity controls after an item has been added.

### 5.4 Custom order

A clearly visible card must say that the customer can request an item that is not listed.

Example:
> Can't find what you need?
> Tell us what you want and we'll include the request in your order.

The user enters free text and adds the request to the cart.

A custom request does not need a known price in MVP. Display it as:
> Price to be confirmed

### 5.5 Cart

The cart contains:
- Listed products.
- Quantities.
- Product subtotals.
- Custom requests.
- Listed-product subtotal.
- Validation message.
- Proceed button.

## 6. Critical Checkout Rule

The ₹200 rule is conditional.

### Case A — No custom order

If there is no custom request:

`listedProductSubtotal >= 200`

is required.

If subtotal is below ₹200, disable progression to address and show:

> Add ₹X more to your cart to continue.

### Case B — Custom order exists

If at least one custom request exists:

`canProceed = true`

regardless of listed-product subtotal.

Therefore these are valid:

- ₹0 listed products + custom request.
- ₹50 listed products + custom request.
- ₹199 listed products + custom request.
- ₹200+ listed products + custom request.

The custom request's unknown price must never be used to satisfy the ₹200 rule.

## 7. Address

The user provides:
- Full delivery address.
- House/flat/building.
- Area/street.
- Landmark (optional).
- Phone number.
- Precise map location if the implementation includes a map picker.

The address is included in the WhatsApp message.

## 8. Review

Before opening WhatsApp, show:
- Store.
- Listed items and quantities.
- Custom requests.
- Listed-item subtotal.
- Delivery address.
- Customer phone.
- Final action: Buy Now / Continue to WhatsApp.

Do not claim that the order has been placed before the customer sends the WhatsApp message.

## 9. WhatsApp Handoff

Build a pre-filled WhatsApp message containing:
- Quick Shop identifier.
- Store name.
- Listed items.
- Quantities.
- Prices.
- Listed subtotal.
- Custom requests.
- Delivery address.
- Phone number.
- Optional map link.

Open the designated store/business WhatsApp number.

The customer manually sends the message.

## 10. Reset

When Buy Now initiates the WhatsApp handoff:
- Clear the active cart.
- Clear active checkout state.
- Clear temporary address/order state from client storage.
- Keep only non-sensitive application data such as store/product catalog cache if desired.

Returning to Quick Shop should show a fresh cart.

## 11. MVP Scope

### Required
- Responsive homepage.
- Store listing.
- Store selection.
- Catalog.
- Categories.
- Product search.
- Product add/remove/quantity.
- Custom order.
- Cart.
- Conditional ₹200 validation.
- Address form.
- Review step.
- WhatsApp deep link.
- Cart/session reset.
- Loading/error/empty states.

### Explicitly out of MVP
- User accounts.
- Passwords.
- Online payments.
- Coupons.
- Loyalty points.
- Delivery tracking.
- Driver application.
- Merchant dashboard.
- Inventory synchronization.
- Automated WhatsApp Business API.
- Complex order lifecycle.
- Multi-store cart.
- Reviews/ratings.
- AI recommendations.

## 12. Non-Functional Requirements

- Fast initial page load.
- Responsive at 320px width and above.
- Keyboard accessible.
- Clear focus states.
- Adequate color contrast.
- Buttons must have obvious disabled states.
- Images should use appropriate dimensions and lazy loading where appropriate.
- No layout shift caused by product images.
- Avoid unnecessary client-side JavaScript.
- Validate important rules on the server if a backend exists.

## 13. Important Edge Cases

- Empty cart.
- Listed subtotal below ₹200 with no custom order.
- Listed subtotal below ₹200 with custom order.
- Custom-order-only cart.
- Product quantity reaches zero.
- Store unavailable/closed.
- Product unavailable.
- User switches stores with existing cart.
- Missing address.
- Invalid phone number.
- WhatsApp number unavailable.
- User returns from WhatsApp.
- User refreshes during checkout.
