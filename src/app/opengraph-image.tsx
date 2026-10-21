import { ImageResponse } from "next/og";

export const alt = "Topnotch Energy Solutions - Enterprise B2B Power Trading & Clean Energy Advisory";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#1C2C34",
          backgroundImage: "radial-gradient(circle at 80% 20%, rgba(248, 188, 38, 0.18), transparent 40%)",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
          color: "#FFFFFF",
        }}
      >
        {/* Top Bar: Brand Pill */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#F8BC26",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "900",
              fontSize: "24px",
              color: "#1C2C34",
            }}
          >
            ⚡
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.5px" }}>
              Topnotch Energy Solutions
            </span>
            <span style={{ fontSize: "14px", color: "#F8BC26", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              CERC Accredited · Category-IV Power Trading Advisory
            </span>
          </div>
        </div>

        {/* Center: Main Statement */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "950px" }}>
          <h1
            style={{
              fontSize: "52px",
              fontWeight: "900",
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
              margin: 0,
              color: "#FFFFFF",
            }}
          >
            Enterprise Power Trading, Open Access & Rooftop Decarbonization
          </h1>
          <p style={{ fontSize: "22px", color: "#9CA3AF", lineHeight: 1.4, margin: 0 }}>
            Delivering 18%–42% industrial electricity tariff reductions across 14 states with 96-block IEX optimization.
          </p>
        </div>

        {/* Bottom Bar: Key KPIs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "40px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "26px", fontWeight: "800", color: "#F8BC26" }}>₹185+ Crores</span>
              <span style={{ fontSize: "13px", color: "#9CA3AF" }}>Client Power Savings</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "26px", fontWeight: "800", color: "#10B981" }}>380+ MW</span>
              <span style={{ fontSize: "13px", color: "#9CA3AF" }}>Contract Demand Managed</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "26px", fontWeight: "800", color: "#FFFFFF" }}>14 States</span>
              <span style={{ fontSize: "13px", color: "#9CA3AF" }}>SERC Regulatory Coverage</span>
            </div>
          </div>

          <div
            style={{
              padding: "10px 24px",
              backgroundColor: "rgba(248, 188, 38, 0.15)",
              border: "1px solid #F8BC26",
              borderRadius: "9999px",
              color: "#F8BC26",
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            topnotchenergy.in
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
