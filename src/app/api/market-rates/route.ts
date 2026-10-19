import { NextRequest, NextResponse } from "next/server";
import { IEX_96_BLOCKS_DATA, IEX_MARKET_SUMMARY_KPIS } from "@/lib/constants/market-blocks-seed";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const segment = searchParams.get("segment"); // dam | gdam | rtm | all
  const blockFrom = parseInt(searchParams.get("from") ?? "1");
  const blockTo = parseInt(searchParams.get("to") ?? "96");

  let data = IEX_96_BLOCKS_DATA;

  // Filter block range
  if (blockFrom >= 1 && blockTo <= 96 && blockFrom <= blockTo) {
    data = data.filter((b) => b.blockNumber >= blockFrom && b.blockNumber <= blockTo);
  }

  // Shape per segment filter
  if (segment && segment !== "all") {
    const shaped = data.map((block) => ({
      blockNumber: block.blockNumber,
      startTime: block.startTime,
      endTime: block.endTime,
      period: block.period,
      ...(segment === "dam" && {
        damMwh: block.DAM.mwh,
        damKwh: block.DAM.kwh,
        volumeMw: block.volumeMw,
      }),
      ...(segment === "gdam" && {
        gdamMwh: block.GDAM.mwh,
        gdamKwh: block.GDAM.kwh,
      }),
      ...(segment === "rtm" && {
        rtmMwh: block.RTM.mwh,
        rtmKwh: block.RTM.kwh,
      }),
    }));
    return NextResponse.json(
      {
        success: true,
        segment,
        blockCount: shaped.length,
        summary: IEX_MARKET_SUMMARY_KPIS,
        data: shaped,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
        },
      }
    );
  }

  // Full dataset
  return NextResponse.json(
    {
      success: true,
      segment: "all",
      blockCount: data.length,
      summary: IEX_MARKET_SUMMARY_KPIS,
      data: data.map((b) => ({
        blockNumber: b.blockNumber,
        startTime: b.startTime,
        endTime: b.endTime,
        period: b.period,
        dam: { mwh: b.DAM.mwh, kwh: b.DAM.kwh },
        gdam: { mwh: b.GDAM.mwh, kwh: b.GDAM.kwh },
        rtm: { mwh: b.RTM.mwh, kwh: b.RTM.kwh },
        volumeMw: b.volumeMw,
        solarOutputPct:
          b.blockNumber >= 26 && b.blockNumber <= 72
            ? Math.round(Math.sin(((b.blockNumber - 26) / 46) * Math.PI) * 98)
            : 0,
      })),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
      },
    }
  );
}
