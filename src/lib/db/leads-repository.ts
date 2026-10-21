/**
 * Enterprise Leads & Audit Log Repository
 * Implements durable file persistence with in-memory fallback, state-machine audit trails,
 * and high-priority C&I contract demand scoring.
 */

import fs from "fs";
import path from "path";

export type LeadStatus =
  | "NEW"
  | "ASSIGNED_TO_TRADER"
  | "NDA_EXECUTED"
  | "TARIFF_AUDIT_IN_PROGRESS"
  | "COMMERCIAL_TERM_SHEET_ISSUED"
  | "SLDC_CLEARANCE_FILED"
  | "CLOSED_WON"
  | "CLOSED_LOST";

export interface StoredLead {
  id: string;
  referenceId: string;
  companyName: string;
  contactName: string;
  designation: string;
  email: string;
  phone: string;
  gstin?: string;
  state: string;
  contractDemandKva: string;
  voltageLevel?: string;
  enquiryType: string;
  currentDiscomTariffPerKwh?: string;
  message?: string;
  priorityScore: number; // 1 to 100
  slaWindowHours: number; // 2, 4, or 24 hours
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
  auditTrail: {
    actor: string;
    fromStatus: LeadStatus;
    toStatus: LeadStatus;
    notes: string;
    timestamp: string;
  }[];
}

export interface BillAuditRecord {
  id: string;
  referenceId: string;
  companyName: string;
  state: string;
  discom: string;
  voltageKv: string;
  contractDemandKva: number;
  monthlyBillAmountInr: number;
  powerFactor: number;
  totalMonthlyLeakageInr: number;
  ndaAccepted: boolean;
  signatoryName: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const BILL_AUDITS_FILE = path.join(DATA_DIR, "bill-audits.json");

// Pre-seeded institutional client inquiries for testing and demo
const INITIAL_LEADS: StoredLead[] = [
  {
    id: "inq-001",
    referenceId: "TES-M4K9B2",
    companyName: "Varun Beverages Ltd",
    contactName: "Rajeev Singhal",
    designation: "CFO / Director - Finance",
    email: "rajeev.singhal@varunbeverages.com",
    phone: "9810123456",
    gstin: "09AAACV2458R1Z1",
    state: "Uttar Pradesh",
    contractDemandKva: "3,500 kVA",
    voltageLevel: "33kV",
    enquiryType: "Group Captive Solar SPV & Open Access",
    currentDiscomTariffPerKwh: "₹7.90/kWh",
    message: "Requirement for 5 MWp Group Captive Solar SPV to replace 45% grid drawl at Greater Noida bottling plant.",
    priorityScore: 92,
    slaWindowHours: 2,
    status: "TARIFF_AUDIT_IN_PROGRESS",
    createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    auditTrail: [
      {
        actor: "System Gateway",
        fromStatus: "NEW",
        toStatus: "ASSIGNED_TO_TRADER",
        notes: "High contract demand (>3,000 kVA). Auto-routed to Senior Power Trading Desk.",
        timestamp: new Date(Date.now() - 3600000 * 13).toISOString(),
      },
      {
        actor: "Trader-Desk-04",
        fromStatus: "ASSIGNED_TO_TRADER",
        toStatus: "TARIFF_AUDIT_IN_PROGRESS",
        notes: "PVVNL 33kV bill received. Power factor 0.93 audit commenced.",
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
    ],
  },
  {
    id: "inq-002",
    referenceId: "TES-L1X8Z0",
    companyName: "Kandhari Beverages (Coca-Cola Franchisee)",
    contactName: "Amanpreet Singh",
    designation: "VP Infrastructure & Energy",
    email: "amanpreet@kandharibev.com",
    phone: "9876543210",
    gstin: "03AAACK1122D1ZP",
    state: "Punjab",
    contractDemandKva: "6,000 kVA",
    voltageLevel: "66kV",
    enquiryType: "IEX DAM/RTM Exchange Trading Desk",
    currentDiscomTariffPerKwh: "₹7.85/kWh",
    message: "Seeking real-time 15-minute bidding desk for Nabha mega packaging facility to capture solar hour price dips.",
    priorityScore: 96,
    slaWindowHours: 2,
    status: "SLDC_CLEARANCE_FILED",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    auditTrail: [
      {
        actor: "System Gateway",
        fromStatus: "NEW",
        toStatus: "ASSIGNED_TO_TRADER",
        notes: "Mega industrial consumer (>5 MVA). Assigned to Lead Trader.",
        timestamp: new Date(Date.now() - 3600000 * 47).toISOString(),
      },
      {
        actor: "Trader-Desk-01",
        fromStatus: "ASSIGNED_TO_TRADER",
        toStatus: "SLDC_CLEARANCE_FILED",
        notes: "PSTCL Standing Clearance application uploaded to NOAR portal.",
        timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
      },
    ],
  },
];

class LeadsRepository {
  private leads: StoredLead[] = [...INITIAL_LEADS];
  private billAudits: BillAuditRecord[] = [];
  private persistenceAvailable = true;

  constructor() {
    this.initStorage();
  }

  private initStorage() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(LEADS_FILE)) {
        const raw = fs.readFileSync(LEADS_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.leads = parsed;
        }
      } else {
        this.persistLeads();
      }

      if (fs.existsSync(BILL_AUDITS_FILE)) {
        const raw = fs.readFileSync(BILL_AUDITS_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          this.billAudits = parsed;
        }
      }
    } catch {
      // In serverless / read-only contexts, fallback seamlessly to in-memory store
      this.persistenceAvailable = false;
    }
  }

  private persistLeads() {
    if (!this.persistenceAvailable) return;
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(LEADS_FILE, JSON.stringify(this.leads, null, 2), "utf-8");
    } catch {
      // Fallback silently if filesystem is locked
    }
  }

  private persistBillAudits() {
    if (!this.persistenceAvailable) return;
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(BILL_AUDITS_FILE, JSON.stringify(this.billAudits, null, 2), "utf-8");
    } catch {}
  }

  private computePriority(contractDemandStr: string): { score: number; sla: number } {
    const numeric = parseInt(contractDemandStr.replace(/\D/g, ""), 10) || 500;
    const isMva = contractDemandStr.toLowerCase().includes("mva") || contractDemandStr.toLowerCase().includes("mw");
    const kvaEquivalent = isMva ? numeric * 1000 : numeric;

    if (kvaEquivalent >= 5000) {
      return { score: 98, sla: 2 }; // 2-hour SLA for mega consumers
    } else if (kvaEquivalent >= 2000) {
      return { score: 85, sla: 4 }; // 4-hour SLA
    } else if (kvaEquivalent >= 500) {
      return { score: 70, sla: 12 };
    }
    return { score: 55, sla: 24 };
  }

  public getInquiries(): StoredLead[] {
    return [...this.leads];
  }

  public getInquiryByReference(referenceId: string): StoredLead | undefined {
    return this.leads.find((l) => l.referenceId.toLowerCase() === referenceId.toLowerCase());
  }

  public createInquiry(payload: {
    companyName: string;
    contactName: string;
    designation: string;
    email: string;
    phone: string;
    gstin?: string;
    state: string;
    contractDemandKva: string;
    voltageLevel?: string;
    enquiryType: string;
    currentDiscomTariffPerKwh?: string;
    message?: string;
  }): StoredLead {
    const { score, sla } = this.computePriority(payload.contractDemandKva);
    const now = new Date().toISOString();
    const referenceId = `TES-${Date.now().toString(36).toUpperCase()}`;

    const newLead: StoredLead = {
      id: `inq-${Date.now()}`,
      referenceId,
      companyName: payload.companyName,
      contactName: payload.contactName,
      designation: payload.designation,
      email: payload.email,
      phone: payload.phone,
      gstin: payload.gstin,
      state: payload.state,
      contractDemandKva: payload.contractDemandKva,
      voltageLevel: payload.voltageLevel,
      enquiryType: payload.enquiryType,
      currentDiscomTariffPerKwh: payload.currentDiscomTariffPerKwh,
      message: payload.message,
      priorityScore: score,
      slaWindowHours: sla,
      status: "NEW",
      createdAt: now,
      updatedAt: now,
      auditTrail: [
        {
          actor: "System Gateway",
          fromStatus: "NEW",
          toStatus: "NEW",
          notes: `Lead captured via portal. Assigned Priority Score: ${score}/100 with ${sla}-hour SLA window.`,
          timestamp: now,
        },
      ],
    };

    this.leads.unshift(newLead);
    this.persistLeads();

    // Trigger enterprise webhook simulation
    this.dispatchOmnichannelAlert(newLead);

    return newLead;
  }

  public updateInquiryStatus(
    referenceId: string,
    newStatus: LeadStatus,
    actor: string,
    notes: string
  ): StoredLead | null {
    const lead = this.getInquiryByReference(referenceId);
    if (!lead) return null;

    const fromStatus = lead.status;
    lead.status = newStatus;
    lead.updatedAt = new Date().toISOString();
    lead.auditTrail.push({
      actor,
      fromStatus,
      toStatus: newStatus,
      notes,
      timestamp: lead.updatedAt,
    });

    this.persistLeads();
    return lead;
  }

  public recordBillAudit(payload: Omit<BillAuditRecord, "id" | "createdAt">): BillAuditRecord {
    const newRecord: BillAuditRecord = {
      ...payload,
      id: `audit-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.billAudits.unshift(newRecord);
    this.persistBillAudits();
    return newRecord;
  }

  public getBillAudits(): BillAuditRecord[] {
    return [...this.billAudits];
  }

  private dispatchOmnichannelAlert(lead: StoredLead) {
    if (lead.priorityScore >= 80) {
      console.log(`[INSTITUTIONAL ALERT - SLA ${lead.slaWindowHours}H]`, {
        referenceId: lead.referenceId,
        company: lead.companyName,
        demand: lead.contractDemandKva,
        state: lead.state,
        contact: `${lead.contactName} (${lead.phone})`,
      });
    }
  }
}

export const leadsRepository = new LeadsRepository();
