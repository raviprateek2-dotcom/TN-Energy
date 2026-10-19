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
  manifest: "/manifest.json",
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
      <body className="min-h-screen flex flex-col bg-grid-navy-950 text-white font-sans overflow-x-hidden">
        {/* Global Utility & Accessibility Strip */}
        <AccessibilityToolbar />

        {/* Live Market Ticker */}
        <LiveTickerBar />

        {/* MegaMenu Desktop Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1">{children}</main>

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
