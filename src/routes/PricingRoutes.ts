import { Router } from "express";
import { getUpdatedPrices } from "../repository/PricingRepository";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PricingAdjustmentRequest:
 *       type: object
 *       required:
 *         - incrementType
 *         - adjustmentType
 *         - productsToBeAdjusted
 *       properties:
 *         incrementType:
 *           type: string
 *           enum: [Increase, Decrease, Fixed]
 *           description: The type of increment (Increase, Decrease, or Fixed).
 *         adjustmentType:
 *           type: string
 *           enum: [Increase, Decrease]
 *           description: The type of adjustment (Increase or Decrease).
 *         productsToBeAdjusted:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - id
 *               - adjustment
 *             properties:
 *               id:
 *                 type: string
 *                 description: The unique identifier of the product.
 *               adjustment:
 *                 type: number
 *                 description: The adjustment value to apply to the product's price.
 *       example:
 *         incrementType: Fixed
 *         adjustmentType: Increase
 *         productsToBeAdjusted:
 *           - id: "HGVPIN216"
 *             adjustment: 55
 *
 *     PricingAdjustmentResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the product.
 *         title:
 *           type: string
 *           description: The title of the product.
 *         sku:
 *           type: string
 *           description: The SKU (Stock Keeping Unit) of the product.
 *         brand:
 *           type: string
 *           description: The brand of the product.
 *         category:
 *           type: string
 *           description: The category of the product.
 *         subcategory:
 *           type: string
 *           description: The subcategory of the product.
 *         segmentId:
 *           type: string
 *           description: The segment identifier of the product.
 *         oldWholeSalePrice:
 *           type: number
 *           description: The old wholesale price (before adjustment).
 *         newWholeSalePrice:
 *           type: number
 *           description: The new wholesale price (after adjustment).
 *       example:
 *         id: "HGVPIN216"
 *         title: "High Garden Pinot Noir 2021"
 *         sku: "HGVPIN216"
 *         brand: "High Garden"
 *         category: "Alcoholic Beverage"
 *         subcategory: "Wine"
 *         segmentId: "Wine"
 *         oldWholeSalePrice: 33406
 *         newWholeSalePrice: 38906
 *
 * paths:
 *   /api/v1/pricing/calculate:
 *     post:
 *       summary: Calculate price adjustments for products
 *       description: Adjusts prices for the provided products based on the specified increment and adjustment types.
 *       operationId: calculatePriceAdjustments
 *       tags:
 *         - Calculate
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PricingAdjustmentRequest'
 *       responses:
 *         '200':
 *           description: Price adjustments were successfully applied
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/PricingAdjustmentResponse'
 *           examples:
 *             success:
 *               value: [
 *                 {
 *                   "id": "HGVPIN216",
 *                   "title": "High Garden Pinot Noir 2021",
 *                   "sku": "HGVPIN216",
 *                   "brand": "High Garden",
 *                   "category": "Alcoholic Beverage",
 *                   "subcategory": "Wine",
 *                   "segmentId": "Wine",
 *                   "oldWholeSalePrice": 33406,
 *                   "newWholeSalePrice": 38906
 *                 }
 *               ]
 *         '400':
 *           description: Invalid input parameters
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Invalid input parameters.
 */


router.post("/calculate", (req, res) => {
    const { incrementType, adjustmentType, productsToBeAdjusted } = req.body;

    if (!incrementType || !adjustmentType || !productsToBeAdjusted) {
      res.status(400).json({ message: "Invalid input parameters." });
      return
    }
  
    const updatedProducts = getUpdatedPrices(incrementType, adjustmentType, productsToBeAdjusted);
  
    res.status(200).json(updatedProducts);
});

export default router;
