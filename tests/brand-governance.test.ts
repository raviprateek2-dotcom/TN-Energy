import test from "node:test";
import assert from "node:assert";
import { BRAND } from "../src/lib/constants/brand.ts";

test("Brand Governance & Corporate Compliance", async (t) => {
  await t.test("Brand name strictly matches 'Topnotch Energy Solutions'", () => {
    assert.strictEqual(BRAND.companyName, "Topnotch Energy Solutions");
    assert.strictEqual(BRAND.legalName, "Topnotch Energy Solutions Private Limited");
  });

  await t.test("Official Ghaziabad headquarters address matches regulatory registration", () => {
    assert.strictEqual(BRAND.headquarters.line1, "UG-5, First Floor, Parsvnath Regalia");
    assert.strictEqual(BRAND.headquarters.city, "Ghaziabad");
    assert.strictEqual(BRAND.headquarters.state, "Uttar Pradesh");
    assert.strictEqual(BRAND.headquarters.pincode, "201005");
    assert.strictEqual(BRAND.headquarters.country, "India");
    assert.strictEqual(
      BRAND.headquarters.fullAddress,
      "UG-5, First Floor, Parsvnath Regalia, Ghaziabad, Uttar Pradesh 201005, India"
    );
  });

  await t.test("Primary contacts match 24x7 NOC bidding desk lines", () => {
    assert.strictEqual(BRAND.contacts.phonePrimary, "+91 7408318214");
    assert.strictEqual(BRAND.contacts.phoneSecondary, "+91 9560085673");
    assert.strictEqual(BRAND.contacts.emailGeneral, "info@topnotchenergy.in");
    assert.ok(BRAND.contacts.whatsappLink.includes("917408318214"));
  });

  await t.test("Corporate accreditations reference CERC, NOAR, and BEE registrations", () => {
    assert.ok(BRAND.operationalCredentials.cercLicenceCategory.includes("Category-IV"));
    assert.ok(
      BRAND.operationalCredentials.accreditations.some((a) => a.includes("BEE Certified"))
    );
    assert.ok(
      BRAND.operationalCredentials.accreditations.some((a) => a.includes("National Open Access Registry (NOAR)"))
    );
    assert.ok(
      BRAND.operationalCredentials.accreditations.some((a) => a.includes("0.2s ABT Metering"))
    );
  });
});
