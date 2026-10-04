import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const pageUrl = new URL("../app/projects/routepulse-mobility-analytics/page.tsx", import.meta.url);

test("RoutePulse case study keeps its public evidence and decision boundaries", async () => {
  const [page, projects] = await Promise.all([
    readFile(pageUrl, "utf8"),
    readFile(new URL("../app/_components.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /94,839,920/);
  assert.match(page, /1,528,690/);
  assert.match(page, /87,587/);
  assert.match(page, /zero category mismatches/i);
  assert.match(page, /do not establish operational causes/i);
  assert.match(page, /GTFS-Realtime reference/);
  assert.match(projects, /routepulse-mobility-analytics/);
});

test("RoutePulse case-study images are present", async () => {
  for (const name of [
    "dashboard-overview.png",
    "network-map.png",
    "station-analysis.png",
    "validation-results.png",
  ]) {
    await access(new URL(`../public/projects/routepulse/${name}`, import.meta.url));
  }
});
