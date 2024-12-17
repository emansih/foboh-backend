import { Router } from "express";
import { InMemoryProducts } from "../storage/InMemoryProducts";

const router = Router();

router.get("/products", (req, res) => {
  const productsList = Object.values(InMemoryProducts).map((product) => ({
    ...product,
    globalWholesalePrice: (product.globalWholesalePrice / 100).toFixed(2),
  }));
  res.status(200).json(productsList);
});

export default router;
