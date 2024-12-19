import { calculateNewPrice } from "./PricingProfiles";

describe("calculateNewPrice", () => {
  it("should correctly calculate the new price with fixed increment increase", () => {
    const result = calculateNewPrice(10, 10000, "Fixed", "Increase");
    expect(result).toBe(11000); 
  });

  it("should correctly calculate the new price with fixed increment decrease", () => {
    const result = calculateNewPrice(5, 10000, "Fixed", "Decrease");
    expect(result).toBe(9500); 
  });

  it("should correctly calculate the new price with dynamic increment increase", () => {
    const result = calculateNewPrice(20, 5000, "Dynamic", "Increase");
    expect(result).toBe(7000); 
  });

  it("should correctly calculate the new price with dynamic increment decrease", () => {
    const result = calculateNewPrice(15, 3000, "Dynamic", "Decrease");
    expect(result).toBe(1500);
  });

  it("should return 0 when the calculated price is less than 0", () => {
    const result = calculateNewPrice(200, 10000, "Fixed", "Decrease");
    expect(result).toBe(0); 
  });

  it("should handle zero adjustment correctly", () => {
    const result = calculateNewPrice(0, 5000, "Fixed", "Increase");
    expect(result).toBe(5000); 
  });
});