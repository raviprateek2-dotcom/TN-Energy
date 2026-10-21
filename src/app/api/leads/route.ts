import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { leadsRepository } from "@/lib/db/leads-repository";

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
  gstin: z
    .string()
    .max(15)
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Invalid GSTIN format (15 characters alphanumeric)"
    )
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v.toUpperCase().trim() : undefined)),
  state: z.string().min(1, "Please select a state").max(50).transform(sanitizeString),
  contractDemandKva: z
    .string()
    .min(1, "Contract demand is required")
    .max(30)
    .transform(sanitizeString),
  voltageLevel: z.string().max(20).optional().transform((v) => (v ? sanitizeString(v) : undefined)),
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
    .min(6, "Message must provide at least 6 characters of plant context")
    .max(2500)
    .transform(sanitizeString),
  consentGiven: z.boolean(),
});

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`leads-get:${ip}`, { limit: 60, windowMs: 60000 });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please wait." },
      { status: 429, headers: { "Retry-After": String(rateLimit.resetInSec) } }
    );
  }

  const allLeads = leadsRepository.getInquiries();

  return NextResponse.json({
    success: true,
    count: allLeads.length,
    leads: allLeads,
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

    // Persist lead with audit trail and automated priority scoring
    const stored = leadsRepository.createInquiry({
      companyName: lead.companyName,
      contactName: lead.contactName,
      designation: lead.designation,
      email: lead.email,
      phone: lead.phone,
      gstin: lead.gstin,
      state: lead.state,
      contractDemandKva: lead.contractDemandKva,
      voltageLevel: lead.voltageLevel,
      enquiryType: lead.enquiryType,
      currentDiscomTariffPerKwh: lead.currentDiscomTariffPerKwh,
      message: lead.message,
    });

    return NextResponse.json({
      success: true,
      message:
        "Enquiry received. Our power trading advisory team will contact you within the SLA window.",
      referenceId: stored.referenceId,
      priorityScore: stored.priorityScore,
      slaWindowHours: stored.slaWindowHours,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to process lead submission" },
      { status: 500 }
    );
  }
}
