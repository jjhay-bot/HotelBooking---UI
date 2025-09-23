export const rooms = [
  {
    id: 1,
    roomType: "Luxury Suite",
    description: "Spacious suite with a private balcony overlooking the city.",
    roomNumber: 101,
    pricePerNight: 250,
    capacity: 2,
    bedType: "King Bed",
    size: "65 sq m",
    floor: 1,
    status: "available", // available, occupied, maintenance
    amenities: ["Balcony", "King Bed", "Mini Bar", "City View", "WiFi", "Air Conditioning"],
    gallery: [
      {
        id: 1,
        title: "Room Overview - Main Living Area",
        img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Luxury suite main living area with modern furnishing"
      },
      {
        id: 2,
        title: "Bedroom View - King Size Bed",
        img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "King size bed with premium linens"
      },
      {
        id: 3,
        title: "Bathroom - Modern Amenities",
        img: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Modern bathroom with luxury amenities"
      },
      {
        id: 4,
        title: "Balcony View - Ocean Terrace",
        img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Private balcony with ocean view"
      }
    ]
  },
  {
    id: 2,
    roomType: "Standard Room",
    description: "Comfortable room with all the basic amenities you need.",
    roomNumber: 102,
    pricePerNight: 120,
    capacity: 2,
    bedType: "Queen Bed",
    size: "35 sq m",
    floor: 1,
    status: "available",
    amenities: ["Queen Bed", "WiFi", "Flat-screen TV", "Air Conditioning", "Mini Fridge"],
    gallery: [
      {
        id: 1,
        title: "Room Overview - Cozy Standard Layout",
        img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Standard room with queen bed and modern furnishing"
      },
      {
        id: 2,
        title: "Bedroom Area - Queen Size Comfort",
        img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Queen bed with clean white linens"
      },
      {
        id: 3,
        title: "Work Area - Desk & Chair Setup",
        img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Modern work desk with chair in hotel room"
      },
      {
        id: 4,
        title: "Bathroom - Clean & Functional",
        img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Clean modern bathroom with shower"
      }
    ]
  },
  {
    id: 3,
    roomType: "Family Room",
    description: "Perfect for families, with two queen beds and a sofa.",
    roomNumber: 201,
    pricePerNight: 180,
    capacity: 4,
    bedType: "Two Queen Beds",
    size: "50 sq m",
    floor: 2,
    status: "occupied",
    amenities: ["Two Queen Beds", "Sofa", "WiFi", "TV", "Air Conditioning", "Mini Fridge"],
    gallery: [
      {
        id: 1,
        title: "Room Overview - Spacious Family Layout",
        img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Spacious family room with multiple beds"
      },
      {
        id: 2,
        title: "Sleeping Area - Two Queen Beds",
        img: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Two queen beds in family room"
      },
      {
        id: 3,
        title: "Living Area - Comfortable Seating",
        img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1658&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Comfortable seating area with sofa"
      },
      {
        id: 4,
        title: "Entertainment Center - TV & Storage",
        img: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "TV entertainment center in hotel room"
      }
    ]
  },
  {
    id: 4,
    roomType: "Deluxe Room",
    description: "An upgraded room with enhanced amenities and a comfortable seating area.",
    roomNumber: 202,
    pricePerNight: 200,
    capacity: 3,
    bedType: "King Bed",
    size: "45 sq m",
    floor: 2,
    status: "available",
    amenities: ["King Bed", "Lounge Area", "Mini Bar", "WiFi", "Air Conditioning", "Room Service"],
    gallery: [
      {
        id: 1,
        title: "Room Overview - Deluxe Comfort",
        img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Deluxe room with modern decor and king bed"
      },
      {
        id: 2,
        title: "King Bedroom - Premium Bedding",
        img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "King bed with premium white linens"
      },
      {
        id: 3,
        title: "Lounge Area - Relaxation Space",
        img: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Comfortable lounge seating area"
      },
      {
        id: 4,
        title: "Mini Bar - Premium Refreshments",
        img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Well-stocked mini bar area"
      }
    ]
  },
  {
    id: 5,
    roomType: "Penthouse Suite",
    description: "The ultimate in luxury, featuring panoramic views, a private jacuzzi, and a full kitchen.",
    roomNumber: 301,
    pricePerNight: 500,
    capacity: 4,
    bedType: "King Bed + Sofa Bed",
    size: "120 sq m",
    floor: 3,
    status: "maintenance",
    amenities: ["Jacuzzi", "Full Kitchen", "Panoramic View", "Private Terrace", "WiFi", "Premium Sound System"],
    gallery: [
      {
        id: 1,
        title: "Suite Overview - Luxury Living Space",
        img: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=1739&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Luxury penthouse suite living area"
      },
      {
        id: 2,
        title: "Master Bedroom - King Size Elegance",
        img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Elegant master bedroom with king bed"
      },
      {
        id: 3,
        title: "Private Jacuzzi - Spa Experience",
        img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Private jacuzzi with city views"
      },
      {
        id: 4,
        title: "Full Kitchen - Gourmet Facilities",
        img: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Modern full kitchen with premium appliances"
      }
    ]
  },
  {
    id: 6,
    roomType: "Studio Apartment",
    description: "A modern, open-plan space with a small kitchenette, perfect for long-term stays.",
    roomNumber: 302,
    pricePerNight: 220,
    capacity: 2,
    bedType: "Queen Bed",
    size: "40 sq m",
    floor: 3,
    status: "available",
    amenities: ["Kitchenette", "Work Desk", "WiFi", "TV", "Air Conditioning", "Weekly Housekeeping"],
    gallery: [
      {
        id: 1,
        title: "Studio Overview - Open Plan Living",
        img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1658&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Modern studio apartment with open plan design"
      },
      {
        id: 2,
        title: "Sleeping Area - Queen Bed Setup",
        img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Queen bed area in studio apartment"
      },
      {
        id: 3,
        title: "Kitchenette - Compact Cooking Space",
        img: "https://images.unsplash.com/photo-1604709177225-055f99402ea3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Compact kitchenette with modern appliances"
      },
      {
        id: 4,
        title: "Work Space - Desk & Storage",
        img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1658&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Dedicated workspace with desk and storage"
      }
    ]
  }
];
