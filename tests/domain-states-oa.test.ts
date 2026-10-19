import test from "node:test";
import assert from "node:assert";
import {
  INDIAN_STATES_OA_DATA,
  POPULAR_STATES,
  calculateOpenAccessEconomics,
} from "../src/lib/constants/indian-states-oa-data.ts";

test("Indian States Open Access & Regulatory Tariff Model", async (t) => {
  await t.test("Popular States list matches expected 9 industrial heavyweights", () => {
    assert.strictEqual(POPULAR_STATES.length, 9);
    const stateIds = POPULAR_STATES.map((s) => s.stateId);
    assert.ok(stateIds.includes("uttar-pradesh"));
    assert.ok(stateIds.includes("gujarat"));
    assert.ok(stateIds.includes("maharashtra"));
    assert.ok(stateIds.includes("haryana"));
    assert.ok(stateIds.includes("rajasthan"));
    assert.ok(stateIds.includes("punjab"));
    assert.ok(stateIds.includes("tamil-nadu"));
    assert.ok(stateIds.includes("karnataka"));
    assert.ok(stateIds.includes("madhya-pradesh"));
  });

  await t.test("All state profiles contain authentic regulatory fields and DISCOM listings", () => {
    for (const [key, state] of Object.entries(INDIAN_STATES_OA_DATA)) {
      assert.ok(state.stateName.length > 2, `State name missing for ${key}`);
      assert.ok(state.sldcName.includes("SLDC"), `SLDC name invalid for ${key}: ${state.sldcName}`);
      assert.ok(state.discomNames.length >= 1, `DISCOM list empty for ${key}`);

      // Industrial Grid Tariffs across India typically range ₹7.00 to ₹11.00/kWh
      assert.ok(
        state.industrialGridTariffPerKwh >= 7.0 && state.industrialGridTariffPerKwh <= 11.0,
        `Unrealistic industrial tariff for ${key}: ₹${state.industrialGridTariffPerKwh}/kWh`
      );

      // Cross-Subsidy Surcharge (CSS)
      assert.ok(
        state.crossSubsidySurchargePerKwh >= 1.0 && state.crossSubsidySurchargePerKwh <= 3.0,
        `Unrealistic CSS for ${key}: ₹${state.crossSubsidySurchargePerKwh}/kWh`
      );

      // State Transmission Utility (STU) technical losses (2.5% to 5.0%)
      assert.ok(
        state.stuLossesPercent >= 2.5 && state.stuLossesPercent <= 5.0,
        `STU loss out of physical bounds for ${key}: ${state.stuLossesPercent}%`
      );

      // Green Open Access threshold: 100 kW as per MoP Green Energy Open Access Rules 2022
      assert.strictEqual(
        state.greenOpenAccessMinLoadKw,
        100,
        `Green OA minimum load must be 100 kW for ${key} per Ministry of Power rules`
      );

      // Conventional Open Access threshold: 1 MW under Electricity Act 2003
      assert.strictEqual(
        state.conventionalMinLoadMw,
        1,
        `Conventional OA minimum load must be 1 MW for ${key}`
      );
    }
  });

  await t.test("Voltage-level wheeling charges reflect physics (Higher kV = Lower wheeling cost)", () => {
    for (const [key, state] of Object.entries(INDIAN_STATES_OA_DATA)) {
      const w11 = state.wheelingChargesPerKwh["11kV"];
      const w33 = state.wheelingChargesPerKwh["33kV"];
      const w132 = state.wheelingChargesPerKwh["132kV"];

      assert.ok(w11 >= w33, `Expected 11kV wheeling (${w11}) >= 33kV wheeling (${w33}) in ${key}`);
      assert.ok(w33 >= w132, `Expected 33kV wheeling (${w33}) >= 132kV wheeling (${w132}) in ${key}`);
    }
  });

  await t.test("calculateOpenAccessEconomics: Statutory Group Captive Section 42 exemption (0 CSS / 0 AS)", () => {
    const captiveResult = calculateOpenAccessEconomics({
      stateId: "uttar-pradesh",
      contractDemandKva: 3500,
      monthlyConsumptionKwh: 850000,
      openAccessModel: "group-captive",
      powerSource: "solar",
      voltageLevel: "33kV",
    });

    assert.strictEqual(captiveResult.costBreakdown.crossSubsidySurcharge, 0, "Group Captive must have 0 CSS");
    assert.strictEqual(captiveResult.costBreakdown.additionalSurcharge, 0, "Group Captive must have 0 AS");
    assert.ok(captiveResult.perKwhSavings > 1.5, "Expected significant savings per unit under Group Captive");
    assert.ok(captiveResult.annualSavings > 10000000, "Annual savings must exceed ₹1 Crore for 3.5 MVA load");
  });

  await t.test("calculateOpenAccessEconomics: Third-Party PPA applies full SERC CSS and AS", () => {
    const thirdPartyResult = calculateOpenAccessEconomics({
      stateId: "uttar-pradesh",
      contractDemandKva: 3500,
      monthlyConsumptionKwh: 850000,
      openAccessModel: "third-party-ppa",
      powerSource: "solar",
      voltageLevel: "33kV",
    });

    const upState = INDIAN_STATES_OA_DATA["uttar-pradesh"];
    assert.strictEqual(thirdPartyResult.costBreakdown.crossSubsidySurcharge, upState.crossSubsidySurchargePerKwh);
    assert.strictEqual(thirdPartyResult.costBreakdown.additionalSurcharge, upState.additionalSurchargePerKwh);
    assert.ok(
      thirdPartyResult.landedOpenAccessRatePerKwh > 5.5,
      "Third party landed tariff should reflect surcharges"
    );
  });
});
