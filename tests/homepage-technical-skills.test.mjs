import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const techStack = readFileSync(new URL("../app/_tech-stack.tsx", import.meta.url), "utf8");
const homepage = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");

test("homepage presents written, grouped technical skills", () => {
  for (const heading of [
    "Technical Skills",
    "Programming & Querying",
    "Data Engineering & Analytics",
    "Machine Learning & AI",
    "Applications & Interfaces",
    "Delivery & Collaboration",
  ]) {
    assert.match(techStack, new RegExp(heading));
  }
});

test("skills represent the three completed flagship data projects", () => {
  for (const skill of [
    "Snowflake",
    "Data Quality Testing",
    "Recommender Systems",
    "scikit-learn",
    "RAG",
    "pgvector",
    "Streamlit",
    "Jira",
  ]) {
    assert.match(techStack, new RegExp(skill));
  }
});

test("homepage introduction reflects RoutePulse and Saidia", () => {
  assert.match(homepage, /RoutePulse mobility analytics/);
  assert.match(homepage, /Saidia, an explainable hybrid recommender system/);
  assert.doesNotMatch(homepage, /currently developing Finance Tracker/);
});
