import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parseElectricityBillText } from "../src/lib/bill-parser/client-bill-ocr.ts";

describe("Real In-Browser Electricity Bill Parser & Heuristic OCR Engine", () => {
  it("should accurately parse a UP Paschimanchal (PVVNL) HT bill text", () => {
    const rawBillText = `
      PASCHIMANCHAL VIDYUT VITRAN NIGAM LIMITED (PVVNL)
      HIGH TENSION ELECTRICITY INVOICE - 33 kV SUPPLY
      Consumer Name: M/S GANPATI ROLLING MILLS PVT LTD
      Sanctioned Load / Contract Demand: 8,500 kVA
      Recorded Maximum Demand: 6,420 kVA
      Billed Energy Consumption: 2,850,000 kVAh
      Average Billing Power Factor: 0.932
      Net Current Bill Payable: Rs. 2,36,55,000
    `;

    const result = parseElectricityBillText(rawBillText, "PVVNL_HT_OCT2024.pdf");

    assert.equal(result.state, "Uttar Pradesh");
    assert.match(result.discomName, /PVVNL/i);
    assert.equal(result.contractDemandKva, 8500);
    assert.equal(result.recordedMaxDemandKva, 6420);
    // Deemed 85% rule: 8500 * 0.85 = 7225
    assert.equal(result.billingDemandKva, 7225);
    assert.equal(result.powerFactor, 0.932);
    assert.equal(result.monthlyBilledKvah, 2850000);
    assert.equal(result.totalBillAmountInr, 23655000);
    assert.ok(result.effectiveRatePerKwh > 8.0, "Effective rate should be > 8.0 Rs/kVAh");
    assert.ok(result.findings.length >= 2, "Should identify PF and demand headroom findings");
    assert.ok(result.totalMonthlySavingsInr > 0, "Should compute positive potential savings");
    assert.ok(result.confidenceScore >= 70, "Confidence score should be high for matched bill");
  });

  it("should accurately parse a Gujarat DGVCL 66 kV bill text", () => {
    const rawBillText = `
      DAKSHIN GUJARAT VIJ COMPANY LIMITED (DGVCL)
      HT INDUSTRIAL TARIFF HTP-I (66 kV)
      Consumer: M/S RELIABLE TEXTILE PARK LTD
      Contract Demand: 12,000 kVA
      Recorded Demand: 10,800 kVA
      Total Units Billed: 4,600,000 kVAh
      Billing PF: 0.982
      Bill Amount INR: 3,91,00,000
    `;

    const result = parseElectricityBillText(rawBillText, "DGVCL_66kV_Bill.pdf");

    assert.equal(result.state, "Gujarat");
    assert.match(result.discomName, /DGVCL/i);
    assert.equal(result.contractDemandKva, 12000);
    assert.equal(result.recordedMaxDemandKva, 10800);
    assert.equal(result.powerFactor, 0.982);
    assert.equal(result.monthlyBilledKvah, 4600000);
    assert.equal(result.totalBillAmountInr, 39100000);
    assert.equal(result.voltageKv, "66 kV");
    assert.ok(result.confidenceScore >= 70);
  });

  it("should recognize Maharashtra MSEDCL and calculate open access arbitrage", () => {
    const rawBillText = `
      MAHARASHTRA STATE ELECTRICITY DISTRIBUTION CO. LTD. (MSEDCL)
      HT INDUSTRIAL CONSUMER BILL
      Sanctioned Demand: 4,000 kVA
      Actual Demand: 3,200 kVA
      Billing Power Factor: 0.910
      Energy Consumed: 1,500,000 kVAh
      Net Payable: Rs. 1,41,00,000
    `;

    const result = parseElectricityBillText(rawBillText, "MSEDCL_HT_Bill.pdf");

    assert.equal(result.state, "Maharashtra");
    assert.match(result.discomName, /MSEDCL/i);
    assert.equal(result.contractDemandKva, 4000);
    assert.equal(result.powerFactor, 0.91);
    assert.equal(result.monthlyBilledKvah, 1500000);
    assert.ok(result.findings.some(f => f.title.includes("Sub-Optimal Power Factor")));
    assert.ok(result.findings.some(f => f.title.includes("Open Access")));
  });

  it("should degrade gracefully on arbitrary or noisy text with sensible industrial defaults", () => {
    const noisyText = "Invoice received from utility. Please audit.";
    const result = parseElectricityBillText(noisyText, "unknown_scan.pdf");

    assert.ok(result.contractDemandKva > 0);
    assert.ok(result.monthlyBilledKvah > 0);
    assert.ok(result.totalBillAmountInr > 0);
    assert.ok(result.confidenceScore <= 60, "Noisy text should have low confidence score");
  });
});
