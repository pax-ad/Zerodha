// dashboard/src/utils/ticker.js

/**
 * Generates a realistic random price fluctuation (-0.8% to +0.8%)
 * @param {number} currentPrice 
 * @returns {number} Updated price rounded to 2 decimals
 */
export const simulatePriceChange = (currentPrice) => {
  const price = Number(currentPrice) || 100;
  // Fluctuate between -0.8% and +0.8%
  const percentage = (Math.random() * 1.6 - 0.8) / 100;
  const newPrice = price + price * percentage;
  return Math.max(0.05, parseFloat(newPrice.toFixed(2)));
};