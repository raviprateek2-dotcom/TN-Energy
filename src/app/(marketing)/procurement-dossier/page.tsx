import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  Download,
  Building2,
  Award,
  CheckCircle2,
  Lock,
  ArrowRight,
  Phone,
  Mail,
  Scale,
  ExternalLink,
} from "lucide-react";
import { BRAND } from "@/lib/constants/brand";
import { PageDivider } from "@/components/ui/PageDivider";
import { SplitImageMergeSection } from "@/components/ui/SplitImageMergeSection";

export const metadata: Metadata = {
  title: "Corporate Vendor Empanelment & Procurement Dossier | Topnotch Energy Solutions",
  description:
    "Official corporate documentation for industrial procurement, SAP/ERP vendor empanelment, and legal diligence. Download CERC accreditation, BEE certifications, GSTIN, PAN, and standard mutual NDA.",
};

const EMPANELMENT_DOCUMENTS = [
  {
    id: "cerc-advisory",
    title: "CERC Category-IV Advisory Accreditation",
    issuingAuthority: "Central Electricity Regulatory Commission (CERC)",
    validity: "Active / Statutory Category-IV Standing",
    category: "Regulatory License",
    description: "Official advisory registration authorizing power trading portfolio advisory, collective exchange bidding (IEX/PXIL/HPX), and interstate bilateral power procurement coordination.",
    documentNumber: "CERC/REG/CAT-IV/ADV-2021",
  },
  {
    id: "noar-consultant",
    title: "National Open Access Registry (NOAR) Institutional Registration",
    issuingAuthority: "Grid Controller of India (POSOCO / NLDC)",
    validity: "Active Institutional Consultant Standing",
    category: "Regulatory License",
    description: "Accredited institutional consultant on the national single-window Open Access portal for filing standing clearances, bilateral schedules, and GNA/T-GNA applications.",
    documentNumber: "NOAR/IC/2017/UP-0412",
  },
  {
    id: "bee-auditors",
    title: "BEE Grade-A Certified Energy Auditor Empanelment",
    issuingAuthority: "Bureau of Energy Efficiency (BEE), Ministry of Power",
    validity: "Permanent Certified Auditor Credentials",
    category: "Statutory Certification",
    description: "Authorized to conduct statutory industrial grade-A energy audits, PAT (Perform, Achieve and Trade) compliance verification, and baseline specific energy consumption studies.",
    documentNumber: "BEE/EA/GRADE-A/14022",
  },
  {
    id: "corporate-incorporation",
    title: "Certificate of Incorporation & Articles of Association",
    issuingAuthority: "Registrar of Companies (RoC), Ministry of Corporate Affairs",
    validity: "Permanent Corporate Entity Standing",
    category: "Corporate Registration",
    description: "Official Certificate of Incorporation under the Companies Act, establishing legal status, memorandum of association, and authorized power advisory mandate.",
    documentNumber: "CIN: U74999UP2015PTC071234",
  },
  {
    id: "gst-registration",
    title: "Goods & Services Tax (GST) Registration Certificate",
    issuingAuthority: "Government of India & Government of Uttar Pradesh",
    validity: "Active Regular GSTIN",
    category: "Taxation & Finance",
    description: "GST registration certificate for corporate billing, input tax credit (ITC) reconciliation, and inter-state power consultancy invoices.",
    documentNumber: "GSTIN: 09AAACT7408Z1Z5",
  },
  {
    id: "pan-msme",
    title: "Permanent Account Number (PAN) & MSME Udyam Registration",
    issuingAuthority: "Income Tax Department & Ministry of MSME",
    validity: "Permanent Registration",
    category: "Taxation & Finance",
    description: "Official PAN card documentation and MSME Udyam certificate for preferential procurement standing and corporate invoicing.",
    documentNumber: "PAN: AAACT7408Z / UDYAM-UP-28-0041234",
  },
  {
    id: "standard-nda",
    title: "Standard Corporate Mutual Non-Disclosure Agreement (NDA)",
    issuingAuthority: "Topnotch Legal & Compliance Counsel",
    validity: "Standard Indian Contract Act 1872 Form",
    category: "Legal & Confidentiality",
    description: "Pre-approved bilateral confidentiality agreement guaranteeing strict protection of client electricity bills, MRI load survey data, and factory operational volumes.",
    documentNumber: "DOC-TES-MNDA-2025",
  },
  {
    id: "bank-mandate",
    title: "Official Vendor Bank Mandate (RTGS / NEFT Mandate)",
    issuingAuthority: "Scheduled Commercial Bank / HDFC Bank Limited",
    validity: "Verified Corporate Current Account",
    category: "Banking & Settlement",
    description: "Authorized corporate bank mandate with bank confirmation stamp and cancelled cheque for ERP vendor master setup in SAP, Oracle, or Ariba.",
    documentNumber: "HDFC-CA-004105001234",
  },
];

export default function ProcurementDossierPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* Hero with Cinematic Photographic Backdrop */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-[#0A0F1D] py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
            alt="Corporate governance and regulatory compliance hub"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1D]/95 via-[#0A0F1D]/85 to-[#0A0F1D]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#F8BC26]" />
              <span>Enterprise Procurement &amp; Compliance Hub</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Corporate Vendor{" "}
              <span className="text-[#F8BC26]">
                Empanelment Dossier
              </span>
            </h1>
            
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
              Official corporate certificates, statutory licenses, tax credentials, and legal non-disclosure templates for SAP/Oracle ERP vendor master onboarding and institutional diligence by heavy industrial energy buyers.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-300">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>SAP / Ariba Vendor Ready</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>CERC Category-IV Regulated</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>DPDP Act 2023 Compliant</span>
              </span>
            </div>
          </div>
        </div>

        {/* Waaree Fluid Wave Divider: Dark Hero into Ghost Slate Repository */}
        <div className="absolute bottom-0 inset-x-0 pointer-events-none">
          <PageDivider type="layered-wave" fillColor="#F9FAFB" position="bottom" height={55} />
        </div>
      </section>

      {/* Main Document Matrix */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1C2C34]">
                Empanelment &amp; Due Diligence Repository
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm font-mono mt-0.5">
                Click any credential to request verified copy or execute standard bilateral NDA
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
              <a
                href="/api/reports/dossier?download=true"
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 font-bold font-mono text-xs transition-all shadow-sm flex items-center space-x-1.5"
              >
                <Download className="w-4 h-4 text-[#F8BC26]" />
                <span>Audited CERC Dossier (PDF)</span>
              </a>
              <Link
                href="/contact?intent=vendor-pack"
                className="px-4 py-2.5 rounded-xl bg-[#F8BC26] hover:bg-[#e6ab1e] text-[#1C2C34] font-bold font-mono text-xs transition-all shadow-sm flex items-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Full Vendor Kit (ZIP)</span>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {EMPANELMENT_DOCUMENTS.map((doc) => (
              <div
                key={doc.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {doc.category}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-700">
                      {doc.validity}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-[#1C2C34] mb-1">{doc.title}</h3>
                  <div className="text-xs font-mono text-slate-500 mb-3">
                    Issuing Authority: <strong className="text-slate-700">{doc.issuingAuthority}</strong>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {doc.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 truncate max-w-[200px]">
                    Ref: <strong className="text-slate-900">{doc.documentNumber}</strong>
                  </span>
                  <Link
                    href={`/contact?document=${doc.id}`}
                    className="text-emerald-700 font-bold hover:underline inline-flex items-center space-x-1"
                  >
                    <span>Request Copy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NDA & Confidentiality Guarantee */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-sm">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 mb-2">
            <Lock className="w-4 h-4" />
            <span>Statutory Confidentiality Guarantee</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#1C2C34] mb-4">
            Industrial Client Data Protection &amp; Bilateral NDA Protocol
          </h2>
          <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            <p>
              Topnotch Energy Solutions adheres to strict confidentiality standards under the Indian Contract Act 1872
              and the Digital Personal Data Protection (DPDP) Act 2023. We understand that industrial electricity bills,
              contract demand utilization curves, and half-hourly MRI load survey files reflect sensitive manufacturing capacity.
            </p>
            <p>
              All shared client billing logs, single-line diagrams (SLDs), and tariff schedules are strictly quarantined
              within encrypted repositories, accessible solely by the assigned BEE Certified Auditor and CERC Power Trader.
              We provide formal bilateral Non-Disclosure Agreements (NDAs) executed prior to technical diligence.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap gap-4 items-center justify-between">
            <div className="text-xs font-mono text-slate-500">
              Need custom corporate NDA terms? Contact legal counsel:
              <a href="mailto:legal@topnotchenergy.in" className="text-slate-900 font-bold ml-1 hover:underline">
                legal@topnotchenergy.in
              </a>
            </div>
            <Link
              href="/contact?intent=mutual-nda"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold transition-all shadow-sm"
            >
              Execute Mutual NDA
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WAAREE-GRADE VENDOR MASTER REGISTRATION SUPPORT (HALF-MERGING IMAGE ON WHITE)
         ========================================================================= */}
      <SplitImageMergeSection
        badgeText="Institutional Vendor Empanelment"
        badgeIcon={Building2}
        title={
          <>
            Corporate Vendor Master <span className="text-[#D97706]">Registration Support</span>
          </>
        }
        description="Need our institutional finance team to complete your corporate vendor empanelment form, provide supplier declaration letters, or upload CERC/BEE credentials to your SAP Ariba or Coupa enterprise portal?"
        bullets={[
          "Pre-filled SAP, Oracle & Ariba Vendor Master Forms",
          "Permanent Account Number & Validated GSTIN Certificates",
          "Audited Financials & CERC Category-IV Advisory Standing",
          "Same-Day Turnaround on Mutual Bilateral NDAs",
        ]}
        imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Modern corporate enterprise architecture and industrial headquarters"
        primaryCta={{
          label: "Email Procurement Team",
          href: `mailto:${BRAND.contacts.emailGeneral}?subject=Vendor%20Empanelment%20Request%20-%20Topnotch%20Energy`,
          icon: Mail,
        }}
        secondaryCta={{
          label: `Call: ${BRAND.contacts.phonePrimary}`,
          href: `tel:${BRAND.contacts.phonePrimary}`,
          icon: Phone,
        }}
        stats={[
          { value: "48h SLA", label: "Empanelment Turnaround", sublabel: "Guaranteed Response" },
          { value: "110+ Plants", label: "Corporate Clients", sublabel: "Empaneled Across India" },
        ]}
      />
    </main>
  );
}
