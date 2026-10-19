# Topnotch Energy Solutions — Enterprise B2B Power Trading & Clean Energy Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.5-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0_Strict-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-000000?style=flat&logo=vercel)](https://turbo.build/pack)
[![Tests](https://img.shields.io/badge/Tests-46%2F46_Passing-10B981?style=flat&logo=node.js)](https://nodejs.org/)
[![CERC Accredited](https://img.shields.io/badge/CERC-Category--IV_Advisory-06B6D4?style=flat)](https://www.cercind.gov.in/)
[![NOAR](https://img.shields.io/badge/NOAR-Registered_Institutional_Consultant-F59E0B?style=flat)](https://noar.in/)
[![CEA Metering](https://img.shields.io/badge/CEA_Metering-Class_0.2s_SEM-8B5CF6?style=flat)](https://cea.nic.in/)

> Official enterprise web portal, 96-time-block trading intelligence engine, and client control room for **Topnotch Energy Solutions** ([energysolutions.co.in](https://energysolutions.co.in)).

---

## Executive Overview

**Topnotch Energy Solutions** is India's premier B2B power trading advisory, Group Captive Open Access consultant, and industrial rooftop solar decarbonization platform. Headquartered in Ghaziabad, Uttar Pradesh, Topnotch structures and manages high-tension (HT) power procurement portfolios for Commercial & Industrial (C&I) manufacturing plants, textile mills, chemical complexes, and data centers across 14 industrial states.

### Core Value Propositions
- **18%–42% Industrial Electricity Tariff Reductions:** Optimizing baseload and peak drawl away from expensive DISCOM tariffs (₹7.50–₹10.50/kWh) towards low-cost Group Captive solar/wind (₹3.80–₹4.20/kWh) and Day-Ahead / Real-Time exchange clearing.
- **Section 42 Group Captive Structuring (26:51 Rule):** Complete statutory exemption from Cross-Subsidy Surcharge (CSS) and Additional Surcharge (AS) under Rule 3 of the Electricity Rules 2005.
- **24×7 NOC Power Trading Floor:** Algorithmic bidding and automated scheduling across the **Indian Energy Exchange (IEX)**, **Power Exchange India Limited (PXIL)**, and **Hindustan Power Exchange (HPX)** for DAM, GDAM, and RTM bourses.
- **CEA Class 0.2s ABT Metering & Real-Time Telemetry:** Turnkey Special Energy Meter (SEM) hardware deployment, NABL calibration, and optical AMR push to State Load Despatch Centers (SLDC) for automated deviation settlement (DSM 2024 compliance).

---

## Platform Architecture & Features

### 1. Unified Solar Rooftop + Open Access + Exchange Simulator (`/tools/open-access-calculator`)
The industry's most comprehensive financial simulator modeling onsite solar, offsite open access, and power exchange trading either individually or as an integrated hybrid portfolio:
- **Step 1 — Plant Grid Profile:** State & DISCOM selector auto-loading SERC industrial tariffs, CSS, Additional Surcharge, wheeling charges, and STU transmission losses; voltage selection (`11 kV`, `33 kV`, `66 kV`, `132 kV+`); contract demand (`100 kVA` to `50 MVA`).
- **Step 2 — Onsite Solar & Financing:** Shed/RCC roof area input with auto-capacity sizing ($100\text{ sq. ft.} \approx 1\text{ kWp}$ rule); financial model selector:
  - `CAPEX (Own Asset + 40% Year-1 Accelerated Depreciation Tax Benefit)`
  - `OPEX / RESCO (Zero-Capex PPA at ₹1.55/kWh LCOE benchmark)`
  - `Offsite Only (100% Group Captive / Exchange)`
- **Step 3 — Offsite Strategy & BESS Storage:** Short-Term IEX DAM/GDAM/RTM, Group Captive Solar/Wind-Solar Hybrid PPA (26% equity, 0 CSS/AS), Third-Party Bilateral PPA, and 4-Hour Battery Energy Storage (BESS) for evening peak shaving (Slots 73–92).
- **Live CFO Financial & ESG Dashboard:**
  - Blended energy supply mix donut & stack breakdown (% Rooftop, % Group Captive/IEX, % Baseline DISCOM).
  - Landed cost waterfall chart itemizing generation, STU losses, wheeling, CSS, AS, and SLDC fees.
  - CFO metrics: Net savings per unit (₹/kWh), monthly savings (₹ Lakhs), annual savings (₹ Crores), 25-year cumulative savings (₹ Crores), Project IRR (%), payback period (years), and Year-1 40% AD tax shield.
  - ESG impact: Scope 2 $\text{CO}_2$ emissions abated ($\text{tCO}_2\text{e/year}$ calculated at CEA benchmark $0.716\text{ kg CO}_2\text{/kWh}$), equivalent mature trees planted, and RE100 / BRSR / EU CBAM compliance tracking.
- **Roof-to-Boardroom 1-Tap Term Sheet Generator:** Instant generation of pre-populated WhatsApp API payloads and bankable PDF feasibility proposals routing directly to Topnotch's 24×7 bidding desk (`+91 7408318214`).

### 2. Market Intelligence & 96-Time-Block Live Analytics (`/market-intelligence`)
- **96-Block High-Resolution Price Curve:** Interactive Recharts visualizer displaying Day-Ahead Market (DAM), Green Day-Ahead Market (GDAM), and Real-Time Market (RTM) Market Clearing Prices (MCP) across all 96 fifteen-minute time slots (00:00 to 24:00).
- **CERC Statutory Ceiling Enforcement:** Strict adherence to CERC's ₹10,000/MWh statutory price ceiling with evening peak identification (Slots 73–92: 18:00–23:00 IST).
- **Responsive State Open Access & Tariff Surcharge Matrix:** Dual-view table for desktop monitors and collapsible card deck for mobile devices, detailing SERC FY 2024–25 orders across 9 industrial states (UP, MH, GJ, TN, KA, RJ, MP, AP, HR).

### 3. Client Trading Portal & Real-Time Telemetry (`/portal`)
- **`/portal/dashboard`:** Executive portfolio command hub displaying active contracted capacity, blended landed tariff, monthly MWh volume, and exchange clearing status.
- **`/portal/bidding-console`:** 96-block bidding console with market segment selector, buy/sell order placement, and live positions ledger.
- **`/portal/telemetry`:** Real-time demand curve (MW) vs frequency (Hz) with CERC DSM 2024 penalty boundary lines (49.90–50.05 Hz), active block scrubber, SEM 0.2s hardware health, and optical AMR sync status.
- **`/portal/savings-dashboard`:** 12-month historical cost & savings waterfall chart (Recharts ComposedChart), monthly blended tariff tracker, audited reconciliation table, and 1-click CSV export.
- **`/portal/documents`:** Secure document vault with dynamic CSV schedule downloads, Special Energy Meter (SEM) raw data feeds, and regulatory filing archives.

### 4. Interactive Live Energy Flow Topology (`src/components/market/LiveEnergyFlowTopology.tsx`)
- Animated SVG vector pipelines utilizing native `<animateMotion>` particle beams to illustrate physical power convergence from Onsite Solar, Group Captive Hybrid Farms, IEX Exchange Bourses, and BESS Battery Storage directly into the plant's 33 kV substation.
- Interactive toggle controls allowing plant heads to test simulated outages and see real-time impact on blended tariffs.

---

## Technical Stack & Quality Standards

| Layer | Technologies & Tools |
| :--- | :--- |
| **Framework** | Next.js 16.5.0-canary.17 (App Router, Turbopack, Partial Prefetching, Cache Components) |
| **Runtime & Language** | Node.js 24+, React 19.3.1, TypeScript 5.0 Strict (**0 `any` types**) |
| **Styling & Design System** | Tailwind CSS with CSS Variables cascade, JetBrains Mono & Inter typography, Lucide Icons |
| **Visualizations** | Recharts 2.15 (Responsive, custom tabular-nums tooltips, high-contrast dark palette) |
| **Accessibility & Themes** | Tri-mode theme switcher (`Control-Room Dark`, `Crisp Slate Light`, `Outdoor Sunlight High-Contrast`), font scaler (`A- / A / A+`) |
| **Security & Rate Limiting** | Sliding window in-memory rate limiter (`src/lib/rate-limit.ts`), Zod input validation & HTML sanitization |
| **SEO & Schema.org** | JSON-LD Structured Data (`Organization`, `Service`, `FinancialProduct`), OpenGraph & Twitter Cards, Canonical URL tags |
| **PWA & Mobile Ergonomics** | Standalone web app manifest (`manifest.json`), 5-tab sticky bottom navigation bar with thumb-zone safety padding |
| **Testing** | Automated Node.js native test runner (`node --experimental-strip-types --test tests/*.test.ts`) |

---

## Project Structure

```
topnotch-energy/
├── public/
│   ├── manifest.json                  # PWA Web App Manifest
│   └── icons/                         # Brand and PWA icons
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── about/page.tsx         # Corporate profile, timeline & credentials
│   │   │   ├── case-studies/page.tsx  # Industrial client savings case studies
│   │   │   ├── contact/page.tsx       # B2B Lead form & 24x7 desk escalation
│   │   │   ├── market-intelligence/   # 96-block price curve & state matrix
│   │   │   ├── statutory-compliance/  # Indian electricity regulations repository
│   │   │   ├── solutions/[slug]/      # 5 Dedicated enterprise solutions pages
│   │   │   └── tools/open-access-calculator/ # Unified Simulator page
│   │   ├── (portal)/
│   │   │   ├── portal/dashboard/      # Client portfolio overview
│   │   │   ├── portal/bidding-console/# 96-block bourses order ledger
│   │   │   ├── portal/documents/      # Document vault & file downloads
│   │   │   ├── portal/savings-dashboard/ # 12-month billing reconciliation
│   │   │   └── portal/telemetry/      # Real-time frequency vs demand curve
│   │   ├── api/
│   │   │   ├── calculator/route.ts    # Open Access economics calculation engine
│   │   │   ├── leads/route.ts         # Zod validated & rate-limited lead ingestion
│   │   │   └── market-rates/route.ts  # 96-block seed API feed with query filters
│   │   ├── globals.css                # Cascade rules, high-contrast & print styles
│   │   └── layout.tsx                 # Root layout with JSON-LD, SEO & accessibility
│   ├── components/
│   │   ├── calculators/
│   │   │   ├── BillAuditDropzone.tsx  # Discom bill analyzer & auto-populator
│   │   │   └── OpenAccessSimulator.tsx# Enterprise hybrid simulator
│   │   ├── layout/
│   │   │   ├── AccessibilityToolbar.tsx # Font scaler & tri-mode theme toggle
│   │   │   ├── CommandPalette.tsx     # Global Cmd+K / Ctrl+K fast navigator
│   │   │   ├── Header.tsx             # MegaMenu desktop navigation
│   │   │   ├── Footer.tsx             # Enterprise footer with credentials
│   │   │   ├── LiveTickerBar.tsx      # Real-time IEX DAM/GDAM ticker
│   │   │   ├── MobileBottomNav.tsx    # 5-tab thumb-zone mobile navigation
│   │   │   └── WhatsAppFloatingDesk.tsx # 24x7 floating dispatch trigger
│   │   └── market/
│   │       ├── Iex96BlockChart.tsx    # 96-time-block Recharts visualization
│   │       ├── LiveEnergyFlowTopology.tsx # Animated SVG energy pipelines
│   │       └── StateTariffMatrix.tsx  # Dual table / mobile card state matrix
│   └── lib/
│       ├── constants/
│       │   ├── brand.ts               # Canonical brand data & registered contacts
│       │   ├── indian-states-oa-data.ts # SERC FY 2024-25 tariff & surcharge tables
│       │   └── market-blocks-seed.ts  # 96-time-block authentic market dataset
│       └── rate-limit.ts              # In-memory sliding window rate limiter
└── tests/
    ├── brand-governance.test.ts       # Brand integrity & accreditation assertions
    ├── domain-market-blocks.test.ts   # 96-block math & CERC price ceiling tests
    ├── domain-states-oa.test.ts       # State tariffs & Section 42 exemption tests
    └── integration-http.test.ts       # End-to-end HTTP route & API test suite
```

---

## Getting Started

### Prerequisites
- **Node.js**: `v20.x` or `v24.x` (recommended)
- **Package Manager**: `npm` (v10+)

### Installation
```bash
# Clone the repository
git clone https://github.com/raviprateek2-dotcom/TN-Energy.git
cd TN-Energy

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Automated Testing
Run the complete unit, domain, and end-to-end HTTP integration test suite:
```bash
npm test
```
*Executes all 4 test suites (46 tests) with zero external test runners using Node's built-in `--test` and `--experimental-strip-types` engine.*

### Production Build
```bash
npm run build
npm run start
```
*Compiles with Turbopack, verifies strict TypeScript typing, and prerenders all 24 routes as static HTML pages in under 3 seconds.*

---

## Regulatory References & Statutory Disclosures

Topnotch Energy Solutions operates in strict conformance with Indian electricity statutory frameworks:
1. **The Electricity Act, 2003:** Section 9 (Captive Generating Plants) and Section 42 (Open Access Surcharge exemptions).
2. **Electricity Rules, 2005 (Rule 3):** Requirement of 26% equity ownership and 51% captive power consumption for Group Captive SPVs.
3. **Ministry of Power Green Energy Open Access (GEOA) Rules, 2022:** Lowering open access eligibility threshold from 1 MW to 100 kW for green energy.
4. **CERC (Deviation Settlement Mechanism and Related Matters) Regulations, 2024:** Balancing grid frequency within the statutory 49.90 Hz – 50.05 Hz operational band.
5. **Central Electricity Authority (CEA) Technical Standards for Connectivity:** Installation of Class 0.2s accuracy Special Energy Meters (SEM).

---

## Corporate Governance & Contact

**Topnotch Energy Solutions Private Limited**  
- **Registered Headquarters:** UG-5, First Floor, Parsvnath Regalia, G.T. Road, Sahibabad, Ghaziabad, Uttar Pradesh 201005, India  
- **24×7 NOC Trading Floor:** `+91 7408318214`  
- **Executive Operations:** `+91 9560085673`  
- **Corporate Enquiries:** `info@topnotchenergy.in`  
- **Official Web Portal:** [https://energysolutions.co.in](https://energysolutions.co.in)  
- **Accreditation:** CERC Category-IV Advisory \| National Open Access Registry (NOAR) Institutional Consultant \| BEE Grade-A Certified Energy Auditor
