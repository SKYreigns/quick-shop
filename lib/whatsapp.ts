import { CartItem, CustomRequest, DeliveryAddress } from "./types";

export type OrderHandoffDetails = {
  storeName: string;
  whatsappNumber: string;
  items: CartItem[];
  customRequests: CustomRequest[];
  address: DeliveryAddress;
};

export function generateWhatsAppMessage(details: OrderHandoffDetails): string {
  const { storeName, items, customRequests, address } = details;

  const listedSubtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  let message = `Quick Shop Order\n\nStore:\n${storeName}\n\n`;

  if (items.length > 0) {
    message += `Items:\n`;
    items.forEach((item) => {
      message += `${item.quantity} × ${item.name} — ₹${item.unitPrice * item.quantity}\n`;
    });
    message += `\nItems Total:\n₹${listedSubtotal}\n\n`;
  }

  if (customRequests.length > 0) {
    message += `Custom Request:\n`;
    customRequests.forEach((req) => {
      const qtyStr =
        req.quantity && req.quantity > 1 ? ` (${req.quantity})` : "";
      message += `- ${req.description}${qtyStr} (Price to be confirmed)\n`;
    });
    message += `\n`;
  }

  message += `Delivery Address:\n${address.fullAddress}\n`;
  if (address.houseOrBuilding)
    message += `Building: ${address.houseOrBuilding}\n`;
  if (address.areaOrStreet) message += `Area: ${address.areaOrStreet}\n`;
  if (address.landmark) message += `Landmark: ${address.landmark}\n`;

  message += `\nPhone:\n${address.phone}\n`;

  if (address.mapUrl) {
    message += `\nLocation:\n${address.mapUrl}\n`;
  }

  message += `\nPlease review this order and confirm availability.`;

  return message;
}

export function buildWhatsAppUrl(
  whatsappNumber: string,
  message: string
): string {
  // Strip non-digits from phone number
  const cleanNumber = whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
