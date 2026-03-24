export interface LocationData {
  slug: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  badge?: string;
  email: string;
  lat: number;
  lng: number;
  detailedHours: { day: string; time: string }[];
  features: string[];
  rating?: number;
  reviewCount?: string;
  description: string;
}

export const LOCATIONS: LocationData[] = [
  {
    slug: "newcastle",
    name: "Newcastle",
    address: "41 West Road, Newcastle upon Tyne, NE4 9PX",
    hours: "5pm — 11pm daily",
    phone: "+44 191 272 7183",
    badge: "Flagship",
    email: "info@spicehutnewcastle.co.uk",
    lat: 54.9738,
    lng: -1.6330,
    detailedHours: [
      { day: "Monday", time: "17:00 – 23:00" },
      { day: "Tuesday", time: "17:00 – 23:00" },
      { day: "Wednesday", time: "17:00 – 23:00" },
      { day: "Thursday", time: "17:00 – 23:00" },
      { day: "Friday", time: "17:00 – 23:00" },
      { day: "Saturday", time: "17:00 – 23:00" },
      { day: "Sunday", time: "17:00 – 23:00" },
    ],
    features: ["Dine-in", "Takeaway", "Delivery"],
    rating: 4.66,
    reviewCount: "1,921+",
    description:
      "The original Spice Hut — our flagship location on West Road. The one that started it all. Known for its vibrant atmosphere and the full Spice Hut experience.",
  },
  {
    slug: "sunderland",
    name: "Sunderland",
    address: "20 Olive Street, Sunderland, SR1 3PE",
    hours: "12pm — 11pm daily",
    phone: "+44 191 597 3297",
    email: "info@spicehutsunderland.co.uk",
    lat: 54.9069,
    lng: -1.3838,
    detailedHours: [
      { day: "Monday", time: "12:00 – 23:00" },
      { day: "Tuesday", time: "12:00 – 23:00" },
      { day: "Wednesday", time: "12:00 – 23:00" },
      { day: "Thursday", time: "12:00 – 23:00" },
      { day: "Friday", time: "12:00 – 23:00" },
      { day: "Saturday", time: "12:00 – 23:00" },
      { day: "Sunday", time: "12:00 – 23:00" },
    ],
    features: ["Dine-in", "Takeaway", "Delivery", "Lunch Service"],
    rating: 4.6,
    reviewCount: "3,312+",
    description:
      "Our Sunderland branch on Olive Street offers extended lunchtime hours — perfect for when the craving hits early. Full menu available from midday.",
  },
  {
    slug: "hartlepool",
    name: "Hartlepool",
    address: "88 York Road, Hartlepool, TS26 8AB",
    hours: "5pm — 11pm daily",
    phone: "+44 1429 866666",
    badge: "Best Takeaway 2024",
    email: "info@spicehuthartlepool.co.uk",
    lat: 54.6863,
    lng: -1.2108,
    detailedHours: [
      { day: "Monday", time: "17:00 – 23:00" },
      { day: "Tuesday", time: "17:00 – 23:00" },
      { day: "Wednesday", time: "17:00 – 23:00" },
      { day: "Thursday", time: "17:00 – 23:00" },
      { day: "Friday", time: "17:00 – 23:00" },
      { day: "Saturday", time: "17:00 – 23:00" },
      { day: "Sunday", time: "17:00 – 23:00" },
    ],
    features: ["Takeaway", "Delivery", "Award Winner"],
    rating: 4.4,
    reviewCount: "1,259+",
    description:
      "Winner of Best Takeaway of the Year 2024 (Teesside). Our Hartlepool branch brings the heat with a strong social media presence and loyal local following.",
  },
  {
    slug: "south-shields",
    name: "South Shields",
    address: "38-40 Ocean Road, South Shields, NE33 2HZ",
    hours: "5pm — 11pm (closed Fridays)",
    phone: "+44 191 524 2512",
    email: "info@spicehutsouthshields.co.uk",
    lat: 54.9980,
    lng: -1.3650,
    detailedHours: [
      { day: "Monday", time: "17:00 – 23:00" },
      { day: "Tuesday", time: "17:00 – 23:00" },
      { day: "Wednesday", time: "17:00 – 23:00" },
      { day: "Thursday", time: "17:00 – 23:00" },
      { day: "Friday", time: "Closed" },
      { day: "Saturday", time: "17:00 – 23:00" },
      { day: "Sunday", time: "17:00 – 23:00" },
    ],
    features: ["Dine-in", "Takeaway", "Ocean Road Strip"],
    rating: 4.5,
    reviewCount: "490+",
    description:
      "Situated on the famous Ocean Road culinary strip in South Shields. A prime spot for dine-in with the full range of smash burgers and grill platters.",
  },
  {
    slug: "whitley-bay",
    name: "Whitley Bay",
    address: "234 Whitley Road, Whitley Bay, NE26 2TA",
    hours: "5pm — 11pm daily",
    phone: "",
    email: "info@spicehutwhitleybay.co.uk",
    lat: 55.0467,
    lng: -1.4448,
    detailedHours: [
      { day: "Monday", time: "17:00 – 23:00" },
      { day: "Tuesday", time: "17:00 – 23:00" },
      { day: "Wednesday", time: "17:00 – 23:00" },
      { day: "Thursday", time: "17:00 – 23:00" },
      { day: "Friday", time: "17:00 – 23:00" },
      { day: "Saturday", time: "17:00 – 23:00" },
      { day: "Sunday", time: "17:00 – 23:00" },
    ],
    features: ["Takeaway", "Delivery"],
    rating: 4.2,
    reviewCount: "84+",
    description:
      "Our coastal branch in Whitley Bay — serving the seaside community with the full Spice Hut menu for takeaway and delivery.",
  },
  {
    slug: "middlesbrough",
    name: "Middlesbrough",
    address: "TS1 District, Middlesbrough, TS1 3QW",
    hours: "5pm — 11pm daily",
    phone: "",
    badge: "Coming soon",
    email: "info@spicehutmiddlesbrough.co.uk",
    lat: 54.5740,
    lng: -1.2340,
    detailedHours: [
      { day: "Monday", time: "Opening Soon" },
      { day: "Tuesday", time: "Opening Soon" },
      { day: "Wednesday", time: "Opening Soon" },
      { day: "Thursday", time: "Opening Soon" },
      { day: "Friday", time: "Opening Soon" },
      { day: "Saturday", time: "Opening Soon" },
      { day: "Sunday", time: "Opening Soon" },
    ],
    features: ["Coming 2025"],
    description:
      "Our newest addition to the Spice Hut family. Middlesbrough, your Spice Hut is coming soon — watch this space.",
  },
];

export function getLocationBySlug(slug: string): LocationData | undefined {
  return LOCATIONS.find((loc) => loc.slug === slug);
}
