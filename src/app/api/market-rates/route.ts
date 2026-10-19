import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { IEX_96_BLOCKS_DATA, IEX_MARKET_SUMMARY_KPIS } from "@/lib/constants/market-blocks-seed";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const marketQuerySchema = z.object({
  segment: z.enum(["dam", "gdam", "rtm", "all"]).optional().default("all"),
  from: z.coerce.number().int().min(1).max(96).optional().default(1),
  to: z.coerce.number().int().min(1).max(96).optional().default(96),
});

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`market:${ip}`, { limit: 120, windowMs: 60000 });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many market rate requests. Please throttle." },
      { status: 429, headers: { "Retry-After": String(rateLimit.resetInSec) } }
    );
  }

  const { searchParams } = new URL(request.url);
  const parsed = marketQuerySchema.safeParse({
    segment: searchParams.get("segment") ?? undefined,
    from: searchParams.get("from") ?? undefined,
    to: searchParams.get("to") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { segment, from: blockFrom, to: blockTo } = parsed.data;

  let data = IEX_96_BLOCKS_DATA;

  // Filter block range
  if (blockFrom <= blockTo) {
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
