import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { INDIAN_STATES_OA_DATA } from "@/lib/constants/indian-states-oa-data";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const calculatorSchema = z.object({
  stateKey: z.string().trim().min(1).max(50),
  contractDemandKva: z.number().min(100).max(500000),
  annualConsumptionMwh: z.number().min(0.1),
  voltageLevel: z.enum(["11kV", "33kV", "132kV"]),
  discomTariffPerKwh: z.number().min(1).max(20),
  rooftopCapacityKwp: z.number().min(0).optional(),
  groupCaptiveMw: z.number().min(0).optional(),
  iexProcurementMwh: z.number().min(0).optional(),
  iexAvgRatePerKwh: z.number().min(1).max(10).optional().default(3.85),
  includeGreenOA: z.boolean().optional().default(false),
});

export type CalculatorInput = z.infer<typeof calculatorSchema>;

export interface CalculatorResult {
  success: true;
  inputs: CalculatorInput;
  state: {
    name: string;
    sldcName: string;
    discomNames: string[];
  };
  savings: {
    rooftopSavingsLakhsPerYear: number;
    openAccessSavingsLakhsPerYear: number;
    totalAnnualSavingsLakhsPerYear: number;
    totalAnnualSavingsCroresPerYear: number;
    percentageSavingVsDiscom: number;
    blendedLandedCostPerKwh: number;
    baselineDiscomCostPerKwh: number;
  };
  charges: {
    cssPerKwh: number;
    additionalSurchargePerKwh: number;
    wheelingChargesPerKwh: number;
    stuLossesPercent: number;
    effectiveCssApplied: number; // 0 if Green OA exemption applies
  };
  recommendations: string[];
  eligibility: {
    greenOaEligible: boolean;
    conventionalOaEligible: boolean;
    minLoadKwForGreenOA: number;
    minLoadMwForConventionalOA: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    // 60 calculation requests per minute per IP
    const rateLimit = checkRateLimit(`calc:${ip}`, { limit: 60, windowMs: 60000 });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: "Rate limit exceeded. Please wait a moment." },
        { status: 429, headers: { "Retry-After": String(rateLimit.resetInSec) } }
      );
    }

    const body = await request.json();
    const parsed = calculatorSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const inp = parsed.data;
    const stateData = INDIAN_STATES_OA_DATA[inp.stateKey];

    if (!stateData) {
      return NextResponse.json(
        { success: false, error: `State "${inp.stateKey}" not found in database` },
        { status: 404 }
      );
    }

    const contractDemandKw = inp.contractDemandKva * 0.9; // assume 0.9 PF
    const annualConsumptionKwh = inp.annualConsumptionMwh * 1000;

    // Eligibility
    const greenOaEligible = contractDemandKw >= stateData.greenOpenAccessMinLoadKw;
    const conventionalOaEligible = contractDemandKw >= stateData.conventionalMinLoadMw * 1000;

    // CSS: Green OA (and Group Captive) exempted per MoP 2022 rules
    const cssPerKwh = inp.includeGreenOA ? 0 : stateData.crossSubsidySurchargePerKwh;
    const additionalSurchargePerKwh = inp.includeGreenOA ? 0 : stateData.additionalSurchargePerKwh;
    const wheelingCharges =
      stateData.wheelingChargesPerKwh[inp.voltageLevel as "11kV" | "33kV" | "132kV"];
    const stuLossFactor = 1 + stateData.stuLossesPercent / 100;

    // --- Rooftop Solar Savings ---
    const rooftopKwp = inp.rooftopCapacityKwp ?? 0;
    const rooftopLCOEPerKwh = 1.55; // Topnotch benchmark for ALMM TOPCon with RESCO at 25yr
    const rooftopCUF = 0.19; // 19% CUF typical for North India
    const rooftopAnnualGenerationKwh = rooftopKwp * rooftopCUF * 8760;
    const rooftopSavingPerKwh = inp.discomTariffPerKwh - rooftopLCOEPerKwh;
    const rooftopSavingsLakhs = (rooftopAnnualGenerationKwh * rooftopSavingPerKwh) / 100000;

    // --- Open Access (IEX Exchange) Savings ---
    const iexProcurementKwh = (inp.iexProcurementMwh ?? 0) * 1000;
    const iexRate = inp.iexAvgRatePerKwh ?? 3.85;
    // Effective landed IEX rate = exchange rate + wheeling + STU losses adjustment + CSS + AS
    const iexLandedRate =
      (iexRate + wheelingCharges + cssPerKwh + additionalSurchargePerKwh) * stuLossFactor;
    const iexSavingPerKwh = inp.discomTariffPerKwh - iexLandedRate;
    const iexSavingsLakhs = (iexProcurementKwh * iexSavingPerKwh) / 100000;

    // --- Group Captive Savings ---
    const captiveMw = inp.groupCaptiveMw ?? 0;
    const captivePpaRate = 3.85; // ₹/kWh blended captive PPA (no CSS/AS)
    const captiveCUF = 0.22; // wind-solar hybrid
    const captiveAnnualKwh = captiveMw * 1000 * captiveCUF * 8760;
    const captiveLandedRate = (captivePpaRate + wheelingCharges) * stuLossFactor; // no CSS for captive
    const captiveSavingPerKwh = inp.discomTariffPerKwh - captiveLandedRate;
    const captiveSavingsLakhs = (captiveAnnualKwh * captiveSavingPerKwh) / 100000;

    const oaSavingsLakhs = iexSavingsLakhs + captiveSavingsLakhs;
    const totalSavingsLakhs = rooftopSavingsLakhs + oaSavingsLakhs;
    const totalSavingsCrores = totalSavingsLakhs / 100;

    // Blended tariff calculation
    const totalProcuredKwh =
      rooftopAnnualGenerationKwh +
      iexProcurementKwh +
      captiveAnnualKwh;
    const remainingDiscomKwh = Math.max(0, annualConsumptionKwh - totalProcuredKwh);
    const totalCost =
      rooftopAnnualGenerationKwh * rooftopLCOEPerKwh +
      iexProcurementKwh * iexLandedRate +
      captiveAnnualKwh * captiveLandedRate +
      remainingDiscomKwh * inp.discomTariffPerKwh;
    const blendedRate = annualConsumptionKwh > 0 ? totalCost / annualConsumptionKwh : inp.discomTariffPerKwh;

    const percentageSaving =
      ((inp.discomTariffPerKwh - blendedRate) / inp.discomTariffPerKwh) * 100;

    // Recommendations
    const recommendations: string[] = [];
    if (rooftopKwp === 0 && contractDemandKw >= 100)
      recommendations.push(
        `Consider ALMM-certified rooftop solar (est. ${Math.round(contractDemandKw * 0.3)} kWp) at ₹${rooftopLCOEPerKwh}/kWh LCOE — zero CSS, immediate savings.`
      );
    if (!greenOaEligible)
      recommendations.push(
        `Load (${contractDemandKw.toFixed(0)} kW) below ${stateData.greenOpenAccessMinLoadKw} kW Green OA threshold in ${stateData.stateName}. Consider aggregating multiple units.`
      );
    if (greenOaEligible && !conventionalOaEligible)
      recommendations.push(
        `Eligible for Green Energy Open Access (100 kW threshold) with zero CSS in ${stateData.stateName} under MoP 2022 Rules.`
      );
    if (conventionalOaEligible && captiveMw === 0)
      recommendations.push(
        `With ≥1 MW load, explore Group Captive Solar SPV (26:51 structure) — full CSS (₹${stateData.crossSubsidySurchargePerKwh}/kWh) exemption applies, saving ~₹${(stateData.crossSubsidySurchargePerKwh + stateData.additionalSurchargePerKwh).toFixed(2)}/kWh vs. third-party OA.`
      );
    if (iexProcurementKwh === 0 && conventionalOaEligible)
      recommendations.push(
        `IEX DAM solar-hour procurement at ~₹${(iexRate).toFixed(2)}/kWh can replace DISCOM baseload. Contact our 24×7 bidding desk to initiate SLDC standing clearance.`
      );

    const result: CalculatorResult = {
      success: true,
      inputs: inp,
      state: {
        name: stateData.stateName,
        sldcName: stateData.sldcName,
        discomNames: stateData.discomNames,
      },
      savings: {
        rooftopSavingsLakhsPerYear: parseFloat(rooftopSavingsLakhs.toFixed(2)),
        openAccessSavingsLakhsPerYear: parseFloat(oaSavingsLakhs.toFixed(2)),
        totalAnnualSavingsLakhsPerYear: parseFloat(totalSavingsLakhs.toFixed(2)),
        totalAnnualSavingsCroresPerYear: parseFloat(totalSavingsCrores.toFixed(2)),
        percentageSavingVsDiscom: parseFloat(percentageSaving.toFixed(1)),
        blendedLandedCostPerKwh: parseFloat(blendedRate.toFixed(2)),
        baselineDiscomCostPerKwh: inp.discomTariffPerKwh,
      },
      charges: {
        cssPerKwh: stateData.crossSubsidySurchargePerKwh,
        additionalSurchargePerKwh: stateData.additionalSurchargePerKwh,
        wheelingChargesPerKwh: wheelingCharges,
        stuLossesPercent: stateData.stuLossesPercent,
        effectiveCssApplied: cssPerKwh,
      },
      recommendations,
      eligibility: {
        greenOaEligible,
        conventionalOaEligible,
        minLoadKwForGreenOA: stateData.greenOpenAccessMinLoadKw,
        minLoadMwForConventionalOA: stateData.conventionalMinLoadMw,
      },
    };

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal calculation error" },
      { status: 500 }
    );
  }
}
