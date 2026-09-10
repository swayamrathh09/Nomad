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

const PURI_STOPS = [
  { name: "Jagannath Temple", description: "12th-century temple, spiritual heart of Puri.", imageUrl: "/images/jagannath-temple.jpg", costPaise: 20000 },
  { name: "Puri Beach", description: "Golden Bay of Bengal shoreline, popular at sunrise.", imageUrl: "/images/puri-beach.jpg", costPaise: 0 },
  { name: "Gundicha Temple", description: "Lord Jagannath's 'garden house', key Rath Yatra stop.", imageUrl: "/images/gundicha-temple.jpg", costPaise: 0 },
  { name: "Konark Sun Temple", description: "UNESCO site, 13th-century chariot-shaped temple.", imageUrl: "/images/konark.jpg", costPaise: 50000 },
  { name: "Raghurajpur Heritage Village", description: "Artist village known for Pattachitra painting.", imageUrl: "/images/raghurajpur.jpg", costPaise: 10000 },
  { name: "Chilika Lake (Satapada)", description: "Boat safari on Asia's largest brackish water lagoon, dolphin spotting.", imageUrl: "/images/chilika.jpg", costPaise: 60000 },
  { name: "Puri Beach Sunrise Point", description: "Quiet stretch of Puri Beach, best at dawn.", imageUrl: "/images/puri-sunrise.jpg", costPaise: 0 },
  { name: "Sudarshan Crafts Museum", description: "Odisha handicrafts and stone/wood carving exhibits.", imageUrl: "/images/sudarshan-museum.jpg", costPaise: 5000 },
];

const PURI_PACKAGES = [
  {
    name: "Puri Budget Explorer",
    tier: "BUDGET" as const,
    days: 2,
    description: "Essential Puri temple and beach circuit, budget stay.",
    hotelCostPaise: 200000,
    transportCostPaise: 60000,
    pricePaise: 280000,
    roadDistanceKm: 11,
    stops: [
      { name: "Jagannath Temple", day: 1 },
      { name: "Puri Beach", day: 1 },
      { name: "Gundicha Temple", day: 2 },
      { name: "Puri Beach Sunrise Point", day: 2 },
    ],
  },
  {
    name: "Puri Standard Circuit",
    tier: "STANDARD" as const,
    days: 3,
    description: "Temples, beach, and a Konark Sun Temple day trip, mid-range stay.",
    hotelCostPaise: 540000,
    transportCostPaise: 150000,
    pricePaise: 770000,
    roadDistanceKm: 67,
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
    tier: "PREMIUM" as const,
    days: 4,
    description: "Full circuit plus Chilika Lake dolphin safari, premium stay.",
    hotelCostPaise: 1400000,
    transportCostPaise: 300000,
    pricePaise: 1845000,
    roadDistanceKm: 132,
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

const BHUBANESWAR_STOPS = [
  { name: "Lingaraj Temple", description: "11th-century temple, one of the largest in Bhubaneswar.", imageUrl: "/images/lingaraj-temple.jpg", costPaise: 0 },
  { name: "Mukteswar Temple", description: "10th-century temple famed for its ornate arched gateway.", imageUrl: "/images/mukteswar-temple.jpg", costPaise: 0 },
  { name: "Rajarani Temple", description: "11th-century sandstone temple known for its sculpted spire.", imageUrl: "/images/rajarani-temple.jpg", costPaise: 3000 },
  { name: "Udayagiri and Khandagiri Caves", description: "2nd-century BCE rock-cut caves with Jain inscriptions.", imageUrl: "/images/udayagiri-khandagiri.jpg", costPaise: 2500 },
  { name: "Nandankanan Zoological Park", description: "Zoo and botanical garden, known for white tigers.", imageUrl: "/images/nandankanan.jpg", costPaise: 10000 },
  { name: "Dhauli Shanti Stupa", description: "Peace pagoda marking Ashoka's Kalinga war site.", imageUrl: "/images/dhauli.jpg", costPaise: 0 },
  { name: "Odisha State Museum", description: "Archaeology, manuscripts, and Odisha's tribal heritage.", imageUrl: "/images/odisha-museum.jpg", costPaise: 1000 },
  { name: "Ekamra Kanan Botanical Garden", description: "Botanical garden and cactus house in the city center.", imageUrl: "/images/ekamra-kanan.jpg", costPaise: 2000 },
];

const BHUBANESWAR_PACKAGES = [
  {
    name: "Bhubaneswar Budget Explorer",
    tier: "BUDGET" as const,
    days: 2,
    description: "Temple city essentials, budget stay.",
    hotelCostPaise: 200000,
    transportCostPaise: 50000,
    pricePaise: 253000,
    roadDistanceKm: 25,
    stops: [
      { name: "Lingaraj Temple", day: 1 },
      { name: "Mukteswar Temple", day: 1 },
      { name: "Rajarani Temple", day: 2 },
      { name: "Dhauli Shanti Stupa", day: 2 },
    ],
  },
  {
    name: "Bhubaneswar Standard Circuit",
    tier: "STANDARD" as const,
    days: 3,
    description: "Temples, ancient caves, and the state museum, mid-range stay.",
    hotelCostPaise: 540000,
    transportCostPaise: 120000,
    pricePaise: 666500,
    roadDistanceKm: 45,
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
    tier: "PREMIUM" as const,
    days: 4,
    description: "Full temple and heritage circuit plus Nandankanan, premium stay.",
    hotelCostPaise: 1400000,
    transportCostPaise: 250000,
    pricePaise: 1668500,
    roadDistanceKm: 90,
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

const KORAPUT_STOPS = [
  { name: "Jagannath Temple, Koraput", description: "Local temple in the heart of Koraput town.", imageUrl: "/images/koraput-jagannath.jpg", costPaise: 0 },
  { name: "Koraput Tribal Museum", description: "Museum on the tribal cultures of southern Odisha.", imageUrl: "/images/koraput-tribal-museum.jpg", costPaise: 1000 },
  { name: "Gupteswar Cave Shrine", description: "Limestone cave temple dedicated to Shiva.", imageUrl: "/images/gupteswar-cave.jpg", costPaise: 2000 },
  { name: "Deomali Peak", description: "Odisha's highest peak, a hill-country viewpoint.", imageUrl: "/images/deomali-peak.jpg", costPaise: 0 },
  { name: "Duduma Waterfall", description: "157m waterfall on the Machhkund river.", imageUrl: "/images/duduma-waterfall.jpg", costPaise: 0 },
  { name: "Machhkund Hydro Power Project", description: "Dam and hydroelectric project with river views.", imageUrl: "/images/machhkund-dam.jpg", costPaise: 0 },
  { name: "Kolab Dam", description: "Scenic reservoir in the hills outside town.", imageUrl: "/images/kolab-dam.jpg", costPaise: 0 },
  { name: "Kotpad Weaving Village", description: "Handloom village known for natural-dye textiles.", imageUrl: "/images/kotpad-village.jpg", costPaise: 0 },
];

const KORAPUT_PACKAGES = [
  {
    name: "Koraput Budget Explorer",
    tier: "BUDGET" as const,
    days: 2,
    description: "Town temple, tribal museum, and Gupteswar cave shrine, budget stay.",
    hotelCostPaise: 180000,
    transportCostPaise: 60000,
    pricePaise: 243000,
    roadDistanceKm: 40,
    stops: [
      { name: "Jagannath Temple, Koraput", day: 1 },
      { name: "Koraput Tribal Museum", day: 1 },
      { name: "Gupteswar Cave Shrine", day: 2 },
      { name: "Deomali Peak", day: 2 },
    ],
  },
  {
    name: "Koraput Standard Circuit",
    tier: "STANDARD" as const,
    days: 3,
    description: "Hill country and cave shrine plus a waterfall and dam day, mid-range stay.",
    hotelCostPaise: 480000,
    transportCostPaise: 140000,
    pricePaise: 623000,
    roadDistanceKm: 90,
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
    tier: "PREMIUM" as const,
    days: 4,
    description: "Full hill-country circuit plus Machhkund dam and Kotpad weaving village, premium stay.",
    hotelCostPaise: 1200000,
    transportCostPaise: 280000,
    pricePaise: 1483000,
    roadDistanceKm: 160,
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

const CUTTACK_STOPS = [
  { name: "Barabati Fort", description: "16th-century fort ruins on the Mahanadi's bank.", imageUrl: "/images/barabati-fort.jpg", costPaise: 0 },
  { name: "Cuttack Chandi Temple", description: "Temple to the city's patron goddess.", imageUrl: "/images/cuttack-chandi.jpg", costPaise: 0 },
  { name: "Silver Filigree (Tarakasi) Workshop", description: "Watch Cuttack's famous silver filigree craft being made.", imageUrl: "/images/tarakasi-workshop.jpg", costPaise: 0 },
  { name: "Netaji Birthplace Museum", description: "Subhas Chandra Bose's birth house, now a museum.", imageUrl: "/images/netaji-museum.jpg", costPaise: 1000 },
  { name: "Dhabaleswar Temple", description: "Island temple on the Mahanadi, reached by boat.", imageUrl: "/images/dhabaleswar-temple.jpg", costPaise: 3000 },
  { name: "Qadam-e-Rasul", description: "17th-century Mughal-era shrine complex.", imageUrl: "/images/qadam-e-rasul.jpg", costPaise: 0 },
  { name: "Mahanadi Riverfront", description: "Riverside promenade through the old city.", imageUrl: "/images/mahanadi-riverfront.jpg", costPaise: 0 },
  { name: "Buxi Bazaar Market", description: "Cuttack's historic silver and textile market.", imageUrl: "/images/buxi-bazaar.jpg", costPaise: 0 },
];

const CUTTACK_PACKAGES = [
  {
    name: "Cuttack Budget Explorer",
    tier: "BUDGET" as const,
    days: 2,
    description: "Fort, temple, and the silver filigree craft, budget stay.",
    hotelCostPaise: 180000,
    transportCostPaise: 50000,
    pricePaise: 230000,
    roadDistanceKm: 20,
    stops: [
      { name: "Barabati Fort", day: 1 },
      { name: "Cuttack Chandi Temple", day: 1 },
      { name: "Silver Filigree (Tarakasi) Workshop", day: 2 },
      { name: "Qadam-e-Rasul", day: 2 },
    ],
  },
  {
    name: "Cuttack Standard Circuit",
    tier: "STANDARD" as const,
    days: 3,
    description: "Heritage city circuit plus an island temple boat ride, mid-range stay.",
    hotelCostPaise: 480000,
    transportCostPaise: 130000,
    pricePaise: 614000,
    roadDistanceKm: 55,
    stops: [
      { name: "Barabati Fort", day: 1 },
      { name: "Cuttack Chandi Temple", day: 1 },
      { name: "Silver Filigree (Tarakasi) Workshop", day: 2 },
      { name: "Netaji Birthplace Museum", day: 2 },
      { name: "Dhabaleswar Temple", day: 3 },
      { name: "Qadam-e-Rasul", day: 3 },
    ],
  },
  {
    name: "Cuttack Premium Getaway",
    tier: "PREMIUM" as const,
    days: 4,
    description: "Full heritage circuit plus the riverfront and old market, premium stay.",
    hotelCostPaise: 1200000,
    transportCostPaise: 260000,
    pricePaise: 1464000,
    roadDistanceKm: 90,
    stops: [
      { name: "Barabati Fort", day: 1 },
      { name: "Cuttack Chandi Temple", day: 1 },
      { name: "Silver Filigree (Tarakasi) Workshop", day: 2 },
      { name: "Netaji Birthplace Museum", day: 2 },
      { name: "Dhabaleswar Temple", day: 3 },
      { name: "Mahanadi Riverfront", day: 3 },
      { name: "Qadam-e-Rasul", day: 4 },
      { name: "Buxi Bazaar Market", day: 4 },
    ],
  },
];

const BERHAMPUR_STOPS = [
  { name: "Gopalpur Beach", description: "Historic beach town on the Bay of Bengal.", imageUrl: "/images/gopalpur-beach.jpg", costPaise: 0 },
  { name: "Gopalpur Lighthouse", description: "Colonial-era lighthouse overlooking the coast.", imageUrl: "/images/gopalpur-lighthouse.jpg", costPaise: 2000 },
  { name: "Taptapani Hot Spring", description: "Natural sulphur hot spring in the hills.", imageUrl: "/images/taptapani.jpg", costPaise: 1500 },
  { name: "Rambha Chilika Boat Point", description: "Southern Chilika Lake boat access point.", imageUrl: "/images/rambha-chilika.jpg", costPaise: 40000 },
  { name: "Berhampur Silk Weaving Village", description: "Home of the Berhampuri Patta silk saree.", imageUrl: "/images/berhampur-silk.jpg", costPaise: 0 },
  { name: "Khallikote Fort Ruins", description: "Ruins of a former princely estate fort.", imageUrl: "/images/khallikote-fort.jpg", costPaise: 0 },
  { name: "Sonepur Beach", description: "Quieter beach stretch near Gopalpur.", imageUrl: "/images/sonepur-beach.jpg", costPaise: 0 },
  { name: "Berhampur Town Market", description: "Old town market on Aska Road.", imageUrl: "/images/berhampur-market.jpg", costPaise: 0 },
];

const BERHAMPUR_PACKAGES = [
  {
    name: "Berhampur Budget Explorer",
    tier: "BUDGET" as const,
    days: 2,
    description: "Gopalpur beach and a hot spring day, budget stay.",
    hotelCostPaise: 190000,
    transportCostPaise: 55000,
    pricePaise: 248500,
    roadDistanceKm: 35,
    stops: [
      { name: "Gopalpur Beach", day: 1 },
      { name: "Gopalpur Lighthouse", day: 1 },
      { name: "Taptapani Hot Spring", day: 2 },
      { name: "Berhampur Silk Weaving Village", day: 2 },
    ],
  },
  {
    name: "Berhampur Standard Circuit",
    tier: "STANDARD" as const,
    days: 3,
    description: "Beach town, hot spring, and a Chilika boat trip, mid-range stay.",
    hotelCostPaise: 510000,
    transportCostPaise: 135000,
    pricePaise: 688500,
    roadDistanceKm: 80,
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
    tier: "PREMIUM" as const,
    days: 4,
    description: "Full coastal and hill-spring circuit plus the old town market, premium stay.",
    hotelCostPaise: 1280000,
    transportCostPaise: 270000,
    pricePaise: 1593500,
    roadDistanceKm: 120,
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

async function seedDistrict(
  districtName: string,
  stopsData: typeof PURI_STOPS,
  packagesData: typeof PURI_PACKAGES
) {
  const district = await prisma.district.findFirstOrThrow({
    where: { name: districtName },
  });

  const stopMap = new Map<string, string>();

  for (const s of stopsData) {
    const stop = await prisma.stop.upsert({
      where: { districtId_name: { districtId: district.id, name: s.name } },
      update: {
        description: s.description,
        imageUrl: s.imageUrl,
        costPaise: s.costPaise,
      },
      create: { ...s, districtId: district.id },
    });
    stopMap.set(s.name, stop.id);
  }

  for (const pkg of packagesData) {
    const createdPkg = await prisma.package.upsert({
      where: { districtId_name: { districtId: district.id, name: pkg.name } },
      update: {
        tier: pkg.tier,
        days: pkg.days,
        description: pkg.description,
        hotelCostPaise: pkg.hotelCostPaise,
        transportCostPaise: pkg.transportCostPaise,
        pricePaise: pkg.pricePaise,
        roadDistanceKm: pkg.roadDistanceKm,
      },
      create: {
        name: pkg.name,
        tier: pkg.tier,
        days: pkg.days,
        description: pkg.description,
        hotelCostPaise: pkg.hotelCostPaise,
        transportCostPaise: pkg.transportCostPaise,
        pricePaise: pkg.pricePaise,
        roadDistanceKm: pkg.roadDistanceKm,
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