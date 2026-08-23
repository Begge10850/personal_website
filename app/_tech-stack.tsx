"use client";

import { useState } from "react";
import { TechIcon } from "./_components";

const items = [
  { name: "Python", categories: ["Languages"] },
  { name: "Pandas", categories: ["Data"] },
  { name: "SQL", categories: ["Languages", "Data"] },
  { name: "Power BI", categories: ["Data", "Tools"] },
  { name: "React", categories: ["Frontend"] },
  { name: "Next.js", categories: ["Frontend"] },
  { name: "FastAPI", categories: ["Tools"] },
  { name: "Git", categories: ["Tools"] },
];

const filters = ["All", "Languages", "Data", "Frontend", "Tools"];

export function TechStack() {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? items : items.filter(item => item.categories.includes(active));

  return <section className="home-section tech-section"><div className="section-title"><h2>My Tech Stack</h2><div className="filters" aria-label="Filter technologies">{filters.map(filter => <button key={filter} type="button" className={active === filter ? "selected" : ""} aria-pressed={active === filter} onClick={() => setActive(filter)}>{filter}</button>)}</div></div><div className="tech-grid">{visible.map(item => <div className="tech-tile" key={item.name}><TechIcon name={item.name}/></div>)}</div></section>;
}
