import Link from "next/link";

export default function IndiaFlagIntro() {
  return (
    <Link
      href="/states"
      className="inline-block bg-gold text-ink font-medium px-8 py-3.5 rounded-md hover:bg-gold/90 transition text-lg"
    >
      Explore India
    </Link>
  );
}