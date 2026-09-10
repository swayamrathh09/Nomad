"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createBooking(formData: FormData) {
  const packageId = formData.get("packageId") as string;
  const arrivalDateStr = formData.get("arrivalDate") as string;
  const travelers = parseInt(formData.get("travelers") as string, 10);
  const originCity = formData.get("originCity") as string;
  const transportPaisePerPerson = parseInt(formData.get("transportPaisePerPerson") as string, 10);
  const vehicleType = (formData.get("vehicleType") as string) || "SEDAN";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const pkg = await prisma.package.findUniqueOrThrow({
    where: { id: packageId },
    include: { packageStops: true },
  });

  const arrivalDate = new Date(arrivalDateStr);
  const departureDate = new Date(arrivalDate);
  departureDate.setDate(departureDate.getDate() + pkg.days);

  const rooms = Math.ceil(travelers / 2);

  // Package price already covers hotel + local transport + entries for 1 room (2 people).
  // Scale only the hotel portion by extra rooms — entries and local transport stay flat.
  const entriesCostPaise = pkg.pricePaise - pkg.hotelCostPaise - pkg.transportCostPaise;
  const packageCostScaled =
    pkg.hotelCostPaise * rooms + pkg.transportCostPaise + entriesCostPaise;

  // Long-distance travel (train/flight), onward + return, on top of the package price.
  const transportTotalPaise = transportPaisePerPerson * travelers * 2;

  const totalCostPaise = packageCostScaled + transportTotalPaise;

  const booking = await prisma.booking.create({
    data: {
      type: "PACKAGE",
      userId: user.id,
      districtId: pkg.districtId,
      packageId: pkg.id,
      days: pkg.days,
      arrivalDate,
      departureDate,
      travelers,
      rooms,
      originCity,
      vehicleType,
      transportPaisePerPerson,
      driverCostPaise: 0,
      totalCostPaise,
      status: "PENDING",
      bookingStops: {
        create: pkg.packageStops.map((ps) => ({
          stopId: ps.stopId,
          dayNumber: ps.dayNumber,
          order: ps.order,
        })),
      },
    },
  });

  redirect(`/bookings/${booking.id}`);
}