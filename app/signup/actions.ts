"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const phoneNumber = formData.get("phoneNumber") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }
  if (!phoneNumber) {
    return { error: "Phone number is required." };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { error: error.message };
  }

  if (!data.user) {
    return { error: "Signup failed. Please try again." };
  }

  await prisma.user.create({
    data: {
      id: data.user.id,
      email: data.user.email!,
      phoneNumber,
    },
  });

  redirect("/");
}