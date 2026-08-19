// Seed orders for customer & admin dashboards
export const INITIAL_ORDERS = [
  {
    id: "ORD-8921",
    customer: {
      id: "cust-1",
      name: "Aarav Sharma",
      email: "aarav.sharma@example.com",
      phone: "+91 98765 43210"
    },
    items: [
      {
        id: "prod-1",
        name: "Aura Noise-Canceling Wireless Headphones",
        price: 14999,
        quantity: 1,
        color: "Matte Black",
        size: "One Size",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
      },
      {
        id: "prod-3",
        name: "Luxe Urban Leather Crossbody Bag",
        price: 4999,
        quantity: 1,
        color: "Vintage Tan",
        size: "Medium",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80"
      }
    ],
    address: {
      fullName: "Aarav Sharma",
      street: "Flat 402, Green Glen Layout, Bellandur",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560103",
      phone: "+91 98765 43210"
    },
    subtotal: 19998,
    discount: 1000,
    shippingFee: 0,
    tax: 1800,
    totalAmount: 20798,
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    status: "Out for Delivery",
    date: "2026-08-18T10:30:00Z",
    estimatedDelivery: "2026-08-20",
    timeline: [
      { status: "Order Placed", date: "2026-08-18 10:30 AM", completed: true },
      { status: "Processing", date: "2026-08-18 02:15 PM", completed: true },
      { status: "Shipped", date: "2026-08-19 08:00 AM", completed: true },
      { status: "Out for Delivery", date: "2026-08-19 10:00 AM", completed: true },
      { status: "Delivered", date: "Pending", completed: false }
    ]
  },
  {
    id: "ORD-8745",
    customer: {
      id: "cust-2",
      name: "Priya Patel",
      email: "priya.patel@example.com",
      phone: "+91 99887 76655"
    },
    items: [
      {
        id: "prod-2",
        name: "Vogue Minimalist Chronograph Watch",
        price: 8499,
        quantity: 1,
        color: "Rose Gold",
        size: "40mm",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
      }
    ],
    address: {
      fullName: "Priya Patel",
      street: "Plot 89, Jubilee Hills",
      city: "Hyderabad",
      state: "Telangana",
      postalCode: "500033",
      phone: "+91 99887 76655"
    },
    subtotal: 8499,
    discount: 500,
    shippingFee: 150,
    tax: 765,
    totalAmount: 8914,
    paymentMethod: "Credit Card (HDFC)",
    paymentStatus: "Paid",
    status: "Delivered",
    date: "2026-08-15T14:20:00Z",
    estimatedDelivery: "2026-08-17",
    timeline: [
      { status: "Order Placed", date: "2026-08-15 02:20 PM", completed: true },
      { status: "Processing", date: "2026-08-15 04:00 PM", completed: true },
      { status: "Shipped", date: "2026-08-16 09:30 AM", completed: true },
      { status: "Out for Delivery", date: "2026-08-17 08:30 AM", completed: true },
      { status: "Delivered", date: "2026-08-17 01:45 PM", completed: true }
    ]
  },
  {
    id: "ORD-8512",
    customer: {
      id: "cust-3",
      name: "Rohan Verma",
      email: "rohan.v@example.com",
      phone: "+91 91234 56789"
    },
    items: [
      {
        id: "prod-4",
        name: "Apex Ultra Fitness Smartwatch V2",
        price: 6999,
        quantity: 2,
        color: "Titanium Orange",
        size: "44mm",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80"
      }
    ],
    address: {
      fullName: "Rohan Verma",
      street: "B-12, Vasant Vihar",
      city: "New Delhi",
      state: "Delhi",
      postalCode: "110057",
      phone: "+91 91234 56789"
    },
    subtotal: 13998,
    discount: 1000,
    shippingFee: 0,
    tax: 1260,
    totalAmount: 14258,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Processing",
    date: "2026-08-19T08:15:00Z",
    estimatedDelivery: "2026-08-22",
    timeline: [
      { status: "Order Placed", date: "2026-08-19 08:15 AM", completed: true },
      { status: "Processing", date: "2026-08-19 09:00 AM", completed: true },
      { status: "Shipped", date: "Pending", completed: false },
      { status: "Out for Delivery", date: "Pending", completed: false },
      { status: "Delivered", date: "Pending", completed: false }
    ]
  }
];
