import { Store, Product } from "./types";

export const SAMPLE_STORES: Store[] = [
  {
    id: "store_sharma",
    name: "Sharma General Store",
    slug: "sharma-general-store",
    category: "Groceries & Daily Essentials",
    description:
      "Everyday groceries, snacks, beverages, and household essentials.",
    imageUrl: "/images/stores/sharma-general.jpg",
    isOpen: true,
    whatsappNumber: "918700914124",
  },
  {
    id: "store_city_fresh",
    name: "City Fresh Mart",
    slug: "city-fresh-mart",
    category: "Groceries & Household",
    description: "Fresh everyday essentials and household products.",
    imageUrl: "/images/stores/city-fresh.jpg",
    isOpen: true,
    whatsappNumber: "918700914124",
  },
];

export const SAMPLE_PRODUCTS: Product[] = [
  // Sharma General Store products
  {
    id: "milk_1l",
    storeId: "store_sharma",
    category: "Groceries",
    name: "Amul Taaza Milk",
    unit: "1 L",
    price: 62,
    imageUrl: "/images/products/milk.jpg",
    isAvailable: true,
  },
  {
    id: "atta_5kg",
    storeId: "store_sharma",
    category: "Groceries",
    name: "Aashirvaad Atta",
    unit: "5 kg",
    price: 320,
    imageUrl: "/images/products/atta.jpg",
    isAvailable: true,
  },
  {
    id: "oil_1l",
    storeId: "store_sharma",
    category: "Groceries",
    name: "Fortune Sunflower Oil",
    unit: "1 L",
    price: 145,
    imageUrl: "/images/products/oil.jpg",
    isAvailable: true,
  },
  {
    id: "salt_1kg",
    storeId: "store_sharma",
    category: "Groceries",
    name: "Tata Salt",
    unit: "1 kg",
    price: 30,
    imageUrl: "/images/products/salt.jpg",
    isAvailable: true,
  },
  {
    id: "bread_400g",
    storeId: "store_sharma",
    category: "Snacks",
    name: "Britannia Bread",
    unit: "400 g",
    price: 45,
    imageUrl: "/images/products/bread.jpg",
    isAvailable: true,
  },
  {
    id: "maggi_noodles",
    storeId: "store_sharma",
    category: "Snacks",
    name: "Maggi 2-Minute Noodles",
    unit: "Pack",
    price: 60,
    imageUrl: "/images/products/maggi.jpg",
    isAvailable: true,
  },
  {
    id: "parle_g",
    storeId: "store_sharma",
    category: "Snacks",
    name: "Parle-G Biscuits",
    unit: "Pack",
    price: 20,
    imageUrl: "/images/products/parleg.jpg",
    isAvailable: true,
  },
  {
    id: "coca_cola",
    storeId: "store_sharma",
    category: "Beverages",
    name: "Coca-Cola",
    unit: "750 ml",
    price: 45,
    imageUrl: "/images/products/coke.jpg",
    isAvailable: true,
  },

  // City Fresh Mart products
  {
    id: "rice_5kg",
    storeId: "store_city_fresh",
    category: "Groceries",
    name: "India Gate Basmati Rice",
    unit: "5 kg",
    price: 520,
    imageUrl: "/images/products/rice.jpg",
    isAvailable: true,
  },
  {
    id: "tata_tea",
    storeId: "store_city_fresh",
    category: "Beverages",
    name: "Tata Tea Premium",
    unit: "500 g",
    price: 240,
    imageUrl: "/images/products/tea.jpg",
    isAvailable: true,
  },
  {
    id: "surf_excel",
    storeId: "store_city_fresh",
    category: "Household",
    name: "Surf Excel Matic",
    unit: "2 kg",
    price: 310,
    imageUrl: "/images/products/surf.jpg",
    isAvailable: true,
  },
  {
    id: "colgate_paste",
    storeId: "store_city_fresh",
    category: "Personal Care",
    name: "Colgate MaxFresh",
    unit: "200 g",
    price: 110,
    imageUrl: "/images/products/colgate.jpg",
    isAvailable: true,
  },
  {
    id: "dettol_soap",
    storeId: "store_city_fresh",
    category: "Personal Care",
    name: "Dettol Soap",
    unit: "Pack",
    price: 160,
    imageUrl: "/images/products/dettol.jpg",
    isAvailable: true,
  },
  {
    id: "bisleri_water",
    storeId: "store_city_fresh",
    category: "Beverages",
    name: "Bisleri Water",
    unit: "1 L",
    price: 20,
    imageUrl: "/images/products/water.jpg",
    isAvailable: true,
  },
];

export function getStores(): Store[] {
  return SAMPLE_STORES;
}

export function getStoreById(id: string): Store | undefined {
  return SAMPLE_STORES.find((s) => s.id === id || s.slug === id);
}

export function getStoreBySlug(slug: string): Store | undefined {
  return SAMPLE_STORES.find((s) => s.slug === slug);
}

export function getProductsByStore(storeId: string): Product[] {
  return SAMPLE_PRODUCTS.filter((p) => p.storeId === storeId);
}

export function getProductById(id: string): Product | undefined {
  return SAMPLE_PRODUCTS.find((p) => p.id === id);
}

export function getStoreCategories(storeId: string): string[] {
  const storeProducts = getProductsByStore(storeId);
  const categories = new Set<string>();
  storeProducts.forEach((p) => categories.add(p.category));
  return ["All", ...Array.from(categories)];
}
