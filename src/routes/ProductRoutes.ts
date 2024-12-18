import { Router } from "express";
import { InMemoryProducts } from "../storage/InMemoryProducts";

const router = Router();

router.get("/", (req, res) => {
  const productsList = Object.values(InMemoryProducts).map((product) => ({
    ...product,
    globalWholesalePrice: product.globalWholesalePrice,
  }));
  res.status(200).json(productsList);
});


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
