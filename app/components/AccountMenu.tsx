"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { logout } from "@/app/logout/actions";

export default function AccountMenu({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="My account"
        className="w-8 h-8 rounded-full bg-gold text-ink flex items-center justify-center text-xs font-bold"
      >
        {email[0]?.toUpperCase()}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white text-charcoal rounded-lg shadow-xl border border-black/10 overflow-hidden">
          <div className="px-4 py-3 border-b border-black/5">
            <p className="text-xs text-charcoal/50">Signed in as</p>
            <p className="text-sm font-medium truncate">{email}</p>
          </div>
          <Link href="/states" className="block px-4 py-2.5 text-sm hover:bg-[#F5F1E8] transition">
            My trips
          </Link>
          <Link href="/states" className="block px-4 py-2.5 text-sm hover:bg-[#F5F1E8] transition">
            Explore destinations
          </Link>
          <form action={logout}>
            <button type="submit" className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-[#F5F1E8] transition">
              Log out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}