import { Products } from "../model/Products";

// Assuming price is in AUD, set the price to lowest unit - cents
export let InMemoryProducts: Record<string, Products> = {
  "HGVPIN216": {
    id: "HGVPIN216",
    title: "High Garden Pinot Noir 2021",
    sku: "HGVPIN216",
    brand: "High Garden",
    category: "Alcoholic Beverage",
    subcategory: "Wine",
    segmentId: "Red",
    globalWholesalePrice: 27906,
  },
  "KOYBRUNV6": {
    id: "KOYBRUNV6",
    title: "Koyama Methode Brut Nature NV",
    sku: "KOYBRUNV6",
    brand: "Koyama Wines",
    category: "Alcoholic Beverage",
    subcategory: "Wine",
    segmentId: "Sparkling",
    globalWholesalePrice: 12000,
  },
  "KOYNR1837": {
    id: "KOYNR1837",
    title: "Koyama Riesling 2018",
    sku: "KOYNR1837",
    brand: "Koyama Wines",
    category: "Alcoholic Beverage",
    subcategory: "Wine",
    segmentId: "Port/Dessert",
    globalWholesalePrice: 21504,
  },
  "KOYRIE19": {
    id: "KOYRIE19",
    title: "Koyama Tussock Riesling 2019",
    sku: "KOYRIE19",
    brand: "Koyama Wines",
    category: "Alcoholic Beverage",
    subcategory: "Wine",
    segmentId: "White",
    globalWholesalePrice: 21504,
  },
  "LACBNATNV6": {
    id: "LACBNATNV6",
    title: "Lacourte-Godbillon Brut Cru NV",
    sku: "LACBNATNV6",
    brand: "Lacourte-Godbillon",
    category: "Alcoholic Beverage",
    subcategory: "Wine",
    segmentId: "Sparkling",
    globalWholesalePrice: 40932,
  },
};

export function getProductById(productId: string): Products {
  return InMemoryProducts[productId]
}

export function getPriceById(productId: string): number{
  return InMemoryProducts[productId].globalWholesalePrice
}

export function setPriceById(productId: string, newPrice: number){
  InMemoryProducts[productId].globalWholesalePrice = newPrice
}