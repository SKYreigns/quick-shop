export type Store = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  imageUrl: string;
  isOpen: boolean;
  whatsappNumber: string;
};

export type Product = {
  id: string;
  storeId: string;
  category: string;
  name: string;
  unit: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
};

export type CartItem = {
  productId: string;
  name: string;
  unit: string;
  unitPrice: number;
  quantity: number;
};

export type CustomRequest = {
  id: string;
  description: string;
  quantity?: number;
};

export type DeliveryAddress = {
  fullAddress: string;
  houseOrBuilding?: string;
  areaOrStreet?: string;
  landmark?: string;
  phone: string;
  latitude?: number;
  longitude?: number;
  mapUrl?: string;
};

export type CartState = {
  storeId: string | null;
  items: CartItem[];
  customRequests: CustomRequest[];
  address: DeliveryAddress | null;
};
