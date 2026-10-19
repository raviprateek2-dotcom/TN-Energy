import { blockToTime } from "../utils";

export interface TimeBlockMarketData {
  block: number;
  timeLabel: string;
  damMcpInrPerMwh: number; // Day Ahead Market Clearing Price in ₹/MWh
  damMcpInrPerKwh: number; // in ₹/kWh
  gdamMcpInrPerMwh: number; // Green Day Ahead Market Clearing Price
  gdamMcpInrPerKwh: number;
  rtmMcpInrPerMwh: number; // Real-Time Market Clearing Price
  rtmMcpInrPerKwh: number;
  gridFrequencyHz: number; // National Grid frequency (normal 49.90 - 50.05 Hz)
  totalClearedVolumeMw: number;
}

/**
 * Generates realistic 96-time block market clearing prices reflecting Indian power demand dynamics:
 * - Morning ramp (06:00 - 09:00)
 * - Midday solar dip (10:00 - 15:00) with abundant solar injection
 * - Evening peak surge (18:00 - 22:00) with higher thermal/gas dispatch
 * - Late night valley (23:00 - 05:00)
 */
export function generate96BlockMarketData(): TimeBlockMarketData[] {
  const blocks: TimeBlockMarketData[] = [];

  for (let b = 1; b <= 96; b++) {
    const { label } = blockToTime(b);

    let baseKwh = 3.8;
    let gdamDiff = -0.3; // Green power is often competitive during daytime solar
    let rtmNoise = (Math.sin(b * 0.4) * 0.25);

    if (b >= 1 && b <= 24) {
      // 00:00 to 06:00 - Night valley
      baseKwh = 3.2 + Math.sin(b * 0.2) * 0.3;
      gdamDiff = 0.1;
    } else if (b >= 25 && b <= 36) {
      // 06:00 to 09:00 - Morning ramp
      baseKwh = 4.8 + ((b - 24) / 12) * 1.6;
      gdamDiff = -0.2;
    } else if (b >= 37 && b <= 64) {
      // 09:00 to 16:00 - Solar daytime hours
      baseKwh = 3.6 + Math.sin((b - 36) * 0.15) * 0.5;
      gdamDiff = -0.45; // Solar generation abundant
    } else if (b >= 65 && b <= 88) {
      // 16:00 to 22:00 - Evening Peak (Maximum tariff pressure)
      const peakProgress = Math.sin(((b - 64) / 24) * Math.PI);
      baseKwh = 6.2 + peakProgress * 3.4; // Peaks near ₹9.6/kWh
      gdamDiff = 0.6; // No solar, wind/hydro green premium
    } else {
      // 22:00 to 24:00 - Tapering off
      baseKwh = 4.5 - ((b - 88) / 8) * 1.1;
      gdamDiff = 0.05;
    }

    const damKwh = Number(baseKwh.toFixed(2));
    const gdamKwh = Number(Math.max(2.5, baseKwh + gdamDiff).toFixed(2));
    const rtmKwh = Number(Math.max(2.8, Math.min(10.0, damKwh + rtmNoise)).toFixed(2));

    // Frequency hovers around 50.00 Hz
    const freq = Number((50.00 + (Math.cos(b * 0.3) * 0.04) + (Math.random() * 0.02 - 0.01)).toFixed(3));

    // Volume in MW
    const volume = Math.round(3500 + damKwh * 850 + (Math.sin(b * 0.2) * 600));

    blocks.push({
      block: b,
      timeLabel: label,
      damMcpInrPerMwh: Math.round(damKwh * 1000),
      damMcpInrPerKwh: damKwh,
      gdamMcpInrPerMwh: Math.round(gdamKwh * 1000),
      gdamMcpInrPerKwh: gdamKwh,
      rtmMcpInrPerMwh: Math.round(rtmKwh * 1000),
      rtmMcpInrPerKwh: rtmKwh,
      gridFrequencyHz: freq,
      totalClearedVolumeMw: volume,
    });
  }

  return blocks;
}

export const SAMPLE_96_BLOCK_DATA = generate96BlockMarketData();

export const MARKET_SUMMARY_SNAPSHOT = {
  tradeDate: "Current Delivery Day",
  nationalGridFrequencyHz: 50.012,
  frequencyStatus: "NORMAL" as const, // NORMAL, HIGH_SURCHARGE, LOW_PENALTY
  cercPriceCeilingInrPerKwh: 10.0,

  dam: {
    exchange: "IEX / PXIL / HPX Combined",
    avgMcpPerKwh: 4.82,
    avgMcpPerMwh: 4820,
    peakMcpPerKwh: 9.45,
    offPeakMcpPerKwh: 3.15,
    dailyClearedMUs: 184.6,
    trendDirection: "UP" as const,
    trendPercentage: 3.2,
  },

  gdam: {
    exchange: "Green Day-Ahead Market",
    avgMcpPerKwh: 4.28,
    avgMcpPerMwh: 4280,
    solarHoursAvgKwh: 3.42,
    nonSolarHoursAvgKwh: 5.65,
    dailyClearedMUs: 42.8,
    trendDirection: "DOWN" as const,
    trendPercentage: -2.1,
  },

  rtm: {
    exchange: "Real-Time Market",
    latestSessionMcpPerKwh: 4.65,
    latestSessionMcpPerMwh: 4650,
    sessionsCountDaily: 48,
    dailyClearedMUs: 68.2,
    trendDirection: "UP" as const,
    trendPercentage: 1.8,
  },

  rec: {
    solarRecPriceInr: 1000, // Floor/market trading price
    nonSolarRecPriceInr: 1000,
    tradingFrequency: "Monthly (Last Wednesday)",
    clearedVolumeCertificates: 245000,
  },

  escerts: {
    tradingPriceInrPerMtoe: 1840,
    marketStatus: "Active Trading Cycle",
  },
};
