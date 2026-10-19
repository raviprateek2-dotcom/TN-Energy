import test from "node:test";
import assert from "node:assert";
import { IEX_96_BLOCKS_DATA, IEX_MARKET_SUMMARY_KPIS } from "../src/lib/constants/market-blocks-seed.ts";

test("96-Time-Block Seed Dataset: Integrity & Structure", async (t) => {
  await t.test("Dataset contains exactly 96 time-blocks (15-minute intervals)", () => {
    assert.strictEqual(IEX_96_BLOCKS_DATA.length, 96);
  });

  await t.test("Time block numbering and chronological boundaries are sequential", () => {
    assert.strictEqual(IEX_96_BLOCKS_DATA[0].blockNumber, 1);
    assert.strictEqual(IEX_96_BLOCKS_DATA[0].startTime, "00:00");
    assert.strictEqual(IEX_96_BLOCKS_DATA[0].endTime, "00:15");

    assert.strictEqual(IEX_96_BLOCKS_DATA[95].blockNumber, 96);
    assert.strictEqual(IEX_96_BLOCKS_DATA[95].startTime, "23:45");
    assert.strictEqual(IEX_96_BLOCKS_DATA[95].endTime, "24:00");
  });

  await t.test("All 96 blocks maintain mathematical conversion within 2-decimal paise rounding", () => {
    for (const block of IEX_96_BLOCKS_DATA) {
      assert.ok(
        Math.abs(block.DAM.mwh - block.DAM.kwh * 1000) <= 5,
        `Block ${block.blockNumber} DAM mismatch: ${block.DAM.mwh} vs ${block.DAM.kwh * 1000}`
      );
      assert.ok(
        Math.abs(block.GDAM.mwh - block.GDAM.kwh * 1000) <= 5,
        `Block ${block.blockNumber} GDAM mismatch: ${block.GDAM.mwh} vs ${block.GDAM.kwh * 1000}`
      );
      assert.ok(
        Math.abs(block.RTM.mwh - block.RTM.kwh * 1000) <= 5,
        `Block ${block.blockNumber} RTM mismatch: ${block.RTM.mwh} vs ${block.RTM.kwh * 1000}`
      );
    }
  });

  await t.test("Authentic Indian Market Dynamics: Evening peak is strictly higher than solar dip", () => {
    // Solar blocks 45-64 (11:00-16:00)
    const solarBlocks = IEX_96_BLOCKS_DATA.slice(44, 64);
    const avgSolarKwh = solarBlocks.reduce((acc, b) => acc + b.DAM.kwh, 0) / solarBlocks.length;

    // Evening peak blocks 73-92 (18:00-23:00)
    const peakBlocks = IEX_96_BLOCKS_DATA.slice(72, 92);
    const avgPeakKwh = peakBlocks.reduce((acc, b) => acc + b.DAM.kwh, 0) / peakBlocks.length;

    assert.ok(
      avgPeakKwh > avgSolarKwh * 1.5,
      `Expected peak price (${avgPeakKwh}) to be significantly higher than solar dip (${avgSolarKwh})`
    );
  });

  await t.test("Market Summary KPIs match CERC regulatory bands", () => {
    assert.ok(IEX_MARKET_SUMMARY_KPIS.dailyAvgDamMwh > 3000);
    assert.ok(IEX_MARKET_SUMMARY_KPIS.dailyAvgDamMwh < 7000);
    assert.ok(IEX_MARKET_SUMMARY_KPIS.peakEveningMcpMwh > 7000);
    assert.ok(IEX_MARKET_SUMMARY_KPIS.peakEveningMcpMwh <= 10000); // CERC ₹10/kWh cap
  });
});
