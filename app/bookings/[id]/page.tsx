import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { removeStop } from "./actions";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const dynamic = "force-dynamic";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      district: true,
      package: true,
      bookingStops: { include: { stop: true }, orderBy: [{ dayNumber: "asc" }, { order: "asc" }] },
    },
  });
  if (!booking || booking.userId !== user.id) {
    notFound();
  }

  const stopsByDay = new Map<number, typeof booking.bookingStops>();
  for (const bs of booking.bookingStops) {
    if (!stopsByDay.has(bs.dayNumber)) stopsByDay.set(bs.dayNumber, []);
    stopsByDay.get(bs.dayNumber)!.push(bs);
  }

  const pkg = booking.package;
  const entriesCostPaise = pkg ? pkg.pricePaise - pkg.hotelCostPaise - pkg.transportCostPaise : 0;
  const hotelCostScaled = pkg ? pkg.hotelCostPaise * booking.rooms : 0;
  const localTransportPaise = pkg ? pkg.transportCostPaise : 0;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F5F1E8] px-4 py-10">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-ink text-sandstone rounded-lg p-6">
            <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
              {booking.district.displayName || booking.district.name} Trip
            </h1>
            <p className="text-sandstone/70 text-sm mt-1">
              {new Date(booking.arrivalDate).toLocaleDateString("en-IN")} —{" "}
              {new Date(booking.departureDate).toLocaleDateString("en-IN")} · {booking.days} days ·{" "}
              {booking.travelers} travelers · Pickup: {booking.originCity}
            </p>
          </div>

          <div className="space-y-4">
            {Array.from(stopsByDay.entries()).map(([day, stops]) => (
              <div key={day} className="border border-black/10 rounded-lg p-5 bg-white">
                <h2 className="font-bold mb-3 text-gold">Day {day}</h2>
                <ul className="space-y-3">
                  {stops.map((bs) => (
                    <li key={bs.id} className="flex justify-between items-center text-sm">
                      <div>
                        <p className="font-medium">{bs.stop.name}</p>
                        <p className="text-charcoal/50">{bs.stop.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="whitespace-nowrap">
                          ₹{(bs.stop.costPaise / 100).toLocaleString("en-IN")}
                        </span>
                        <form action={removeStop}>
                          <input type="hidden" name="bookingId" value={booking.id} />
                          <input type="hidden" name="bookingStopId" value={bs.id} />
                          <button type="submit" className="text-red-600 text-xs underline">
                            Remove
                          </button>
                        </form>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-white border border-black/10 rounded-lg p-6 space-y-3">
            <h2 className="font-bold" style={{ fontFamily: "var(--font-display)" }}>
              Cost breakdown
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Hotel ({booking.rooms} room{booking.rooms > 1 ? "s" : ""})</span>
                <span>₹{(hotelCostScaled / 100).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Local transport (sightseeing)</span>
                <span>₹{(localTransportPaise / 100).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Entries & activities</span>
                <span>₹{(entriesCostPaise / 100).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Pickup to drop ({booking.vehicleType.toLowerCase()}, {booking.actualRoadDistanceKm} km)</span>
                <span>₹{(booking.driverCostPaise / 100).toLocaleString("en-IN")}</span>
              </div>
            </div>
            <div className="border-t border-black/10 pt-3 flex justify-between items-center">
              <div>
                <p className="text-sm text-charcoal/60">Total price</p>
                <p className="font-bold text-2xl text-gold">
                  ₹{(booking.totalCostPaise / 100).toLocaleString("en-IN")}
                </p>
              </div>
              <Link
                href={`/bookings/${booking.id}/pay`}
                className="bg-gold text-ink rounded-md px-6 py-3 font-semibold hover:bg-gold/90 transition"
              >
                Proceed to payment
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}