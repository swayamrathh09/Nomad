"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function confirmPayment(formData: FormData) {
  const bookingId = formData.get("bookingId") as string;

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

  await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: "CONFIRMED",
      razorpayOrderId: `test_order_${bookingId.slice(0, 8)}`,
      razorpayPaymentId: `test_pay_${Date.now()}`,
    },
  });

  redirect(`/bookings/${bookingId}/confirmation`);
}