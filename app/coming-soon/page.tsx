import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const dynamic = "force-dynamic";

export default async function ComingSoonPage({
  searchParams,
}: {
  searchParams: Promise<{ place?: string }>;
}) {
  const { place } = await searchParams;

  return (
    <>
      <Header />
      <main className="flex min-h-[70vh] items-center justify-center bg-white px-4">
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
            {place || "This destination"}
          </h1>
          <p className="text-charcoal/60">
            We&apos;re expanding here soon. Right now, Nomad only covers select
            destinations in Odisha.
          </p>
          <Link
            href="/states"
            className="inline-block bg-ink text-sandstone rounded-md px-5 py-2.5 font-medium hover:bg-ink/90 transition"
          >
            Back to map
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}