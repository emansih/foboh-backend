export const calculateNewPrice = (basedOnPrice: number, adjustment: number, 
  priceAdjustment: "Fixed" | "Dynamic", increment: "Increase" | "Decrease"): number => {
  let newPriceCents = basedOnPrice;
  let adjustmentCents = 0
  if (priceAdjustment === "Fixed") {
    adjustmentCents = adjustment * 100;
  } else if (priceAdjustment === "Dynamic") {
    adjustmentCents = (basedOnPrice * adjustment) / 100; 
  }

  if(increment == "Increase"){
      newPriceCents = basedOnPrice + adjustmentCents
  } else if(increment == "Decrease"){
      newPriceCents = basedOnPrice - adjustmentCents
  }

  // Ensure price doesn't go below zero
  return Math.max(newPriceCents, 0);
  };
  