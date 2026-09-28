# Quick Shop — Acceptance Criteria

## A. Store Discovery

- [ ] Homepage displays Quick Shop branding.
- [ ] Homepage displays stores.
- [ ] Store cards are clickable.
- [ ] Store search works.
- [ ] Store page opens for a selected store.

## B. Catalog

- [ ] Products display name, unit, price, and image.
- [ ] Products can be added.
- [ ] Quantity can be increased/decreased.
- [ ] Product can be removed.
- [ ] Categories filter products.
- [ ] Product search filters products.
- [ ] Cart count updates immediately.

## C. Custom Order

- [ ] User can open Custom Order.
- [ ] User can enter free-form text.
- [ ] Custom request can be added to cart.
- [ ] Custom request appears separately from normal products.
- [ ] Custom request price is displayed as "Price to be confirmed".
- [ ] Custom request does not contribute to the ₹200 threshold.

## D. ₹200 Rule

### Test 1
Cart:
- Listed products = ₹199
- Custom requests = 0

Expected:
- Cannot proceed.
- Message asks user to add ₹1 more.

### Test 2
Cart:
- Listed products = ₹200
- Custom requests = 0

Expected:
- Can proceed.

### Test 3
Cart:
- Listed products = ₹0
- Custom requests = 1

Expected:
- Can proceed.

### Test 4
Cart:
- Listed products = ₹50
- Custom requests = 1

Expected:
- Can proceed.

### Test 5
Cart:
- Listed products = ₹199
- Custom requests = 1

Expected:
- Can proceed.

### Test 6
Cart:
- Listed products = ₹500
- Custom requests = 1

Expected:
- Can proceed.

## E. Address

- [ ] User cannot continue with required address fields missing.
- [ ] Phone number is validated.
- [ ] Address appears on review.
- [ ] Map location, if enabled, is preserved through review.

## F. Review

- [ ] Store name appears.
- [ ] Product quantities appear.
- [ ] Product prices appear.
- [ ] Listed subtotal appears.
- [ ] Custom requests appear.
- [ ] Address appears.
- [ ] Phone appears.
- [ ] Primary CTA is Buy Now on WhatsApp.

## G. WhatsApp

- [ ] Correct store WhatsApp number is selected.
- [ ] Message contains store name.
- [ ] Message contains listed items.
- [ ] Message contains quantities.
- [ ] Message contains listed subtotal.
- [ ] Message contains custom requests where applicable.
- [ ] Message contains delivery address.
- [ ] Message contains phone number.
- [ ] Message contains map URL if available.
- [ ] Message is URL encoded.
- [ ] WhatsApp opens with the message pre-filled.
- [ ] User must press Send themselves.
- [ ] Website does not claim the order is placed before Send.

## H. Reset

- [ ] Active cart is cleared when WhatsApp handoff is initiated.
- [ ] Checkout state is cleared.
- [ ] Returning to the site shows an empty cart.
- [ ] Store/product catalog data can remain cached.

## I. Store Isolation

- [ ] One cart can contain products from only one store.
- [ ] Switching stores with an active cart asks for confirmation.
- [ ] Confirming a switch clears the old cart.
- [ ] Products from different stores are never silently merged.

## J. Responsive Design

- [ ] Works at 320px.
- [ ] Works at 375px.
- [ ] Works at 430px.
- [ ] Works on tablet.
- [ ] Works on desktop.
- [ ] No horizontal scrolling caused by layout bugs.

## K. Accessibility

- [ ] All inputs have labels.
- [ ] Buttons are keyboard accessible.
- [ ] Focus is visible.
- [ ] Disabled buttons are distinguishable.
- [ ] Error messages are readable and associated with fields.
- [ ] Images have appropriate alt text.

## L. Scope Control

- [ ] No login requirement.
- [ ] No payment gateway.
- [ ] No driver system.
- [ ] No merchant dashboard.
- [ ] No WhatsApp API.
- [ ] No unnecessary marketplace features.
