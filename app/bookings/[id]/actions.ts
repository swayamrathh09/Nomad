"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function removeStop(formData: FormData) {
  const bookingId = formData.get("bookingId") as string;
  const bookingStopId = formData.get("bookingStopId") as string;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const booking = await prisma.booking.findUniqueOrThrow({
    where: { id: bookingId },
  });

  if (booking.userId !== user.id) {
    throw new Error("Not authorized.");
  }

  await prisma.bookingStop.delete({
    where: { id: bookingStopId },
  });

  revalidatePath(`/bookings/${bookingId}`);
}