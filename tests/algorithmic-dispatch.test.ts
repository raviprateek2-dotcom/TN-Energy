import test from "node:test";
import assert from "node:assert/strict";
import { solve96BlockDispatch } from "../src/lib/calculator/milp-dispatch.ts";
import { leadsRepository } from "../src/lib/db/leads-repository.ts";

test("96-Block Algorithmic Power Dispatch & Economic Co-Optimization", async (t) => {
  await t.test("Generates exactly 96 discrete 15-minute intervals", () => {
    const result = solve96BlockDispatch({
      stateId: "uttar-pradesh",
      contractDemandKva: 5000,
      solarCapacityMwp: 3.5,
      windCapacityMw: 1.5,
    });

    assert.equal(result.blocks.length, 96);
    assert.equal(result.blocks[0].block, 1);
    assert.equal(result.blocks[95].block, 96);
  });

  await t.test("Total power allocation strictly equals plant demand in every block", () => {
    const result = solve96BlockDispatch({
      stateId: "gujarat",
      contractDemandKva: 8000,
      solarCapacityMwp: 6.0,
      windCapacityMw: 3.0,
    });

    for (const b of result.blocks) {
      const totalSupplied = Number((b.solarGenerationMw + b.windGenerationMw + b.iexClearedMw + b.discomDrawlMw).toFixed(3));
      assert.ok(
        Math.abs(totalSupplied - b.demandMw) <= 0.005,
        `Block ${b.block}: Supplied (${totalSupplied} MW) != Demand (${b.demandMw} MW)`
      );
    }
  });

  await t.test("Solar generation is strictly confined to daytime hours (blocks 25 to 64)", () => {
    const result = solve96BlockDispatch({
      stateId: "maharashtra",
      contractDemandKva: 10000,
      solarCapacityMwp: 7.5,
      windCapacityMw: 4.0,
    });

    for (const b of result.blocks) {
      if (b.block < 25 || b.block > 64) {
        assert.equal(b.solarGenerationMw, 0, `Solar leaked into night block ${b.block}`);
      }
    }
  });

  await t.test("Optimized dispatch delivers positive net financial savings vs 100% DISCOM baseline", () => {
    const result = solve96BlockDispatch({
      stateId: "haryana",
      contractDemandKva: 6000,
      solarCapacityMwp: 4.5,
      windCapacityMw: 2.0,
    });

    assert.ok(result.dailyBaselineDiscomCostInr > result.dailyOptimizedCostInr);
    assert.ok(result.annualNetSavingsInr > 5000000, "Annual savings must exceed ₹50 Lakhs for 6 MVA plant");
    assert.ok(result.percentageSavings >= 15 && result.percentageSavings <= 55);
  });

  await t.test("Green Energy Share reflects physical renewable generation", () => {
    const result = solve96BlockDispatch({
      stateId: "rajasthan",
      contractDemandKva: 5000,
      solarCapacityMwp: 4.0,
      windCapacityMw: 2.0,
    });

    assert.ok(result.greenEnergySharePercent >= 30, `RE share ${result.greenEnergySharePercent}% should be >=30%`);
    assert.ok(result.greenEnergySharePercent <= 90, `RE share ${result.greenEnergySharePercent}% should be <=90%`);
  });
});

test("Enterprise Leads Repository & Audit Trail Engine", async (t) => {
  await t.test("Assigns high priority score (>=85) and 2-4h SLA to large C&I consumers", () => {
    const lead = leadsRepository.createInquiry({
      companyName: "Century Plyboards (I) Ltd",
      contactName: "Sunil Agarwal",
      designation: "VP Manufacturing",
      email: "sagarwal@centuryply.com",
      phone: "9830012345",
      gstin: "19AAACC1234F1Z8",
      state: "West Bengal",
      contractDemandKva: "7,500 kVA",
      enquiryType: "Group Captive Solar SPV & Open Access",
      message: "Looking for 6 MWp offsite solar SPV to offset high industrial grid tariff.",
    });

    assert.ok(lead.priorityScore >= 85, `Expected score >= 85, got ${lead.priorityScore}`);
    assert.ok(lead.slaWindowHours <= 4, `Expected SLA <= 4, got ${lead.slaWindowHours}`);
    assert.equal(lead.auditTrail.length, 1);
    assert.equal(lead.status, "NEW");
  });

  await t.test("Records state transition audit logs with actor and notes", () => {
    const lead = leadsRepository.createInquiry({
      companyName: "DCM Shriram Industries",
      contactName: "Praveen Gupta",
      designation: "Head Energy & Utilities",
      email: "pgupta@shriram.com",
      phone: "9818812345",
      state: "Uttar Pradesh",
      contractDemandKva: "12,000 kVA",
      enquiryType: "IEX Day-Ahead Market Advisory",
      message: "Optimization for Kota chemical complex.",
    });

    const updated = leadsRepository.updateInquiryStatus(
      lead.referenceId,
      "NDA_EXECUTED",
      "Lead Legal Counsel",
      "Mutual NDA executed under IT Act Section 43A."
    );

    assert.ok(updated);
    assert.equal(updated.status, "NDA_EXECUTED");
    assert.equal(updated.auditTrail.length, 2);
    assert.equal(updated.auditTrail[1].toStatus, "NDA_EXECUTED");
    assert.equal(updated.auditTrail[1].actor, "Lead Legal Counsel");
  });
});
