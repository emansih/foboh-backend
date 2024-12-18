import { Router } from "express";
import { getUpdatedPrices } from "../repository/PricingRepository";

const router = Router();


router.post("/calculate", (req, res) => {
    const { incrementType, adjustmentType, productsToBeAdjusted } = req.body;

    if (!incrementType || !adjustmentType || !productsToBeAdjusted) {
      res.status(400).json({ message: "Invalid input parameters." });
      return
    }
  
    const updatedProducts = getUpdatedPrices(incrementType, adjustmentType, productsToBeAdjusted);
  
    res.status(200).json({
      updatedProducts,
    });
});

export default router;
