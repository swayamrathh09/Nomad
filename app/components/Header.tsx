import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AccountMenu from "@/app/components/AccountMenu";
import SignInLink from "@/app/components/SignInLink";

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
          {user ? <AccountMenu email={user.email ?? ""} /> : <SignInLink />}
        </nav>
      </div>
    </header>
  );
}