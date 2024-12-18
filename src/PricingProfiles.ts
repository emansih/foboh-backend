export const calculateNewPrice = (priceToAdjust: number, oldPrice: number,
  priceAdjustment: "Fixed" | "Dynamic", increment: "Increase" | "Decrease"): number => {

  let adjustmentCents = 0
  let newPriceCents = 0 
  if (priceAdjustment === "Fixed") {
    adjustmentCents = priceToAdjust * 100;
  } else if(priceAdjustment === "Dynamic"){
    adjustmentCents = priceToAdjust * 100;
  }
  if(increment == "Increase"){
    newPriceCents = oldPrice + adjustmentCents
  }  else if(increment == "Decrease"){
    newPriceCents = oldPrice - adjustmentCents
  }
  
  return Math.max(newPriceCents, 0);
};
  