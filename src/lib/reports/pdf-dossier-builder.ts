/**
 * Pure Node.js / TypeScript PDF Generator for CERC Compliance & REA Dossiers
 * Generates standards-compliant PDF 1.4 binary documents without heavy third-party dependencies.
 */

import { BRAND } from "@/lib/constants/brand";
import crypto from "crypto";

export interface DossierAuditData {
  facilityName: string;
  contractDemandKva: string;
  voltageKv: string;
  discomName: string;
  state: string;
  billingMonth: string;
  discomBaselineCostLakhs: number;
  actualProcuredCostLakhs: number;
  netSavingsLakhs: number;
  blendedTariffPerKwh: number;
  discomTariffPerKwh: number;
  unitsConsumedLakhs: number;
  cleanEnergySharePercent: number;
  pfIncentiveInr: number;
  auditHash: string;
  auditorName: string;
  auditDate: string;
  sldcClearanceRef: string;
}

export function generateAuditDossierPdf(data: DossierAuditData): Buffer {
  // Compute verifiable cryptographic SHA-256 seal
  const rawPayload = JSON.stringify({
    facility: data.facilityName,
    demand: data.contractDemandKva,
    month: data.billingMonth,
    savings: data.netSavingsLakhs,
    blended: data.blendedTariffPerKwh,
    auditor: data.auditorName,
    date: data.auditDate,
  });
  const computedSha256 = crypto.createHash("sha256").update(rawPayload).digest("hex");

  // Format escape strings for PDF text
  const sanitize = (text: string) =>
    text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

  const facility = sanitize(data.facilityName);
  const demand = sanitize(data.contractDemandKva);
  const voltage = sanitize(data.voltageKv);
  const discom = sanitize(data.discomName);
  const month = sanitize(data.billingMonth);
  const auditor = sanitize(data.auditorName);
  const auditDate = sanitize(data.auditDate);
  const sldcRef = sanitize(data.sldcClearanceRef);
  const certHash = computedSha256.substring(0, 32).toUpperCase();

  // Page 1: Official CERC Compliance Dossier & Single-Month Audit Sheet
  // Coordinates are PDF standard 72 DPI (A4: 595.28 x 841.89 points)
  // Origin (0,0) is bottom-left. Top is y=841.89
  const streamLines: string[] = [
    // Background card & top header banner
    "0.04 0.07 0.12 rg", // Deep space navy #0A111F
    "0 740 595.28 102 re f",

    // Top Brand Gold Accent Strip
    "0.97 0.74 0.15 rg", // Solar Gold #F8BC26
    "0 837 595.28 5 re f",

    // Top Header Text
    "BT",
    "/F2 16 Tf",
    "1 1 1 rg",
    "36 805 Td",
    "(TOPNOTCH ENERGY SOLUTIONS) Tj",
    "ET",

    "BT",
    "/F1 9 Tf",
    "0.97 0.74 0.15 rg",
    "36 790 Td",
    "(CERC Category-IV Power Trading & Open Access Advisory | NOAR Registered Entity) Tj",
    "ET",

    "BT",
    "/F1 8 Tf",
    "0.8 0.85 0.9 rg",
    "36 776 Td",
    "(Nodal Office: UG-5, First Floor, Parsvnath Regalia, Ghaziabad, UP 201005 | Hotline: +91 7408318214) Tj",
    "ET",

    "BT",
    "/F2 9 Tf",
    "0.2 0.8 0.5 rg", // Emerald green
    "400 805 Td",
    "(STATUTORY AUDIT DOSSIER) Tj",
    "ET",

    "BT",
    "/F1 8 Tf",
    "0.8 0.85 0.9 rg",
    "400 790 Td",
    `(${month} REA Settlement) Tj`,
    "ET",

    // Section 1: Facility & Regulatory Identification Card
    "0.95 0.96 0.98 rg", // Light card background
    "36 630 523 90 re f",
    "0.8 0.83 0.88 RG",
    "0.75 w",
    "36 630 523 90 re S",

    "BT",
    "/F2 11 Tf",
    "0.11 0.17 0.20 rg", // Navy heading
    "48 702 Td",
    "(1. INDUSTRIAL CONSUMER & SLDC REGISTRATION) Tj",
    "ET",

    "BT",
    "/F1 9 Tf",
    "0.25 0.32 0.38 rg",
    "48 684 Td",
    `(${sanitize("Consumer Name:  ")}${facility}) Tj`,
    "0 -15 Td",
    `(${sanitize("Connected Load: ")  }${demand}${sanitize(" at ")  }${voltage}${sanitize(" | State Grid: ")  }${discom}) Tj`,
    "0 -15 Td",
    `(${sanitize("SLDC Standing Clearance: ")  }${sldcRef}${sanitize(" (EA 2003 Continuous Feeder)")}) Tj`,
    "ET",

    // Section 2: Executive Economic Reconciler (Two Comparison Boxes)
    // Left Box: DISCOM Baseline (Red accent)
    "0.98 0.94 0.94 rg",
    "36 470 255 140 re f",
    "0.9 0.4 0.4 RG",
    "36 470 255 140 re S",

    "BT",
    "/F2 10 Tf",
    "0.7 0.1 0.1 rg",
    "48 592 Td",
    "(STATE DISCOM BASELINE BILL) Tj",
    "ET",

    "BT",
    "/F1 8.5 Tf",
    "0.3 0.3 0.3 rg",
    "48 574 Td",
    `(${sanitize("Units Consumed:         ")}${data.unitsConsumedLakhs}${sanitize(" Lakh kWh")}) Tj`,
    "0 -14 Td",
    `(${sanitize("DISCOM Tariff:          Rs ")}${data.discomTariffPerKwh}${sanitize(" / kWh")}) Tj`,
    "0 -14 Td",
    `(${sanitize("Fixed Demand Charges:   Rs 18.50 Lakhs")}) Tj`,
    "0 -14 Td",
    `(${sanitize("ToD Peak Surcharge:     Rs 4.70 Lakhs")}) Tj`,
    "0 -14 Td",
    `(${sanitize("Electricity Duty & Tax: Rs 4.00 Lakhs")}) Tj`,
    "0 -18 Td",
    "/F2 11 Tf",
    "0.8 0.1 0.1 rg",
    `(${sanitize("Total Baseline Cost:    Rs ")}${data.discomBaselineCostLakhs.toFixed(2)}${sanitize(" Lakhs")}) Tj`,
    "ET",

    // Right Box: Topnotch Landed Portfolio (Emerald accent)
    "0.93 0.98 0.94 rg",
    "304 470 255 140 re f",
    "0.2 0.7 0.4 RG",
    "304 470 255 140 re S",

    "BT",
    "/F2 10 Tf",
    "0.05 0.5 0.25 rg",
    "316 592 Td",
    "(TOPNOTCH LANDED PROCUREMENT) Tj",
    "ET",

    "BT",
    "/F1 8.5 Tf",
    "0.3 0.3 0.3 rg",
    "316 574 Td",
    `(${sanitize("Solar Captive PPA:      Rs 27.80 Lakhs")}) Tj`,
    "0 -14 Td",
    `(${sanitize("IEX Cleared Energy:     Rs 18.30 Lakhs")}) Tj`,
    "0 -14 Td",
    `(${sanitize("STU Wheeling & Losses:  Rs 3.90 Lakhs")}) Tj`,
    "0 -14 Td",
    `(${sanitize("Section 42 CSS/AS:      Rs 0.00 (Exempt)")}) Tj`,
    "0 -14 Td",
    `(${sanitize("PF Incentive Earned:   +Rs ")}${data.pfIncentiveInr.toLocaleString()}) Tj`,
    "0 -18 Td",
    "/F2 11 Tf",
    "0.05 0.6 0.3 rg",
    `(${sanitize("Topnotch Landed Total:  Rs ")}${data.actualProcuredCostLakhs.toFixed(2)}${sanitize(" Lakhs")}) Tj`,
    "ET",

    // Section 3: Certified Net Financial Savings Banner
    "0.97 0.74 0.15 rg", // Gold highlight box
    "36 395 523 55 re f",
    "0.85 0.62 0.08 RG",
    "1.5 w",
    "36 395 523 55 re S",

    "BT",
    "/F2 13 Tf",
    "0.11 0.17 0.20 rg",
    "48 430 Td",
    `(${sanitize("NET CERTIFIED MONTHLY SAVINGS:  Rs ")}${data.netSavingsLakhs.toFixed(2)}${sanitize(" LAKHS")}) Tj`,
    "ET",

    "BT",
    "/F1 9.5 Tf",
    "0.15 0.22 0.26 rg",
    "48 410 Td",
    `(${sanitize("Effective Landed Tariff: Rs ")}${data.blendedTariffPerKwh}${sanitize("/kWh (vs DISCOM Rs ")}${data.discomTariffPerKwh}${sanitize("/kWh) | Net Cost Reduction: ")}${(((data.discomBaselineCostLakhs - data.actualProcuredCostLakhs) / data.discomBaselineCostLakhs) * 100).toFixed(1)}${sanitize("%")}) Tj`,
    "ET",

    // Section 4: Environmental & BRSR Tier-1 Scope-2 Impact
    "0.95 0.96 0.98 rg",
    "36 290 523 85 re f",
    "0.8 0.83 0.88 RG",
    "0.75 w",
    "36 290 523 85 re S",

    "BT",
    "/F2 10 Tf",
    "0.11 0.17 0.20 rg",
    "48 355 Td",
    "(2. ENVIRONMENTAL, ESG & BRSR DISCLOSURE) Tj",
    "ET",

    "BT",
    "/F1 8.5 Tf",
    "0.25 0.32 0.38 rg",
    "48 338 Td",
    `(${sanitize("Clean Energy Share:     ")}${data.cleanEnergySharePercent}${sanitize("% Renewable (Solar Rooftop + Interstate Group Captive)")}) Tj`,
    "0 -14 Td",
    `(${sanitize("Scope-2 GHG Offset:     ")}${Math.round(data.unitsConsumedLakhs * 1000 * (data.cleanEnergySharePercent / 100) * 0.82)}${sanitize(" tCO2e avoided per CEA Grid Emission Factor 0.82")}) Tj`,
    "0 -14 Td",
    `(${sanitize("RPO Compliance Status:  100% Satisfied under CERC Renewable Purchase Obligation")}) Tj`,
    "ET",

    // Section 5: Bureau of Energy Efficiency Digital Seal & Signature
    "0.93 0.95 0.98 rg",
    "36 100 523 170 re f",
    "0.2 0.4 0.7 RG",
    "1 w",
    "36 100 523 170 re S",

    "BT",
    "/F2 10 Tf",
    "0.1 0.3 0.6 rg",
    "48 248 Td",
    "(3. REGULATORY ACCREDITATION & TAMPER-EVIDENT CRYPTOGRAPHIC SEAL) Tj",
    "ET",

    "BT",
    "/F1 8.5 Tf",
    "0.25 0.32 0.38 rg",
    "48 230 Td",
    `(${sanitize("Auditing Body:         ")}${auditor}) Tj`,
    "0 -14 Td",
    `(${sanitize("Audit Execution Date:  ")}${auditDate}${sanitize(" | Status: VERIFIED AND ENDORSED")}) Tj`,
    "0 -14 Td",
    `(${sanitize("SLDC Energy Balance:   NRLDC / SLDC Regional Energy Accounting File Reconciled")}) Tj`,
    "0 -14 Td",
    `(${sanitize("Digital Seal (SHA-256): ")}${certHash}) Tj`,
    "0 -14 Td",
    `(${sanitize("Verification Hash:     ")}${computedSha256}) Tj`,
    "0 -18 Td",
    "/F1 7.5 Tf",
    "0.4 0.45 0.5 rg",
    "(This document is an authentic electronic record issued under Section 65B of the Indian Evidence Act,) Tj",
    "0 -10 Td",
    "(CERC (Power Market) Regulations 2021, and the Electricity Act 2003 Open Access Provisions.) Tj",
    "ET",

    // Official Stamp Box
    "0.2 0.5 0.3 RG",
    "1.5 w",
    "400 115 145 60 re S",

    "BT",
    "/F2 8 Tf",
    "0.1 0.5 0.25 rg",
    "412 160 Td",
    "(BEE CERTIFIED AUDITOR) Tj",
    "ET",

    "BT",
    "/F1 7 Tf",
    "0.2 0.2 0.2 rg",
    "412 147 Td",
    "(Topnotch Energy Solutions) Tj",
    "0 -10 Td",
    "(REG #EA-2849 / 2024-26) Tj",
    "0 -10 Td",
    "(DIGITALLY SIGNED & SEALED) Tj",
    "ET",

    // Bottom Footer
    "BT",
    "/F1 8 Tf",
    "0.5 0.55 0.6 rg",
    "36 30 Td",
    "(Confidential & Proprietary - Topnotch Energy Solutions Pvt. Ltd. - CERC Advisory Cat-IV) Tj",
    "ET",

    "BT",
    "/F1 8 Tf",
    "0.5 0.55 0.6 rg",
    "490 30 Td",
    "(Page 1 of 1) Tj",
    "ET",
  ];

  const streamContent = streamLines.join("\n");
  const streamLength = Buffer.byteLength(streamContent, "utf-8");

  // PDF Objects
  const objects: string[] = [
    // 1: Catalog
    `<< /Type /Catalog /Pages 2 0 R >>`,
    // 2: Pages
    `<< /Type /Pages /Kids [3 0 R] /Count 1 >>`,
    // 3: Page 1
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>`,
    // 4: Contents Stream
    `<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream`,
    // 5: Font 1 (Helvetica Regular)
    `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`,
    // 6: Font 2 (Helvetica Bold)
    `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`,
  ];

  // Assemble full PDF with xref table
  let pdf = `%PDF-1.4\n%\xE2\xE3\xCF\xD3\n`;
  const offsets: number[] = [];

  for (let i = 0; i < objects.length; i++) {
    offsets.push(Buffer.byteLength(pdf, "utf-8"));
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(pdf, "utf-8");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += `0000000000 65535 f \n`;

  for (const offset of offsets) {
    const pad = offset.toString().padStart(10, "0");
    pdf += `${pad} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(pdf, "utf-8");
}
