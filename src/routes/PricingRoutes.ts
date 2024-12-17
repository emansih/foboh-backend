import { Router } from "express";
import { calculateNewPrice } from "../PricingProfiles";

const router = Router();


router.post("/calculate", (req, res) => {
    const { basedOnPrice, adjustment, priceAdjustment, increment } = req.body;

    if (!basedOnPrice || !adjustment || !priceAdjustment || !increment || (priceAdjustment !== "Fixed" && priceAdjustment !== "Dynamic") ||
      (increment !== "Increase" && increment !== "Decrease")) {
      res.status(400).json({ message: "Invalid input parameters." });
      return
    }
  
    const basedOnPriceCents = Math.round(basedOnPrice * 100);
    const newPriceCents = calculateNewPrice(basedOnPriceCents, adjustment, priceAdjustment, increment);
  
    res.status(200).json({
      basedOnPrice: basedOnPrice.toFixed(2),
      adjustment: adjustment,
      priceAdjustment: priceAdjustment,
      increment: increment,
      newPrice: (newPriceCents / 100).toFixed(2),
    });
});

export default router;
