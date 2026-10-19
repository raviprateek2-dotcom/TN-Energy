import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        // Shadcn UI Semantic Variables
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // Proprietary "Grid Precision" Indian Power Sector Design Tokens
        grid: {
          navy: {
            950: "#050914", // Deep Substation Void (Ultimate dark bg)
            900: "#0A0F1D", // SLDC Control Room Surface
            850: "#0E172E", // Terminal Panel & Card Background
            800: "#131F3F", // Elevated Surface 1
            750: "#18274F", // Elevated Surface 2
            700: "#1E2E5C", // Surface Interactive / Selected
            600: "#2D427B", // Active Border Focus
            500: "#435E9E",
            400: "#6882C2",
            300: "#91A5D7",
            200: "#BAC9EA",
            100: "#E3EBFA",
            50: "#F2F6FC",
          },
          emerald: {
            950: "#022C1A",
            900: "#064E2B",
            800: "#065F46",
            700: "#047857",
            600: "#059669",
            500: "#10B981", // Kilowatt Green / GDAM / Renewable Peak
            400: "#34D399",
            300: "#6EE7B7",
            200: "#A7F3D0",
            100: "#D1FAE5",
            50: "#ECFDF5",
            neon: "#00F5A0", // High-voltage Live Market Pulse
          },
          cyan: {
            950: "#04212C",
            900: "#083344",
            800: "#155E75",
            700: "#0E7490",
            600: "#0891B2",
            500: "#06B6D4", // Telemetry Sync / Frequency Status
            400: "#22D3EE",
            300: "#67E8F9",
            200: "#A5F3FC",
            100: "#CFFAFE",
            neon: "#00F0FF", // Substation SCADA Ticker
          },
          amber: {
            950: "#451A03",
            900: "#78350F",
            800: "#92400E",
            700: "#B45309",
            600: "#D97706",
            500: "#F59E0B", // Peak Tariff (ToD) / Grid Stress Alert
            400: "#FBBF24",
            300: "#FCD34D",
            200: "#FDE68A",
            100: "#FEF3C7",
          },
          red: {
            950: "#450A0A",
            900: "#7F1D1D",
            800: "#991B1B",
            700: "#B91C1C",
            600: "#DC2626",
            500: "#EF4444", // Trip Frequency / DSM Penalty Violation
            400: "#F87171",
            300: "#FCA5A5",
          },
          slate: {
            950: "#020617",
            900: "#0F172A",
            800: "#1E293B", // Technical Grid Lines
            700: "#334155",
            600: "#475569",
            500: "#64748B",
            400: "#94A3B8",
            300: "#CBD5E1",
            200: "#E2E8F0",
            100: "#F1F5F9",
            50: "#F8FAFC",
          },
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "var(--font-jetbrains-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "grid-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "radar-sweep": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "grid-pulse": "grid-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        ticker: "ticker 35s linear infinite",
        "radar-sweep": "radar-sweep 4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
