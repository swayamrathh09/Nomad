"use client";

import { useState, useRef, useEffect } from "react";

type Suggestion = {
  label: string;
  lat: number;
  lng: number;
};

export default function LocationAutocomplete({
  name,
  latName,
  lngName,
  required,
}: {
  name: string;
  latName: string;
  lngName: string;
  required?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleChange(value: string) {
    setQuery(value);
    setSelectedCoords(null);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(value)}&limit=6&lang=en&bbox=68,6,98,38`
        );
        const data = await res.json();
        const results: Suggestion[] = (data.features || []).map((f: any) => {
          const p = f.properties;
          const parts = [p.name, p.city, p.state, p.country].filter(Boolean);
          const [lng, lat] = f.geometry.coordinates;
          return { label: Array.from(new Set(parts)).join(", "), lat, lng };
        });
        setSuggestions(results);
        setOpen(true);
      } catch {
        setSuggestions([]);
      }
    }, 300);
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        required={required}
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        autoComplete="off"
        className="w-full border border-black/10 rounded-md px-3 py-2"
      />
      <input type="hidden" name={name} value={query} />
      <input type="hidden" name={latName} value={selectedCoords?.lat ?? ""} />
      <input type="hidden" name={lngName} value={selectedCoords?.lng ?? ""} />

      {open && suggestions.length > 0 && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-black/10 rounded-md shadow-lg max-h-56 overflow-y-auto">
          {suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setQuery(s.label);
                setSelectedCoords({ lat: s.lat, lng: s.lng });
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-[#F5F1E8] transition"
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}