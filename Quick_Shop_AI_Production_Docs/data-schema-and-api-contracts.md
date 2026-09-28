# Quick Shop — Data Schema & API Contracts

## 1. Store

```ts
type Store = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  imageUrl: string;
  isOpen: boolean;
  whatsappNumber: string;
};
```

Example:

```json
{
  "id": "store_sharma",
  "name": "Sharma General Store",
  "slug": "sharma-general-store",
  "category": "Groceries & Daily Essentials",
  "description": "Everyday groceries, snacks, beverages, and household essentials.",
  "imageUrl": "/images/stores/sharma-general.jpg",
  "isOpen": true,
  "whatsappNumber": "919999999999"
}
```

## 2. Product

```ts
type Product = {
  id: string;
  storeId: string;
  category: string;
  name: string;
  unit: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
};
```

## 3. Cart Item

```ts
type CartItem = {
  productId: string;
  name: string;
  unit: string;
  unitPrice: number;
  quantity: number;
};
```

For production persistence, product price should be revalidated against authoritative server data before creating an order/handoff.

## 4. Custom Request

```ts
type CustomRequest = {
  id: string;
  description: string;
  quantity?: number;
};
```

Example:

```json
{
  "id": "custom_001",
  "description": "2 packets of XYZ detergent",
  "quantity": 1
}
```

## 5. Address

```ts
type DeliveryAddress = {
  fullAddress: string;
  houseOrBuilding?: string;
  areaOrStreet?: string;
  landmark?: string;
  phone: string;
  latitude?: number;
  longitude?: number;
  mapUrl?: string;
};
```

## 6. Minimal API Surface

If a backend is used, keep it small.

### GET `/api/stores`

Returns available stores.

### GET `/api/stores/:storeId/products`

Returns active products for a store.

### POST `/api/orders/draft`

Optional MVP endpoint for recording an order draft before WhatsApp handoff.

Request:

```json
{
  "storeId": "store_sharma",
  "items": [
    {
      "productId": "milk_1l",
      "quantity": 2
    }
  ],
  "customRequests": [
    {
      "description": "2 packets of XYZ detergent"
    }
  ],
  "address": {
    "fullAddress": "House 21, ABC Colony, Jaipur",
    "phone": "9999999999"
  }
}
```

The server should calculate listed-item subtotal from authoritative product prices.

## 7. WhatsApp Message Contract

The generated message should contain:

```text
Quick Shop Order

Store:
<store name>

Items:
<quantity> × <product name> — ₹<subtotal>
...

Items Total:
₹<listed product subtotal>

Custom Request:
<custom request>
...

Delivery Address:
<address>

Phone:
<phone>

Location:
<map URL if available>

Please review this order and confirm availability.
```

Do not include a fake payment confirmation.

## 8. WhatsApp URL

Use:

```text
https://wa.me/<STORE_WHATSAPP_NUMBER>?text=<ENCODED_MESSAGE>
```

The message must be encoded with standard URL encoding.

## 9. Business Logic

```ts
const listedSubtotal = items.reduce(
  (sum, item) => sum + item.unitPrice * item.quantity,
  0
);

const hasCustomRequest = customRequests.length > 0;

const canProceed =
  hasCustomRequest || listedSubtotal >= 200;
```

This is the definitive MVP checkout rule.

## 10. Store Switching

The cart must contain products from only one store.

When switching stores with an existing cart:
- Ask for confirmation.
- If confirmed, clear existing cart.
- Set new store.
- Do not merge products from different stores.
