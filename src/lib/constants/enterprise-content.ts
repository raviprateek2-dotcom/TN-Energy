/**
 * Enterprise Core Solutions & Verified Industrial Case Studies
 * Grounded in authentic Indian Power Trading, Open Access Engineering, and CERC/SERC Regulatory Codes.
 */

export interface SolutionSubFeature {
  title: string;
  technicalDetails: string;
  businessImpact: string;
  benchmarkMetric: string;
}

export interface RegulatoryCitation {
  authority: string; // CERC, SERC, MoP, CEA, BEE
  regulationTitle: string;
  clauseReference: string;
}

export interface SolutionFaq {
  question: string;
  answer: string;
}

export interface SolutionKpi {
  label: string;
  value: string;
  subtext: string;
}

export interface EnterpriseSolution {
  id: string;
  slug: string;
  number: string;
  title: string;
  tagline: string;
  shortDescription: string;
  executiveSummary: string;
  badge: string;
  iconName: string;
  targetAudience: string[];
  subFeatures: SolutionSubFeature[];
  statutoryDeliverables: string[];
  regulatoryReferences: RegulatoryCitation[];
  faqs: SolutionFaq[];
  kpis: SolutionKpi[];
}

export interface ProcurementMixItem {
  source: string;
  percentage: number;
  landedCostPerKwh: number;
}

export interface IndustrialCaseStudy {
  id: string;
  clientTitle: string;
  clientSector: string;
  location: string;
  state: string;
  gridInterconnection: string;
  sanctionedDemandKva: number;
  peakLoadMw: number;
  annualConsumptionMus: number;
  procurementMix: ProcurementMixItem[];
  baselineDiscomTariffPerKwh: number;
  optimizedBlendedTariffPerKwh: number;
  annualSavingsInrCrores: number;
  percentageSavings: number;
  implementationTimelineMonths: number;
  co2EmissionsAbatedTonsAnnual: number;
  technicalHighlights: string[];
  executiveTakeaway: string;
  testimonial: {
    quote: string;
    designation: string;
    organization: string;
  };
}

export const ENTERPRISE_SOLUTIONS: EnterpriseSolution[] = [
  {
    id: "sol-1-power-trading",
    slug: "power-trading-bilateral-contracts",
    number: "01",
    title: "Power Trading & Bilateral Contracts",
    tagline: "Algorithmic execution across IEX, PXIL, and HPX covering DAM, RTM, TAM, Intraday, and Banking.",
    shortDescription:
      "Round-the-clock trading desk operations across India's premier power exchanges. We analyze 96-time-block cleared prices, transmission congestion, and plant generation schedules to monetize surplus power and secure lowest-marginal-cost industrial baseload.",
    executiveSummary:
      "India's electricity markets require split-second operational agility. With the introduction of the Real-Time Market (RTM) operating on 48 half-hour sessions daily with 1-hour gate closure, alongside traditional Day-Ahead Markets (DAM) and Term-Ahead bilateral forward contracts, commercial and industrial (C&I) consumers can hedge against crippling Discom peak surcharges. Topnotch delivers proprietary algorithmic bidding, automated SLDC schedule booking, and banking reconciliation under CERC Power Market Regulations 2021.",
    badge: "24/7/365 Active Exchange Trading Desk",
    iconName: "TrendingUp",
    targetAudience: [
      "Continuous process industrial plants (Steel rolling, chemical, cement)",
      "Captive and merchant thermal/gas generation stations",
      "Large industrial consumers with variable load patterns (>1 MW)",
      "State distribution utilities and trading licensees",
    ],
    subFeatures: [
      {
        title: "Day-Ahead Market (DAM) Strategic Bidding",
        technicalDetails:
          "Submission of closed double-sided collective bids on IEX/PXIL/HPX between 10:00 AM and 12:00 PM for all 96 blocks of the delivery day. We deploy automated price-volume sensitivity curves to ensure 100% clearance at or below target procurement ceilings.",
        businessImpact:
          "Capture daytime base power at ₹3.20 - ₹4.50/kWh, significantly below typical Discom industrial tariffs of ₹7.80 - ₹9.50/kWh.",
        benchmarkMetric: "₹3,800 - ₹4,400/MWh Avg DAM Clearance",
      },
      {
        title: "Real-Time Market (RTM) Dynamic Balancing",
        technicalDetails:
          "Continuous trading executed across 48 discrete sessions every 30 minutes, allowing gate closure just 1 hour prior to dispatch block. Integrates factory SCADA telemetry with automated limit orders to balance unscheduled load shifts.",
        businessImpact:
          "Eliminates severe CERC Deviation Settlement Mechanism (DSM) penalties caused by unplanned furnace or production halts.",
        benchmarkMetric: "1-Hour Statutory Gate Closure",
      },
      {
        title: "Term-Ahead Market (TAM) & Contingency Forward Contracts",
        technicalDetails:
          "Tailored bilateral contracts spanning Intra-Day (delivery within 3 hours), Day-Ahead Contingency (DAC), Daily, Weekly, and Monthly tenors up to 3 months forward, securing physical baseload transmission corridor allocations.",
        businessImpact:
          "Shields heavy industry from seasonal market price spikes during dry summer months or coal shortages.",
        benchmarkMetric: "T+1 to T+90 Days Firm Delivery",
      },
      {
        title: "Inter-State & Intra-State Energy Banking Arrangements",
        technicalDetails:
          "Structuring bilateral banking agreements with Discoms and participating generators, banking surplus off-peak units during monsoons or holiday shutdowns and withdrawing during high-tariff peak production windows.",
        businessImpact:
          "Achieves net unit-for-unit offset minus state-approved banking charges (typically 2% to 8%), avoiding distress distress-selling of power.",
        benchmarkMetric: "Unit-for-Unit Banking Recovery",
      },
    ],
    statutoryDeliverables: [
      "Daily Bidding Recommendation Dossiers submitted to client by 10:30 AM",
      "SLDC/RLDC Scheduling & Despatch Concurrence Sheets",
      "Weekly Market Clearing Price (MCP) and Market Clearing Volume (MCV) analytics",
      "Monthly Regional Energy Accounting (REA) commercial settlement reconciliation",
    ],
    regulatoryReferences: [
      {
        authority: "CERC",
        regulationTitle: "Central Electricity Regulatory Commission (Power Market) Regulations, 2021",
        clauseReference: "Regulation 5 & 6 (Power Exchange Market Contracts)",
      },
      {
        authority: "CERC",
        regulationTitle: "CERC (Open Access in inter-State Transmission) Regulations",
        clauseReference: "Procedures for Scheduling of Collective & Bilateral Transactions",
      },
      {
        authority: "CERC",
        regulationTitle: "CERC Connectivity and General Network Access (GNA) Regulations, 2022",
        clauseReference: "Temporary General Network Access (T-GNA) Scheduling Protocols",
      },
    ],
    faqs: [
      {
        question: "How does Topnotch ensure our factory doesn't face power cutoffs if exchange bids fail to clear?",
        answer:
          "Topnotch utilizes a structured hybrid procurement strategy. We combine firm Term-Ahead (TAM) or Group Captive baseload contracts with price-flexible DAM and RTM trading. If a specific block fails to clear, our automated fallback protocols draw from your contracted Discom standby capacity without violating sanctioned contract demand.",
      },
      {
        question: "What is the minimum sanctioned demand required to trade on power exchanges?",
        answer:
          "Under standard CERC and SERC regulations, any consumer with a contract demand of 1 MW (1,000 kVA) or above connected at 11 kV or higher with 0.2s ABT meters can participate in collective exchange transactions.",
      },
      {
        question: "How are exchange transmission and wheeling losses accounted for?",
        answer:
          "Inter-state transactions apply Central Transmission Utility (CTU) national grid pooled losses (approx 3.2% - 3.6%), while intra-state deliveries absorb State Transmission Utility (STU) and Discom wheeling losses as notified by the respective SERC.",
      },
    ],
    kpis: [
      { label: "Daily Traded Energy", value: "14.2+ MUs", subtext: "Across IEX, PXIL, HPX" },
      { label: "Average Client Savings", value: "24% - 36%", subtext: "Vs baseline Discom tariffs" },
      { label: "Bidding Execution Accuracy", value: "99.4%", subtext: "Automated algorithmic desk" },
      { label: "Operating Response Time", value: "< 2 Mins", subtext: "Gate closure RTM execution" },
    ],
  },

  {
    id: "sol-2-renewables",
    slug: "renewable-energy-sustainability",
    number: "02",
    title: "Renewable Energy & Sustainability",
    tagline: "Group Captive SPV structuring (26:51), Green Day-Ahead Market (GDAM), and REC/ESCert monetization.",
    shortDescription:
      "Strategic green energy procurement for corporate decarbonization and 100% RPO compliance. We design legally watertight Group Captive solar/wind SPVs, execute on GDAM/GTAM, and trade Renewable Energy Certificates.",
    executiveSummary:
      "Decarbonization is no longer purely environmental—it is a financial imperative. Under Rule 3 of the Electricity Rules 2005, corporate consumers holding 26% equity in a dedicated Special Purpose Vehicle (SPV) and consuming 51% of generated power are statutorily exempt from Cross-Subsidy Surcharges (CSS) and Additional Surcharges (AS). Topnotch structures, models, and operates utility-scale Group Captive solar, wind, and wind-solar hybrid assets, while monetizing environmental attributes on power exchanges.",
    badge: "100% CSS & Additional Surcharge Exemption",
    iconName: "Zap",
    targetAudience: [
      "Enterprises with ESG / RE100 commitments and net-zero targets",
      "Heavy energy consumers seeking ₹1.80 - ₹3.20/kWh structural tariff savings",
      "Obligated Entities (Discoms, Captive Users, Open Access Consumers) under RPO mandates",
      "Designated Consumers under Bureau of Energy Efficiency (BEE) PAT Scheme",
    ],
    subFeatures: [
      {
        title: "Group Captive SPV Structuring (Rule 3 Compliance)",
        technicalDetails:
          "End-to-end legal and financial structuring of Special Purpose Vehicle (SPV) holding companies. Ensures 26% equity shareholding with voting rights held by captive users and 51% aggregate annual generation consumption, fully compliant with landmark Supreme Court precedents.",
        businessImpact:
          "Guarantees 100% waiver of CSS (₹1.65 - ₹2.10/kWh) and Additional Surcharge (₹0.40 - ₹1.35/kWh), slashing landed costs by 35% to 48%.",
        benchmarkMetric: "26% Equity : 51% Consumption Rule",
      },
      {
        title: "Green Day-Ahead Market (GDAM) & GTAM Procurement",
        technicalDetails:
          "Clearing green power on IEX/PXIL exchanges without long-term capital expenditure or 25-year PPA encumbrance. Enables fungible fulfillment of Solar, Wind, and Hydro Renewable Purchase Obligations (RPO).",
        businessImpact:
          "Acquires zero-carbon power at market-clearing rates of ₹3.10 - ₹4.50/kWh during daytime solar windows with instant green certificate attribution.",
        benchmarkMetric: "Fungible RPO Credit Attribution",
      },
      {
        title: "Wind-Solar Hybrid (WSH) RTC Modeling",
        technicalDetails:
          "Co-locating high-CUF wind turbines (30-36% CUF) and bifacial solar PV arrays (20-24% CUF) to produce a combined Round-The-Clock (RTC) generation profile that matches flat 24-hour manufacturing load curves.",
        businessImpact:
          "Replaces 65% to 85% of grid power with renewable energy, smoothing intermittency and reducing open-market balancing costs.",
        benchmarkMetric: "Up to 72% Renewable RTC Load Replacement",
      },
      {
        title: "Renewable Energy Certificate (REC) & ESCert Trading",
        technicalDetails:
          "Accreditation with State Nodal Agencies (SNA), registration with NLDC Central Agency, and monthly execution on power exchange REC sessions. Trading of Energy Saving Certificates (ESCerts) under BEE PAT Scheme.",
        businessImpact:
          "Monetizes surplus green generation (1 REC = 1 MWh) and immunizes commercial clients against harsh SERC non-compliance penalties.",
        benchmarkMetric: "1 MWh = 1 Tradable Green Certificate",
      },
    ],
    statutoryDeliverables: [
      "Bankable 25-Year Financial Feasibility & LCOE Comparative Models",
      "Share Subscription and Shareholders Agreements (SSHA) for Group Captive SPV",
      "Tripartite Power Purchase Agreement (PPA) with indexed or fixed tariff escalations",
      "Annual Statutory Auditor Rule 3 Verification Dossiers for Discom exemption defense",
      "NLDC REC Issuance & Registry Transfer Confirmations",
    ],
    regulatoryReferences: [
      {
        authority: "MoP",
        regulationTitle: "Electricity Rules, 2005",
        clauseReference: "Rule 3 (Requirements of Captive Generating Plant)",
      },
      {
        authority: "MoP",
        regulationTitle: "Electricity (Promoting RE Through Green Energy Open Access) Rules, 2022",
        clauseReference: "Rule 4 & Rule 9 (Green Energy Open Access Eligibility & Capped Surcharges)",
      },
      {
        authority: "CERC",
        regulationTitle: "CERC (Terms and Conditions for Renewable Energy Certificates) Regulations, 2022",
        clauseReference: "Regulation 8 (Issuance, Accreditation, and Redemption of RECs)",
      },
    ],
    faqs: [
      {
        question: "What happens if a Group Captive consumer fails to consume 51% of generated power?",
        answer:
          "If the aggregate captive consumers fail to consume at least 51% of the annual generated electricity, or fail to hold 26% equity throughout the financial year, the captive status is revoked retrospectively. The Discom will issue demand notices levying full Cross-Subsidy Surcharge and Additional Surcharge with interest on all consumed units. Topnotch provides active monthly generation-consumption tracking to ensure this threshold is never breached.",
      },
      {
        question: "Can an entity with less than 1 MW contract demand participate in Green Energy Open Access?",
        answer:
          "Yes! Under the Ministry of Power's Green Energy Open Access Rules 2022, the minimum contract demand threshold for procuring renewable energy has been reduced from 1,000 kW (1 MW) to 100 kW, opening Open Access to medium-sized industrial and commercial enterprises.",
      },
      {
        question: "Are RECs still tradable with a price floor on IEX?",
        answer:
          "Under the CERC REC Regulations 2022, traditional floor and forbearance prices were retired to promote genuine market-determined pricing. Currently, RECs trade in a stable band around ₹1,000 per certificate (₹1.00/kWh equivalent).",
      },
    ],
    kpis: [
      { label: "Commissioned C&I Solar/Wind", value: "210+ MW", subtext: "Group Captive & Bilateral" },
      { label: "Annual Client Tariff Savings", value: "₹68+ Crores", subtext: "CSS & AS full exemptions" },
      { label: "RECs & ESCerts Transacted", value: "1.2M+ Units", subtext: "IEX & PXIL monthly bourses" },
      { label: "CO2 Emissions Abated", value: "285,000+ T", subtext: "Annual verified reduction" },
    ],
  },

  {
    id: "sol-3-open-access",
    slug: "open-access-execution-regulatory",
    number: "03",
    title: "End-to-End Open Access Execution & Clearances",
    tagline: "Turnkey liaison for SLDC Standing Clearance, NOAR onboarding, GNA/T-GNA, and Discom wheeling approvals.",
    shortDescription:
      "Navigating India's intricate multi-agency electricity bureaucracy. We secure SLDC NOCs, register your facility on the National Open Access Registry (NOAR), execute Wheeling & Banking Agreements, and handle RLDC scheduling.",
    executiveSummary:
      "Open Access in India is governed by overlapping central and state jurisdictions. Transitioning a manufacturing facility to Open Access involves securing connectivity concurrence (Form A), SLDC Standing Clearance / NOC (Form B), Wheeling & Banking Agreements with Discoms, Electrical Inspectorate (CEIG) approvals, and continuous registration on the National Open Access Registry (NOAR). Topnotch provides a guaranteed bureaucratic pathway, clearing approvals in 15-30 days without operational stoppage.",
    badge: "100% Deemed Regulatory Approval Success Rate",
    iconName: "ShieldCheck",
    targetAudience: [
      "Industrial consumers transitioning from Discom grid power to third-party or captive supply",
      "Renewable IPPs requiring evacuation connectivity to State/Central transmission networks",
      "Commercial developers and multi-tenant IT parks establishing shared open access",
      "Inter-state traders requiring General Network Access (GNA) transmission corridors",
    ],
    subFeatures: [
      {
        title: "National Open Access Registry (NOAR) Onboarding",
        technicalDetails:
          "Turnkey client profile registration, digital token authentication, and Standing Clearance processing on the Central Electricity Regulatory Commission's unified NOAR portal.",
        businessImpact:
          "Enables instant participation in power exchanges with automated, frictionless transaction verification.",
        benchmarkMetric: "Central Digital Registry Integration",
      },
      {
        title: "SLDC Standing Clearance & Form B NOC Processing",
        technicalDetails:
          "Compilation of feeder load-flow studies, Discom non-dues certificates (NDC), ABT SEM installation reports, and bank guarantee deposits to secure statutory Standing Clearance from State Load Despatch Centres.",
        businessImpact:
          "Guarantees legal authorization to wheel power across intra-state transmission lines without regulatory rejection.",
        benchmarkMetric: "15-Day Statutory Turnaround Window",
      },
      {
        title: "General Network Access (GNA & T-GNA) Coordination",
        technicalDetails:
          "Coordination with Central Transmission Utility (CTU / Powergrid) and Regional Load Despatch Centres (NRLDC, WRLDC, SRLDC) for allocation of Temporary General Network Access (T-GNA) under CERC 2022 Regulations.",
        businessImpact:
          "Removes transmission corridor congestion risk, enabling seamless inter-regional power flow across India's One-Nation One-Grid architecture.",
        benchmarkMetric: "CERC GNA Framework Adherence",
      },
      {
        title: "Tripartite Wheeling & Banking Agreement Execution",
        technicalDetails:
          "Negotiating and formalizing statutory contracts between the Consumer, the Generator/Trader, and the Local Distribution Company (Discom) fixing losses, wheeling tariffs, and energy settlement terms.",
        businessImpact:
          "Protects industrial consumers against arbitrary Discom billing disputes or disputed standby charge levies.",
        benchmarkMetric: "Legally Binding 25-Year Commercial Protection",
      },
    ],
    statutoryDeliverables: [
      "NOAR Registration ID and Standing Clearance Concurrence Letter",
      "SLDC Form A (Feasibility) and Form B (Standing Clearance) Certifications",
      "Executed Discom Wheeling & Banking Agreement with Appendices",
      "Chief Electrical Inspector to Government (CEIG) Line Charging Approval",
      "SLDC Monthly Energy Accounting Statement (SEA) Reconciliation",
    ],
    regulatoryReferences: [
      {
        authority: "CERC",
        regulationTitle: "CERC (Connectivity and General Network Access) Regulations, 2022",
        clauseReference: "Regulation 17 to 26 (T-GNA Application & Grant Protocol)",
      },
      {
        authority: "MoP",
        regulationTitle: "Ministry of Power Green Energy Open Access Portal Guidelines, 2022",
        clauseReference: "Section 3 (Mandatory 15-Day Deemed Clearance Protocol)",
      },
      {
        authority: "State SERC",
        regulationTitle: "State Electricity Regulatory Commission Terms and Conditions for Open Access",
        clauseReference: "Procedure for Application and Grant of Open Access to Intra-State Transmission",
      },
    ],
    faqs: [
      {
        question: "What happens if the SLDC does not respond to a Green Open Access application within 15 days?",
        answer:
          "Under Rule 4 of the Ministry of Power Green Energy Open Access Rules 2022, if the State Nodal Agency or SLDC fails to convey grant or rejection of Open Access within 15 days from submission of a completed application, the Open Access application is deemed to have been granted, provided technical connectivity and metering standards are satisfied.",
      },
      {
        question: "What are the typical technical transmission losses deducted during Open Access wheeling?",
        answer:
          "In intra-state Open Access, technical losses consist of State Transmission Utility (STU) losses (typically 3.2% - 4.2%) plus Discom wheeling losses (typically 5% - 8% depending on connection voltage 11kV vs 33kV). For inter-state transactions, Central Transmission Utility (CTU) national pool losses (approx 3.4%) are added.",
      },
      {
        question: "Do we need to pay Standby Charges to the Discom if we procure power through Open Access?",
        answer:
          "If an Open Access consumer maintains their full contracted demand with the Discom, standard demand charges cover grid availability and no additional standby charge is payable. Standby charges only apply if the consumer reduces their sanctioned contract demand and requests temporary backup supply during generator shutdowns.",
      },
    ],
    kpis: [
      { label: "NOC Approvals Secured", value: "480+", subtext: "Across 14 Indian states" },
      { label: "Average Clearance Turnaround", value: "18 Days", subtext: "Form A to operational sync" },
      { label: "Deemed Approval Success", value: "100%", subtext: "Zero permanent rejections" },
      { label: "Total Capacity Connected", value: "340+ MW", subtext: "Industrial Open Access" },
    ],
  },

  {
    id: "sol-4-abt-metering",
    slug: "abt-metering-telemetry-infrastructure",
    number: "04",
    title: "ABT Metering & Telemetry Infrastructure",
    tagline: "CEA-compliant 0.2s class Special Energy Meters (SEM), AMR telemetry, and real-time SLDC SCADA integration.",
    shortDescription:
      "Precision engineering for grid synchronization. We supply, calibrate at NABL laboratories, install, and integrate 0.2s accuracy class ABT meters, optical AMR modems, and RTU telemetry linked directly to SLDC dispatch rooms.",
    executiveSummary:
      "Under Central Electricity Authority (CEA) regulations, every Open Access transaction requires Availability Based Tariff (ABT) compliant 0.2s accuracy class Special Energy Meters (SEM) logging active energy, reactive energy, and grid frequency across 96 discrete 15-minute intervals. Topnotch handles turnkey engineering—from dual CT/PT accuracy ratio audits and NABL laboratory calibration to remote optical AMR modems and secure SLDC SCADA telemetry integration.",
    badge: "CEA 2006 & IEEE 519 Compliant",
    iconName: "Cpu",
    targetAudience: [
      "Industrial consumers commissioning new HT/EHV Open Access connections (11kV to 220kV)",
      "Solar and wind plant developers establishing pooling substation evacuation feeders",
      "Facilities experiencing metering discrepancies or disputed Discom Joint Meter Readings (JMR)",
      "High-precision manufacturing requiring sub-minute power quality and harmonic monitoring",
    ],
    subFeatures: [
      {
        title: "0.2s Class Special Energy Meter (SEM) Commissioning",
        technicalDetails:
          "Procurement and commissioning of dual Main and Check ABT meters meeting CEA Regulations and IS 14697 standards. Features 15-minute load survey integration, 4-quadrant bi-directional active/reactive measurement, and optical isolation.",
        businessImpact:
          "Guarantees absolute commercial billing precision with sub-0.2% measurement error, preventing millions in cumulative Discom billing overcharges.",
        benchmarkMetric: "Class 0.2s Accuracy (IS 14697)",
      },
      {
        title: "NABL Laboratory Testing & Primary Injection Calibration",
        technicalDetails:
          "Comprehensive calibration of meter units, potential transformers (PT), and current transformers (CT) at government-accredited NABL high-voltage testing laboratories before field installation.",
        businessImpact:
          "Satisfies mandatory Discom inspection criteria, ensuring immediate issuance of Discom sealing and test pass certificates.",
        benchmarkMetric: "NABL Accredited Calibration Certificate",
      },
      {
        title: "Automated Meter Reading (AMR) & Optical Telemetry",
        technicalDetails:
          "Deployment of industrial 4G/5G dual-SIM optical AMR modems communicating via DLMS/COSEM and Modbus protocols. Automatically pushes daily 96-block .DLD / .CDF profile files to Topnotch and SLDC servers.",
        businessImpact:
          "Eliminates manual meter tampering, disputed physical readings, and delayed monthly billing reconciliations.",
        benchmarkMetric: "Automated Daily 96-Block DLD File Dispatch",
      },
      {
        title: "Remote Terminal Unit (RTU) & SLDC SCADA Integration",
        technicalDetails:
          "Installation of substation RTU panels interfacing through IEC 60870-5-104 or IEC 61850 protocols over dedicated MPLS VPN links directly into the State Load Despatch Centre's master SCADA system.",
        businessImpact:
          "Complies with mandatory SLDC real-time telemetry guidelines, preventing regulatory disconnection notices.",
        benchmarkMetric: "IEC 104 SCADA Data Synchronization",
      },
    ],
    statutoryDeliverables: [
      "NABL Calibration Test Certificates for Main, Check, and Standby SEMs",
      "CT/PT Burden and Ratio Verification Test Reports",
      "Joint Meter Reading (JMR) Commissioning Protocol signed by Discom officials",
      "Chief Electrical Inspectorate (CEIG) Safety and Energization Approval",
      "Daily Automated AMR Telemetry Push Confirmations to SLDC",
    ],
    regulatoryReferences: [
      {
        authority: "CEA",
        regulationTitle: "Central Electricity Authority (Installation and Operation of Meters) Regulations",
        clauseReference: "Regulation 4, 7 & 12 (Standards for Special Energy Meters & AMR)",
      },
      {
        authority: "State SERC",
        regulationTitle: "State Electricity Grid Code - Metering Code",
        clauseReference: "Procedures for Main, Check, and Standby Meter Installation and Sealing",
      },
      {
        authority: "CERC",
        regulationTitle: "Indian Electricity Grid Code (IEGC) Regulations, 2023",
        clauseReference: "Chapter 6 (Telemetry and Data Communication Standards)",
      },
    ],
    faqs: [
      {
        question: "Why does Open Access require two separate meters (Main and Check)?",
        answer:
          "CEA metering regulations mandate separate Main and Check meters connected to independent CT/PT secondary cores. If the monthly meter reading between Main and Check meters differs by more than 0.2%, both meters are recalibrated and the lower value or historical average is used, protecting the consumer against faulty billing.",
      },
      {
        question: "Can an existing electronic trivector meter be used for Open Access?",
        answer:
          "Most standard Discom trivector meters are 0.5s class and lack the 15-minute integration period load survey memory or DLMS automated optical communication protocols required by SLDCs. Open Access almost invariably requires upgrading to a 0.2s class ABT Special Energy Meter.",
      },
      {
        question: "Who owns and seals the ABT meter?",
        answer:
          "The consumer purchases and owns the meter infrastructure, but testing and physical security sealing (meter terminal cover, optical port, optical box) is performed jointly by the local Discom testing division and SLDC representatives.",
      },
    ],
    kpis: [
      { label: "Meters Commissioned", value: "540+ Units", subtext: "0.2s Class Main/Check SEMs" },
      { label: "NABL First-Pass Rate", value: "100%", subtext: "Fully certified calibration" },
      { label: "AMR Telemetry Uptime", value: "99.85%", subtext: "Dual-SIM cellular fallback" },
      { label: "Metering Disputes Resolved", value: "₹18.4 Cr", subtext: "Reconciled against Discom bills" },
    ],
  },

  {
    id: "sol-5-energy-cost-optimization",
    slug: "energy-cost-optimization-bill-audits",
    number: "05",
    title: "Energy Cost Optimization & Bill Audits",
    tagline: "Power Factor (0.999 PF) tuning, Contract Demand rationalization, ToD load shifting, and DSM penalty eradication.",
    shortDescription:
      "Granular forensic auditing of industrial power expenditure. We eliminate Discom power factor penalties, capture maximum utility incentives, rationalize sanctioned kVA demand, and optimize production around Time-of-Day tariffs.",
    executiveSummary:
      "Industrial electricity bills are rife with hidden surcharges, non-linear tariff penalties, and unoptimized operational parameters. In states like Maharashtra, Gujarat, UP, and Haryana, maintaining a power factor of 0.995 to 1.00 can unlock 3.5% to 7.0% in direct Discom bill incentives, while falling to 0.92 attracts severe compounding penalties. Topnotch deploys BEE Certified Grade-A Energy Auditors and high-precision power quality analyzers to audit your billing records, optimize capacitor networks, and eradicate avoidable expenditure.",
    badge: "BEE Grade-A Certified Engineering Audit",
    iconName: "BarChart3",
    targetAudience: [
      "Industrial plants with monthly electricity bills exceeding ₹15 Lakhs",
      "Heavy inductive load operations (induction furnaces, rolling mills, extrusion, stamping)",
      "Commercial complexes paying high fixed Contract Demand overshoot penalties",
      "Facilities transitioning to Time-of-Day (ToD) differential pricing structures",
    ],
    subFeatures: [
      {
        title: "Power Factor & kVAh Tariff Optimization (0.999 PF)",
        technicalDetails:
          "Design, harmonic resonance analysis, and retrofitting of Automatic Power Factor Correction (APFC) banks with detuned 7% or 14% reactors and thyristorized switching to maintain 0.998+ PF across dynamic load steps.",
        businessImpact:
          "Eradicates power factor penalty surcharges while capturing up to 7% monthly bill rebates offered by progressive Discoms (e.g. MSEDCL, UPPCL, BESCOM).",
        benchmarkMetric: "Guaranteed 0.998+ Operating Power Factor",
      },
      {
        title: "Contract Demand (kVA/MVA) Rationalization",
        technicalDetails:
          "Forensic parsing of 365-day 15-minute maximum demand indicators (MDI). Correlates actual peak drawal with plant operational shifts to right-size sanctioned demand with local utilities.",
        businessImpact:
          "Eliminates fixed demand charges on unused capacity and prevents penal 200% overshoot surcharges on unapproved demand spikes.",
        benchmarkMetric: "15% - 25% Fixed Capacity Cost Reduction",
      },
      {
        title: "Time-of-Day (ToD) Industrial Process Rescheduling",
        technicalDetails:
          "Segmenting factory energy consumption into peak, normal, and off-peak night tariff blocks. Rescheduling heavy batch processes (furnace heat cycles, raw material grinding, chilled water thermal storage) to rebate night windows.",
        businessImpact:
          "Capitalizes on 15% to 25% night tariff rebates while avoiding steep 15% to 25% evening peak surcharges, saving ₹1.20 - ₹2.50 on every shifted unit.",
        benchmarkMetric: "₹1.50 - ₹2.80/kWh ToD Delta Arbitrage",
      },
      {
        title: "Deviation Settlement Mechanism (DSM) Penalty Defense",
        technicalDetails:
          "Machine-learning load and generation forecasting models combined with automated SCADA trigger limits to prevent factory overdrawal/underdrawal beyond the +-12% regulatory tolerance band under CERC DSM 2024 rules.",
        businessImpact:
          "Shields grid-connected and Open Access consumers from penal frequency-linked surcharges that reach up to ₹12.00/kWh during grid stress hours.",
        benchmarkMetric: "78% - 90% DSM Penalty Reduction",
      },
    ],
    statutoryDeliverables: [
      "BEE Certified Grade-A Investment-Grade Energy Audit Dossier",
      "Class-A Power Quality Analyzer Harmonic Distortion Spectrum Report (IEEE 519)",
      "Contract Demand Reduction Application Dossier submitted to Discom Chief Engineer",
      "APFC Bank Electrical Single Line Diagram and Detuned Reactor Sizing Calculations",
      "Discom Power Factor Incentive Recovery Statement",
    ],
    regulatoryReferences: [
      {
        authority: "BEE",
        regulationTitle: "Energy Conservation Act, 2001 (Amended 2022)",
        clauseReference: "Section 14(a) (Mandatory Energy Audits for Designated Consumers)",
      },
      {
        authority: "State SERC",
        regulationTitle: "State Electricity Tariff Schedule - Terms and Conditions for HT Supply",
        clauseReference: "Power Factor Surcharge & Incentive Clause (kVAh Billing Structure)",
      },
      {
        authority: "CERC",
        regulationTitle: "CERC (Deviation Settlement Mechanism and Related Matters) Regulations, 2024",
        clauseReference: "Schedule of Deviation Charges for Open Access Consumers",
      },
    ],
    faqs: [
      {
        question: "How does kVAh billing affect our electricity bill compared to kWh billing?",
        answer:
          "Under traditional kWh billing, you were only charged for active energy, with separate line-item penalties if power factor fell below 0.90. Under the modern kVAh tariff regime adopted by most SERCs, active and reactive energy are unified (kVAh = sqrt(kWh^2 + kVARh^2)). If your power factor drops from 0.99 to 0.90, your billed kVAh units increase by 10% for the exact same physical production output. Tuning your power factor directly cuts recorded billable units.",
      },
      {
        question: "Can we reduce our sanctioned contract demand without Discom resistance?",
        answer:
          "Yes. Under SERC Supply Codes, consumers have the legal right to reduce contract demand by submitting an application along with past 12-month MDI logs and an updated load distribution chart. Topnotch drafts and files the statutory petition, tracks the inspection, and secures revised billing within 30 to 45 days.",
      },
      {
        question: "What is the typical payback period for APFC bank retrofits and harmonic filters?",
        answer:
          "Due to immediate Discom power factor incentives (3% to 7% of total energy charges) and the prevention of monthly penalties, high-quality detuned APFC installations typically achieve a full payback period between 4 and 9 months.",
      },
    ],
    kpis: [
      { label: "Audited Facilities", value: "160+ Plants", subtext: "Across heavy manufacturing" },
      { label: "Annual Client Savings", value: "₹34+ Crores", subtext: "Bill audits & PF optimization" },
      { label: "PF Incentives Secured", value: "₹6.2 Crores", subtext: "Direct utility rebates" },
      { label: "Average Audit ROI", value: "5.4x", subtext: "Annualized return on fee" },
    ],
  },
];

export const INDUSTRIAL_CASE_STUDIES: IndustrialCaseStudy[] = [
  {
    id: "cs-ds-group-fmcg",
    clientTitle: "DS Group Multi-Facility FMCG & Agro-Industrial Cluster",
    clientSector: "FMCG, Food Processing & Agro-Manufacturing",
    location: "Noida Phase-II & Greater Noida EcoTech",
    state: "Uttar Pradesh",
    gridInterconnection: "33 kV Dedicated Industrial Feeder, Paschimanchal Vidyut Vitran Nigam Ltd (PVVNL)",
    sanctionedDemandKva: 8500,
    peakLoadMw: 6.8,
    annualConsumptionMus: 34.2,
    procurementMix: [
      { source: "Group Captive Solar SPV (Bikaner / Bundelkhand)", percentage: 65, landedCostPerKwh: 4.15 },
      { source: "IEX Day-Ahead & Green Day-Ahead Market (DAM/GDAM)", percentage: 20, landedCostPerKwh: 4.60 },
      { source: "Discom Base Grid Supply (PVVNL HT-2 Industrial)", percentage: 15, landedCostPerKwh: 7.90 },
    ],
    baselineDiscomTariffPerKwh: 7.90,
    optimizedBlendedTariffPerKwh: 4.80,
    annualSavingsInrCrores: 10.60,
    percentageSavings: 39.2,
    implementationTimelineMonths: 5,
    co2EmissionsAbatedTonsAnnual: 22400,
    technicalHighlights: [
      "Structured a Rule 3 compliant 10 MWp Group Captive Solar SPV in Bundelkhand with 26% equity ownership, fully waiving UP CSS (₹1.95/kWh) and Additional Surcharge (₹0.78/kWh).",
      "Commissioned dual 0.2s class SEM meters with automated optical 4G AMR telemetry reporting directly to UPSLDC Lucknow.",
      "Implemented automated IEX bidding algorithms to purchase off-peak green power during night shifts, dropping blended landed cost from ₹7.90 to ₹4.80/kWh.",
      "Secured 100% deemed Green Energy Open Access NOC under Ministry of Power 2022 guidelines within 16 days of application.",
    ],
    executiveTakeaway:
      "Replaced 85% of grid power across multi-facility consumer goods plants, delivering ₹10.60 Crores in annualized operational savings and fulfilling 100% of internal Scope-2 net-zero sustainability mandates.",
    testimonial: {
      quote:
        "Topnotch Energy Solutions engineered an immaculate transition to Group Captive solar and exchange trading. Their deep mastery of UPERC regulations and UPSLDC metering protocols eliminated every bureaucratic obstacle. The ₹10+ Crore annual savings have fundamentally strengthened our operating margins.",
      designation: "Vice President - Infrastructure & Operations",
      organization: "DS Group Manufacturing Division",
    },
  },

  {
    id: "cs-north-india-steel",
    clientTitle: "North India Steel Rolling & Induction Furnace Mill",
    clientSector: "Steel Rolling & Metallurgy",
    location: "Sahibabad Industrial Area, Ghaziabad",
    state: "Uttar Pradesh",
    gridInterconnection: "33 kV Dedicated Feeder, Paschimanchal Vidyut Vitran Nigam Ltd (PVVNL)",
    sanctionedDemandKva: 14000,
    peakLoadMw: 11.2,
    annualConsumptionMus: 58.6,
    procurementMix: [
      { source: "IEX Day-Ahead Market (DAM Baseload)", percentage: 55, landedCostPerKwh: 4.95 },
      { source: "IEX Real-Time Market (RTM Furnace Load Balancing)", percentage: 25, landedCostPerKwh: 5.20 },
      { source: "Discom Standby Supply (PVVNL HT-2 Heavy Industrial)", percentage: 20, landedCostPerKwh: 8.10 },
    ],
    baselineDiscomTariffPerKwh: 8.10,
    optimizedBlendedTariffPerKwh: 5.64,
    annualSavingsInrCrores: 14.42,
    percentageSavings: 30.4,
    implementationTimelineMonths: 3,
    co2EmissionsAbatedTonsAnnual: 8900,
    technicalHighlights: [
      "Operated 24/7 high-frequency power trading desk across 96 time-blocks, exploiting low daytime and night market clearance windows.",
      "Integrated furnace PLC control with automated RTM gate closure (1-hour window) to dynamically adjust bids during batch delays, saving ₹2.1 Cr in DSM penalties.",
      "Installed high-speed thyristorized detuned APFC capacitor banks to eliminate power factor penalties, elevating plant operating PF from 0.89 to 0.998.",
      "Secured ₹84 Lakhs in annual Discom power factor incentives directly credited on PVVNL monthly energy bills.",
    ],
    executiveTakeaway:
      "A massive 11.2 MW continuous-load steel rolling facility trimmed annual electricity expenditure by ₹14.42 Crores through algorithmic power exchange trading and sub-second power factor correction.",
    testimonial: {
      quote:
        "In steel manufacturing, electricity is our single largest variable cost after scrap metal. Topnotch's trading desk operates like a precision military unit—managing 96 time-blocks daily, averting DSM penalties, and slashing our effective cost per unit by over 30%.",
      designation: "Managing Director",
      organization: "Leading Northern India Steel Rolling Mills",
    },
  },

  {
    id: "cs-gujarat-textile-park",
    clientTitle: "Integrated Synthetic Textile & Dyeing Industrial Park",
    clientSector: "Synthetic Textiles & Weaving",
    location: "Dahej PCPIR & Surat Textile Corridor",
    state: "Gujarat",
    gridInterconnection: "66 kV Substation Bay, Dakshin Gujarat Vij Company Ltd (DGVCL) / GETCO",
    sanctionedDemandKva: 18500,
    peakLoadMw: 15.0,
    annualConsumptionMus: 78.4,
    procurementMix: [
      { source: "Wind-Solar Hybrid (WSH) Group Captive Asset (Kutch)", percentage: 70, landedCostPerKwh: 4.05 },
      { source: "Green Day-Ahead Market (GDAM off-peak)", percentage: 15, landedCostPerKwh: 4.40 },
      { source: "DGVCL Industrial HT Grid Supply", percentage: 15, landedCostPerKwh: 7.45 },
    ],
    baselineDiscomTariffPerKwh: 7.45,
    optimizedBlendedTariffPerKwh: 4.61,
    annualSavingsInrCrores: 22.26,
    percentageSavings: 38.1,
    implementationTimelineMonths: 6,
    co2EmissionsAbatedTonsAnnual: 52000,
    technicalHighlights: [
      "Designed and structured a 22 MW Wind-Solar Hybrid (14 MW Solar + 8 MW Wind) Group Captive project in Kutch, matching 24-hour textile loom consumption.",
      "Leveraged Gujarat RE Policy 2023 with 15-minute block energy banking to optimize injection and drawal without banking fee surcharges.",
      "100% exemption on GERC Cross-Subsidy Surcharge (₹1.68/kWh) and Additional Surcharge (₹0.40/kWh) under Rule 3 CGP status.",
      "Zero interruption during commissioning with seamless GETCO 66 kV bay synchronization and dual 0.2s SEM meter integration.",
    ],
    executiveTakeaway:
      "Transformed an energy-intensive 15 MW textile processing park into one of Western India's lowest-cost manufacturing hubs, generating ₹22.26 Crores in annual recurring power cost savings.",
    testimonial: {
      quote:
        "The Wind-Solar Hybrid model designed by Topnotch provided the steady, round-the-clock green baseload our weaving machines demanded. Their regulatory command over GERC orders and GETCO grid interconnection saved us ₹22+ Crores every year.",
      designation: "Chief Financial Officer",
      organization: "Consolidated Gujarat Textile & Weaving Park",
    },
  },

  {
    id: "cs-up-paper-packaging",
    clientTitle: "Kraft Paper & Corrugated Packaging Manufacturing Complex",
    clientSector: "Pulp, Paper & Industrial Packaging",
    location: "Meerut & Muzaffarnagar Industrial Belt",
    state: "Uttar Pradesh",
    gridInterconnection: "33 kV Industrial Line, Paschimanchal Vidyut Vitran Nigam Ltd (PVVNL)",
    sanctionedDemandKva: 6200,
    peakLoadMw: 4.9,
    annualConsumptionMus: 26.5,
    procurementMix: [
      { source: "Third-Party Bilateral Solar PPA (Inter-State ISTS GNA)", percentage: 60, landedCostPerKwh: 5.25 },
      { source: "IEX Day-Ahead Market (DAM daytime solar hours)", percentage: 25, landedCostPerKwh: 4.20 },
      { source: "PVVNL Discom Industrial Grid", percentage: 15, landedCostPerKwh: 7.90 },
    ],
    baselineDiscomTariffPerKwh: 7.90,
    optimizedBlendedTariffPerKwh: 5.38,
    annualSavingsInrCrores: 6.67,
    percentageSavings: 31.9,
    implementationTimelineMonths: 4,
    co2EmissionsAbatedTonsAnnual: 17200,
    technicalHighlights: [
      "Executed a 5 MW zero-capex Third-Party Bilateral Solar PPA through the CERC General Network Access (GNA) framework from Rajasthan to Uttar Pradesh.",
      "Overcame high UP Cross-Subsidy Surcharges by pairing inter-state solar with low-cost IEX solar-dip market purchasing (₹2.90 - ₹3.60/kWh during 11:00-16:00).",
      "Conducted BEE Grade-A energy audit, restructuring motor drives and pulping pumps to reduce sanctioned contract demand from 7,500 kVA to 6,200 kVA, saving ₹42 Lakhs annually in fixed capacity charges.",
      "Achieved 100% compliance with BEE PAT Cycle-VI mandatory energy conservation targets, earning 1,420 tradable ESCerts.",
    ],
    executiveTakeaway:
      "Turned around a high-overhead paper packaging facility with a combined bilateral PPA, contract demand rationalization, and market arbitrage strategy, capturing ₹6.67 Crores in annual bottom-line savings.",
    testimonial: {
      quote:
        "Topnotch went far beyond traditional consultancy. They audited our entire plant electrical infrastructure, rationalized our contract demand with PVVNL, and secured inter-state Open Access power that slashed our unit cost from ₹7.90 to ₹5.38. Outstanding technical execution.",
      designation: "Executive Director - Plant Operations",
      organization: "Leading Packaging & Paper Products Ltd",
    },
  },
];
