import { NextRequest, NextResponse } from "next/server";
import { IEX_96_BLOCKS_DATA } from "@/lib/constants/market-blocks-seed";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") || "json";
  const month = searchParams.get("month") || "2025-10";

  try {
    const summary = {
      reconciliationId: `REA-NLDC-NR-${month.replace("-", "")}-9481`,
      client: "Century Plyboards (I) Ltd",
      substation: "33 kV Dedicated Feeder",
      meterSerial: "SEC-02S-9481-UP",
      accuracyClass: "Class 0.2s CEA 2006 Reg",
      totalBlocks: 96,
      netImportMwh: 220.56,
      netExportMwh: 0.0,
      transmissionLossPercent: 3.42,
      wheelingChargeInr: 167625,
      dsmDeviationSettlementInr: 0,
      complianceStatus: "REA FULLY RECONCILED",
      auditHash: "SHA256:7f9a88b1ec4329d0bb124091a140fbc9",
    };

    if (format === "csv") {
      let csv = "Block,StartTime,EndTime,ApprovedInjectionMW,ApprovedDrawlMW,ActualDrawlMW,FrequencyHz,DSM_Penalty_INR\n";
      IEX_96_BLOCKS_DATA.forEach((b) => {
        const approved = (10.2).toFixed(2);
        const actual = (10.15 + (b.blockNumber % 5) * 0.02).toFixed(2);
        const freq = (50.012 + Math.sin(b.blockNumber * 0.2) * 0.02).toFixed(3);
        csv += `${b.blockNumber},${b.startTime},${b.endTime},0.00,${approved},${actual},${freq},0.00\n`;
      });

      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="Topnotch-REA-96Block-Schedule-${month}.csv"`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      summary,
      scheduleSample: IEX_96_BLOCKS_DATA.slice(0, 8),
    });
  } catch (error) {
    console.error("Error generating REA report:", error);
    return NextResponse.json(
      { error: "Failed to generate REA schedule report" },
      { status: 500 }
    );
  }
}
