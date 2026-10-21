import { NextRequest, NextResponse } from "next/server";
import { generateAuditDossierPdf, DossierAuditData } from "@/lib/reports/pdf-dossier-builder";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const facilityParam = searchParams.get("facility") || "Century Plyboards (I) Ltd";
  const monthParam = searchParams.get("month") || "October 2025";
  const download = searchParams.get("download") === "true";

  try {
    const auditData: DossierAuditData = {
      facilityName: facilityParam,
      contractDemandKva: "7,500 kVA",
      voltageKv: "33 kV HT",
      discomName: "Paschimanchal Vidyut Vitran Nigam Ltd (PVVNL)",
      state: "Uttar Pradesh",
      billingMonth: monthParam,
      discomBaselineCostLakhs: 79.5,
      actualProcuredCostLakhs: 50.4,
      netSavingsLakhs: 29.1,
      blendedTariffPerKwh: 5.48,
      discomTariffPerKwh: 8.65,
      unitsConsumedLakhs: 9.19,
      cleanEnergySharePercent: 70.4,
      pfIncentiveInr: 45950,
      auditHash: "SHA256:a140fbc9883109da",
      auditorName: "BEE Accredited Energy Auditor (Reg #EA-2849)",
      auditDate: "04 Nov 2025",
      sldcClearanceRef: "UP-SLDC/OA/7500/2025-26",
    };

    const pdfBuffer = generateAuditDossierPdf(auditData);

    const safeFacility = facilityParam.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
    const safeMonth = monthParam.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
    const filename = `Topnotch-CERC-Audit-Dossier-${safeFacility}-${safeMonth}.pdf`;

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": download
          ? `attachment; filename="${filename}"`
          : `inline; filename="${filename}"`,
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error generating CERC audit PDF dossier:", error);
    return NextResponse.json(
      { error: "Failed to generate CERC audit dossier PDF" },
      { status: 500 }
    );
  }
}
