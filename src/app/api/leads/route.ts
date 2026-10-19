import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  companyName: z.string().min(2),
  contactName: z.string().min(2),
  designation: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^[6-9]\d{9}$/),
  state: z.string().min(1),
  contractDemandKva: z.string().min(1),
  enquiryType: z.string().min(1),
  currentDiscomTariffPerKwh: z.string().optional(),
  message: z.string().min(10),
  consentGiven: z.boolean(),
});

const inMemoryLeads: Array<Record<string, unknown>> = [
  {
    referenceId: "TES-M4K9B2",
    companyName: "Varun Beverages Ltd",
    contactName: "Rajeev Singhal",
    designation: "CFO / Director - Finance",
    state: "Uttar Pradesh",
    contractDemandKva: "3,500 kVA",
    enquiryType: "Group Captive Solar SPV & Open Access",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: "Technical Due Diligence",
  },
  {
    referenceId: "TES-L1X8Z0",
    companyName: "Kandhari Beverages (Coca-Cola Franchisee)",
    contactName: "Amanpreet Singh",
    designation: "VP Infrastructure & Energy",
    state: "Punjab",
    contractDemandKva: "6,000 kVA",
    enquiryType: "IEX DAM/RTM Exchange Trading Desk",
    createdAt: new Date(Date.now() - 3600000 * 26).toISOString(),
    status: "SLDC Standing Clearance In Progress",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    count: inMemoryLeads.length,
    leads: inMemoryLeads,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const lead = parsed.data;
    const referenceId = `TES-${Date.now().toString(36).toUpperCase()}`;

    // Record in queue
    inMemoryLeads.unshift({
      referenceId,
      companyName: lead.companyName,
      contactName: lead.contactName,
      designation: lead.designation,
      email: lead.email,
      phone: lead.phone,
      state: lead.state,
      contractDemandKva: lead.contractDemandKva,
      enquiryType: lead.enquiryType,
      currentDiscomTariffPerKwh: lead.currentDiscomTariffPerKwh,
      message: lead.message,
      createdAt: new Date().toISOString(),
      status: "Under Review by 24x7 Bidding Desk",
    });

    console.log("[LEAD CAPTURED]", {
      timestamp: new Date().toISOString(),
      referenceId,
      ...lead,
    });

    return NextResponse.json({
      success: true,
      message:
        "Enquiry received. Our power trading advisory team will contact you within 48 working hours.",
      referenceId,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to process lead submission" },
      { status: 500 }
    );
  }
}
