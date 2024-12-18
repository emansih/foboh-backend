import { Products } from "../model/Products";
import { calculateNewPrice } from "../PricingProfiles";
import { getPriceById, getProductById, setPriceById } from "../storage/InMemoryProducts";


export function getUpdatedPrices(incrementType: "Fixed" | "Dynamic", adjustmentType: "Increase" | "Decrease", 
    productsToBeAdjusted: { id: string; adjustment: number }[]){
        const products: Products[] = []    
        productsToBeAdjusted.map(product => {
            const priceToBeAdjusted = product.adjustment
            if(priceToBeAdjusted > 0){
                const productPrice = getPriceById(product.id)
                const newPrice = calculateNewPrice(priceToBeAdjusted, productPrice, incrementType, adjustmentType)
                setPriceById(product.id, newPrice)
                products.push(getProductById(product.id))
            }
        })
    return products
}