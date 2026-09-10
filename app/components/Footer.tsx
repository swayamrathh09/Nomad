import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-sandstone/60 px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <p
            className="text-sandstone text-lg mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Nomad
          </p>
          <p className="text-sm">
            Trip planning for the parts of India most travel apps skip.
          </p>
        </div>

        <div className="text-sm space-y-2">
          <p className="text-sandstone font-medium mb-2">Explore</p>
          <Link href="/states" className="block hover:text-gold transition">
            All destinations
          </Link>
          <Link href="/signup" className="block hover:text-gold transition">
            Create an account
          </Link>
        </div>

        <div className="text-sm space-y-2">
          <p className="text-sandstone font-medium mb-2">About</p>
          <p>Built for the Smart India Hackathon.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-sandstone/10 text-xs text-center">
        © 2026 Nomad. All rights reserved.
      </div>
    </footer>
  );
}