import { UpdatedProducts } from "../model/UpdatedProducts";
import { calculateNewPrice } from "../PricingProfiles";
import { getPriceById, getProductById, setPriceById } from "../storage/InMemoryProducts";


export function getUpdatedPrices(incrementType: "Fixed" | "Dynamic", adjustmentType: "Increase" | "Decrease", 
    productsToBeAdjusted: { id: string; adjustment: number }[]){
        const products: UpdatedProducts[] = []    
        productsToBeAdjusted.map(product => {
            const priceToBeAdjusted = product.adjustment
            if(priceToBeAdjusted > 0){
                const oldPrice = getPriceById(product.id)
                const newPrice = calculateNewPrice(priceToBeAdjusted, oldPrice, incrementType, adjustmentType)
                setPriceById(product.id, newPrice)
                const updatedProduct = getProductById(product.id)

                products.push({
                    id: updatedProduct.id,
                    title: updatedProduct.title,
                    sku: updatedProduct.sku,
                    brand: updatedProduct.brand,
                    category: updatedProduct.category,
                    subcategory: updatedProduct.subcategory,
                    segmentId: updatedProduct.subcategory,
                    oldWholeSalePrice: oldPrice,
                    newWholeSalePrice: newPrice
                })
            }
        })
    return products
}