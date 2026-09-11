# Nomad — Plan Real Trips Across India

Nomad is a trip-planning and booking platform built for the Smart India Hackathon, focused on surfacing India's district-level tourism hubs — the places most travel apps skip in favor of the same five famous cities. The MVP is live for 5 districts in Odisha (Puri, Bhubaneswar, Cuttack, Berhampur, Koraput), architected to scale statewide and nationwide.

**Live site:** https://team-nomad.vercel.app

## The Problem

Most travel platforms concentrate exclusively on a handful of famous destinations (e.g., Puri and Konark in Odisha), leaving dozens of equally rich district hub cities undiscovered and unbooked. Nomad plans and books real, itemized-cost itineraries into these overlooked places.

## Features

- **Interactive India map** — real state boundaries, click any state to explore
- **Guest browsing, gated booking** — anyone can browse destinations and packages without an account; login is required only when starting an actual booking
- **Tiered packages** — Budget / Standard / Premium itineraries per district, each with a real day-by-day plan
- **Transparent, itemized pricing** — hotel, entries & activities, and local transport are broken out separately, not bundled into one opaque number
- **Editable itineraries** — remove a stop from a booked trip and the price recalculates live
- **Real road-distance routing** — pickup point (with location autocomplete) to every stop and back, calculated via live routing, not a flat estimate
- **Traveler & room-based pricing** — room count auto-calculates from traveler count, vehicle type (Sedan/SUV) affects per-km driver cost
- **End-to-end booking flow** — package selection → trip details → itinerary review/edit → payment → confirmation

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Backend:** Next.js Server Actions
- **Database:** PostgreSQL (Supabase), via Prisma ORM 7 with the `@prisma/adapter-pg` driver adapter
- **Auth:** Supabase Auth (email/password)
- **Map:** `react-svgmap-india`
- **Geocoding:** Photon (location autocomplete)
- **Routing:** OSRM (real road-distance calculation)
- **Deployment:** Vercel, connected to GitHub for continuous deployment

## Data Model

`State` → `District` → `Stop` → `Package` → `PackageStop` (join), plus `User` and `Booking` → `BookingStop`. Only Odisha and its 5 launch districts are marked selectable; every other state/district is visible but flagged "coming soon," so expansion is a data task, not an engineering one.

## Getting Started Locally

```bash
git clone https://github.com/swayamrathh09/Nomad.git
cd Nomad
npm install --legacy-peer-deps
```

Create a `.env` file with:
```
DATABASE_URL="your-supabase-session-mode-connection-string"
DATABASE_POOL_URL="your-supabase-transaction-mode-connection-string"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your-supabase-publishable-key"
```

```bash
npx prisma migrate dev
npx prisma db seed
npm run dev
```

## Roadmap

- Expand from 5 to all 30 Odisha districts
- Real payment integration (Razorpay)
- Confirmation emails
- Custom (build-your-own) itinerary builder
- Real train/flight fare integration for onward travel