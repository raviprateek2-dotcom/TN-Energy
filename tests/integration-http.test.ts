import test from "node:test";
import assert from "node:assert";
import { spawn, execSync, type ChildProcess } from "node:child_process";
import { platform } from "node:os";

const PORT = 3002;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function waitForServer(url: string, timeoutMs = 25000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status === 200) return;
    } catch {
      // Server not ready yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server at ${url} failed to start within ${timeoutMs}ms`);
}

test("Full End-to-End HTTP Route, Security & API Integration Test Suite", async (t) => {
  let serverProcess: ChildProcess | undefined;

  // 1. Start Next.js production server on isolated port 3002
  await t.test("Boot Next.js production server", async () => {
    serverProcess = spawn("npx", ["next", "start", "-p", String(PORT)], {
      shell: true,
      stdio: "pipe",
    });

    serverProcess.stderr?.on("data", (_data: Buffer) => {
      // Suppress or log non-fatal warnings
    });

    await waitForServer(`${BASE_URL}/`);
    assert.ok(true, "Next.js server booted and responsive on port 3002");
  });

  // 2. Test Security Headers on Root Request
  await t.test("Security Headers: Verify enterprise grade HTTP security headers", async () => {
    const res = await fetch(`${BASE_URL}/`);
    assert.strictEqual(res.status, 200);

    const xFrameOptions = res.headers.get("x-frame-options");
    const xContentType = res.headers.get("x-content-type-options");
    const referrerPolicy = res.headers.get("referrer-policy");

    assert.strictEqual(xFrameOptions, "DENY", "X-Frame-Options must be DENY");
    assert.strictEqual(xContentType, "nosniff", "X-Content-Type-Options must be nosniff");
    assert.ok(referrerPolicy?.includes("strict-origin-when-cross-origin"), "Referrer-Policy must be strict-origin-when-cross-origin");
  });

  // 3. Test Core Marketing Pages (HTML Content & Status 200)
  const marketingRoutes = [
    { path: "/", titleCheck: "Topnotch Energy Solutions" },
    { path: "/about", titleCheck: "Corporate Timeline" },
    { path: "/case-studies", titleCheck: "Case Studies" },
    { path: "/contact", titleCheck: "Contact" },
    { path: "/faq", titleCheck: "Frequently Asked Questions" },
    { path: "/market-intelligence", titleCheck: "Market Intelligence" },
    { path: "/statutory-compliance", titleCheck: "Compliance" },
    { path: "/tools/open-access-calculator", titleCheck: "Simulator" },
    { path: "/tools/compare-states", titleCheck: "Comparator" },
    { path: "/procurement-dossier", titleCheck: "Empanelment" },
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

  // 4. Test Client Portal Routes (HTML Content & Status 200)
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

  // 5. Test SEO, Metadata & Discovery Routes
  await t.test("GET /robots.txt returns valid crawling directives", async () => {
    const res = await fetch(`${BASE_URL}/robots.txt`);
    assert.strictEqual(res.status, 200);
    const text = await res.text();
    assert.ok(text.toLowerCase().includes("user-agent: *"));
    assert.ok(text.includes("/portal/"));
    assert.ok(text.includes("https://topnotchenergy.in/sitemap.xml"));
  });

  await t.test("GET /sitemap.xml returns valid XML sitemap", async () => {
    const res = await fetch(`${BASE_URL}/sitemap.xml`);
    assert.strictEqual(res.status, 200);
    const xml = await res.text();
    assert.ok(xml.includes("<urlset") || xml.includes("urlset"));
    assert.ok(xml.includes("https://topnotchenergy.in"));
  });

  await t.test("GET /opengraph-image returns dynamic branded image", async () => {
    const res = await fetch(`${BASE_URL}/opengraph-image`);
    assert.strictEqual(res.status, 200);
    const contentType = res.headers.get("content-type");
    assert.ok(contentType?.includes("image/png") || contentType?.includes("image/jpeg") || contentType?.includes("image/"));
  });

  await t.test("GET /manifest.json returns valid PWA web app manifest", async () => {
    const res = await fetch(`${BASE_URL}/manifest.json`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.name, "Topnotch Energy Solutions");
  });

  await t.test("GET / includes JSON-LD structured data and canonical link", async () => {
    const res = await fetch(`${BASE_URL}/`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();
    assert.ok(html.includes('"@type":"Organization"'), "Missing Organization JSON-LD");
    assert.ok(html.includes("topnotchenergy.in"), "Missing canonical domain reference to topnotchenergy.in");
  });

  // 6. Test /api/query (The critical endpoint rebuilt to fix live 500 bug)
  await t.test("POST /api/query accepts valid lead and returns 201 Created", async () => {
    const res = await fetch(`${BASE_URL}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Shri Rajesh Gupta",
        email: "rajesh.gupta@shree-cement.com",
        contactNo: "+91 9811223344",
        company: "Shree Cement Ltd",
        state: "Rajasthan",
        message: "Requesting tariff audit for 15 MVA cement grinding unit in Beawar.",
      }),
    });
    assert.strictEqual(res.status, 201, "Expected 201 Created for valid query");
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.queryId.startsWith("QRY-"));
  });

  await t.test("POST /api/query catches bot honeypot trap with stealth 200 response", async () => {
    const res = await fetch(`${BASE_URL}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Spam Bot",
        email: "bot@spamnetwork.com",
        contactNo: "9811223344",
        message: "Buy cheap crypto",
        website: "http://spam-link.com", // Hidden honeypot filled
      }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.queryId, "QRY-SPAM-SUPPRESSED");
  });

  await t.test("POST /api/query rejects invalid payload with 422 Unprocessable Entity", async () => {
    const res = await fetch(`${BASE_URL}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "", // Required min 2
        email: "invalid-email-address",
        contactNo: "123", // Too short
        message: "",
      }),
    });
    assert.strictEqual(res.status, 422);
    const data = await res.json();
    assert.strictEqual(data.success, false);
    assert.ok(data.fieldErrors);
  });

  // 7. Test /api/market-rates
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

  await t.test("GET /api/market-rates rejects invalid query parameters with 400 Bad Request", async () => {
    const res = await fetch(`${BASE_URL}/api/market-rates?from=999`);
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.success, false);
    assert.ok(data.errors);
  });

  // 8. Test /api/calculator
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

  // 9. Test /api/leads
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
        phone: "123",
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
    assert.ok(data.count >= 1);
  });

  // 10. Test /api/health monitoring endpoint
  await t.test("GET /api/health returns system telemetry and engine readiness", async () => {
    const res = await fetch(`${BASE_URL}/api/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, "healthy");
    assert.strictEqual(data.engines.iex96BlockSeed, "ready");
    assert.strictEqual(data.engines.totalSeedBlocks, 96);
    assert.ok(data.telemetry.nodeVersion);
  });

  // 11. Test /api/reports/dossier & /api/reports/rea
  await t.test("GET /api/reports/dossier returns valid CERC audit PDF stream", async () => {
    const res = await fetch(`${BASE_URL}/api/reports/dossier?month=October+2025`);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers.get("content-type"), "application/pdf");
    const buffer = Buffer.from(await res.arrayBuffer());
    assert.ok(buffer.length > 2000, "PDF buffer must be > 2000 bytes");
    assert.strictEqual(buffer.subarray(0, 8).toString("ascii").slice(0, 5), "%PDF-");
    assert.ok(buffer.includes(Buffer.from("TOPNOTCH ENERGY SOLUTIONS")));
    assert.ok(buffer.includes(Buffer.from("BEE CERTIFIED AUDITOR")));
  });

  await t.test("GET /api/reports/rea returns JSON and CSV statutory schedules", async () => {
    const jsonRes = await fetch(`${BASE_URL}/api/reports/rea?month=2025-10`);
    assert.strictEqual(jsonRes.status, 200);
    const jsonData = await jsonRes.json();
    assert.strictEqual(jsonData.success, true);
    assert.strictEqual(jsonData.summary.totalBlocks, 96);

    const csvRes = await fetch(`${BASE_URL}/api/reports/rea?format=csv`);
    assert.strictEqual(csvRes.status, 200);
    assert.ok(csvRes.headers.get("content-type")?.includes("text/csv"));
    const csvText = await csvRes.text();
    assert.ok(csvText.startsWith("Block,StartTime,EndTime"));
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
