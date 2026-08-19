// Seed coupon codes for cart discount engine
export const INITIAL_COUPONS = [
  { code: "WELCOME10", discountType: "percentage", value: 10, minSpend: 1000, description: "10% OFF on first purchase" },
  { code: "LUXE20", discountType: "fixed", value: 1000, minSpend: 5000, description: "Flat ₹1000 OFF on orders above ₹5000" },
  { code: "FESTIVE15", discountType: "percentage", value: 15, minSpend: 3000, description: "15% OFF festive special" }
];
