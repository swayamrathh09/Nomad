"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const VEHICLE_CAPACITY: Record<string, number> = { SEDAN: 4, SUV: 6 };
const VEHICLE_RATE_PAISE_PER_KM: Record<string, number> = { SEDAN: 1800, SUV: 2200 };

async function getRealRoadDistanceKm(
  pickupLat: number,
  pickupLng: number,
  stopCoords: { latitude: number | null; longitude: number | null }[]
): Promise<number | null> {
  const validStops = stopCoords.filter(
    (s) => s.latitude !== null && s.longitude !== null
  ) as { latitude: number; longitude: number }[];

  if (validStops.length === 0) return null;

  const coords = [
    `${pickupLng},${pickupLat}`,
    ...validStops.map((s) => `${s.longitude},${s.latitude}`),
    `${pickupLng},${pickupLat}`,
  ].join(";");

  try {
    const res = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${coords}?overview=false`,
      { signal: AbortSignal.timeout(6000) }
    );
    const data = await res.json();
    if (data.code !== "Ok" || !data.routes?.[0]) return null;
    const meters = data.routes[0].distance;
    return Math.round(meters / 1000);
  } catch {
    return null;
  }
}

export async function createBooking(formData: FormData) {
  const packageId = formData.get("packageId") as string;
  const arrivalDateStr = formData.get("arrivalDate") as string;
  const travelers = parseInt(formData.get("travelers") as string, 10);
  const pickupPoint = formData.get("pickupPoint") as string;
  const pickupLatStr = formData.get("pickupLat") as string;
  const pickupLngStr = formData.get("pickupLng") as string;
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
    include: {
      packageStops: {
        include: { stop: true },
        orderBy: [{ dayNumber: "asc" }, { order: "asc" }],
      },
    },
  });

  const arrivalDate = new Date(arrivalDateStr);
  const departureDate = new Date(arrivalDate);
  departureDate.setDate(departureDate.getDate() + pkg.days);

  const rooms = Math.ceil(travelers / 2);
  const capacity = VEHICLE_CAPACITY[vehicleType] ?? 4;
  const numVehicles = Math.ceil(travelers / capacity);
  const ratePerKm = VEHICLE_RATE_PAISE_PER_KM[vehicleType] ?? 1800;

  let actualRoadDistanceKm = pkg.roadDistanceKm; // fallback to estimate

  const pickupLat = parseFloat(pickupLatStr);
  const pickupLng = parseFloat(pickupLngStr);

  if (!isNaN(pickupLat) && !isNaN(pickupLng)) {
    const stopCoords = pkg.packageStops.map((ps) => ({
      latitude: ps.stop.latitude,
      longitude: ps.stop.longitude,
    }));
    const realDistance = await getRealRoadDistanceKm(pickupLat, pickupLng, stopCoords);
    if (realDistance !== null) {
      actualRoadDistanceKm = realDistance;
    }
  }

  const entriesCostPaise = pkg.pricePaise - pkg.hotelCostPaise - pkg.transportCostPaise;
  const packageCostScaled = pkg.hotelCostPaise * rooms + pkg.transportCostPaise + entriesCostPaise;
  const driverCostPaise = actualRoadDistanceKm * ratePerKm * numVehicles;

  const totalCostPaise = packageCostScaled + driverCostPaise;

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
      originCity: pickupPoint,
      vehicleType,
      transportPaisePerPerson: 0,
      driverCostPaise,
      actualRoadDistanceKm,
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