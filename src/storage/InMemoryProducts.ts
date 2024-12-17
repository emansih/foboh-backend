import { Products } from "../model/products";

// Assuming price is in AUD, set the price to lowest unit - cents
export let InMemoryProducts: Record<string, Products> = {
  "HGVPIN216": {
    id: "HGVPIN216",
    title: "High Garden Pinot Noir 2021",
    sku: "HGVPIN216",
    category: "Alcoholic Beverage",
    subcategory: "Wine",
    segmentId: "Red",
    globalWholesalePrice: 27906,
  },
  "KOYBRUNV6": {
    id: "KOYBRUNV6",
    title: "Koyama Methode Brut Nature NV",
    sku: "KOYBRUNV6",
    category: "Alcoholic Beverage",
    subcategory: "Wine",
    segmentId: "Sparkling",
    globalWholesalePrice: 12000,
  },
  "KOYNR1837": {
    id: "KOYNR1837",
    title: "Koyama Riesling 2018",
    sku: "KOYNR1837",
    category: "Alcoholic Beverage",
    subcategory: "Wine",
    segmentId: "Port/Dessert",
    globalWholesalePrice: 21504,
  },
  "KOYRIE19": {
    id: "KOYRIE19",
    title: "Koyama Tussock Riesling 2019",
    sku: "KOYRIE19",
    category: "Alcoholic Beverage",
    subcategory: "Wine",
    segmentId: "White",
    globalWholesalePrice: 21504,
  },
  "LACBNATNV6": {
    id: "LACBNATNV6",
    title: "Lacourte-Godbillon Brut Cru NV",
    sku: "LACBNATNV6",
    category: "Alcoholic Beverage",
    subcategory: "Wine",
    segmentId: "Sparkling",
    globalWholesalePrice: 40932,
  },
};