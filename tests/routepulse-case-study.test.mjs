import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const pageUrl = new URL("../app/projects/routepulse-mobility-analytics/page.tsx", import.meta.url);

test("RoutePulse case study keeps its evidence, teaching detail and decision boundaries", async () => {
  const [page, projects] = await Promise.all([
    readFile(pageUrl, "utf8"),
    readFile(new URL("../app/_components.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /94,839,920/);
  assert.match(page, /1,755,847/);
  assert.match(page, /87,587/);
  assert.match(page, /15 numbered SQL worksheets/i);
  assert.match(page, /37 unit tests/i);
  assert.match(page, /09_unique_stop_events\.sql/);
  assert.match(page, /15_validate_timing_categories\.sql/);
  assert.match(page, /LEFT JOIN/);
  assert.match(page, /does not establish the operational cause/i);
  assert.match(projects, /routepulse-mobility-analytics/);
  assert.match(projects, /routepulse-cover\.webp/);
});

test("RoutePulse case-study images are present", async () => {
  for (const name of [
    "dashboard-overview.png",
    "network-map.png",
    "map-bus.webp",
    "map-ubahn.webp",
    "map-sbahn.webp",
    "map-tram.webp",
    "map-regional-rail.webp",
    "station-analysis.png",
    "station-berlin-regional-rail.png",
    "station-berlin-bus.png",
    "lines-bus.png",
    "lines-ubahn.png",
    "time-analysis.png",
    "routepulse-cover.webp",
    "validation-results.png",
  ]) {
    await access(new URL(`../public/projects/routepulse/${name}`, import.meta.url));
  }
});

test("primary navigation exposes Trainings and Seminars without an Extra menu", async () => {
  const header = await readFile(new URL("../app/_header.tsx", import.meta.url), "utf8");

  assert.match(header, /\["Trainings", "\/trainings"\]/);
  assert.match(header, /\["Seminars", "\/seminars"\]/);
  assert.match(header, /<a key=\{label\}[^>]*href=\{href\}/);
  assert.match(header, /<a className=\{active === "Contact"/);
  assert.doesNotMatch(header, /from "next\/link"/);
  assert.doesNotMatch(header, />Extra</);
  assert.doesNotMatch(header, /extra-menu/);
});

test("homepage features RoutePulse as the only latest project", async () => {
  const home = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(home, /<h2>Latest Project<\/h2>/);
  assert.match(home, /\{\[projects\[0\]\]\.map/);
  assert.doesNotMatch(home, /projects\[2\]/);
});
