import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AccountMenu from "@/app/components/AccountMenu";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-40 bg-ink text-sandstone border-b border-sandstone/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Nomad
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/states" className="hover:text-gold transition">
            Explore
          </Link>
          {user ? (
            <AccountMenu email={user.email ?? ""} />
          ) : (
            <Link
              href="/login"
              className="w-8 h-8 rounded-full bg-sandstone/10 hover:bg-gold hover:text-ink flex items-center justify-center transition"
              aria-label="Log in"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}