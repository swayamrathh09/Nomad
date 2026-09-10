import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import StateMapClient from "@/app/states/StateMapClient";

export const dynamic = "force-dynamic";

export default function StatesPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-ink text-sandstone">
        <div className="absolute inset-0 opacity-15 grid grid-cols-3">
          <div className="relative">
            <Image src="/images/regions/odisha.jpg" alt="" fill className="object-cover" />
          </div>
          <div className="relative">
            <Image src="/images/regions/rajasthan.jpg" alt="" fill className="object-cover" />
          </div>
          <div className="relative">
            <Image src="/images/regions/kerala.jpg" alt="" fill className="object-cover" />
          </div>
        </div>
        <div className="absolute inset-0 bg-ink/85" />

        <div className="relative max-w-md mx-auto px-4 py-14">
          <p className="text-gold text-sm font-medium text-center mb-2">
            36 states and union territories
          </p>
          <h1
            className="text-3xl text-center mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Choose a state to explore
          </h1>
          <StateMapClient />
          <p className="text-center text-sandstone/50 text-sm mt-6">
            Odisha is live now — every other state is coming soon.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}