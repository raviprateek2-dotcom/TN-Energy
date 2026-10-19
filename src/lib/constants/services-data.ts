export interface ServiceFeature {
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: "Trading" | "Open Access" | "Regulatory" | "Analytics" | "Sustainability";
  iconName: string;
  badge: string;
  features: ServiceFeature[];
  regulationsGoverning: string[];
  deliverables: string[];
  stats: {
    label: string;
    value: string;
  }[];
  processSteps: {
    step: number;
    title: string;
    description: string;
  }[];
}

export const SERVICES_DATA: ServiceDetail[] = [
  {
    slug: "power-exchange-trading",
    title: "Power Exchange Trading & Portfolio Optimization",
    shortDescription:
      "24/7 strategic bidding across IEX, PXIL, and HPX covering DAM, GDAM, RTM, and TAM with automated price clearing algorithms.",
    fullDescription:
      "Topnotch Energy Solutions provides round-the-clock trading desk operations across India's premier power bourses—Indian Energy Exchange (IEX), Power Exchange India Limited (PXIL), and Hindustan Power Exchange (HPX). We analyze 96 time-block generation-load patterns, transmission congestion forecasts, and market clearing prices (MCP) to minimize peak tariff exposure and monetize surplus captive power.",
    category: "Trading",
    iconName: "TrendingUp",
    badge: "IEX / PXIL / HPX Active Desk",
    features: [
      {
        title: "Day-Ahead Market (DAM) & GDAM",
        description:
          "Daily bidding by 12:00 PM for all 96 time-blocks of the delivery day. We match marginal clearing prices to optimize base-load and peak power costs.",
        metric: "₹3.80 - ₹4.50",
        metricLabel: "Avg Off-Peak MCP (₹/kWh)",
      },
      {
        title: "Real-Time Market (RTM) Optimization",
        description:
          "Continuous gate closure 1 hour prior to delivery (48 half-hour sessions daily). Mitigate unscheduled factory load swings and avoid severe DSM penalties.",
        metric: "1 Hour",
        metricLabel: "Gate Closure Agility",
      },
      {
        title: "Green Day-Ahead Market (GDAM)",
        description:
          "Procure certified green energy without long-term PPA lock-in to fulfill Renewable Purchase Obligations (RPO) and claim Scope-2 zero-emission attributes.",
        metric: "100%",
        metricLabel: "RPO Fungible",
      },
      {
        title: "Term-Ahead Market (TAM) & GTAM",
        description:
          "Tailored contracts spanning Intra-Day, Day-Ahead Contingency, Daily, Weekly, and Monthly forward contracts for firm industrial baseload assurance.",
        metric: "T+1 to T+90",
        metricLabel: "Delivery Tenors",
      },
    ],
    regulationsGoverning: [
      "CERC (Power Market) Regulations, 2021",
      "CERC (Open Access in inter-State Transmission) Regulations",
      "Central Electricity Regulatory Commission Connectivity & General Network Access (GNA) Regulations, 2022",
    ],
    deliverables: [
      "Daily Bid Recommendation Reports by 10:30 AM",
      "SLDC/RLDC Scheduling Confirmation Statements",
      "Weekly Market Clearing Price (MCP) and Volume Trend Analyses",
      "Monthly Settlement Reconciliation vs Discom Invoices",
    ],
    stats: [
      { label: "Daily Energy Traded", value: "12.4+ MUs" },
      { label: "Client Portfolio Savings", value: "22% - 38%" },
      { label: "Bidding Accuracy", value: "99.4%" },
    ],
    processSteps: [
      { step: 1, title: "Load Profile Telemetry", description: "Audit client 15-minute ABT meter load profile over the preceding 12 months." },
      { step: 2, title: "SLDC & NOAR Registration", description: "Establish client registration on National Open Access Registry (NOAR) and procure SLDC Standing Clearance." },
      { step: 3, title: "Algorithmic Bid Execution", description: "Automated submission of price-sensitive or block bids on IEX/PXIL/HPX matching market liquidity." },
      { step: 4, title: "Real-Time Dispatch Reconciliation", description: "Continuous monitoring of schedule vs actual drawal to manage DSM exposure." },
    ],
  },
  {
    slug: "open-access-advisory",
    title: "Open Access Advisory & Renewable Procurement",
    shortDescription:
      "End-to-end turnkey advisory for Group Captive (26:51), Third-Party Bilateral PPAs, and Green Energy Open Access (GEOA) for HT consumers.",
    fullDescription:
      "Under Section 9 and 42 of the Electricity Act 2003, commercial and industrial (C&I) consumers with contract demand above 100 kW can procure renewable energy directly from independent power producers (IPPs). Topnotch Energy Solutions structures bankable Special Purpose Vehicle (SPV) equity models, navigates Cross-Subsidy Surcharges (CSS), and secures Discom approvals.",
    category: "Open Access",
    iconName: "Zap",
    badge: "100 kW to 50+ MW Portfolios",
    features: [
      {
        title: "Group Captive SPV Structuring",
        description:
          "Strict adherence to Electricity Rules 2005 (minimum 26% equity ownership and 51% captive consumption) ensuring 100% statutory exemption from Cross-Subsidy Surcharge (CSS) and Additional Surcharge (AS).",
        metric: "₹1.80 - ₹3.20",
        metricLabel: "Per Unit Net Savings (₹/kWh)",
      },
      {
        title: "Third-Party Bilateral PPAs",
        description:
          "Zero-equity long-term bilateral contracts with leading solar and wind IPPs. Custom fixed-tariff or discount-to-discom indexed pricing models.",
        metric: "10 - 25 Yrs",
        metricLabel: "PPA Tenor Flexibility",
      },
      {
        title: "Green Energy Open Access (GEOA 2022)",
        description:
          "Leverage the Ministry of Power's landmark reforms reducing OA threshold from 1,000 kVA to 100 kW, with capped cross-subsidy surcharges and expedited 15-day deemed approvals.",
        metric: "100 kW",
        metricLabel: "Minimum Eligible Demand",
      },
      {
        title: "Grid Interconnection & Wheeling Optimization",
        description:
          "Loss-minimizing injection routing through State Transmission Utility (STU) and Central Transmission Utility (CTU) under the GNA regulatory regime.",
        metric: "3.2% - 6.5%",
        metricLabel: "Technical Loss Hedging",
      },
    ],
    regulationsGoverning: [
      "Ministry of Power Electricity (Promoting Renewable Energy Through Green Energy Open Access) Rules, 2022",
      "Electricity Act 2003 (Section 9, 38, 39, 40 & 42)",
      "Electricity Rules, 2005 (Rule 3 - Captive Generating Plant)",
      "State-specific SERC Open Access and Multi-Year Tariff Orders",
    ],
    deliverables: [
      "Bankable Financial Feasibility Model (LCOE, IRR, Landed Cost Comparison)",
      "SPV Share Subscription & Shareholders Agreement (SSHA) Structuring",
      "Power Purchase Agreement (PPA) Drafting with Risk-Mitigated Force Majeure Clauses",
      "Comprehensive SLDC NOC, CTU/STU Connectivity and Wheeling Agreement Approvals",
    ],
    stats: [
      { label: "C&I Capacity Commissioned", value: "185+ MW" },
      { label: "Discom Bill Reduction", value: "35% - 48%" },
      { label: "Regulatory Approval Rate", value: "100%" },
    ],
    processSteps: [
      { step: 1, title: "Tariff & Feasibility Audit", description: "Analyze HT tariff structure, load factor, contract demand, and state-specific CSS/AS levies." },
      { step: 2, title: "Developer Matching & RFP", description: "Select pre-vetted utility-scale solar/wind generators offering optimal ISTS/InSTS landed tariffs." },
      { step: 3, title: "SPV Corporate Governance", description: "Execute equity infusion, SHA, and PPA compliant with Rule 3 of Electricity Rules 2005." },
      { step: 4, title: "SLDC & Discom Approvals", description: "Secure connectivity, wheeling concurrence, and ABT SEM commissioning." },
    ],
  },
  {
    slug: "deviation-settlement-mechanism",
    title: "Deviation Settlement Mechanism (DSM) & 96-Block Forecasting",
    shortDescription:
      "Advanced algorithmic solar/wind load forecasting and intra-day scheduling to protect generators and consumers against penal DSM bands.",
    fullDescription:
      "Under the CERC DSM Regulations 2024 and state-level forecasting and scheduling guidelines, power producers and open access consumers are subject to stringent frequency-linked penalties for deviating from their scheduled injection or drawal. Topnotch delivers high-fidelity 96-time block telemetry and automated schedule revisions.",
    category: "Analytics",
    iconName: "Activity",
    badge: "CERC DSM 2024 Compliant",
    features: [
      {
        title: "96 Time-Block Neural Forecasting",
        description:
          "High-resolution numerical weather prediction (NWP) models calibrated with localized irradiation, ambient temperature, wind vector arrays, and historical plant performance.",
        metric: "< 4.2%",
        metricLabel: "Mean Absolute Error (NMAE)",
      },
      {
        title: "Intra-Day Schedule Revision Automation",
        description:
          "Automated submission of up to 16 statutory schedule revisions per delivery day to SLDC/RLDC in response to sudden cloud cover, wind gusts, or machine outages.",
        metric: "16 Revisions",
        metricLabel: "Statutory Daily Revisions",
      },
      {
        title: "Frequency-Responsive Bidding Desk",
        description:
          "Live synchronization with National Grid frequency telemetry (49.90 Hz - 50.05 Hz band) to eliminate penal overdrawal/underdrawal surcharges.",
        metric: "50.00 Hz",
        metricLabel: "Operating Grid Datum",
      },
      {
        title: "QCA Operations for RE Developers",
        description:
          "Qualified Coordinating Agency (QCA) services for pooling substations, handling de-pooling, state DSM pooling accounts, and regulatory reporting.",
        metric: "24/7/365",
        metricLabel: "NOC Control Desk",
      },
    ],
    regulationsGoverning: [
      "CERC (Deviation Settlement Mechanism and Related Matters) Regulations, 2024",
      "Indian Electricity Grid Code (IEGC) Regulations, 2023",
      "CEA (Technical Standards for Connectivity to the Grid) Regulations",
    ],
    deliverables: [
      "15-Minute Block Day-Ahead Generation Schedule to SLDC/RLDC by 09:30 AM",
      "Dynamic Intra-Day Schedule Revisions (Blocks T+6 onwards)",
      "Weekly DSM Billing Statement Verification and Discrepancy Contestation",
      "SCADA and RTU Telemetry Integration Architecture",
    ],
    stats: [
      { label: "Monitored RE Capacity", value: "320+ MW" },
      { label: "DSM Penalty Reduction", value: "78.6%" },
      { label: "Forecast Resolution", value: "15-Minute" },
    ],
    processSteps: [
      { step: 1, title: "Telemetry Onboarding", description: "Deploy RTU/SCADA data concentrators connected to ABT 0.2s check and main meters." },
      { step: 2, title: "Historical Model Calibration", description: "Train multi-layer machine learning models using 24+ months of localized weather and plant generation telemetry." },
      { step: 3, title: "Automated SLDC Push", description: "Seamless automated scheduling data exchange via secure API/web-portal to SLDC control desks." },
      { step: 4, title: "Weekly Commercial Settlement", description: "Audit SLDC DSM billing accounts and reconcile against internal check meter logs." },
    ],
  },
  {
    slug: "statutory-compliance-metering",
    title: "Statutory Approvals & ABT 0.2s SEM Metering",
    shortDescription:
      "Turnkey regulatory navigation for SLDC NOCs, Discom wheeling agreements, and CEA-compliant 0.2s class Special Energy Metering infrastructure.",
    fullDescription:
      "The foundation of any successful Open Access or captive generation transaction is uncompromising compliance with technical grid codes. Topnotch manages the entire engineering and bureaucratic liaison pipeline with Discoms, STUs, CTU (Powergrid), and State Load Despatch Centres (SLDC).",
    category: "Regulatory",
    iconName: "ShieldCheck",
    badge: "100% Bureaucratic Clearance",
    features: [
      {
        title: "SLDC Standing Clearance & NOC",
        description:
          "Drafting, submission, and follow-through of Form A, Form B, and Form C applications on the National Open Access Registry (NOAR) and state SLDC portals.",
        metric: "15 Days",
        metricLabel: "Average NOC Turnaround",
      },
      {
        title: "ABT 0.2s SEM Metering Infrastructure",
        description:
          "Procurement, NABL laboratory calibration, and field commissioning of 0.2s accuracy class Special Energy Meters (Main, Check, and Standby) complying with CEA Regulations.",
        metric: "0.2s Class",
        metricLabel: "CEA Accuracy Standard",
      },
      {
        title: "Substation Synchronization & Feeder Inspection",
        description:
          "Liaison with Electrical Inspectorate (CEIG / SEIG), testing of directional overcurrent and earth fault relays, and RTU telemetry synchronization with SLDC SCADA.",
        metric: "11kV - 220kV",
        metricLabel: "Interconnection Voltage",
      },
      {
        title: "Wheeling & Banking Agreement Execution",
        description:
          "Negotiation and statutory execution of Wheeling Agreements, Transmission Service Agreements (TSA), and Banking Agreements with regional distribution utilities.",
        metric: "Pan-India",
        metricLabel: "Jurisdictional Coverage",
      },
    ],
    regulationsGoverning: [
      "Central Electricity Authority (Installation and Operation of Meters) Regulations",
      "CEA (Technical Standards for Construction of Electrical Plants and Electric Lines)",
      "State-specific Grid Code & Open Access Regulations",
    ],
    deliverables: [
      "Form A (Feasibility Concurrence) & Form B (NOC) Approvals",
      "NABL Meter Calibration Test Certificates & DLD File Parsing Protocols",
      "CEIG Charging Approval & Synchronization Certificate",
      "Tripartite Wheeling & Banking Agreements with Discoms",
    ],
    stats: [
      { label: "Meters Commissioned", value: "450+ Units" },
      { label: "NOC Approvals Handled", value: "310+" },
      { label: "CEIG Clearances", value: "100% Passed" },
    ],
    processSteps: [
      { step: 1, title: "Engineering Audit", description: "Inspect substation single-line diagram (SLD), CT/PT ratios, and protection relay configurations." },
      { step: 2, title: "Meter Calibration & Testing", description: "Test 0.2s meters at NABL accredited labs and install with Discom inspection seals." },
      { step: 3, title: "Digital Application & NOC", description: "File comprehensive petitions on NOAR and state regulatory single-window clearance portals." },
      { step: 4, title: "Commissioning & Sync", description: "Final synchronization and issuance of Joint Meter Reading (JMR) protocol." },
    ],
  },
  {
    slug: "rec-carbon-markets",
    title: "Renewable Energy Certificates (REC) & Carbon Markets",
    shortDescription:
      "Monetize green attributes through REC issuance on IEX/PXIL, navigate RPO compliance, and trade PAT scheme Energy Saving Certificates (ESCerts).",
    fullDescription:
      "Captive power plants, merchant renewable generators, and obligated entities (Discoms, Open Access consumers, and captive users) must actively manage their green compliance. Topnotch Energy Solutions offers end-to-end REC lifecycle management—from accreditation with State Nodal Agencies (SNA) to registration with Central Agency (NLDC) and clearing on power exchanges.",
    category: "Sustainability",
    iconName: "Award",
    badge: "NLDC / SNA Accredited",
    features: [
      {
        title: "REC Accreditation & Issuance",
        description:
          "Turnkey handling of project accreditation with State Nodal Agencies, registration with NLDC, and monthly issuance of RECs against Joint Meter Readings (JMR).",
        metric: "1 MWh",
        metricLabel: "= 1 Green Certificate",
      },
      {
        title: "IEX & PXIL REC Trading Desk",
        description:
          "Active execution on the last Wednesday of every month on power exchanges. Price strategy formulation based on floor and forbearance price dynamics.",
        metric: "Monthly",
        metricLabel: "Bilateral & Exchange Clearing",
      },
      {
        title: "RPO Portfolio Compliance Management",
        description:
          "Assist industrial obligated entities in fulfilling Solar, Wind, and Other RPO mandates to avoid severe SERC non-compliance penalties.",
        metric: "100%",
        metricLabel: "Regulatory Audit Defense",
      },
      {
        title: "PAT Scheme ESCerts Trading",
        description:
          "Trading of Energy Saving Certificates (ESCerts) for Designated Consumers (DCs) under the Bureau of Energy Efficiency's Perform, Achieve and Trade scheme.",
        metric: "1 MTOE",
        metricLabel: "= 1 ESCert Equivalent",
      },
    ],
    regulationsGoverning: [
      "CERC (Terms and Conditions for Renewable Energy Certificates for Renewable Energy Generation) Regulations, 2022",
      "Bureau of Energy Efficiency (BEE) PAT Scheme Operational Guidelines",
      "SERC Renewable Purchase Obligation (RPO) Compliance Regulations",
    ],
    deliverables: [
      "SNA Project Accreditation Certificate",
      "NLDC Registration and Energy Accounting Statements",
      "Exchange Trade Confirmation Sheets & Tax Invoices",
      "Annual RPO Compliance Filings to SERC and State Nodal Agencies",
    ],
    stats: [
      { label: "RECs Traded", value: "850,000+ Units" },
      { label: "ESCerts Transacted", value: "95,000+ MTOE" },
      { label: "RPO Penalties Averted", value: "₹42+ Crores" },
    ],
    processSteps: [
      { step: 1, title: "Eligibility Assessment", description: "Audit generator grid connectivity, PPA conditions, and waiver eligibility under CERC REC Regulations." },
      { step: 2, title: "SNA & NLDC Registration", description: "Liaison with State Nodal Agency for project accreditation and Central Agency for registration." },
      { step: 3, title: "Monthly JMR Reconciliation", description: "Submit verified SLDC injection data for monthly certificate credit in the central depository." },
      { step: 4, title: "Exchange Trading & Clearing", description: "Place optimal buy/sell limit orders on IEX/PXIL during monthly trading sessions." },
    ],
  },
  {
    slug: "energy-audits-demand-optimization",
    title: "BEE Grade-A Energy Audits & Contract Demand Optimization",
    shortDescription:
      "BEE-certified industrial energy audits, power factor penalty eradication (0.99-1.00 PF), and Contract Demand (kVA) rationalization.",
    fullDescription:
      "Many heavy industrial consumers pay hundreds of thousands of rupees monthly in avoidable power factor penalties, maximum demand overshoot charges, and suboptimal Time-of-Day (ToD) tariff consumption. Topnotch deploys Class-A power quality analyzers and BEE Certified Energy Auditors to optimize your internal electrical network.",
    category: "Analytics",
    iconName: "BarChart3",
    badge: "BEE Certified Grade-A",
    features: [
      {
        title: "Contract Demand Rationalization",
        description:
          "Evaluate 365-day 15-minute load curves to right-size sanctioned contract demand (kVA/MVA), eliminating fixed capacity charges and overshoot surcharges.",
        metric: "15% - 25%",
        metricLabel: "Fixed Cost Reduction",
      },
      {
        title: "Power Factor (0.999 PF) Tuning",
        description:
          "Design and retrofitting of Automatic Power Factor Correction (APFC) capacitor banks with detuned harmonic filters to capture 100% of Discom PF incentives.",
        metric: "0.995+",
        metricLabel: "Guaranteed Power Factor",
      },
      {
        title: "Harmonic Distortion Mitigation",
        description:
          "Measurement and suppression of Total Harmonic Distortion (THD) under IEEE 519 standards to prevent transformer overheating and sensitive PLC malfunctions.",
        metric: "< 3.0%",
        metricLabel: "Voltage THD Standard",
      },
      {
        title: "ToD Peak Load Shifting Strategies",
        description:
          "Reschedule energy-intensive industrial batch processes (induction furnaces, rolling mills, chilling plants) from peak tariff to rebate night hours.",
        metric: "₹1.20 - ₹2.50",
        metricLabel: "ToD Differential Arbitrage",
      },
    ],
    regulationsGoverning: [
      "Energy Conservation Act, 2001 (Amended 2022)",
      "Bureau of Energy Efficiency (BEE) Mandatory Energy Audit Regulations",
      "IEEE 519-2022 Harmonic Control Standards in Electric Power Systems",
    ],
    deliverables: [
      "Comprehensive BEE Grade-A Energy Audit Report",
      "Power Quality Harmonic Spectrum Analysis Reports",
      "Discom Power Factor Incentive / Penalty Recovery Dossier",
      "Contract Demand Revision Petitions for Discom Approval",
    ],
    stats: [
      { label: "Audited Facilities", value: "140+ Plants" },
      { label: "Annual Client Savings", value: "₹28+ Crores" },
      { label: "Discom PF Incentives Secured", value: "₹4.8 Cr" },
    ],
    processSteps: [
      { step: 1, title: "On-Site Power Quality Logging", description: "Connect Class-A analyzers at the main HT incomer and major load feeders for 7 to 14 days." },
      { step: 2, title: "Data Analytics & Loss Identification", description: "Identify transformer no-load losses, cable heat dissipations, and harmonic resonance." },
      { step: 3, title: "CAPEX/OPEX ROI Roadmapping", description: "Formulate an investment proposal with payback periods under 8 months." },
      { step: 4, title: "Implementation & Utility Liaison", description: "Install APFC / harmonic filters and petition Discom for demand reduction." },
    ],
  },
];
