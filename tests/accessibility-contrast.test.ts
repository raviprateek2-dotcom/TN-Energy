import test from "node:test";
import assert from "node:assert";

// Helper to convert hex to relative luminance per WCAG 2.1 specs
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function getLuminance(rgb: { r: number; g: number; b: number }): number {
  const a = [rgb.r, rgb.g, rgb.b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hexToRgb(hex1));
  const lum2 = getLuminance(hexToRgb(hex2));
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

test("WCAG 2.1 AA Color Contrast & Brand Accessibility Suite", async (t) => {
  // Brand Color Palette
  const WHITE = "#FFFFFF";
  const GHOST_WHITE = "#F9FAFB";
  const CORPORATE_NAVY = "#1C2C34";
  const SLATE_900 = "#0F172A";
  const SOLAR_GOLD = "#F8BC26";
  const EMERALD_DARK = "#047857"; // text-emerald-700
  const EMERALD_DEEP = "#065F46"; // text-emerald-800
  const SLATE_600 = "#475569";
  const SLATE_700 = "#334155";

  await t.test("Mandate: Solar Gold (#F8BC26) on White fails WCAG text contrast and MUST NOT be used for body text", () => {
    const contrast = getContrastRatio(SOLAR_GOLD, WHITE);
    // Solar Gold on white has a very low contrast ratio (~1.44:1)
    assert.ok(contrast < 3.0, `Expected low contrast for yellow on white, got ${contrast.toFixed(2)}:1`);
  });

  await t.test("Solar Gold (#F8BC26) with Corporate Navy (#1C2C34) meets WCAG AA for button text & badges", () => {
    const contrast = getContrastRatio(SOLAR_GOLD, CORPORATE_NAVY);
    // Dark text on gold button should be >= 4.5:1
    assert.ok(contrast >= 4.5, `Expected >= 4.5:1, got ${contrast.toFixed(2)}:1`);
  });

  await t.test("Corporate Navy (#1C2C34) on White (#FFFFFF) meets WCAG AAA (>7:1) for headings", () => {
    const contrast = getContrastRatio(CORPORATE_NAVY, WHITE);
    assert.ok(contrast >= 7.0, `Expected >= 7.0:1 (AAA), got ${contrast.toFixed(2)}:1`);
  });

  await t.test("Corporate Navy (#1C2C34) on Ghost White (#F9FAFB) meets WCAG AAA (>7:1) for cards", () => {
    const contrast = getContrastRatio(CORPORATE_NAVY, GHOST_WHITE);
    assert.ok(contrast >= 7.0, `Expected >= 7.0:1 (AAA), got ${contrast.toFixed(2)}:1`);
  });

  await t.test("Dark Emerald (#047857) on White (#FFFFFF) meets WCAG AA for normal text", () => {
    const contrast = getContrastRatio(EMERALD_DARK, WHITE);
    assert.ok(contrast >= 4.5, `Expected >= 4.5:1, got ${contrast.toFixed(2)}:1`);
  });

  await t.test("Deep Emerald (#065F46) on White (#FFFFFF) meets WCAG AA for normal text", () => {
    const contrast = getContrastRatio(EMERALD_DEEP, WHITE);
    assert.ok(contrast >= 4.5, `Expected >= 4.5:1, got ${contrast.toFixed(2)}:1`);
  });

  await t.test("Slate 700 (#334155) on White (#FFFFFF) meets WCAG AA (>4.5:1) for body text", () => {
    const contrast = getContrastRatio(SLATE_700, WHITE);
    assert.ok(contrast >= 4.5, `Expected >= 4.5:1, got ${contrast.toFixed(2)}:1`);
  });

  await t.test("Footer: Slate 300 (#CBD5E1) on Deep Navy (#0F172A) meets WCAG AAA (>7:1)", () => {
    const contrast = getContrastRatio("#CBD5E1", SLATE_900);
    assert.ok(contrast >= 7.0, `Expected >= 7.0:1, got ${contrast.toFixed(2)}:1`);
  });
});
