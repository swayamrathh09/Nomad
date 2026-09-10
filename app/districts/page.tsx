import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const dynamic = "force-dynamic";

export default async function DistrictsPage() {
  const odisha = await prisma.state.findUniqueOrThrow({
    where: { name: "Odisha" },
  });

  const districts = await prisma.district.findMany({
    where: { stateId: odisha.id },
    orderBy: { name: "asc" },
  });

  const active = districts.filter((d) => d.isSelectable);
  const rest = districts.filter((d) => !d.isSelectable);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white px-4 py-10">
        <div className="max-w-5xl mx-auto space-y-10">
          <div>
            <Link href="/states" className="text-sm underline text-charcoal/60">
              ← Back to map
            </Link>
            <h1
              className="text-3xl mt-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Odisha — choose a district
            </h1>
            <p className="text-charcoal/60 mt-1">
              5 districts open for booking now, 25 more on the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {active.map((d) => (
              <Link
                key={d.id}
                href={`/districts/${d.id}/packages`}
                className="relative overflow-hidden rounded-lg group min-h-[200px]"
              >
                <Image
                  src="/images/regions/odisha.jpg"
                  alt={d.displayName || d.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                <span className="absolute top-3 right-3 text-xs font-medium bg-gold text-ink px-2 py-0.5 rounded-full z-10">
                  Open now
                </span>
                <div className="absolute bottom-0 left-0 p-5 text-sandstone">
                  <h3 className="text-lg font-semibold">
                    {d.displayName || d.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div>
            <h2 className="text-sm font-medium text-charcoal/50 mb-4 uppercase tracking-wide">
              Coming soon
            </h2>
            <div className="flex flex-wrap gap-2">
              {rest.map((d) => (
                <Link
                  key={d.id}
                  href={`/coming-soon?place=${encodeURIComponent(d.displayName || d.name)}`}
                  className="text-sm px-3 py-1.5 rounded-full bg-[#F5F1E8] text-charcoal/50 hover:bg-[#EDE4D0] transition"
                >
                  {d.displayName || d.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}