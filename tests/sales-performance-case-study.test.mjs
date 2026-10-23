import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const pageUrl = new URL("../app/projects/sales-performance-analytics/page.tsx", import.meta.url);

test("Sales Performance case study connects its questions, answers and evidence", async () => {
  const [page, projects] = await Promise.all([
    readFile(pageUrl, "utf8"),
    readFile(new URL("../app/_components.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /9,800/);
  assert.match(page, /4,922/);
  assert.match(page, /€2,261,536\.78/);
  assert.match(page, /€459\.48/);
  assert.match(page, /50\.8%/);
  assert.match(page, /61\.0%/);
  assert.match(page, /38\.5%/);
  assert.match(page, /Each business question produced a result/i);
  assert.match(page, /does not claim to measure profit/i);
  assert.match(page, /presentation-walkthrough\.m4v/);
  assert.match(projects, /sales-performance-analytics/);
  assert.match(projects, /sales-performance\/cover\.png/);
});

test("Sales Performance dashboard exports are present", async () => {
  for (const name of ["cover.png", "executive-summary.png", "market-breakdown.png", "presentation-walkthrough.m4v"]) {
    await access(new URL(`../public/projects/sales-performance/${name}`, import.meta.url));
  }
});
