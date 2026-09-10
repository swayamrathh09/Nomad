import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default async function ConfirmationPage({
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
    include: { district: true },
  });
  if (!booking || booking.userId !== user.id) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex min-h-[80vh] items-center justify-center bg-[#F5F1E8] px-4">
        <div className="w-full max-w-md space-y-6 text-center bg-white rounded-lg p-10">
          <div className="text-5xl">✅</div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
            Booking Confirmed!
          </h1>
          <p className="text-charcoal/60">
            {booking.district.displayName || booking.district.name} ·{" "}
            {new Date(booking.arrivalDate).toLocaleDateString("en-IN")} —{" "}
            {new Date(booking.departureDate).toLocaleDateString("en-IN")}
          </p>
          <p className="font-bold text-2xl text-gold">
            ₹{(booking.totalCostPaise / 100).toLocaleString("en-IN")} paid
          </p>
          <p className="text-sm text-charcoal/40">Booking ID: {booking.id}</p>
          <Link
            href="/states"
            className="inline-block bg-ink text-sandstone rounded-md px-6 py-3 font-medium hover:bg-ink/90 transition"
          >
            Book another trip
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}