import { Router } from "express";
import { InMemoryProducts } from "../storage/InMemoryProducts";

const router = Router();


/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Operations related to products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - sku
 *         - brand
 *         - category
 *         - subcategory
 *         - segmentId
 *         - globalWholesalePrice
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
 *         globalWholesalePrice:
 *           type: number
 *           description: The global wholesale price of the product.
 *       example:
 *         id: "HGVPIN216"
 *         title: "High Garden Pinot Noir 2021"
 *         sku: "HGVPIN216"
 *         brand: "High Garden"
 *         category: "Alcoholic Beverage"
 *         subcategory: "Wine"
 *         segmentId: "Red"
 *         globalWholesalePrice: 27906
 *
 * paths:
 *   /api/v1/products:
 *     get:
 *       summary: Get the list of products
 *       description: Retrieves all available products with their details.
 *       operationId: getProducts
 *       tags:
 *         - Products
 *       responses:
 *         '200':
 *           description: A list of products
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Product'
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
 *                   "segmentId": "Red",
 *                   "globalWholesalePrice": 27906
 *                 },
 *                 {
 *                   "id": "KOYBRUNV6",
 *                   "title": "Koyama Methode Brut Nature NV",
 *                   "sku": "KOYBRUNV6",
 *                   "brand": "Koyama Wines",
 *                   "category": "Alcoholic Beverage",
 *                   "subcategory": "Wine",
 *                   "segmentId": "Sparkling",
 *                   "globalWholesalePrice": 12000
 *                 },
 *                 {
 *                   "id": "KOYNR1837",
 *                   "title": "Koyama Riesling 2018",
 *                   "sku": "KOYNR1837",
 *                   "brand": "Koyama Wines",
 *                   "category": "Alcoholic Beverage",
 *                   "subcategory": "Wine",
 *                   "segmentId": "Port/Dessert",
 *                   "globalWholesalePrice": 21504
 *                 },
 *                 {
 *                   "id": "KOYRIE19",
 *                   "title": "Koyama Tussock Riesling 2019",
 *                   "sku": "KOYRIE19",
 *                   "brand": "Koyama Wines",
 *                   "category": "Alcoholic Beverage",
 *                   "subcategory": "Wine",
 *                   "segmentId": "White",
 *                   "globalWholesalePrice": 21504
 *                 },
 *                 {
 *                   "id": "LACBNATNV6",
 *                   "title": "Lacourte-Godbillon Brut Cru NV",
 *                   "sku": "LACBNATNV6",
 *                   "brand": "Lacourte-Godbillon",
 *                   "category": "Alcoholic Beverage",
 *                   "subcategory": "Wine",
 *                   "segmentId": "Sparkling",
 *                   "globalWholesalePrice": 40932
 *                 }
 *               ]
 *         '500':
 *           description: Internal server error
 */

router.get("/", (req, res) => {
  const productsList = Object.values(InMemoryProducts).map((product) => ({
    ...product,
    globalWholesalePrice: product.globalWholesalePrice,
  }));
  res.status(200).json(productsList);
});



/**
 * @swagger
 * /api/v1/products/search:
 *   post:
 *     summary: Search products by SKU or title using a wildcard
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               searchQuery:
 *                 type: string
 *                 description: The search query (supports wildcards)
 *                 example: "*product*"
 *     responses:
 *       200:
 *         description: A list of matched products based on the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sku:
 *                     type: string
 *                   title:
 *                     type: string
 *                   category:
 *                     type: string
 *                   globalWholesalePrice:
 *                     type: number
 *                     example: 50
 *       400:
 *         description: Bad request if search query is missing or invalid
 *       500:
 *         description: Internal server error
 */
router.post("/search", (req, res) => {
  const { searchQuery } = req.body;

  let matchedProducts = [];

  // 1. Search usingr SKU 
  // 2. Search using wildcard
  // 3. Make sure product in array is unique

  const exactSkuMatch = Object.values(InMemoryProducts).find((product) => product.sku === searchQuery);
  if (exactSkuMatch) {
    matchedProducts.push(exactSkuMatch);
  }


  const uniqueProducts = Array.from(new Map(matchedProducts.map((product) => [product.sku, product])).values());

  const wildcardRegex = new RegExp(searchQuery.replace(/\*/g, ".*"), "i");

  const wildcardMatches = Object.values(InMemoryProducts).filter((product) =>
      wildcardRegex.test(product.sku) || wildcardRegex.test(product.title)
  );
  wildcardMatches.forEach((product) => {
    if (!uniqueProducts.some((p) => p.sku === product.sku)) {
      uniqueProducts.push(product);
    }
  });

  const productResponse = uniqueProducts.map((product) => ({
    ...product,
    globalWholesalePrice: product.globalWholesalePrice,
  }));


  res.status(200).json(productResponse);
})

export default router;
