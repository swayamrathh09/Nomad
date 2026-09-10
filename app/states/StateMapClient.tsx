"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import IndiaMap from "react-svgmap-india";

const STATE_NAMES: Record<string, string> = {
  AN: "Andaman and Nicobar Islands", AP: "Andhra Pradesh", AR: "Arunachal Pradesh",
  AS: "Assam", BR: "Bihar", CH: "Chandigarh", CT: "Chhattisgarh",
  DD: "Dadra and Nagar Haveli and Daman and Diu", DL: "Delhi", GA: "Goa",
  GJ: "Gujarat", HP: "Himachal Pradesh", HR: "Haryana", JH: "Jharkhand",
  JK: "Jammu and Kashmir", KA: "Karnataka", KL: "Kerala", LA: "Ladakh",
  LD: "Lakshadweep", MH: "Maharashtra", ML: "Meghalaya", MN: "Manipur",
  MP: "Madhya Pradesh", MZ: "Mizoram", NL: "Nagaland", OR: "Odisha",
  PB: "Punjab", PY: "Puducherry", RJ: "Rajasthan", SK: "Sikkim",
  TG: "Telangana", TN: "Tamil Nadu", TR: "Tripura", UP: "Uttar Pradesh",
  UT: "Uttarakhand", WB: "West Bengal",
};

export default function StateMapClient() {
  const router = useRouter();
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleStateSelect(stateCode: string) {
    if (stateCode === "OR") {
      router.push("/districts");
      return;
    }
    const fullName = STATE_NAMES[stateCode] || stateCode;
    router.push(`/coming-soon?place=${encodeURIComponent(fullName)}`);
  }

  function extractCode(el: Element | null): string | null {
    let node: Element | null = el;
    for (let i = 0; i < 5 && node; i++) {
      const title = node.getAttribute?.("title");
      const id = node.id;
      if (title && STATE_NAMES[title.toUpperCase()]) return title.toUpperCase();
      if (id && STATE_NAMES[id.toUpperCase()]) return id.toUpperCase();
      if (title && Object.values(STATE_NAMES).includes(title)) return title;
      node = node.parentElement;
    }
    return null;
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as Element;
    if (target.tagName.toLowerCase() !== "path") {
      setTooltip(null);
      return;
    }
    const code = extractCode(target);
    if (!code) {
      setTooltip(null);
      return;
    }
    const name = STATE_NAMES[code] || code;
    const rect = containerRef.current?.getBoundingClientRect();
    setTooltip({
      name,
      x: e.clientX - (rect?.left ?? 0),
      y: e.clientY - (rect?.top ?? 0),
    });
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTooltip(null)}
    >
      <IndiaMap
        onClick={handleStateSelect}
        size="100%"
        mapColor="#EFE6D3"
        strokeColor="#241C16"
        hoverColor="#E8791A"
      />
      {tooltip && (
        <div
          className="absolute pointer-events-none bg-ink text-sandstone text-xs font-medium px-2.5 py-1 rounded-md shadow-lg z-10 -translate-x-1/2 translate-y-[130%]"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.name}
        </div>
      )}
    </div>
  );
}