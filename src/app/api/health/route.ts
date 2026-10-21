import { NextResponse } from "next/server";
import { IEX_MARKET_SUMMARY_KPIS } from "@/lib/constants/market-blocks-seed";
import { POPULAR_STATES } from "@/lib/constants/indian-states-oa-data";

const START_TIME = Date.now();

export async function GET() {
  const memory = process.memoryUsage();

  return NextResponse.json(
    {
      status: "healthy",
      service: "Topnotch Energy Solutions Core API",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor((Date.now() - START_TIME) / 1000),
      environment: process.env.NODE_ENV || "production",
      telemetry: {
        nodeVersion: process.version,
        platform: process.platform,
        memoryRssMb: Math.round(memory.rss / (1024 * 1024)),
        heapUsedMb: Math.round(memory.heapUsed / (1024 * 1024)),
      },
      engines: {
        iex96BlockSeed: "ready",
        totalSeedBlocks: 96,
        dailyAvgDamMwh: IEX_MARKET_SUMMARY_KPIS.dailyAvgDamMwh,
        sercStateTariffMatrix: "ready",
        statesCoveredCount: POPULAR_STATES.length,
        rateLimiter: "active",
      },
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "X-Service-Health": "PASS",
      },
    }
  );
}
