import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { createBooking } from "./actions";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const dynamic = "force-dynamic";

export default async function NewBookingPage({
  searchParams,
}: {
  searchParams: Promise<{ packageId?: string }>;
}) {
  const { packageId } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirect=${encodeURIComponent(`/bookings/new?packageId=${packageId}`)}`);
  }
  if (!packageId) {
    notFound();
  }

  const pkg = await prisma.package.findUnique({
    where: { id: packageId },
    include: { district: true },
  });
  if (!pkg) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex min-h-[80vh] items-center justify-center bg-[#F5F1E8] px-4 py-10">
        <div className="w-full max-w-md space-y-6 bg-white rounded-lg p-8 shadow-sm">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-gold">
              {pkg.tier}
            </span>
            <h1 className="text-xl font-bold mt-1" style={{ fontFamily: "var(--font-display)" }}>
              {pkg.name}
            </h1>
            <p className="text-sm text-charcoal/60">
              {pkg.district.displayName || pkg.district.name} · {pkg.days} days
            </p>
          </div>

          <form action={createBooking} className="space-y-4">
            <input type="hidden" name="packageId" value={pkg.id} />

            <div>
              <label htmlFor="arrivalDate" className="block text-sm font-medium mb-1">
                Arrival date
              </label>
              <input
                id="arrivalDate"
                name="arrivalDate"
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full border border-black/10 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="travelers" className="block text-sm font-medium mb-1">
                Number of travelers
              </label>
              <input
                id="travelers"
                name="travelers"
                type="number"
                min={1}
                max={20}
                defaultValue={2}
                required
                className="w-full border border-black/10 rounded-md px-3 py-2"
              />
              <p className="text-xs text-charcoal/50 mt-1">
                Rooms are calculated as 2 travelers per room.
              </p>
            </div>

            <div>
              <label htmlFor="originCity" className="block text-sm font-medium mb-1">
                Traveling from
              </label>
              <input
                id="originCity"
                name="originCity"
                type="text"
                placeholder="e.g. Bengaluru"
                required
                className="w-full border border-black/10 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="transportPaisePerPerson" className="block text-sm font-medium mb-1">
                Estimated travel cost (train/flight) per person, ₹
              </label>
              <input
                id="transportPaisePerPerson"
                name="transportPaisePerPerson"
                type="number"
                min={0}
                defaultValue={2500}
                required
                className="w-full border border-black/10 rounded-md px-3 py-2"
              />
              <p className="text-xs text-charcoal/50 mt-1">
                Covers both onward and return travel — edit if you already have a fare in mind.
              </p>
            </div>

            <div>
              <label htmlFor="vehicleType" className="block text-sm font-medium mb-1">
                Local vehicle for sightseeing
              </label>
              <select
                id="vehicleType"
                name="vehicleType"
                defaultValue="SEDAN"
                className="w-full border border-black/10 rounded-md px-3 py-2"
              >
                <option value="SEDAN">Sedan (up to 4 people, ₹18/km)</option>
                <option value="SUV">SUV (up to 6 people, ₹22/km)</option>
              </select>
            </div>

            <p className="text-sm text-charcoal/50">
              Total road distance for this itinerary: ~{pkg.roadDistanceKm} km.
              Driver-guide cost is calculated from this on the next screen.
            </p>

            <button
              type="submit"
              className="w-full bg-gold text-ink rounded-md py-2.5 font-semibold hover:bg-gold/90 transition"
            >
              Continue
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}