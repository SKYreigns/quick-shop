import { z } from "zod";

export const MIN_ORDER_AMOUNT = 200;

/**
 * Conditional checkout rule:
 * - If custom request exists: can proceed regardless of listed product subtotal.
 * - If no custom request: listed subtotal must be >= 200.
 */
export function canProceedToAddress(
  listedProductSubtotal: number,
  customRequestCount: number
): boolean {
  if (customRequestCount > 0) return true;
  return listedProductSubtotal >= MIN_ORDER_AMOUNT;
}

/**
 * Returns how much more needs to be added to reach ₹200 threshold.
 * Returns 0 if custom requests exist or subtotal is already >= ₹200.
 */
export function getRemainingSubtotalForMinOrder(
  listedProductSubtotal: number,
  customRequestCount: number
): number {
  if (customRequestCount > 0) return 0;
  return Math.max(0, MIN_ORDER_AMOUNT - listedProductSubtotal);
}

/**
 * Zod schema for delivery address validation
 */
export const deliveryAddressSchema = z.object({
  fullAddress: z.string().trim().min(5, "Please enter your delivery address."),
  houseOrBuilding: z.string().trim().optional(),
  areaOrStreet: z.string().trim().optional(),
  landmark: z.string().trim().optional(),
  phone: z
    .string()
    .trim()
    .min(10, "Please enter a valid phone number.")
    .regex(/^[0-9+\s-]{10,15}$/, "Please enter a valid phone number."),
  mapUrl: z.string().url().optional().or(z.literal("")),
});

export type DeliveryAddressFormData = z.infer<typeof deliveryAddressSchema>;
