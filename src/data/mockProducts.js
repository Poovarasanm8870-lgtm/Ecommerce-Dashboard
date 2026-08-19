// Mock product catalog with realistic details, Indian pricing (₹), high quality Unsplash images
export const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "Aura Noise-Canceling Wireless Headphones",
    category: "Electronics",
    brand: "AuraAudio",
    price: 14999,
    originalPrice: 19999,
    discount: 25,
    rating: 4.8,
    reviewsCount: 342,
    stock: 45,
    sku: "AUR-NC700-BLK",
    status: "In Stock",
    isFeatured: true,
    isTrending: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Experience serene acoustic bliss with active studio-grade noise cancellation, 40-hour continuous battery life, ultra-plush memory foam cushions, and crisp dynamic spatial drivers.",
    colors: ["Matte Black", "Silver Frost", "Navy Blue"],
    sizes: ["One Size"],
    specs: {
      "Battery Life": "40 Hours",
      "Connectivity": "Bluetooth 5.3 + 3.5mm Aux",
      "Noise Cancellation": "Adaptive ANC",
      "Warranty": "2 Years Manufacturer Warranty"
    }
  },
  {
    id: "prod-2",
    name: "Vogue Minimalist Chronograph Watch",
    category: "Accessories",
    brand: "Vogue Luxe",
    price: 8499,
    originalPrice: 11999,
    discount: 29,
    rating: 4.7,
    reviewsCount: 189,
    stock: 18,
    sku: "VOG-CHR-SIL",
    status: "In Stock",
    isFeatured: true,
    isTrending: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Sleek stainless steel timepiece featuring Japanese quartz movement, scratch-resistant sapphire glass crystal, and 50m water resistance.",
    colors: ["Silver Metallic", "Rose Gold", "Midnight Black"],
    sizes: ["40mm", "42mm"],
    specs: {
      "Movement": "Japanese Quartz",
      "Water Resistance": "5 ATM (50 Meters)",
      "Strap Material": "Genuine Italian Leather / Steel Mesh",
      "Warranty": "1 Year Official"
    }
  },
  {
    id: "prod-3",
    name: "Luxe Urban Leather Crossbody Bag",
    category: "Fashion",
    brand: "LuxeCraft",
    price: 4999,
    originalPrice: 7999,
    discount: 37,
    rating: 4.9,
    reviewsCount: 512,
    stock: 6,
    sku: "LX-BAG-TAN",
    status: "Low Stock",
    isFeatured: true,
    isTrending: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Handcrafted full-grain leather crossbody bag designed with anti-theft zipper compartments, brass hardware fittings, and an adjustable shoulder strap.",
    colors: ["Vintage Tan", "Deep Chestnut", "Obsidian Black"],
    sizes: ["Medium"],
    specs: {
      "Material": "100% Full Grain Genuine Leather",
      "Dimensions": "26 cm x 18 cm x 8 cm",
      "Compartments": "3 Main Zippers + Tablet Pocket",
      "Origin": "Handmade in India"
    }
  },
  {
    id: "prod-4",
    name: "Apex Ultra Fitness Smartwatch V2",
    category: "Wearables",
    brand: "ApexFit",
    price: 6999,
    originalPrice: 9999,
    discount: 30,
    rating: 4.6,
    reviewsCount: 274,
    stock: 60,
    sku: "APX-SMT-ORG",
    status: "In Stock",
    isFeatured: false,
    isTrending: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Advanced fitness tracker featuring Always-On AMOLED Display, SpO2 & ECG continuous monitoring, built-in dual-band GPS, and 12-day battery runtime.",
    colors: ["Titanium Orange", "Graphite Black", "Alpine Green"],
    sizes: ["44mm", "48mm"],
    specs: {
      "Display": "1.96-inch HD AMOLED",
      "Sensors": "Heart Rate, SpO2, Sleep, Stress, GPS",
      "Battery": "Up to 12 Days",
      "Rating": "IP68 Dust & Water Proof"
    }
  },
  {
    id: "prod-5",
    name: "Stride Pro Cushioning Running Shoes",
    category: "Footwear",
    brand: "Stride",
    price: 5499,
    originalPrice: 7499,
    discount: 26,
    rating: 4.5,
    reviewsCount: 145,
    stock: 22,
    sku: "STR-RUN-09",
    status: "In Stock",
    isFeatured: false,
    isTrending: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Lightweight breathable mesh running sneakers with high-rebound responsive foam soles engineered for maximum energy return during marathon sessions.",
    colors: ["Crimson Red", "Electric Blue", "Stealth Grey"],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    specs: {
      "Upper Material": "Engineered Breathable Mesh",
      "Sole": "Responsive Nitrogen-Infused Foam",
      "Weight": "240g (Single Shoe)",
      "Best For": "Road Running & Gym"
    }
  },
  {
    id: "prod-6",
    name: "Zenith Ceramic Smart Coffee Brewer",
    category: "Home & Living",
    brand: "Zenith Home",
    price: 3999,
    originalPrice: 5999,
    discount: 33,
    rating: 4.9,
    reviewsCount: 96,
    stock: 4,
    sku: "ZNH-BREW-WHT",
    status: "Low Stock",
    isFeatured: true,
    isTrending: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Precision temperature brewing ceramic drip coffee maker featuring app integration, customizable pour speed control, and double-walled thermal retention.",
    colors: ["Matte White", "Charcoal Slate"],
    sizes: ["600ml Capacity"],
    specs: {
      "Capacity": "600 ml (approx 4 cups)",
      "Material": "Double-Wall Thermal Ceramic",
      "Control": "Touch Pad + Smart App Link",
      "Power": "1000W Fast Heating"
    }
  },
  {
    id: "prod-7",
    name: "PureSound Portable RGB Bluetooth Speaker",
    category: "Electronics",
    brand: "AuraAudio",
    price: 2999,
    originalPrice: 4499,
    discount: 33,
    rating: 4.4,
    reviewsCount: 220,
    stock: 55,
    sku: "AUR-SPK-RGB",
    status: "In Stock",
    isFeatured: false,
    isTrending: false,
    isNew: false,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Compact 20W bass speaker with synchronized 360-degree ambient RGB lighting, IPX7 waterproof rating, and TWS dual pairing capabilities.",
    colors: ["Carbon Black", "Ocean Blue"],
    sizes: ["Compact"],
    specs: {
      "Output Power": "20W RMS",
      "Waterproofing": "IPX7 Submersible",
      "Playtime": "16 Hours",
      "Weight": "450g"
    }
  },
  {
    id: "prod-8",
    name: "Velvet Elegance Oversized Wool Blazer",
    category: "Fashion",
    brand: "LuxeCraft",
    price: 7999,
    originalPrice: 10999,
    discount: 27,
    rating: 4.8,
    reviewsCount: 88,
    stock: 12,
    sku: "LX-BLZ-BEI",
    status: "In Stock",
    isFeatured: false,
    isTrending: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Tailored structured blazer crafted from premium Australian merino wool blend with silk lining and horn button fastenings.",
    colors: ["Oatmeal Beige", "Midnight Charcoal"],
    sizes: ["S", "M", "L", "XL"],
    specs: {
      "Fabric": "70% Merino Wool, 30% Silk",
      "Fit": "Modern Oversized Fit",
      "Care Instructions": "Dry Clean Only",
      "Origin": "Designed in Milan"
    }
  }
];
