/**
 * 96-Time-Block Seed Dataset for Indian Power Exchange (IEX / PXIL / HPX)
 * Represents realistic 15-minute dispatch intervals across a full 24-hour delivery day.
 * Reflects authentic Indian power demand curves:
 *  - Base load / Night valley (00:00 - 06:00): ~₹3,800/MWh
 *  - Morning ramp (06:00 - 10:00): ~₹5,400/MWh
 *  - Solar dip / High RE influx (11:00 - 16:00): ~₹2,900/MWh
 *  - Evening peak surge (18:00 - 22:30): ~₹8,500 – ₹10,000/MWh (CERC price ceiling ₹10,000/MWh)
 *  - Late night tapering (22:30 - 24:00): ~₹4,100/MWh
 */

export type TimeBlockPeriod =
  | "Night Valley"
  | "Morning Ramp"
  | "Solar Hours"
  | "Evening Peak"
  | "Late Night";

export type GridStressStatus =
  | "Normal"
  | "High Solar Influx"
  | "Peak Stress"
  | "Grid Alert";

export interface Iex96TimeBlock {
  blockNumber: number; // 1 to 96
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  timeLabel: string; // "00:00 - 00:15"
  period: TimeBlockPeriod;
  damMwh: number; // Day Ahead Market Clearing Price (₹/MWh)
  damKwh: number; // Converted (₹/kWh)
  gdamMwh: number; // Green Day Ahead Market (₹/MWh)
  gdamKwh: number; // Converted (₹/kWh)
  rtmMwh: number; // Real-Time Market Clearing Price (₹/MWh)
  rtmKwh: number; // Converted (₹/kWh)
  // Structured contract accessors
  DAM: { mwh: number; kwh: number };
  GDAM: { mwh: number; kwh: number };
  RTM: { mwh: number; kwh: number };
  volumeMw: number; // Aggregate Market Cleared Volume (MW)
  gridFrequencyHz: number; // Operating Indian Grid Frequency (Hz, 50.00 Hz nominal datum)
  status: GridStressStatus;
}

export interface MarketSummaryKpis {
  tradeDate: string;
  deliveryDate: string;
  dailyAvgDamMwh: number;
  dailyAvgDamKwh: number;
  peakEveningMcpMwh: number;
  peakEveningMcpKwh: number;
  solarHoursAvgMcpMwh: number;
  solarHoursAvgMcpKwh: number;
  nightValleyAvgMcpMwh: number;
  nightValleyAvgMcpKwh: number;
  totalClearedVolumeMus: number;
  gdamDailyAvgMwh: number;
  gdamDailyAvgKwh: number;
  rtmDailyAvgMwh: number;
  rtmDailyAvgKwh: number;
  nationalGridFrequencyAvgHz: number;
  cercPriceCeilingMwh: number; // ₹10,000/MWh regulatory cap
  cercPriceCeilingKwh: number; // ₹10.00/kWh
  recMarket: {
    solarRecPriceInr: number;
    nonSolarRecPriceInr: number;
    historicalFloorPriceInr: number;
    historicalForbearancePriceInr: number;
    marketClearingSession: string;
    totalClearedVolumeUnits: number;
  };
  escertsMarket: {
    pricePerMtoeInr: number;
    tradingStatus: string;
    beeCycle: string;
  };
}

/**
 * Deterministically creates 96-time block records with authentic Indian grid and market clearing dynamics
 */
function build96BlockDataset(): Iex96TimeBlock[] {
  const blocks: Iex96TimeBlock[] = [];

  for (let b = 1; b <= 96; b++) {
    const startMins = (b - 1) * 15;
    const endMins = b * 15;

    const startH = Math.floor(startMins / 60);
    const startM = startMins % 60;
    const endH = Math.floor(endMins / 60);
    const endM = endMins % 60;

    const pad = (n: number) => n.toString().padStart(2, "0");
    const startTime = `${pad(startH)}:${pad(startM)}`;
    const endTime = endH === 24 ? "24:00" : `${pad(endH)}:${pad(endM)}`;
    const timeLabel = `${startTime} - ${endTime}`;

    let period: TimeBlockPeriod = "Night Valley";
    let status: GridStressStatus = "Normal";
    let baseMwh = 3800;
    let gdamMwh = 3950;
    let rtmDelta = 0;
    let freqHz = 50.01;
    let volumeMw = 4200;

    // Period assignment & price modeling based on exact prompt specifications
    if (b >= 1 && b <= 24) {
      // 00:00 - 06:00: Night Valley Base Load (~₹3,800/MWh)
      period = "Night Valley";
      const curve = Math.sin(((b - 1) / 24) * Math.PI);
      baseMwh = Math.round(3800 - curve * 400 + (b % 3 === 0 ? 35 : -25));
      gdamMwh = Math.round(baseMwh + 150); // slight non-solar green premium
      rtmDelta = Math.round(Math.cos(b * 0.8) * 140);
      freqHz = 50.02 + Math.sin(b * 0.3) * 0.02;
      volumeMw = Math.round(3600 + curve * 450);
      status = "Normal";
    } else if (b >= 25 && b <= 40) {
      // 06:00 - 10:00: Morning Ramp (~₹5,400/MWh)
      period = "Morning Ramp";
      const rampProgress = (b - 24) / 16;
      baseMwh = Math.round(4400 + rampProgress * 1150 + Math.sin(b * 0.9) * 80);
      gdamMwh = Math.round(baseMwh + 120);
      rtmDelta = Math.round(Math.sin(b * 1.1) * 220);
      freqHz = 49.98 + Math.cos(b * 0.4) * 0.03;
      volumeMw = Math.round(5200 + rampProgress * 1400);
      status = "Normal";
    } else if (b >= 41 && b <= 64) {
      // 10:00 - 16:00 (specifically 11:00-16:00 is solar dip ~₹2,900/MWh)
      period = "Solar Hours";
      status = "High Solar Influx";
      const solarPeakProgress = Math.sin(((b - 40) / 24) * Math.PI);
      baseMwh = Math.round(3450 - solarPeakProgress * 620 + Math.cos(b * 0.7) * 60);
      if (b >= 45 && b <= 62) {
        // Deep solar valley (11:00 to 15:30)
        baseMwh = Math.round(2880 + Math.sin(b * 0.5) * 70);
        gdamMwh = Math.round(3100 + Math.cos(b * 0.6) * 50); // specified ~₹3,100/MWh in prompt
      } else {
        gdamMwh = Math.round(baseMwh + 80);
      }
      rtmDelta = Math.round(Math.sin(b * 1.4) * 190);
      freqHz = 50.03 + Math.sin(b * 0.5) * 0.025; // High solar injection keeps frequency robust
      volumeMw = Math.round(7100 + solarPeakProgress * 1200);
    } else if (b >= 65 && b <= 90) {
      // 16:00 - 22:30 (Peak evening ~₹8,500 – ₹10,000/MWh)
      period = "Evening Peak";
      if (b >= 73 && b <= 88) {
        // Core 18:00 - 22:00 peak
        const eveningPeakProgress = Math.sin(((b - 72) / 16) * Math.PI);
        baseMwh = Math.round(8500 + eveningPeakProgress * 1380 + (b % 2 === 0 ? 80 : -60));
        baseMwh = Math.min(9980, baseMwh); // Within CERC cap
        gdamMwh = Math.round(baseMwh - 250); // Green non-solar / wind contracts clearance
        rtmDelta = Math.round(Math.cos(b * 0.9) * 380);
        freqHz = 49.92 + Math.sin(b * 0.4) * 0.02; // Heavy industrial + domestic lighting load dips frequency
        volumeMw = Math.round(8400 + eveningPeakProgress * 1250);
        status = baseMwh > 9400 ? "Grid Alert" : "Peak Stress";
      } else {
        // Shoulder peak (16:00-18:00 and 22:00-22:30)
        baseMwh = Math.round(6200 + ((b - 64) / 8) * 1800);
        gdamMwh = Math.round(baseMwh + 150);
        rtmDelta = Math.round(Math.sin(b * 0.8) * 210);
        freqHz = 49.97;
        volumeMw = 6800;
        status = "Peak Stress";
      }
    } else {
      // 22:30 - 24:00: Late Night Tapering
      period = "Late Night";
      const decay = (b - 90) / 6;
      baseMwh = Math.round(5200 - decay * 1400 + Math.sin(b * 0.7) * 50);
      gdamMwh = Math.round(baseMwh + 100);
      rtmDelta = Math.round(Math.cos(b * 0.6) * 120);
      freqHz = 50.01;
      volumeMw = Math.round(4800 - decay * 900);
      status = "Normal";
    }

    const damMwh = baseMwh;
    const damKwh = Number((damMwh / 1000).toFixed(2));
    const gdamKwh = Number((gdamMwh / 1000).toFixed(2));
    const rtmMwh = Math.min(10000, Math.max(2000, damMwh + rtmDelta));
    const rtmKwh = Number((rtmMwh / 1000).toFixed(2));
    const gridFrequencyHz = Number(freqHz.toFixed(3));

    blocks.push({
      blockNumber: b,
      startTime,
      endTime,
      timeLabel,
      period,
      damMwh,
      damKwh,
      gdamMwh,
      gdamKwh,
      rtmMwh,
      rtmKwh,
      DAM: { mwh: damMwh, kwh: damKwh },
      GDAM: { mwh: gdamMwh, kwh: gdamKwh },
      RTM: { mwh: rtmMwh, kwh: rtmKwh },
      volumeMw,
      gridFrequencyHz,
      status,
    });
  }

  return blocks;
}

export const IEX_96_BLOCKS_DATA: Iex96TimeBlock[] = build96BlockDataset();

/**
 * Summary Key Performance Indicators derived from the 96-time block dataset
 */
export function calculateMarketSummaryKpis(blocks: Iex96TimeBlock[]): MarketSummaryKpis {
  const totalDamMwh = blocks.reduce((acc, b) => acc + b.damMwh, 0);
  const totalGdamMwh = blocks.reduce((acc, b) => acc + b.gdamMwh, 0);
  const totalRtmMwh = blocks.reduce((acc, b) => acc + b.rtmMwh, 0);
  const totalFreq = blocks.reduce((acc, b) => acc + b.gridFrequencyHz, 0);

  // Solar hours: 11:00 to 16:00 (Blocks 45 to 64)
  const solarBlocks = blocks.filter((b) => b.blockNumber >= 45 && b.blockNumber <= 64);
  const solarDamMwh = solarBlocks.reduce((acc, b) => acc + b.damMwh, 0) / solarBlocks.length;

  // Peak evening: 18:00 to 22:30 (Blocks 73 to 90)
  const peakBlocks = blocks.filter((b) => b.blockNumber >= 73 && b.blockNumber <= 90);
  const peakMaxMwh = Math.max(...peakBlocks.map((b) => b.damMwh));

  // Night valley: 00:00 to 06:00 (Blocks 1 to 24)
  const nightBlocks = blocks.filter((b) => b.blockNumber >= 1 && b.blockNumber <= 24);
  const nightAvgMwh = nightBlocks.reduce((acc, b) => acc + b.damMwh, 0) / nightBlocks.length;

  // Approximate cleared volume in Million Units (MUs) = SUM(volumeMw * 0.25h) / 1000
  const totalVolumeMus = blocks.reduce((acc, b) => acc + b.volumeMw * 0.25, 0) / 1000;

  const dailyAvgDamMwh = Math.round(totalDamMwh / blocks.length);
  const gdamDailyAvgMwh = Math.round(totalGdamMwh / blocks.length);
  const rtmDailyAvgMwh = Math.round(totalRtmMwh / blocks.length);

  return {
    tradeDate: "19 October 2026",
    deliveryDate: "20 October 2026",
    dailyAvgDamMwh,
    dailyAvgDamKwh: Number((dailyAvgDamMwh / 1000).toFixed(2)),
    peakEveningMcpMwh: peakMaxMwh,
    peakEveningMcpKwh: Number((peakMaxMwh / 1000).toFixed(2)),
    solarHoursAvgMcpMwh: Math.round(solarDamMwh),
    solarHoursAvgMcpKwh: Number((solarDamMwh / 1000).toFixed(2)),
    nightValleyAvgMcpMwh: Math.round(nightAvgMwh),
    nightValleyAvgMcpKwh: Number((nightAvgMwh / 1000).toFixed(2)),
    totalClearedVolumeMus: Number(totalVolumeMus.toFixed(1)),
    gdamDailyAvgMwh,
    gdamDailyAvgKwh: Number((gdamDailyAvgMwh / 1000).toFixed(2)),
    rtmDailyAvgMwh,
    rtmDailyAvgKwh: Number((rtmDailyAvgMwh / 1000).toFixed(2)),
    nationalGridFrequencyAvgHz: Number((totalFreq / blocks.length).toFixed(3)),
    cercPriceCeilingMwh: 10000,
    cercPriceCeilingKwh: 10.0,
    recMarket: {
      solarRecPriceInr: 1000,
      nonSolarRecPriceInr: 1000,
      historicalFloorPriceInr: 1000,
      historicalForbearancePriceInr: 2400,
      marketClearingSession: "Last Wednesday of Month (IEX & PXIL)",
      totalClearedVolumeUnits: 285400,
    },
    escertsMarket: {
      pricePerMtoeInr: 1840,
      tradingStatus: "Active Compliance Window",
      beeCycle: "BEE PAT Cycle-VII",
    },
  };
}

export const IEX_MARKET_SUMMARY_KPIS: MarketSummaryKpis = calculateMarketSummaryKpis(IEX_96_BLOCKS_DATA);
