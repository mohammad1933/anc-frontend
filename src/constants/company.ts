export const company = {
  name: "ANC NAJJAR FURNITURE FABRICS",
  shortName: "ANC",
  founded: 1998,
  founder: "Ahmad Al Najjar",
  origin: "Lebanon",
  uaeOpened: 2022,
  address: "Shop No. 109, Maleha Road, Industrial Area 18, Sharjah, UAE",
  phoneDisplay: "056 412 7448",
  phoneHref: "tel:+971564127448",
  whatsappNumber: "971564127448",
  email: "info@anc-uae.com",
  mapsUrl: "https://maps.app.goo.gl/S86Ss5gDPLX4Vyah6",
  instagramHandle: "@ancnajjarfabric",
  instagramUrl: "https://www.instagram.com/ancnajjarfabric/",
  slogan: "Fabrics That Make Every Space Feel Like Home—Crafted for Interiors of Distinction.",
  languages: ["Arabic", "English", "Hindi"],
  branches: ["Lebanon", "Syria", "Oman", "Iraq", "United Arab Emirates"],
  products: ["Velvet", "Linen", "Blackout", "Sheer", "Chenille", "Leather", "Fire-retardant fabrics"],
  catalogs: ["Velvet 8020", "Blackout 9902", "Sheer 9902", "Linen 11106", "Bouclé 2660", "Chenille Canna"],
} as const;

export const whatsappUrl = (message = "Hello ANC Najjar Furniture Fabrics, I would like more information.") =>
  `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const businessPolicies = {
  hours: "Saturday–Thursday, 9:00 AM–9:00 PM",
  breakTime: "Daily break: 2:00 PM–4:00 PM",
  closed: "Closed Friday",
  minimumOrder: "Orders start from 1 meter with no higher minimum quantity.",
  payments: "Cash, POS/card, and bank transfer. Credit may be approved after discussion with management.",
  delivery: "Free delivery on every order in Sharjah, Ajman, and Dubai International City. Charges apply elsewhere.",
  sameDay: "Orders placed between 9:00 AM and 5:00 PM are eligible for same-day delivery. Delivery runs leave at 10:30 AM and 5:30 PM.",
  international: "International customers are welcome when they arrange and take responsibility for shipping.",
  samples: "Up to three A4 samples are free per customer. Sample delivery is free in Sharjah and Ajman; courier charges apply elsewhere.",
  returns: "Unused, uncut, undamaged and resalable fabric may be returned while its catalog remains active. ANC-damaged fabric may be returned or replaced. After the first month, AED 1 per meter is deducted for each additional elapsed month.",
  pricing: "Prices are provided upon request.",
} as const;
