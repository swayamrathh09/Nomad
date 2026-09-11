import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const ALL_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
  "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

const DISTRICTS: { name: string; displayName?: string; isSelectable: boolean }[] = [
  { name: "Angul", isSelectable: false },
  { name: "Balangir", isSelectable: false },
  { name: "Balasore", isSelectable: false },
  { name: "Bargarh", isSelectable: false },
  { name: "Bhadrak", isSelectable: false },
  { name: "Boudh", isSelectable: false },
  { name: "Cuttack", isSelectable: true },
  { name: "Deogarh", isSelectable: false },
  { name: "Dhenkanal", isSelectable: false },
  { name: "Gajapati", isSelectable: false },
  { name: "Ganjam", displayName: "Berhampur", isSelectable: true },
  { name: "Jagatsinghpur", isSelectable: false },
  { name: "Jajpur", isSelectable: false },
  { name: "Jharsuguda", isSelectable: false },
  { name: "Kalahandi", isSelectable: false },
  { name: "Kandhamal", isSelectable: false },
  { name: "Kendrapara", isSelectable: false },
  { name: "Kendujhar", isSelectable: false },
  { name: "Khordha", displayName: "Bhubaneswar", isSelectable: true },
  { name: "Koraput", isSelectable: true },
  { name: "Malkangiri", isSelectable: false },
  { name: "Mayurbhanj", isSelectable: false },
  { name: "Nabarangpur", isSelectable: false },
  { name: "Nayagarh", isSelectable: false },
  { name: "Nuapada", isSelectable: false },
  { name: "Puri", isSelectable: true },
  { name: "Rayagada", isSelectable: false },
  { name: "Sambalpur", isSelectable: false },
  { name: "Subarnapur", isSelectable: false },
  { name: "Sundargarh", isSelectable: false },
];

type StopSeed = {
  name: string;
  description: string;
  imageUrl: string;
  costPaise: number;
  latitude: number;
  longitude: number;
};

type PackageSeed = {
  name: string;
  tier: "BUDGET" | "STANDARD" | "PREMIUM";
  days: number;
  description: string;
  hotelCostPaise: number;
  pricePaise: number;
  fallbackRoadDistanceKm: number;
  stops: { name: string; day: number }[];
};

const PURI_STOPS: StopSeed[] = [
  { name: "Jagannath Temple", description: "12th-century temple, spiritual heart of Puri.", imageUrl: "/images/jagannath-temple.jpg", costPaise: 20000, latitude: 19.8135, longitude: 85.8312 },
  { name: "Puri Beach", description: "Golden Bay of Bengal shoreline, popular at sunrise.", imageUrl: "/images/puri-beach.jpg", costPaise: 0, latitude: 19.7983, longitude: 85.8248 },
  { name: "Gundicha Temple", description: "Lord Jagannath's 'garden house', key Rath Yatra stop.", imageUrl: "/images/gundicha-temple.jpg", costPaise: 0, latitude: 19.8062, longitude: 85.8180 },
  { name: "Konark Sun Temple", description: "UNESCO site, 13th-century chariot-shaped temple.", imageUrl: "/images/konark.jpg", costPaise: 50000, latitude: 19.8876, longitude: 86.0945 },
  { name: "Raghurajpur Heritage Village", description: "Artist village known for Pattachitra painting.", imageUrl: "/images/raghurajpur.jpg", costPaise: 10000, latitude: 19.8637, longitude: 85.8200 },
  { name: "Chilika Lake (Satapada)", description: "Boat safari on Asia's largest brackish water lagoon, dolphin spotting.", imageUrl: "/images/chilika.jpg", costPaise: 60000, latitude: 19.6167, longitude: 85.4667 },
  { name: "Puri Beach Sunrise Point", description: "Quiet stretch of Puri Beach, best at dawn.", imageUrl: "/images/puri-sunrise.jpg", costPaise: 0, latitude: 19.7990, longitude: 85.8300 },
  { name: "Sudarshan Crafts Museum", description: "Odisha handicrafts and stone/wood carving exhibits.", imageUrl: "/images/sudarshan-museum.jpg", costPaise: 5000, latitude: 19.8100, longitude: 85.8300 },
];

const PURI_PACKAGES: PackageSeed[] = [
  {
    name: "Puri Budget Explorer",
    tier: "BUDGET",
    days: 2,
    description: "Essential Puri temple and beach circuit, budget stay.",
    hotelCostPaise: 200000,
    pricePaise: 220000,
    fallbackRoadDistanceKm: 11,
    stops: [
      { name: "Jagannath Temple", day: 1 },
      { name: "Puri Beach", day: 1 },
      { name: "Gundicha Temple", day: 2 },
      { name: "Puri Beach Sunrise Point", day: 2 },
    ],
  },
  {
    name: "Puri Standard Circuit",
    tier: "STANDARD",
    days: 3,
    description: "Temples, beach, and a Konark Sun Temple day trip, mid-range stay.",
    hotelCostPaise: 540000,
    pricePaise: 620000,
    fallbackRoadDistanceKm: 67,
    stops: [
      { name: "Jagannath Temple", day: 1 },
      { name: "Puri Beach", day: 1 },
      { name: "Konark Sun Temple", day: 2 },
      { name: "Raghurajpur Heritage Village", day: 2 },
      { name: "Gundicha Temple", day: 3 },
      { name: "Puri Beach Sunrise Point", day: 3 },
    ],
  },
  {
    name: "Puri Premium Getaway",
    tier: "PREMIUM",
    days: 4,
    description: "Full circuit plus Chilika Lake dolphin safari, premium stay.",
    hotelCostPaise: 1400000,
    pricePaise: 1545000,
    fallbackRoadDistanceKm: 132,
    stops: [
      { name: "Jagannath Temple", day: 1 },
      { name: "Puri Beach", day: 1 },
      { name: "Konark Sun Temple", day: 2 },
      { name: "Raghurajpur Heritage Village", day: 2 },
      { name: "Chilika Lake (Satapada)", day: 3 },
      { name: "Sudarshan Crafts Museum", day: 3 },
      { name: "Gundicha Temple", day: 4 },
      { name: "Puri Beach Sunrise Point", day: 4 },
    ],
  },
];

const BHUBANESWAR_STOPS: StopSeed[] = [
  { name: "Lingaraj Temple", description: "11th-century temple, one of the largest in Bhubaneswar.", imageUrl: "/images/lingaraj-temple.jpg", costPaise: 0, latitude: 20.2372, longitude: 85.8345 },
  { name: "Mukteswar Temple", description: "10th-century temple famed for its ornate arched gateway.", imageUrl: "/images/mukteswar-temple.jpg", costPaise: 0, latitude: 20.2394, longitude: 85.8331 },
  { name: "Rajarani Temple", description: "11th-century sandstone temple known for its sculpted spire.", imageUrl: "/images/rajarani-temple.jpg", costPaise: 3000, latitude: 20.2465, longitude: 85.8367 },
  { name: "Udayagiri and Khandagiri Caves", description: "2nd-century BCE rock-cut caves with Jain inscriptions.", imageUrl: "/images/udayagiri-khandagiri.jpg", costPaise: 2500, latitude: 20.2564, longitude: 85.7847 },
  { name: "Nandankanan Zoological Park", description: "Zoo and botanical garden, known for white tigers.", imageUrl: "/images/nandankanan.jpg", costPaise: 10000, latitude: 20.3936, longitude: 85.8189 },
  { name: "Dhauli Shanti Stupa", description: "Peace pagoda marking Ashoka's Kalinga war site.", imageUrl: "/images/dhauli.jpg", costPaise: 0, latitude: 20.1928, longitude: 85.8422 },
  { name: "Odisha State Museum", description: "Archaeology, manuscripts, and Odisha's tribal heritage.", imageUrl: "/images/odisha-museum.jpg", costPaise: 1000, latitude: 20.2700, longitude: 85.8390 },
  { name: "Ekamra Kanan Botanical Garden", description: "Botanical garden and cactus house in the city center.", imageUrl: "/images/ekamra-kanan.jpg", costPaise: 2000, latitude: 20.2833, longitude: 85.8167 },
];

const BHUBANESWAR_PACKAGES: PackageSeed[] = [
  {
    name: "Bhubaneswar Budget Explorer",
    tier: "BUDGET",
    days: 2,
    description: "Temple city essentials, budget stay.",
    hotelCostPaise: 200000,
    pricePaise: 203000,
    fallbackRoadDistanceKm: 25,
    stops: [
      { name: "Lingaraj Temple", day: 1 },
      { name: "Mukteswar Temple", day: 1 },
      { name: "Rajarani Temple", day: 2 },
      { name: "Dhauli Shanti Stupa", day: 2 },
    ],
  },
  {
    name: "Bhubaneswar Standard Circuit",
    tier: "STANDARD",
    days: 3,
    description: "Temples, ancient caves, and the state museum, mid-range stay.",
    hotelCostPaise: 540000,
    pricePaise: 546500,
    fallbackRoadDistanceKm: 45,
    stops: [
      { name: "Lingaraj Temple", day: 1 },
      { name: "Mukteswar Temple", day: 1 },
      { name: "Udayagiri and Khandagiri Caves", day: 2 },
      { name: "Rajarani Temple", day: 2 },
      { name: "Dhauli Shanti Stupa", day: 3 },
      { name: "Odisha State Museum", day: 3 },
    ],
  },
  {
    name: "Bhubaneswar Premium Getaway",
    tier: "PREMIUM",
    days: 4,
    description: "Full temple and heritage circuit plus Nandankanan, premium stay.",
    hotelCostPaise: 1400000,
    pricePaise: 1418500,
    fallbackRoadDistanceKm: 90,
    stops: [
      { name: "Lingaraj Temple", day: 1 },
      { name: "Mukteswar Temple", day: 1 },
      { name: "Udayagiri and Khandagiri Caves", day: 2 },
      { name: "Rajarani Temple", day: 2 },
      { name: "Nandankanan Zoological Park", day: 3 },
      { name: "Ekamra Kanan Botanical Garden", day: 3 },
      { name: "Dhauli Shanti Stupa", day: 4 },
      { name: "Odisha State Museum", day: 4 },
    ],
  },
];

const KORAPUT_STOPS: StopSeed[] = [
  { name: "Jagannath Temple, Koraput", description: "Local temple in the heart of Koraput town.", imageUrl: "/images/koraput-jagannath.jpg", costPaise: 0, latitude: 18.8121, longitude: 82.7108 },
  { name: "Koraput Tribal Museum", description: "Museum on the tribal cultures of southern Odisha.", imageUrl: "/images/koraput-tribal-museum.jpg", costPaise: 1000, latitude: 18.8100, longitude: 82.7100 },
  { name: "Gupteswar Cave Shrine", description: "Limestone cave temple dedicated to Shiva.", imageUrl: "/images/gupteswar-cave.jpg", costPaise: 2000, latitude: 18.6000, longitude: 82.3333 },
  { name: "Deomali Peak", description: "Odisha's highest peak, a hill-country viewpoint.", imageUrl: "/images/deomali-peak.jpg", costPaise: 0, latitude: 18.6470, longitude: 82.7278 },
  { name: "Duduma Waterfall", description: "157m waterfall on the Machhkund river.", imageUrl: "/images/duduma-waterfall.jpg", costPaise: 0, latitude: 18.3833, longitude: 82.5667 },
  { name: "Machhkund Hydro Power Project", description: "Dam and hydroelectric project with river views.", imageUrl: "/images/machhkund-dam.jpg", costPaise: 0, latitude: 18.3833, longitude: 82.5667 },
  { name: "Kolab Dam", description: "Scenic reservoir in the hills outside town.", imageUrl: "/images/kolab-dam.jpg", costPaise: 0, latitude: 18.7333, longitude: 82.7333 },
  { name: "Kotpad Weaving Village", description: "Handloom village known for natural-dye textiles.", imageUrl: "/images/kotpad-village.jpg", costPaise: 0, latitude: 19.1500, longitude: 82.3333 },
];

const KORAPUT_PACKAGES: PackageSeed[] = [
  {
    name: "Koraput Budget Explorer",
    tier: "BUDGET",
    days: 2,
    description: "Town temple, tribal museum, and Gupteswar cave shrine, budget stay.",
    hotelCostPaise: 180000,
    pricePaise: 183000,
    fallbackRoadDistanceKm: 40,
    stops: [
      { name: "Jagannath Temple, Koraput", day: 1 },
      { name: "Koraput Tribal Museum", day: 1 },
      { name: "Gupteswar Cave Shrine", day: 2 },
      { name: "Deomali Peak", day: 2 },
    ],
  },
  {
    name: "Koraput Standard Circuit",
    tier: "STANDARD",
    days: 3,
    description: "Hill country and cave shrine plus a waterfall and dam day, mid-range stay.",
    hotelCostPaise: 480000,
    pricePaise: 483000,
    fallbackRoadDistanceKm: 90,
    stops: [
      { name: "Jagannath Temple, Koraput", day: 1 },
      { name: "Koraput Tribal Museum", day: 1 },
      { name: "Gupteswar Cave Shrine", day: 2 },
      { name: "Deomali Peak", day: 2 },
      { name: "Duduma Waterfall", day: 3 },
      { name: "Kolab Dam", day: 3 },
    ],
  },
  {
    name: "Koraput Premium Getaway",
    tier: "PREMIUM",
    days: 4,
    description: "Full hill-country circuit plus Machhkund dam and Kotpad weaving village, premium stay.",
    hotelCostPaise: 1200000,
    pricePaise: 1203000,
    fallbackRoadDistanceKm: 160,
    stops: [
      { name: "Jagannath Temple, Koraput", day: 1 },
      { name: "Koraput Tribal Museum", day: 1 },
      { name: "Gupteswar Cave Shrine", day: 2 },
      { name: "Deomali Peak", day: 2 },
      { name: "Duduma Waterfall", day: 3 },
      { name: "Machhkund Hydro Power Project", day: 3 },
      { name: "Kolab Dam", day: 4 },
      { name: "Kotpad Weaving Village", day: 4 },
    ],
  },
];

const CUTTACK_STOPS: StopSeed[] = [
  { name: "Barabati Fort", description: "16th-century fort ruins on the Mahanadi's bank.", imageUrl: "/images/barabati-fort.jpg", costPaise: 0, latitude: 20.4894, longitude: 85.8828 },
  { name: "Cuttack Chandi Temple", description: "Temple to the city's patron goddess.", imageUrl: "/images/cuttack-chandi.jpg", costPaise: 0, latitude: 20.4700, longitude: 85.8800 },
  { name: "Silver Filigree (Tarakasi) Workshop", description: "Watch Cuttack's famous silver filigree craft being made.", imageUrl: "/images/tarakasi-workshop.jpg", costPaise: 0, latitude: 20.4650, longitude: 85.8750 },
  { name: "Netaji Birthplace Museum", description: "Subhas Chandra Bose's birth house, now a museum.", imageUrl: "/images/netaji-museum.jpg", costPaise: 1000, latitude: 20.4736, longitude: 85.8825 },
  { name: "Dhabaleswar Temple", description: "Island temple on the Mahanadi, reached by boat.", imageUrl: "/images/dhabaleswar-temple.jpg", costPaise: 3000, latitude: 20.5500, longitude: 85.7833 },
  { name: "Mahanadi Riverfront", description: "Riverside promenade through the old city.", imageUrl: "/images/mahanadi-riverfront.jpg", costPaise: 0, latitude: 20.4850, longitude: 85.8800 },
  { name: "Buxi Bazaar Market", description: "Cuttack's historic silver and textile market.", imageUrl: "/images/buxi-bazaar.jpg", costPaise: 0, latitude: 20.4680, longitude: 85.8790 },
  { name: "Ravenshaw University Heritage Building", description: "19th-century colonial-era campus, one of the oldest in eastern India.", imageUrl: "/images/ravenshaw.jpg", costPaise: 0, latitude: 20.4625, longitude: 85.8828 },
];

const CUTTACK_PACKAGES: PackageSeed[] = [
  {
    name: "Cuttack Budget Explorer",
    tier: "BUDGET",
    days: 2,
    description: "Fort, temple, and the silver filigree craft, budget stay.",
    hotelCostPaise: 180000,
    pricePaise: 180000,
    fallbackRoadDistanceKm: 20,
    stops: [
      { name: "Barabati Fort", day: 1 },
      { name: "Cuttack Chandi Temple", day: 1 },
      { name: "Silver Filigree (Tarakasi) Workshop", day: 2 },
      { name: "Buxi Bazaar Market", day: 2 },
    ],
  },
  {
    name: "Cuttack Standard Circuit",
    tier: "STANDARD",
    days: 3,
    description: "Heritage city circuit plus an island temple boat ride, mid-range stay.",
    hotelCostPaise: 480000,
    pricePaise: 484000,
    fallbackRoadDistanceKm: 55,
    stops: [
      { name: "Barabati Fort", day: 1 },
      { name: "Cuttack Chandi Temple", day: 1 },
      { name: "Silver Filigree (Tarakasi) Workshop", day: 2 },
      { name: "Netaji Birthplace Museum", day: 2 },
      { name: "Dhabaleswar Temple", day: 3 },
      { name: "Mahanadi Riverfront", day: 3 },
    ],
  },
  {
    name: "Cuttack Premium Getaway",
    tier: "PREMIUM",
    days: 4,
    description: "Full heritage circuit plus the old market and university campus, premium stay.",
    hotelCostPaise: 1200000,
    pricePaise: 1204000,
    fallbackRoadDistanceKm: 90,
    stops: [
      { name: "Barabati Fort", day: 1 },
      { name: "Cuttack Chandi Temple", day: 1 },
      { name: "Silver Filigree (Tarakasi) Workshop", day: 2 },
      { name: "Netaji Birthplace Museum", day: 2 },
      { name: "Dhabaleswar Temple", day: 3 },
      { name: "Mahanadi Riverfront", day: 3 },
      { name: "Ravenshaw University Heritage Building", day: 4 },
      { name: "Buxi Bazaar Market", day: 4 },
    ],
  },
];

const BERHAMPUR_STOPS: StopSeed[] = [
  { name: "Gopalpur Beach", description: "Historic beach town on the Bay of Bengal.", imageUrl: "/images/gopalpur-beach.jpg", costPaise: 0, latitude: 19.2667, longitude: 84.9167 },
  { name: "Gopalpur Lighthouse", description: "Colonial-era lighthouse overlooking the coast.", imageUrl: "/images/gopalpur-lighthouse.jpg", costPaise: 2000, latitude: 19.2650, longitude: 84.9150 },
  { name: "Taptapani Hot Spring", description: "Natural sulphur hot spring in the hills.", imageUrl: "/images/taptapani.jpg", costPaise: 1500, latitude: 19.5333, longitude: 84.3833 },
  { name: "Rambha Chilika Boat Point", description: "Southern Chilika Lake boat access point.", imageUrl: "/images/rambha-chilika.jpg", costPaise: 40000, latitude: 19.5500, longitude: 85.1333 },
  { name: "Berhampur Silk Weaving Village", description: "Home of the Berhampuri Patta silk saree.", imageUrl: "/images/berhampur-silk.jpg", costPaise: 0, latitude: 19.3149, longitude: 84.7941 },
  { name: "Khallikote Fort Ruins", description: "Ruins of a former princely estate fort.", imageUrl: "/images/khallikote-fort.jpg", costPaise: 0, latitude: 19.7500, longitude: 84.9833 },
  { name: "Sonepur Beach", description: "Quieter beach stretch near Gopalpur.", imageUrl: "/images/sonepur-beach.jpg", costPaise: 0, latitude: 19.2833, longitude: 84.9000 },
  { name: "Berhampur Town Market", description: "Old town market on Aska Road.", imageUrl: "/images/berhampur-market.jpg", costPaise: 0, latitude: 19.3149, longitude: 84.7941 },
];

const BERHAMPUR_PACKAGES: PackageSeed[] = [
  {
    name: "Berhampur Budget Explorer",
    tier: "BUDGET",
    days: 2,
    description: "Gopalpur beach and a hot spring day, budget stay.",
    hotelCostPaise: 190000,
    pricePaise: 193500,
    fallbackRoadDistanceKm: 35,
    stops: [
      { name: "Gopalpur Beach", day: 1 },
      { name: "Gopalpur Lighthouse", day: 1 },
      { name: "Taptapani Hot Spring", day: 2 },
      { name: "Berhampur Silk Weaving Village", day: 2 },
    ],
  },
  {
    name: "Berhampur Standard Circuit",
    tier: "STANDARD",
    days: 3,
    description: "Beach town, hot spring, and a Chilika boat trip, mid-range stay.",
    hotelCostPaise: 510000,
    pricePaise: 553500,
    fallbackRoadDistanceKm: 80,
    stops: [
      { name: "Gopalpur Beach", day: 1 },
      { name: "Gopalpur Lighthouse", day: 1 },
      { name: "Taptapani Hot Spring", day: 2 },
      { name: "Khallikote Fort Ruins", day: 2 },
      { name: "Rambha Chilika Boat Point", day: 3 },
      { name: "Berhampur Silk Weaving Village", day: 3 },
    ],
  },
  {
    name: "Berhampur Premium Getaway",
    tier: "PREMIUM",
    days: 4,
    description: "Full coastal and hill-spring circuit plus the old town market, premium stay.",
    hotelCostPaise: 1280000,
    pricePaise: 1323500,
    fallbackRoadDistanceKm: 120,
    stops: [
      { name: "Gopalpur Beach", day: 1 },
      { name: "Gopalpur Lighthouse", day: 1 },
      { name: "Taptapani Hot Spring", day: 2 },
      { name: "Khallikote Fort Ruins", day: 2 },
      { name: "Rambha Chilika Boat Point", day: 3 },
      { name: "Berhampur Silk Weaving Village", day: 3 },
      { name: "Sonepur Beach", day: 4 },
      { name: "Berhampur Town Market", day: 4 },
    ],
  },
];

async function getItineraryDistanceKm(
  coords: { latitude: number; longitude: number }[]
): Promise<number | null> {
  if (coords.length < 2) return 0;
  const path = coords.map((c) => `${c.longitude},${c.latitude}`).join(";");
  try {
    const res = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${path}?overview=false`
    );
    const data = await res.json();
    if (data.code !== "Ok" || !data.routes?.[0]) return null;
    return Math.round(data.routes[0].distance / 1000);
  } catch {
    return null;
  }
}

async function seedDistrict(
  districtName: string,
  stopsData: StopSeed[],
  packagesData: PackageSeed[]
) {
  const district = await prisma.district.findFirstOrThrow({
    where: { name: districtName },
  });

  const stopMap = new Map<string, string>();
  const stopCoordMap = new Map<string, { latitude: number; longitude: number }>();

  for (const s of stopsData) {
    const stop = await prisma.stop.upsert({
      where: { districtId_name: { districtId: district.id, name: s.name } },
      update: {
        description: s.description,
        imageUrl: s.imageUrl,
        costPaise: s.costPaise,
        latitude: s.latitude,
        longitude: s.longitude,
      },
      create: {
        name: s.name,
        description: s.description,
        imageUrl: s.imageUrl,
        costPaise: s.costPaise,
        latitude: s.latitude,
        longitude: s.longitude,
        districtId: district.id,
      },
    });
    stopMap.set(s.name, stop.id);
    stopCoordMap.set(s.name, { latitude: s.latitude, longitude: s.longitude });
  }

  for (const pkg of packagesData) {
    const orderedCoords = pkg.stops.map((s) => stopCoordMap.get(s.name)!);
    const realDistance = await getItineraryDistanceKm(orderedCoords);
    const roadDistanceKm = realDistance ?? pkg.fallbackRoadDistanceKm;

    const createdPkg = await prisma.package.upsert({
      where: { districtId_name: { districtId: district.id, name: pkg.name } },
      update: {
        tier: pkg.tier,
        days: pkg.days,
        description: pkg.description,
        hotelCostPaise: pkg.hotelCostPaise,
        transportCostPaise: 0,
        pricePaise: pkg.pricePaise,
        roadDistanceKm,
      },
      create: {
        name: pkg.name,
        tier: pkg.tier,
        days: pkg.days,
        description: pkg.description,
        hotelCostPaise: pkg.hotelCostPaise,
        transportCostPaise: 0,
        pricePaise: pkg.pricePaise,
        roadDistanceKm,
        districtId: district.id,
      },
    });

    for (let i = 0; i < pkg.stops.length; i++) {
      const s = pkg.stops[i];
      const stopId = stopMap.get(s.name)!;
      await prisma.packageStop.upsert({
        where: {
          packageId_stopId_dayNumber: {
            packageId: createdPkg.id,
            stopId,
            dayNumber: s.day,
          },
        },
        update: { order: i },
        create: {
          packageId: createdPkg.id,
          stopId,
          dayNumber: s.day,
          order: i,
        },
      });
    }
  }
}

async function main() {
  for (const name of ALL_STATES) {
    await prisma.state.upsert({
      where: { name },
      update: { isSelectable: name === "Odisha" },
      create: { name, isSelectable: name === "Odisha" },
    });
  }

  const odisha = await prisma.state.findUniqueOrThrow({ where: { name: "Odisha" } });

  for (const d of DISTRICTS) {
    await prisma.district.upsert({
      where: { stateId_name: { stateId: odisha.id, name: d.name } },
      update: { isSelectable: d.isSelectable, displayName: d.displayName },
      create: {
        name: d.name,
        displayName: d.displayName,
        isSelectable: d.isSelectable,
        stateId: odisha.id,
      },
    });
  }

  await seedDistrict("Puri", PURI_STOPS, PURI_PACKAGES);
  await seedDistrict("Khordha", BHUBANESWAR_STOPS, BHUBANESWAR_PACKAGES);
  await seedDistrict("Koraput", KORAPUT_STOPS, KORAPUT_PACKAGES);
  await seedDistrict("Cuttack", CUTTACK_STOPS, CUTTACK_PACKAGES);
  await seedDistrict("Ganjam", BERHAMPUR_STOPS, BERHAMPUR_PACKAGES);

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });