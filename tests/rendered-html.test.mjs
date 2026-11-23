import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the public portfolio and project inventory", async () => {
  const response = await render("/projects");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /RoutePulse: Mobility Analytics/);
  assert.match(html, /Saidia Game Recommender/);
  assert.match(html, /Saidia Claims Assistant/);
  assert.match(html, /Student Performance Analysis/);
  assert.match(html, /Explainable Robo-Advisor/);
  assert.doesNotMatch(html, /Finance Tracker|savings-first-finance/i);
  assert.doesNotMatch(html, /OpenAI Sites|codex-preview|_sites-preview/i);
});

test("renders concise case studies with technical repository links", async () => {
  const cases = [
    ["/projects/routepulse-mobility-analytics", /github\.com\/Begge10850\/routepulse/],
    ["/projects/saidia-game-recommender", /github\.com\/Begge10850\/saidia-recommender/],
    ["/projects/saidia-logistics-claims", /github\.com\/Begge10850\/smart_doc_assistant/],
    ["/projects/sales-performance-analytics", /github\.com\/Begge10850\/powerbu_sales_performance_dashboard/],
  ];

  for (const [path, repository] of cases) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, repository, path);
    assert.doesNotMatch(html, /Finance Tracker|savings-first-finance/i, path);
  }
});

test("removed Finance Tracker route is no longer available", async () => {
  const response = await render("/projects/savings-first-finance");
  assert.equal(response.status, 404);
});
