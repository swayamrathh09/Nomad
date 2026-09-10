import Image from "next/image";
import Link from "next/link";
import IndiaFlagIntro from "@/app/components/IndiaFlagIntro";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import SearchBar from "@/app/components/SearchBar";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const REGIONS = [
  { name: "The Himalayan North", tagline: "Ladakh, Himachal, Uttarakhand", img: "/images/regions/himalaya.jpg" },
  { name: "The Western Coast", tagline: "Goa, Maharashtra, Konkan shoreline", img: "/images/regions/goa.jpg" },
  { name: "The Desert West", tagline: "Rajasthan and Gujarat", img: "/images/regions/rajasthan.jpg" },
  { name: "The Deep South", tagline: "Kerala backwaters, Tamil temples", img: "/images/regions/kerala.jpg" },
  { name: "The Northeast", tagline: "Assam tea gardens, Meghalaya", img: "/images/regions/assam.jpg" },
  { name: "The Eastern Coast", tagline: "Odisha, West Bengal, Andhra", img: "/images/regions/odisha.jpg", live: true },
];

const TIER_ORDER: Record<string, number> = { BUDGET: 0, STANDARD: 1, PREMIUM: 2 };

const DISTRICT_IMAGES: Record<string, string> = {
  Puri: "/images/regions/puri.jpg",
  Khordha: "/images/regions/bhubaneswar.jpg",
  Cuttack: "/images/regions/cuttack.jpg",
  Ganjam: "/images/regions/berhampur.jpg",
  Koraput: "/images/regions/koraput.jpg",
};

export default async function Home() {
  const openDistricts = await prisma.district.findMany({
    where: { isSelectable: true },
    orderBy: { name: "asc" },
  });

  const cheapestPackages = await Promise.all(
    openDistricts.map(async (d) => {
      const packages = await prisma.package.findMany({ where: { districtId: d.id } });
      packages.sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier]);
      return { district: d, cheapest: packages[0] ?? null };
    })
  );

  const openCities = openDistricts.map((d) => ({
    label: `${d.displayName || d.name}, Odisha`,
    districtId: d.id,
  }));

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-charcoal">
        {/* HERO */}
        <section className="relative overflow-hidden min-h-[80vh] flex items-center justify-center text-center">
          <Image src="/images/regions/himalaya.jpg" alt="" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-ink/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />

          <div className="relative max-w-2xl px-6 py-24 text-sandstone mx-auto">
            <p className="text-gold text-sm font-medium tracking-wide mb-5">
              A different way to see India
            </p>
            <h1 className="text-5xl md:text-7xl leading-[1.05] mb-2 font-normal" style={{ fontFamily: "var(--font-display)" }}>
              India isn&apos;t one trip.
            </h1>
            <h1 className="text-5xl md:text-7xl leading-[1.05] mb-7 italic text-gold font-normal" style={{ fontFamily: "var(--font-display)" }}>
              It&apos;s twenty-eight.
            </h1>
            <p className="text-lg md:text-xl text-sandstone/85 mb-10 leading-relaxed">
              Every state has its own architecture, food, textiles, and pace.
              Nomad plans real, bookable itineraries past the same five
              cities every travel app defaults to.
            </p>
            <div className="flex items-center justify-center gap-4">
              <IndiaFlagIntro />
              <a href="#trips" className="border border-sandstone/40 text-sandstone px-7 py-3.5 rounded-md hover:bg-sandstone/10 transition">
                See real trips
              </a>
            </div>
          </div>
        </section>

        <div className="px-6">
          <SearchBar openCities={openCities} />
        </div>

        {/* FEATURES */}
        <section className="px-6 pt-16 pb-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-5">
          {[
            { title: "Priced upfront", desc: "Hotel, transport, and entry fees — no mystery totals." },
            { title: "Editable itineraries", desc: "Swap or drop a stop, the plan updates instantly." },
            { title: "Beyond the obvious", desc: "District hub cities most apps never surface." },
            { title: "Book in one sitting", desc: "Pick dates, pay, done — no back-and-forth." },
          ].map((f) => (
            <div key={f.title} className="bg-[#F5F1E8] rounded-lg p-6">
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-charcoal/60 text-sm">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* REAL TRIPS — one card per live city */}
        <section id="trips" className="px-6 py-16 max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-gold text-sm font-medium mb-2">Live now</p>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
              5 Odisha cities, ready to book
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cheapestPackages.map(({ district, cheapest }) => {
              if (!cheapest) return null;
              const img = DISTRICT_IMAGES[district.name] || "/images/regions/odisha.jpg";
              return (
                <div key={district.id} className="border border-black/10 rounded-lg overflow-hidden">
                  <div className="relative h-44">
                    <Image src={img} alt={district.displayName || district.name} fill className="object-cover" />
                    <span className="absolute top-3 left-3 text-xs font-medium bg-white/90 text-charcoal px-2 py-1 rounded-full">
                      3 packages
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-1">{district.displayName || district.name}</h3>
                    <p className="text-charcoal/60 text-sm mb-4">Starting from</p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold">₹{(cheapest.pricePaise / 100).toLocaleString("en-IN")}</p>
                      <Link
                        href={`/districts/${district.id}/packages`}
                        className="bg-ink text-sandstone text-sm font-medium px-4 py-2 rounded-md hover:bg-ink/90 transition"
                      >
                        View & book
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* REGIONS */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-10" style={{ fontFamily: "var(--font-display)" }}>
            Explore all of India
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {REGIONS.map((r) => (
              <div key={r.name} className="relative overflow-hidden rounded-lg group min-h-[180px]">
                <Image src={r.img} alt={r.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                {r.live && (
                  <span className="absolute top-3 right-3 text-xs font-medium bg-gold text-ink px-2 py-0.5 rounded-full z-10">
                    Live now
                  </span>
                )}
                <div className="absolute bottom-0 left-0 p-5 text-sandstone">
                  <h3 className="text-lg font-semibold mb-1">{r.name}</h3>
                  <p className="text-sandstone/75 text-xs">{r.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRUST */}
        <section className="px-6 pt-20 pb-28 bg-ink text-sandstone border-b border-sandstone/10">
          <div className="max-w-4xl mx-auto">
            <p className="text-gold text-sm font-medium mb-3">Travel with confidence</p>
            <h2 className="text-3xl md:text-4xl mb-10 max-w-md" style={{ fontFamily: "var(--font-display)" }}>
              The details matter. So do you.
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-sandstone/80">
              <div>
                <h3 className="font-semibold text-sandstone mb-1">Transparent pricing</h3>
                <p className="text-sm">What you see is what the trip costs — hotel, transport, and entries broken down.</p>
              </div>
              <div>
                <h3 className="font-semibold text-sandstone mb-1">Editable, not fixed</h3>
                <p className="text-sm">Remove a stop you don&apos;t want. The plan and total update immediately.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}