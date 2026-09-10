import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const TIER_ORDER = { BUDGET: 0, STANDARD: 1, PREMIUM: 2 };
const TIER_COLOR: Record<string, string> = {
  BUDGET: "bg-[#F5F1E8] text-charcoal",
  STANDARD: "bg-gold/20 text-ink",
  PREMIUM: "bg-ink text-sandstone",
};

export default async function PackagesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const district = await prisma.district.findUnique({ where: { id } });
  if (!district || !district.isSelectable) {
    notFound();
  }

  const packages = await prisma.package.findMany({
    where: { districtId: id },
    include: {
      packageStops: { include: { stop: true }, orderBy: { order: "asc" } },
    },
  });
  packages.sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-6">
          <Link href="/districts" className="text-sm underline text-charcoal/60">
            ← Back to districts
          </Link>

          <h1 className="text-3xl text-center" style={{ fontFamily: "var(--font-display)" }}>
            {district.displayName || district.name}
          </h1>
          <p className="text-center text-charcoal/60">Choose a package</p>

          <div className="space-y-5">
            {packages.map((pkg) => {
              const entriesCostPaise = pkg.pricePaise - pkg.hotelCostPaise - pkg.transportCostPaise;
              return (
                <div
                  key={pkg.id}
                  className="border border-black/10 rounded-lg p-6 bg-white shadow-sm space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${TIER_COLOR[pkg.tier]}`}>
                        {pkg.tier}
                      </span>
                      <h2 className="text-xl font-bold mt-2">{pkg.name}</h2>
                      <p className="text-sm text-charcoal/60 mt-1">
                        {pkg.days} days · {pkg.description}
                      </p>
                    </div>
                    <p className="text-xl font-bold whitespace-nowrap text-gold">
                      ₹{(pkg.pricePaise / 100).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-sm bg-[#F5F1E8] rounded-md p-4">
                    <div>
                      <p className="text-charcoal/50 text-xs">Hotel</p>
                      <p className="font-semibold">₹{(pkg.hotelCostPaise / 100).toLocaleString("en-IN")}</p>
                    </div>
                    <div>
                      <p className="text-charcoal/50 text-xs">Local transport</p>
                      <p className="font-semibold">₹{(pkg.transportCostPaise / 100).toLocaleString("en-IN")}</p>
                    </div>
                    <div>
                      <p className="text-charcoal/50 text-xs">Entries & activities</p>
                      <p className="font-semibold">₹{(entriesCostPaise / 100).toLocaleString("en-IN")}</p>
                    </div>
                  </div>

                  <ul className="text-sm text-charcoal/70 space-y-1">
                    {pkg.packageStops.map((ps) => (
                      <li key={ps.id}>
                        <span className="font-medium text-charcoal">Day {ps.dayNumber}:</span> {ps.stop.name}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/bookings/new?packageId=${pkg.id}`}
                    className="inline-block bg-gold text-ink rounded-md px-5 py-2.5 text-sm font-semibold hover:bg-gold/90 transition"
                  >
                    Select this package
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link href={`/districts/${district.id}/custom`} className="text-sm underline text-charcoal/60">
              Or build your own itinerary instead
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}