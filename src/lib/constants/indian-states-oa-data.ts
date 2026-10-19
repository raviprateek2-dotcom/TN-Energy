/**
 * Comprehensive State-wise Open Access & Electricity Tariff Matrix for Indian Industrial States
 * Grounded in authentic CERC / SERC Tariff Orders, Ministry of Power Green Energy Open Access (GEOA) Rules 2022,
 * and State Distribution Utility (Discom) Commercial Circulars.
 */

export interface VoltageWheelingCharges {
  "11kV": number; // ₹/kWh
  "33kV": number; // ₹/kWh
  "132kV": number; // ₹/kWh (typically nil or minimal for EHV injection)
}

export interface StateOpenAccessProfile {
  stateId: string;
  stateName: string;
  discomNames: string[];
  sldcName: string;
  sercName: string;
  sercWebsite: string;
  industrialGridTariffPerKwh: number; // Discom HT base tariff (₹7.80 to ₹9.50/kWh)
  crossSubsidySurchargePerKwh: number; // CSS (₹/kWh)
  additionalSurchargePerKwh: number; // AS (₹/kWh)
  wheelingChargesPerKwh: VoltageWheelingCharges;
  transmissionChargesPerKwh: number; // Intra-State STU transmission charge (₹/kWh)
  stuLossesPercent: number; // State Transmission Utility technical losses (3.2% to 4.5%)
  discomLossesPercent: number; // Discom technical wheeling losses %
  greenOpenAccessMinLoadKw: number; // 100 kW as per Ministry of Power Green Energy Open Access Rules 2022
  conventionalMinLoadMw: number; // 1 MW conventional OA threshold under Electricity Act 2003
  captiveCssExempt: boolean; // Section 42 Electricity Act 2003 statutory waiver
  captiveAsExempt: boolean; // Group Captive exemption from Additional Surcharge
  bankingAllowed: boolean;
  bankingCycle: "15-Minute Block" | "Monthly" | "Annual" | "Not Permitted";
  bankingChargesPercent: number; // Banking fee on injected units %
  benchmarkSolarPpaRatePerKwh: number; // Utility-scale Solar PPA benchmark
  benchmarkWindPpaRatePerKwh: number; // Wind PPA benchmark
  keyIndustrialHubs: string[];
  regulatoryOrderRef: string;
}

export type StateOpenAccessData = StateOpenAccessProfile;

export const INDIAN_STATES_OA_DATA: Record<string, StateOpenAccessProfile> = {
  "uttar-pradesh": {
    stateId: "uttar-pradesh",
    stateName: "Uttar Pradesh",
    discomNames: [
      "Paschimanchal Vidyut Vitran Nigam Ltd (PVVNL)",
      "Dakshinanchal Vidyut Vitran Nigam Ltd (DVVNL)",
      "Madhyanchal Vidyut Vitran Nigam Ltd (MVVNL)",
      "Purvanchal Vidyut Vitran Nigam Ltd (PuVVNL)",
      "Noida Power Company Limited (NPCL)",
    ],
    sldcName: "UPSLDC (Uttar Pradesh State Load Despatch Centre, Lucknow)",
    sercName: "UPERC (Uttar Pradesh Electricity Regulatory Commission)",
    sercWebsite: "https://www.uperc.org",
    industrialGridTariffPerKwh: 7.90,
    crossSubsidySurchargePerKwh: 1.95,
    additionalSurchargePerKwh: 0.78,
    wheelingChargesPerKwh: {
      "11kV": 0.58,
      "33kV": 0.42,
      "132kV": 0.18,
    },
    transmissionChargesPerKwh: 0.32,
    stuLossesPercent: 3.42,
    discomLossesPercent: 7.95,
    greenOpenAccessMinLoadKw: 100,
    conventionalMinLoadMw: 1.0,
    captiveCssExempt: true,
    captiveAsExempt: true,
    bankingAllowed: true,
    bankingCycle: "Monthly",
    bankingChargesPercent: 8.0,
    benchmarkSolarPpaRatePerKwh: 3.45,
    benchmarkWindPpaRatePerKwh: 3.90,
    keyIndustrialHubs: [
      "Ghaziabad (Sahibabad & Loni Industrial Areas)",
      "Greater Noida Knowledge Park & EcoTech",
      "Noida Sector 57-68 & Phase II",
      "Kanpur Rania & Panki",
      "Agra Foundry Nagar",
    ],
    regulatoryOrderRef: "UPERC Multi-Year Tariff Order FY 2024-25 & GEOA Regulations 2023",
  },

  "haryana": {
    stateId: "haryana",
    stateName: "Haryana",
    discomNames: [
      "Dakshin Haryana Bijli Vitran Nigam (DHBVN)",
      "Uttar Haryana Bijli Vitran Nigam (UHBVN)",
    ],
    sldcName: "Haryana SLDC (HVPNL, Sewah Panipat)",
    sercName: "HERC (Haryana Electricity Regulatory Commission)",
    sercWebsite: "https://www.herc.gov.in",
    industrialGridTariffPerKwh: 7.95,
    crossSubsidySurchargePerKwh: 1.90,
    additionalSurchargePerKwh: 0.94,
    wheelingChargesPerKwh: {
      "11kV": 0.62,
      "33kV": 0.44,
      "132kV": 0.15,
    },
    transmissionChargesPerKwh: 0.36,
    stuLossesPercent: 3.40,
    discomLossesPercent: 6.90,
    greenOpenAccessMinLoadKw: 100,
    conventionalMinLoadMw: 1.0,
    captiveCssExempt: true,
    captiveAsExempt: true,
    bankingAllowed: true,
    bankingCycle: "Monthly",
    bankingChargesPercent: 5.0,
    benchmarkSolarPpaRatePerKwh: 3.45,
    benchmarkWindPpaRatePerKwh: 4.10,
    keyIndustrialHubs: [
      "Gurugram IMT Manesar",
      "Faridabad Industrial Model Township",
      "Panipat Textile Cluster",
      "Sonipat Kundli & Rai",
      "Bawal Growth Centre",
    ],
    regulatoryOrderRef: "HERC ARR & Distribution Tariff Order FY 2024-25",
  },

  "rajasthan": {
    stateId: "rajasthan",
    stateName: "Rajasthan",
    discomNames: [
      "Jaipur Vidyut Vitran Nigam Ltd (JVVNL)",
      "Ajmer Vidyut Vitran Nigam Ltd (AVVNL)",
      "Jodhpur Vidyut Vitran Nigam Ltd (JdVVNL)",
    ],
    sldcName: "Rajasthan SLDC (RVPNL, Heerapura Jaipur)",
    sercName: "RERC (Rajasthan Electricity Regulatory Commission)",
    sercWebsite: "https://www.rerc.rajasthan.gov.in",
    industrialGridTariffPerKwh: 8.10,
    crossSubsidySurchargePerKwh: 1.88,
    additionalSurchargePerKwh: 0.85,
    wheelingChargesPerKwh: {
      "11kV": 0.52,
      "33kV": 0.38,
      "132kV": 0.12,
    },
    transmissionChargesPerKwh: 0.30,
    stuLossesPercent: 3.35,
    discomLossesPercent: 6.80,
    greenOpenAccessMinLoadKw: 100,
    conventionalMinLoadMw: 1.0,
    captiveCssExempt: true,
    captiveAsExempt: true,
    bankingAllowed: true,
    bankingCycle: "Annual",
    bankingChargesPercent: 10.0,
    benchmarkSolarPpaRatePerKwh: 3.10,
    benchmarkWindPpaRatePerKwh: 3.75,
    keyIndustrialHubs: [
      "Bhiwadi Industrial Belt",
      "Neemrana Japanese Zone",
      "Bhilwara Synthetic Textiles",
      "Jaipur Sitapura RIICO",
      "Udaipur Mineral Processing",
    ],
    regulatoryOrderRef: "RERC Open Access Regulations & Rajasthan RE Policy 2023",
  },

  "gujarat": {
    stateId: "gujarat",
    stateName: "Gujarat",
    discomNames: [
      "Dakshin Gujarat Vij Company Ltd (DGVCL)",
      "Madhya Gujarat Vij Company Ltd (MGVCL)",
      "Paschim Gujarat Vij Company Ltd (PGVCL)",
      "Uttar Gujarat Vij Company Ltd (UGVCL)",
      "Torrent Power Limited (Ahmedabad, Surat, Dahej)",
    ],
    sldcName: "Gujarat SLDC (GETCO, Gotri Vadodara)",
    sercName: "GERC (Gujarat Electricity Regulatory Commission)",
    sercWebsite: "https://www.gercin.org",
    industrialGridTariffPerKwh: 7.45,
    crossSubsidySurchargePerKwh: 1.68,
    additionalSurchargePerKwh: 0.40,
    wheelingChargesPerKwh: {
      "11kV": 0.32,
      "33kV": 0.22,
      "132kV": 0.08,
    },
    transmissionChargesPerKwh: 0.38,
    stuLossesPercent: 3.56,
    discomLossesPercent: 5.20,
    greenOpenAccessMinLoadKw: 100,
    conventionalMinLoadMw: 1.0,
    captiveCssExempt: true,
    captiveAsExempt: true,
    bankingAllowed: true,
    bankingCycle: "15-Minute Block",
    bankingChargesPercent: 0.0,
    benchmarkSolarPpaRatePerKwh: 3.25,
    benchmarkWindPpaRatePerKwh: 3.45,
    keyIndustrialHubs: [
      "Dahej PCPIR Petrochemical SEZ",
      "Sanand Automobile Hub",
      "Ankleshwar GIDC Chemicals",
      "Morbi Ceramic Cluster",
      "Hazira Heavy Industry Belt",
    ],
    regulatoryOrderRef: "GERC Tariff Order FY 2024-25 & Gujarat Renewable Policy 2023",
  },

  "maharashtra": {
    stateId: "maharashtra",
    stateName: "Maharashtra",
    discomNames: [
      "Maharashtra State Electricity Distribution Co. Ltd (MSEDCL)",
      "Tata Power Company - Distribution (TPC-D)",
      "Adani Electricity Mumbai Limited (AEML)",
      "Brihanmumbai Electric Supply & Transport (BEST)",
    ],
    sldcName: "MSLDC (MSETCL, Airoli Navi Mumbai)",
    sercName: "MERC (Maharashtra Electricity Regulatory Commission)",
    sercWebsite: "https://www.merc.gov.in",
    industrialGridTariffPerKwh: 8.60,
    crossSubsidySurchargePerKwh: 1.82,
    additionalSurchargePerKwh: 1.35,
    wheelingChargesPerKwh: {
      "11kV": 0.98,
      "33kV": 0.74,
      "132kV": 0.22,
    },
    transmissionChargesPerKwh: 0.44,
    stuLossesPercent: 3.18,
    discomLossesPercent: 6.50,
    greenOpenAccessMinLoadKw: 100,
    conventionalMinLoadMw: 1.0,
    captiveCssExempt: true,
    captiveAsExempt: true,
    bankingAllowed: true,
    bankingCycle: "Monthly",
    bankingChargesPercent: 2.0,
    benchmarkSolarPpaRatePerKwh: 3.50,
    benchmarkWindPpaRatePerKwh: 3.85,
    keyIndustrialHubs: [
      "Pune Chakan & Bhosari Auto Hub",
      "Thane-Belapur TTC Industrial Belt",
      "Nashik Ambad & Satpur",
      "Nagpur Butibori MIHAN",
      "Aurangabad Shendra-Bidkin DMIC",
    ],
    regulatoryOrderRef: "MERC Mid-Term Review (MTR) Order Case No. 226/2022",
  },

  "punjab": {
    stateId: "punjab",
    stateName: "Punjab",
    discomNames: [
      "Punjab State Power Corporation Limited (PSPCL)",
    ],
    sldcName: "Punjab SLDC (PSTCL, Ablowal Patiala)",
    sercName: "PSERC (Punjab State Electricity Regulatory Commission)",
    sercWebsite: "https://pserc.punjab.gov.in",
    industrialGridTariffPerKwh: 8.30,
    crossSubsidySurchargePerKwh: 2.05,
    additionalSurchargePerKwh: 0.92,
    wheelingChargesPerKwh: {
      "11kV": 0.65,
      "33kV": 0.46,
      "132kV": 0.16,
    },
    transmissionChargesPerKwh: 0.35,
    stuLossesPercent: 3.25,
    discomLossesPercent: 8.10,
    greenOpenAccessMinLoadKw: 100,
    conventionalMinLoadMw: 1.0,
    captiveCssExempt: true,
    captiveAsExempt: true,
    bankingAllowed: true,
    bankingCycle: "Annual",
    bankingChargesPercent: 6.0,
    benchmarkSolarPpaRatePerKwh: 3.55,
    benchmarkWindPpaRatePerKwh: 4.15,
    keyIndustrialHubs: [
      "Ludhiana Hosiery & Bicycle Engineering",
      "Mandi Gobindgarh Steel Rolling Mills",
      "Jalandhar Sports & Leather Goods",
      "Amritsar Textile Processing",
      "Mohali SAS Nagar Electronics",
    ],
    regulatoryOrderRef: "PSERC Tariff Order FY 2024-25 & PSERC Open Access Regulations",
  },

  "tamil-nadu": {
    stateId: "tamil-nadu",
    stateName: "Tamil Nadu",
    discomNames: [
      "Tamil Nadu Generation and Distribution Corporation (TANGEDCO)",
    ],
    sldcName: "Tamil Nadu SLDC (TANTRANSCO, Chennai)",
    sercName: "TNERC (Tamil Nadu Electricity Regulatory Commission)",
    sercWebsite: "https://www.tnerc.gov.in",
    industrialGridTariffPerKwh: 7.85,
    crossSubsidySurchargePerKwh: 2.10,
    additionalSurchargePerKwh: 0.70,
    wheelingChargesPerKwh: {
      "11kV": 0.68,
      "33kV": 0.48,
      "132kV": 0.18,
    },
    transmissionChargesPerKwh: 0.42,
    stuLossesPercent: 3.45,
    discomLossesPercent: 7.10,
    greenOpenAccessMinLoadKw: 100,
    conventionalMinLoadMw: 1.0,
    captiveCssExempt: true,
    captiveAsExempt: true,
    bankingAllowed: false,
    bankingCycle: "Not Permitted",
    bankingChargesPercent: 0.0,
    benchmarkSolarPpaRatePerKwh: 3.40,
    benchmarkWindPpaRatePerKwh: 3.35,
    keyIndustrialHubs: [
      "Sriperumbudur Auto & Electronics Corridor",
      "Oragadam SIPCOT Industrial Growth Centre",
      "Coimbatore Foundry & Textile Machinery",
      "Tirupur Knitwear Export Cluster",
      "Hosur Precision Engineering Hub",
    ],
    regulatoryOrderRef: "TNERC Multi-Year Tariff Order 2023-27 & GEOA Implementation Order",
  },

  "karnataka": {
    stateId: "karnataka",
    stateName: "Karnataka",
    discomNames: [
      "Bangalore Electricity Supply Company Ltd (BESCOM)",
      "Mangalore Electricity Supply Company Ltd (MESCOM)",
      "Hubli Electricity Supply Company Ltd (HESCOM)",
      "Gulbarga Electricity Supply Company Ltd (GESCOM)",
      "Chamundeshwari Electricity Supply Corporation (CESC)",
    ],
    sldcName: "Karnataka SLDC (KPTCL, Race Course Road Bengaluru)",
    sercName: "KERC (Karnataka Electricity Regulatory Commission)",
    sercWebsite: "https://www.kerc.karnataka.gov.in",
    industrialGridTariffPerKwh: 7.65,
    crossSubsidySurchargePerKwh: 1.75,
    additionalSurchargePerKwh: 0.00,
    wheelingChargesPerKwh: {
      "11kV": 0.54,
      "33kV": 0.38,
      "132kV": 0.14,
    },
    transmissionChargesPerKwh: 0.35,
    stuLossesPercent: 3.20,
    discomLossesPercent: 6.10,
    greenOpenAccessMinLoadKw: 100,
    conventionalMinLoadMw: 1.0,
    captiveCssExempt: true,
    captiveAsExempt: true,
    bankingAllowed: true,
    bankingCycle: "Monthly",
    bankingChargesPercent: 5.0,
    benchmarkSolarPpaRatePerKwh: 3.40,
    benchmarkWindPpaRatePerKwh: 3.65,
    keyIndustrialHubs: [
      "Peenya Industrial Estate",
      "Bommasandra & Jigani Industrial Area",
      "Whitefield Export Promotion Industrial Park (EPIP)",
      "Dharwad Belur Industrial Cluster",
      "Mysuru Hebbal & Nanjangud",
    ],
    regulatoryOrderRef: "KERC Tariff Order 2024 & KERC Green Energy Open Access Regulations",
  },

  "madhya-pradesh": {
    stateId: "madhya-pradesh",
    stateName: "Madhya Pradesh",
    discomNames: [
      "MP Poorv Kshetra Vidyut Vitaran Co. Ltd (MPPKVVCL - Jabalpur)",
      "MP Madhya Kshetra Vidyut Vitaran Co. Ltd (MPMKVVCL - Bhopal)",
      "MP Paschim Kshetra Vidyut Vitaran Co. Ltd (MPPoKVVCL - Indore)",
      "MP Power Management Company Limited (MPPMCL)",
    ],
    sldcName: "MP SLDC (MPPTCL, Nayagaon Jabalpur)",
    sercName: "MPERC (Madhya Pradesh Electricity Regulatory Commission)",
    sercWebsite: "https://www.mperc.in",
    industrialGridTariffPerKwh: 7.75,
    crossSubsidySurchargePerKwh: 1.65,
    additionalSurchargePerKwh: 0.60,
    wheelingChargesPerKwh: {
      "11kV": 0.56,
      "33kV": 0.40,
      "132kV": 0.15,
    },
    transmissionChargesPerKwh: 0.33,
    stuLossesPercent: 3.30,
    discomLossesPercent: 7.40,
    greenOpenAccessMinLoadKw: 100,
    conventionalMinLoadMw: 1.0,
    captiveCssExempt: true,
    captiveAsExempt: true,
    bankingAllowed: true,
    bankingCycle: "Monthly",
    bankingChargesPercent: 5.0,
    benchmarkSolarPpaRatePerKwh: 3.30,
    benchmarkWindPpaRatePerKwh: 3.70,
    keyIndustrialHubs: [
      "Pithampur Industrial Area (Automobile Capital)",
      "Dewas Chemical & Engineering Cluster",
      "Mandi Deep Heavy Engineering (Bhopal)",
      "Gwalior Malanpur Industrial Area",
      "Jabalpur Richhai & Bargi Engineering",
    ],
    regulatoryOrderRef: "MPERC Retail Supply Tariff Order FY 2024-25 & MP Renewable Energy Policy 2022",
  },
};

export const POPULAR_STATES = Object.values(INDIAN_STATES_OA_DATA);

/**
 * High-Precision Open Access Landed Cost Calculator
 */
export function calculateOpenAccessEconomics(params: {
  stateId: string;
  contractDemandKva: number;
  monthlyConsumptionKwh: number;
  openAccessModel: "group-captive" | "third-party-ppa" | "exchange-dam" | "rooftop-onsite";
  powerSource: "solar" | "wind" | "hybrid" | "thermal-exchange";
  voltageLevel?: "11kV" | "33kV" | "132kV";
}) {
  const state = INDIAN_STATES_OA_DATA[params.stateId] || INDIAN_STATES_OA_DATA["uttar-pradesh"];
  const voltage = params.voltageLevel || "33kV";

  const baseDiscomRate = state.industrialGridTariffPerKwh;
  const currentMonthlyDiscomBill = params.monthlyConsumptionKwh * baseDiscomRate;

  let generationTariffPerKwh = state.benchmarkSolarPpaRatePerKwh;
  let cssApplicable = state.crossSubsidySurchargePerKwh;
  let asApplicable = state.additionalSurchargePerKwh;

  if (params.powerSource === "wind") {
    generationTariffPerKwh = state.benchmarkWindPpaRatePerKwh;
  } else if (params.powerSource === "hybrid") {
    generationTariffPerKwh = (state.benchmarkSolarPpaRatePerKwh + state.benchmarkWindPpaRatePerKwh) / 2 + 0.15;
  } else if (params.powerSource === "thermal-exchange") {
    generationTariffPerKwh = 4.85; // Average IEX DAM clearing rate
  }

  // Statutory Captive & Group Captive Exemptions under Section 42 of Electricity Act 2003
  if (params.openAccessModel === "group-captive" || params.openAccessModel === "rooftop-onsite") {
    cssApplicable = 0;
    asApplicable = 0;
  }

  // Intra-State Transmission & Voltage-Specific Wheeling Charges
  const txCharge = state.transmissionChargesPerKwh;
  const wheelingCharge = state.wheelingChargesPerKwh[voltage];

  // Technical Losses Gross-Up (Energy injected must exceed consumed by total loss factor)
  const totalLossFactor = 1 + (state.stuLossesPercent + state.discomLossesPercent) / 100;
  const landedGenTariff = generationTariffPerKwh * totalLossFactor;

  // State SLDC / Scheduling / Metering overhead (standard ₹0.04/kWh)
  const sldcCharges = 0.04;

  const landedOpenAccessRatePerKwh =
    landedGenTariff +
    txCharge +
    wheelingCharge +
    cssApplicable +
    asApplicable +
    sldcCharges;

  const perKwhSavings = Math.max(0, baseDiscomRate - landedOpenAccessRatePerKwh);
  const monthlySavings = perKwhSavings * params.monthlyConsumptionKwh;
  const annualSavings = monthlySavings * 12;
  const percentageSavings = baseDiscomRate > 0 ? (perKwhSavings / baseDiscomRate) * 100 : 0;

  return {
    state,
    voltageLevel: voltage,
    baseDiscomRate,
    generationTariffPerKwh,
    landedOpenAccessRatePerKwh,
    perKwhSavings,
    currentMonthlyDiscomBill,
    projectedMonthlyOaBill: landedOpenAccessRatePerKwh * params.monthlyConsumptionKwh,
    monthlySavings,
    annualSavings,
    percentageSavings,
    costBreakdown: {
      generationCost: landedGenTariff,
      transmissionCharge: txCharge,
      wheelingCharge: wheelingCharge,
      crossSubsidySurcharge: cssApplicable,
      additionalSurcharge: asApplicable,
      sldcAndScheduling: sldcCharges,
    },
  };
}
