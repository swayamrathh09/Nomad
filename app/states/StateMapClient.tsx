"use client";

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

  function handleStateSelect(stateCode: string) {
    if (stateCode === "OR") {
      router.push("/districts");
      return;
    }
    const fullName = STATE_NAMES[stateCode] || stateCode;
    router.push(`/coming-soon?place=${encodeURIComponent(fullName)}`);
  }

  return (
    <IndiaMap
      onClick={handleStateSelect}
      size="100%"
      mapColor="#EFE6D3"
      strokeColor="#241C16"
      hoverColor="#E8791A"
    />
  );
}