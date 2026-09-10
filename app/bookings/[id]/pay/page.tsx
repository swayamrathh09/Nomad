import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { confirmPayment } from "./actions";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const dynamic = "force-dynamic";

export default async function PayPage({
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
    include: { district: true, package: true },
  });
  if (!booking || booking.userId !== user.id) {
    notFound();
  }

  const pkg = booking.package;
  const entriesCostPaise = pkg ? pkg.pricePaise - pkg.hotelCostPaise - pkg.transportCostPaise : 0;
  const hotelCostScaled = pkg ? pkg.hotelCostPaise * booking.rooms : 0;
  const localTransportPaise = pkg ? pkg.transportCostPaise : 0;

  return (
    <>
      <Header />
      <main className="flex min-h-[80vh] items-center justify-center bg-ink px-4 py-10">
        <div className="w-full max-w-md space-y-6 bg-white rounded-lg p-8">
          <h1 className="text-xl font-bold text-center" style={{ fontFamily: "var(--font-display)" }}>
            Trip cost breakdown
          </h1>
          <p className="text-center text-charcoal/60 text-sm">
            {booking.district.displayName || booking.district.name} · {booking.travelers} travelers · {booking.rooms} room(s)
          </p>

          <div className="space-y-2 text-sm bg-[#F5F1E8] rounded-md p-4">
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
              <span>Pickup ({booking.originCity}) to drop ({booking.vehicleType.toLowerCase()}, {booking.actualRoadDistanceKm} km)</span>
              <span>₹{(booking.driverCostPaise / 100).toLocaleString("en-IN")}</span>
            </div>
          </div>

          <p className="text-center text-4xl font-bold text-gold">
            ₹{(booking.totalCostPaise / 100).toLocaleString("en-IN")}
          </p>

          <form action={confirmPayment}>
            <input type="hidden" name="bookingId" value={booking.id} />
            <button
              type="submit"
              className="w-full bg-gold text-ink rounded-md py-3 font-semibold hover:bg-gold/90 transition"
            >
              Pay Now (Test)
            </button>
          </form>

          <p className="text-xs text-charcoal/40 text-center">
            Test mode — no real payment will be processed.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}