"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SignInLink() {
  const pathname = usePathname();

  return (
    <Link
      href={`/login?redirect=${encodeURIComponent(pathname)}`}
      className="w-8 h-8 rounded-full bg-sandstone/10 hover:bg-gold hover:text-ink flex items-center justify-center transition"
      aria-label="Log in"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
      </svg>
    </Link>
  );
}