import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/constants/brand";
import { AccessibilityToolbar } from "@/components/layout/AccessibilityToolbar";
import { LiveTickerBar } from "@/components/layout/LiveTickerBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { WhatsAppFloatingDesk } from "@/components/layout/WhatsAppFloatingDesk";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND.companyName} | Enterprise Power Trading, Open Access Advisory & Solar Decarbonization`,
  description:
    "Topnotch Energy Solutions is India's premier B2B power trading advisory, Group Captive Open Access consultant, and industrial rooftop solar platform. Managing 96-time block IEX/PXIL bidding, CEA 0.2s ABT metering, and delivering 18%–42% industrial tariff reductions across 14 states.",
  keywords: [
    "Topnotch Energy Solutions",
    "Indian Energy Exchange IEX Trading",
    "Group Captive Solar SPV Rule 3",
    "Green Energy Open Access GEOA 2022",
    "ABT 0.2s Special Energy Meter",
    "Industrial Rooftop Solar TOPCon",
    "UPERC Open Access Tariff",
    "MERC Open Access",
    "BEE Energy Audit Category-A",
    "Cross-Subsidy Surcharge Exemption",
    "Power Trading Ghaziabad Uttar Pradesh",
  ],
  authors: [{ name: BRAND.companyName, url: "https://energysolutions.co.in" }],
  creator: BRAND.companyName,
  publisher: BRAND.legalName,
  metadataBase: new URL("https://energysolutions.co.in"),
  alternates: {
    canonical: "https://energysolutions.co.in",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://energysolutions.co.in",
    siteName: BRAND.companyName,
    title: `${BRAND.companyName} | Enterprise Power Trading, Open Access Advisory & Solar Decarbonization`,
    description:
      "Topnotch Energy Solutions is India's premier B2B power trading advisory, Group Captive Open Access consultant, and industrial rooftop solar platform. Managing 96-time block IEX/PXIL bidding, CEA 0.2s ABT metering, and delivering 18%–42% industrial tariff reductions across 14 states.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${BRAND.companyName} - India's Premier B2B Power Trading & Open Access Advisory`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.companyName} | Enterprise Power Trading & Open Access Advisory`,
    description:
      "C&I Power Trading, Group Captive Open Access & Industrial Rooftop Solar Advisory delivering 18%–42% tariff reductions.",
    creator: "@topnotchenergy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://energysolutions.co.in/#organization",
      name: "Topnotch Energy Solutions",
      legalName: BRAND.legalName,
      url: "https://energysolutions.co.in",
      logo: "https://energysolutions.co.in/icon-512.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "UG-5, First Floor, Parsvnath Regalia",
        addressLocality: "Ghaziabad",
        addressRegion: "Uttar Pradesh",
        postalCode: "201005",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: `+91-${BRAND.contacts.phonePrimary}`,
          contactType: "24x7 Bidding Desk & Customer Operations",
          areaServed: "IN",
          availableLanguage: ["en", "hi"],
        },
        {
          "@type": "ContactPoint",
          telephone: `+91-${BRAND.contacts.phoneSecondary}`,
          contactType: "Executive Advisory Office",
          areaServed: "IN",
        },
      ],
      sameAs: [
        "https://www.linkedin.com/company/topnotch-energy-solutions",
        "https://twitter.com/topnotchenergy",
      ],
    },
    {
      "@type": "Service",
      "@id": "https://energysolutions.co.in/#power-trading-service",
      name: "IEX Power Trading & Open Access Bidding Desk",
      provider: {
        "@id": "https://energysolutions.co.in/#organization",
      },
      serviceType: "Power Exchange Bidding & Portfolio Optimization",
      areaServed: "IN",
      description:
        "24x7 CERC-accredited bidding operations across IEX DAM, GDAM, and RTM bourses with automated SLDC scheduling integration and ABT 0.2s meter telemetry.",
    },
    {
      "@type": "FinancialProduct",
      "@id": "https://energysolutions.co.in/#group-captive-spv",
      name: "Group Captive Solar SPV & Open Access Tariff Optimization",
      provider: {
        "@id": "https://energysolutions.co.in/#organization",
      },
      description:
        "Statutory Section 42 Group Captive model (26% equity, 51% consumption) delivering 100% waiver of Cross-Subsidy Surcharge (CSS) and Additional Surcharge across 14 industrial states.",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-grid-navy-950 text-white font-sans overflow-x-hidden">
        {/* Global Utility & Accessibility Strip */}
        <AccessibilityToolbar />

        {/* Live Market Ticker */}
        <LiveTickerBar />

        {/* MegaMenu Desktop Header */}
        <Header />

        {/* Page Content: pb-20 on mobile prevents bottom nav overlap */}
        <main className="flex-1 pb-20 md:pb-0">{children}</main>

        {/* Global Enterprise Footer */}
        <Footer />

        {/* Mobile Viewport Fixed Bottom Navigation Bar (< 768px) */}
        <MobileBottomNav />

        {/* 24x7 WhatsApp Desk Floating Action Button */}
        <WhatsAppFloatingDesk />
      </body>
    </html>
  );
}
