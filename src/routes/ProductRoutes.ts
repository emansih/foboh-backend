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


router.get("/products/:sku", (req, res) => {
    const { sku } = req.params;
    const product = InMemoryProducts[sku];
    if (!product) {
      res.status(404).json({ message: `Product with SKU '${sku}' not found.` });
      return
    }  

    const productResponse = {
        ...product,
        globalWholesalePrice: (product.globalWholesalePrice / 100).toFixed(2)
    };
    
    res.status(200).json(productResponse);
})

export default router;
