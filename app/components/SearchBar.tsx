"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const OPEN_CITIES: { label: string; districtId: string }[] = [];

const COMING_SOON_CITIES = [
  "Vishakhapatnam, Andhra Pradesh",
  "Itanagar, Arunachal Pradesh",
  "Guwahati, Assam",
  "Patna, Bihar",
  "Raipur, Chhattisgarh",
  "Panaji, Goa",
  "Ahmedabad, Gujarat",
  "Gurugram, Haryana",
  "Shimla, Himachal Pradesh",
  "Ranchi, Jharkhand",
  "Bengaluru, Karnataka",
  "Kochi, Kerala",
  "Bhopal, Madhya Pradesh",
  "Mumbai, Maharashtra",
  "Imphal, Manipur",
  "Shillong, Meghalaya",
  "Aizawl, Mizoram",
  "Kohima, Nagaland",
  "Amritsar, Punjab",
  "Jaipur, Rajasthan",
  "Gangtok, Sikkim",
  "Chennai, Tamil Nadu",
  "Hyderabad, Telangana",
  "Agartala, Tripura",
  "Varanasi, Uttar Pradesh",
  "Dehradun, Uttarakhand",
  "Kolkata, West Bengal",
  "Port Blair, Andaman and Nicobar Islands",
  "Chandigarh",
  "New Delhi, Delhi",
  "Srinagar, Jammu and Kashmir",
  "Leh, Ladakh",
  "Kavaratti, Lakshadweep",
  "Puducherry",
];

export default function SearchBar({
  openCities,
}: {
  openCities: { label: string; districtId: string }[];
}) {
  const [selection, setSelection] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selection) return;

    if (selection.startsWith("id:")) {
      const districtId = selection.slice(3);
      router.push(`/districts/${districtId}/packages`);
    } else {
      router.push(`/coming-soon?place=${encodeURIComponent(selection)}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-5 md:p-6 -mt-12 relative z-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
    >
      <div className="md:col-span-2">
        <label className="block text-xs font-medium text-charcoal/60 mb-1">
          Where do you want to go?
        </label>
        <select
          value={selection}
          onChange={(e) => setSelection(e.target.value)}
          className="w-full border border-black/10 rounded-md px-3 py-2 text-sm bg-white text-charcoal"
        >
          <option value="">Select a city</option>
          <optgroup label="Open now">
            {openCities.map((c) => (
              <option key={c.districtId} value={`id:${c.districtId}`}>
                {c.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="Coming soon">
            {COMING_SOON_CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-charcoal/60 mb-1">
          Travel date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-black/10 rounded-md px-3 py-2 text-sm text-charcoal"
        />
      </div>
      <button
        type="submit"
        className="bg-gold text-ink font-medium rounded-md px-5 py-2.5 text-sm hover:bg-gold/90 transition"
      >
        Search trips
      </button>
    </form>
  );
}