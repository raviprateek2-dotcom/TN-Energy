import test from "node:test";
import assert from "node:assert";
import { spawn, execSync, type ChildProcess } from "node:child_process";
import { platform } from "node:os";

const PORT = 3001;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function waitForServer(url: string, timeoutMs = 15000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status === 200) return;
    } catch {
      // Server not ready yet
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Server at ${url} failed to start within ${timeoutMs}ms`);
}

test("Full End-to-End HTTP Route & API Integration Test Suite", async (t) => {
  let serverProcess: ChildProcess | undefined;

  // 1. Start Next.js production server on isolated port 3001
  await t.test("Boot Next.js production server", async () => {
    serverProcess = spawn("npx", ["next", "start", "-p", String(PORT)], {
      shell: true,
      stdio: "pipe",
    });

    serverProcess.stderr?.on("data", (_data: Buffer) => {
      // Suppress or log non-fatal warnings
    });

    await waitForServer(`${BASE_URL}/`);
    assert.ok(true, "Next.js server booted and responsive on port 3001");
  });

  // 2. Test Core Marketing Pages (HTML Content & Status 200)
  const marketingRoutes = [
    { path: "/", titleCheck: "Topnotch Energy Solutions" },
    { path: "/about", titleCheck: "Corporate Timeline" },
    { path: "/case-studies", titleCheck: "Case Studies" },
    { path: "/contact", titleCheck: "Contact" },
    { path: "/market-intelligence", titleCheck: "Market Intelligence" },
    { path: "/statutory-compliance", titleCheck: "Compliance" },
    { path: "/tools/open-access-calculator", titleCheck: "Simulator" },
    { path: "/solutions/power-trading-bilateral-contracts", titleCheck: "Power Trading" },
    { path: "/solutions/open-access-execution-regulatory", titleCheck: "Open Access" },
    { path: "/solutions/abt-metering-telemetry-infrastructure", titleCheck: "ABT" },
    { path: "/solutions/energy-cost-optimization-bill-audits", titleCheck: "Audits" },
    { path: "/solutions/renewable-energy-sustainability", titleCheck: "Renewable" },
  ];

  for (const route of marketingRoutes) {
    await t.test(`GET ${route.path} returns 200 OK with brand integrity`, async () => {
      const res = await fetch(`${BASE_URL}${route.path}`);
      assert.strictEqual(res.status, 200, `Expected 200 for ${route.path}`);
      const html = await res.text();
      assert.ok(html.includes("Topnotch Energy Solutions"), `Brand missing on ${route.path}`);
      assert.ok(html.includes("7408318214"), `Contact phone missing on ${route.path}`);
    });
  }

  // 3. Test Client Portal Routes (HTML Content & Status 200)
  const portalRoutes = [
    "/portal/dashboard",
    "/portal/bidding-console",
    "/portal/documents",
    "/portal/savings-dashboard",
    "/portal/telemetry",
  ];

  for (const path of portalRoutes) {
    await t.test(`GET ${path} returns 200 OK`, async () => {
      const res = await fetch(`${BASE_URL}${path}`);
      assert.strictEqual(res.status, 200, `Expected 200 for ${path}`);
      const html = await res.text();
      assert.ok(html.length > 500, `Content empty for ${path}`);
    });
  }

  // 4. Test API Endpoints
  await t.test("GET /api/market-rates returns 96-block seed feed", async () => {
    const res = await fetch(`${BASE_URL}/api/market-rates`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.blockCount, 96);
    assert.ok(data.summary.dailyAvgDamMwh > 0);
  });

  await t.test("GET /api/market-rates?segment=dam returns filtered DAM blocks", async () => {
    const res = await fetch(`${BASE_URL}/api/market-rates?segment=dam`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.segment, "dam");
    assert.strictEqual(data.blockCount, 96);
    assert.ok(data.data[0].damMwh !== undefined);
  });

  await t.test("POST /api/calculator computes accurate landed cost & savings", async () => {
    const res = await fetch(`${BASE_URL}/api/calculator`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stateKey: "uttar-pradesh",
        contractDemandKva: 3500,
        annualConsumptionMwh: 10200,
        voltageLevel: "33kV",
        discomTariffPerKwh: 7.90,
        groupCaptiveMw: 4.5,
      }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.state.name, "Uttar Pradesh");
    assert.ok(data.savings.totalAnnualSavingsLakhsPerYear > 0);
    assert.ok(data.savings.blendedLandedCostPerKwh < 7.90);
  });

  await t.test("POST /api/leads validates Zod input and returns tracking ID", async () => {
    const res = await fetch(`${BASE_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyName: "Varun Beverages Unit II",
        contactName: "Rajeev Singhal",
        designation: "VP Finance",
        email: "finance@varunbeverages.com",
        phone: "9818012345",
        state: "Uttar Pradesh",
        contractDemandKva: "5000",
        enquiryType: "Group Captive Solar SPV",
        currentDiscomTariffPerKwh: "8.10",
        message: "Requesting formal technical feasibility and tariff study for 5000 kVA load.",
        consentGiven: true,
      }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.referenceId.startsWith("TES-"));
  });

  await t.test("POST /api/leads rejects malformed inputs with 422 Unprocessable Entity", async () => {
    const res = await fetch(`${BASE_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyName: "",
        email: "not-an-email",
        phone: "123", // invalid Indian 10-digit number
      }),
    });
    assert.strictEqual(res.status, 422);
    const data = await res.json();
    assert.strictEqual(data.success, false);
    assert.ok(data.errors);
  });

  await t.test("GET /api/leads returns in-memory recorded leads", async () => {
    const res = await fetch(`${BASE_URL}/api/leads`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.count >= 2);
  });

  await t.test("GET /manifest.json returns valid PWA web app manifest", async () => {
    const res = await fetch(`${BASE_URL}/manifest.json`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.name, "Topnotch Energy Solutions");
    assert.strictEqual(data.theme_color, "#10B981");
  });

  await t.test("GET / includes JSON-LD structured data and canonical link", async () => {
    const res = await fetch(`${BASE_URL}/`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();
    assert.ok(html.includes('"@type":"Organization"'), "Missing Organization JSON-LD");
    assert.ok(html.includes("energysolutions.co.in"), "Missing canonical domain reference");
  });

  await t.test("GET /api/market-rates rejects invalid query parameters with 400 Bad Request", async () => {
    const res = await fetch(`${BASE_URL}/api/market-rates?from=999`);
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.success, false);
    assert.ok(data.errors);
  });


  // Teardown: terminate Next.js server
  await t.test("Shutdown Next.js production server", () => {
    if (serverProcess && serverProcess.pid) {
      if (platform() === "win32") {
        try {
          execSync(`taskkill /pid ${serverProcess.pid} /T /F`, { stdio: "ignore" });
        } catch {
          // Process already ended
        }
      } else {
        serverProcess.kill("SIGTERM");
      }
      assert.ok(true, "Server shut down cleanly");
    }
  });
});

