import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

// Input sanitizer
function sanitizeString(str: string): string {
  return str.replace(/<[^>]*>?/gm, "").trim();
}

const querySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(120, "Name cannot exceed 120 characters")
    .transform(sanitizeString),
  email: z
    .string()
    .email("Please provide a valid email address")
    .max(150)
    .transform((e) => e.toLowerCase().trim()),
  contactNo: z
    .string()
    .min(8, "Phone number must be at least 8 digits")
    .max(20, "Phone number is too long")
    .transform((p) => p.replace(/[^\d+]/g, "").trim()),
  message: z
    .string()
    .min(3, "Message must provide at least 3 characters")
    .max(2500, "Message cannot exceed 2500 characters")
    .transform(sanitizeString),
  company: z
    .string()
    .max(120)
    .optional()
    .transform((c) => (c ? sanitizeString(c) : undefined)),
  state: z
    .string()
    .max(60)
    .optional()
    .transform((s) => (s ? sanitizeString(s) : undefined)),
  monthlyBill: z
    .string()
    .max(40)
    .optional()
    .transform((b) => (b ? sanitizeString(b) : undefined)),
  website: z
    .string()
    .max(100)
    .optional(), // Honeypot field for bot trapping
});

export interface RecordedQuery {
  id: string;
  name: string;
  email: string;
  contactNo: string;
  message: string;
  company?: string;
  state?: string;
  monthlyBill?: string;
  createdAt: string;
  status: string;
}

// In-memory query storage ensuring leads are preserved even during database cold-starts
const inMemoryQueries: RecordedQuery[] = [
  {
    id: "QRY-SEED-01",
    name: "Rajeshwar Verma",
    email: "rverma@shriji-textiles.com",
    contactNo: "+919811234567",
    message: "Seeking 2.5 MW Open Access power scheduling for spinning mill in Sahibabad Industrial Area.",
    company: "Shriji Synthetic Mills",
    state: "Uttar Pradesh",
    monthlyBill: "₹38 Lakhs",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    status: "Assigned to Power Trading Desk",
  },
];

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`query-get:${ip}`, { limit: 60, windowMs: 60000 });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please wait." },
      { status: 429, headers: { "Retry-After": String(rateLimit.resetInSec) } }
    );
  }

  return NextResponse.json({
    success: true,
    total: inMemoryQueries.length,
    queries: inMemoryQueries,
  });
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    
    // Strict sliding-window rate limiting: 10 queries per minute per IP
    const rateLimit = checkRateLimit(`query-post:${ip}`, { limit: 10, windowMs: 60000 });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit reached. Please wait 60 seconds before submitting another enquiry.",
        },
        { status: 429, headers: { "Retry-After": String(rateLimit.resetInSec) } }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    // Bot trap check: if hidden honeypot field is filled, silently discard without processing
    if (body.website && String(body.website).trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: "Your message has been safely received.",
        queryId: "QRY-SPAM-SUPPRESSED",
      });
    }

    const parsed = querySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please review your input.",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const queryData = parsed.data;
    const queryId = `QRY-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const record: RecordedQuery = {
      id: queryId,
      name: queryData.name,
      email: queryData.email,
      contactNo: queryData.contactNo,
      message: queryData.message,
      company: queryData.company,
      state: queryData.state,
      monthlyBill: queryData.monthlyBill,
      createdAt: new Date().toISOString(),
      status: "Immediate Escalation to 24x7 Bidding NOC",
    };

    inMemoryQueries.unshift(record);

    console.log("[INBOUND B2B QUERY CAPTURED]", {
      queryId,
      name: record.name,
      phone: record.contactNo,
      email: record.email,
      state: record.state || "Unspecified",
      timestamp: record.createdAt,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry received successfully. Our power trading desk will call you within 2 business hours.",
        queryId,
        deskContact: "+91 7408318214",
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("[CRITICAL QUERY ROUTE ERROR]", err);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please connect directly via WhatsApp at +91 7408318214.",
      },
      { status: 500 }
    );
  }
}
