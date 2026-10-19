export interface ComplianceDocument {
  id: string;
  title: string;
  authority: string;
  category: "Regulatory Order" | "Application Form" | "Grid Code" | "Standard Format" | "Checklist";
  effectiveDate: string;
  referenceNumber: string;
  summary: string;
  keyClauses: string[];
  mandatoryPrerequisites: string[];
  downloadFormat: "PDF" | "DOCX" | "XLSX";
  fileSize: string;
}

export const COMPLIANCE_DOCS: ComplianceDocument[] = [
  {
    id: "geoa-mop-rules-2022",
    title: "Electricity (Promoting Renewable Energy Through Green Energy Open Access) Rules, 2022",
    authority: "Ministry of Power (MoP), Government of India",
    category: "Regulatory Order",
    effectiveDate: "06 June 2022 (Amended 2023 & 2024)",
    referenceNumber: "G.S.R. 418(E)",
    summary:
      "Landmark notification reducing the minimum Open Access eligibility threshold from 1,000 kVA to 100 kW for all commercial and industrial entities procuring green energy. Mandates single-window clearance through the central nodal portal (NOAR) within a statutory deadline of 15 days.",
    keyClauses: [
      "Rule 4(1): Open access for green energy eligible for any consumer having contracted demand of 100 kW or above.",
      "Rule 9(2): Cross-subsidy surcharge (CSS) capped for Green Energy Open Access not to increase by more than 50% of the surcharge determined for the year of grant of OA.",
      "Rule 9(3): Complete exemption of Additional Surcharge (AS) for electricity produced from offshore wind or when procuring green power over and above Discom obligation.",
      "Rule 13: Green certificate issuance to consumers procuring power through Green Open Access.",
    ],
    mandatoryPrerequisites: [
      "Sanctioned contract demand >= 100 kW with local Discom",
      "Installation of ABT compliant 0.2s class Special Energy Meters",
      "No outstanding uncontested undisputed dues with the Discom",
    ],
    downloadFormat: "PDF",
    fileSize: "1.8 MB",
  },
  {
    id: "cerc-gna-regulations-2022",
    title: "CERC (Connectivity and General Network Access to the inter-State Transmission System) Regulations, 2022",
    authority: "Central Electricity Regulatory Commission (CERC)",
    category: "Regulatory Order",
    effectiveDate: "15 October 2022 (Implemented 05 April 2023)",
    referenceNumber: "No. L-1/261/2021/CERC",
    summary:
      "Transition from point-to-point transmission corridor booking to General Network Access (GNA) and Temporary GNA (T-GNA). Eliminates dedicated transmission corridor dependency and facilitates frictionless power exchange trading.",
    keyClauses: [
      "Regulation 5: Eligibility criteria for grant of Connectivity to ISTS for generating stations and bulk consumers.",
      "Regulation 24: Application process and allocation protocol for Temporary General Network Access (T-GNA).",
      "Regulation 34: Transmission charges sharing methodology through National Grid Pooling Mechanism.",
    ],
    mandatoryPrerequisites: [
      "Nodal Agency registration with CTU (Power Grid Corporation of India)",
      "Bank Guarantee submission based on quantum of MW injection/drawal",
      "Telemetry and voice communication link with Regional Load Despatch Centre (RLDC)",
    ],
    downloadFormat: "PDF",
    fileSize: "3.4 MB",
  },
  {
    id: "rule-3-captive-generating-plant-2005",
    title: "Electricity Rules, 2005 - Rule 3: Requirements of Captive Generating Plant (CGP)",
    authority: "Ministry of Power, Govt of India / Supreme Court of India Grounding",
    category: "Regulatory Order",
    effectiveDate: "08 June 2005 (Affirmed in landmark SC 2023 ruling)",
    referenceNumber: "Rule 3 of Electricity Rules, 2005",
    summary:
      "The definitive legal baseline governing Group Captive SPV structuring. Mandates that captive users must own not less than 26% of the equity share capital with voting rights and consume not less than 51% of aggregate electricity generated on an annual basis to enjoy 100% exemption from Cross-Subsidy Surcharge (CSS) and Additional Surcharge (AS).",
    keyClauses: [
      "Rule 3(1)(a)(i): Minimum 26% equity shareholding with voting rights held by captive user(s).",
      "Rule 3(1)(a)(ii): Minimum 51% of aggregate electricity generated consumed for captive use determined on an annual financial year basis.",
      "Proportionality Rule: In an SPV with multiple captive users, equity holding must be in proportional ratio to consumption (+-10% tolerance limit).",
    ],
    mandatoryPrerequisites: [
      "Audited Statutory Auditor Certificate confirming 26% equity ownership with voting rights",
      "Special Purpose Vehicle (SPV) Memorandum of Association (MoA) reflecting captive user share class",
      "Annual Energy Accounting reconciliation certified by SLDC",
    ],
    downloadFormat: "PDF",
    fileSize: "840 KB",
  },
  {
    id: "sldc-form-a-feasibility",
    title: "Standard Form A: Application for Technical Feasibility & Connectivity Concurrence",
    authority: "State Load Despatch Centre (SLDC) / STU",
    category: "Application Form",
    effectiveDate: "Current Operational Format",
    referenceNumber: "SLDC/OA/FORM-A",
    summary:
      "Primary formal application submitted by an HT consumer or generator to the State Transmission Utility (STU) / Discom for conducting load flow studies, feeder capacity checks, and issuing preliminary technical feasibility concurrence.",
    keyClauses: [
      "Section 1: Applicant substation coordinates, connection voltage level (11kV / 33kV / 66kV / 132kV / 220kV).",
      "Section 2: Sanctioned contract demand (kVA) and requested Open Access capacity (MW).",
      "Section 3: Dedicated vs mixed industrial feeder classification.",
    ],
    mandatoryPrerequisites: [
      "Copy of latest 3 paid electricity bills from local Discom",
      "Single Line Diagram (SLD) duly certified by Chartered Electrical Engineer",
      "Processing application fee receipt through RTGS/NEFT",
    ],
    downloadFormat: "DOCX",
    fileSize: "420 KB",
  },
  {
    id: "sldc-form-b-standing-clearance",
    title: "Standard Form B: Application for Standing Clearance / No Objection Certificate (NOC)",
    authority: "State Load Despatch Centre (SLDC)",
    category: "Application Form",
    effectiveDate: "Current Operational Format",
    referenceNumber: "SLDC/OA/FORM-B",
    summary:
      "Mandatory statutory application for procuring SLDC Standing Clearance to participate in Power Exchange Day-Ahead (DAM), Real-Time (RTM), or Bilateral Inter-State / Intra-State Open Access transactions.",
    keyClauses: [
      "Clause 4: Quantum of peak and off-peak power clearance sought in 15-minute time-blocks.",
      "Clause 6: Confirmation of Special Energy Meter (SEM) installation with AMR facility.",
      "Clause 8: Undertaking to abide by CERC/SERC Deviation Settlement Mechanism (DSM) regulations.",
    ],
    mandatoryPrerequisites: [
      "Form A Feasibility Concurrence approval letter",
      "Discom Non-Dues Certificate (NDC)",
      "Bank Guarantee in favor of SLDC as per SERC schedule of charges",
    ],
    downloadFormat: "DOCX",
    fileSize: "510 KB",
  },
  {
    id: "cea-metering-regulations",
    title: "Central Electricity Authority (Installation and Operation of Meters) Regulations",
    authority: "Central Electricity Authority (CEA)",
    category: "Grid Code",
    effectiveDate: "Updated with AMR & 0.2s SEM Standards",
    referenceNumber: "CEA/TETD/MP/2006/1",
    summary:
      "Specifies accuracy standards for all Open Access consumer interfaces. Mandates 0.2s accuracy class for meters, dual-CT/PT secondary cores, separate Main and Check meters, optical communication ports, and 15-minute integration period load survey capabilities.",
    keyClauses: [
      "Regulation 7: Accuracy class 0.2s for active energy and 0.5s for reactive energy meters for all consumer drawals at voltages >= 33 kV.",
      "Regulation 12: Automated Meter Reading (AMR) facility and data logging for 96 daily blocks.",
      "Regulation 18: Periodic recalibration and testing by accredited NABL laboratories.",
    ],
    mandatoryPrerequisites: [
      "NABL laboratory calibration test certificate not older than 12 months",
      "Tamper-proof optical port sealing and terminal cover Discom seals",
    ],
    downloadFormat: "PDF",
    fileSize: "2.1 MB",
  },
  {
    id: "group-captive-audit-checklist",
    title: "Annual Group Captive Statutory Audit & Rule 3 Verification Checklist",
    authority: "SERC / Discom Commercial Division",
    category: "Checklist",
    effectiveDate: "Annual Compliance Cycle",
    referenceNumber: "TES-GC-CHK-2025",
    summary:
      "Standard internal and regulatory verification checklist designed by Topnotch Energy Solutions to safeguard C&I clients against retrospective Discom CSS/AS demand notices.",
    keyClauses: [
      "Check 1: Verification of Form MGT-7 and PAS-3 filed with ROC for 26% equity share capital.",
      "Check 2: 12-month generation ledger reconciliation from SLDC State Energy Accounts (SEA).",
      "Check 3: Proportionality test audit (+-10% consumption variance vs equity share).",
    ],
    mandatoryPrerequisites: [
      "ROC filings for the financial year",
      "Monthly Joint Meter Reading (JMR) log sheets",
      "Discom monthly power invoices",
    ],
    downloadFormat: "XLSX",
    fileSize: "680 KB",
  },
];
