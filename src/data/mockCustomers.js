// Seed customers for admin customer management module
export const INITIAL_CUSTOMERS = [
  {
    id: "cust-1",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    totalOrders: 4,
    totalSpent: 42500,
    status: "Active",
    registrationDate: "2026-01-12",
    city: "Bengaluru",
    state: "Karnataka"
  },
  {
    id: "cust-2",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 99887 76655",
    totalOrders: 6,
    totalSpent: 68900,
    status: "Active",
    registrationDate: "2025-11-04",
    city: "Hyderabad",
    state: "Telangana"
  },
  {
    id: "cust-3",
    name: "Rohan Verma",
    email: "rohan.v@example.com",
    phone: "+91 91234 56789",
    totalOrders: 2,
    totalSpent: 18400,
    status: "Active",
    registrationDate: "2026-03-20",
    city: "New Delhi",
    state: "Delhi"
  },
  {
    id: "cust-4",
    name: "Ananya Deshmukh",
    email: "ananya.d@example.com",
    phone: "+91 97654 32109",
    totalOrders: 8,
    totalSpent: 112000,
    status: "Active",
    registrationDate: "2025-08-19",
    city: "Mumbai",
    state: "Maharashtra"
  },
  {
    id: "cust-5",
    name: "Vikram Malhotra",
    email: "vikram.m@example.com",
    phone: "+91 95432 10987",
    totalOrders: 1,
    totalSpent: 3999,
    status: "Blocked",
    registrationDate: "2026-06-11",
    city: "Pune",
    state: "Maharashtra"
  }
];

export const INITIAL_COUPONS = [
  { code: "WELCOME10", discountType: "percentage", value: 10, minSpend: 1000, description: "10% OFF on first purchase" },
  { code: "LUXE20", discountType: "fixed", value: 1000, minSpend: 5000, description: "Flat ₹1000 OFF on orders above ₹5000" },
  { code: "FESTIVE15", discountType: "percentage", value: 15, minSpend: 3000, description: "15% OFF festive special" }
];
