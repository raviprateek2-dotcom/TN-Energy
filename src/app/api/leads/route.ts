import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

// Input Sanitizer: strips HTML markup and trims dangerous characters
function sanitizeString(str: string): string {
  return str.replace(/<[^>]*>?/gm, "").trim();
}

const leadSchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(120)
    .transform(sanitizeString),
  contactName: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(80)
    .transform(sanitizeString),
  designation: z
    .string()
    .min(2, "Designation must be at least 2 characters")
    .max(80)
    .transform(sanitizeString),
  email: z
    .string()
    .email("Please provide a valid corporate email address")
    .max(120)
    .transform((e) => e.toLowerCase().trim()),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please provide a valid 10-digit Indian mobile number")
    .transform((p) => p.trim()),
  state: z.string().min(1, "Please select a state").max(50).transform(sanitizeString),
  contractDemandKva: z
    .string()
    .min(1, "Contract demand is required")
    .max(30)
    .transform(sanitizeString),
  enquiryType: z
    .string()
    .min(1, "Enquiry type is required")
    .max(100)
    .transform(sanitizeString),
  currentDiscomTariffPerKwh: z
    .string()
    .max(20)
    .optional()
    .transform((val) => (val ? sanitizeString(val) : undefined)),
  message: z
    .string()
    .min(10, "Message must provide at least 10 characters of plant context")
    .max(2500)
    .transform(sanitizeString),
  consentGiven: z.boolean(),
});

export interface StoredLead {
  referenceId: string;
  companyName: string;
  contactName: string;
  designation: string;
  email?: string;
  phone?: string;
  state: string;
  contractDemandKva: string;
  enquiryType: string;
  currentDiscomTariffPerKwh?: string;
  message?: string;
  createdAt: string;
  status: string;
}

const inMemoryLeads: StoredLead[] = [
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

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`leads-get:${ip}`, { limit: 60, windowMs: 60000 });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please wait." },
      { status: 429, headers: { "Retry-After": String(rateLimit.resetInSec) } }
    );
  }

  return NextResponse.json({
    success: true,
    count: inMemoryLeads.length,
    leads: inMemoryLeads,
  });
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    // Rate limit: 20 lead submissions per minute per client IP
    const rateLimit = checkRateLimit(`leads-post:${ip}`, { limit: 20, windowMs: 60000 });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please wait a moment before submitting another enquiry.",
        },
        { status: 429, headers: { "Retry-After": String(rateLimit.resetInSec) } }
      );
    }

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
      companyName: lead.companyName,
      contactName: lead.contactName,
      phone: lead.phone,
      state: lead.state,
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
