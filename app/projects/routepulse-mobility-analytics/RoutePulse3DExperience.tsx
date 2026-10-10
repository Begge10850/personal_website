"use client";

import { useState } from "react";

export function RoutePulse3DExperience() {
  const [active, setActive] = useState(false);
  if (!active) return <div className="rp-3d-launch">
    <div><span>Interactive 3D network</span><strong>Orbit five geographically aligned transport layers</strong><p>The map engine and route data load only when you launch the experience.</p></div>
    <button type="button" onClick={() => setActive(true)}>Launch interactive map</button>
  </div>;
  return <div className="rp-3d-frame-wrap">
    <iframe className="rp-3d-frame" src="/projects/routepulse/3d/index.html" title="RoutePulse interactive 3D transport network" loading="lazy" allow="fullscreen" />
    <a href="/projects/routepulse/3d/index.html" target="_blank" rel="noreferrer">Open full screen ↗</a>
  </div>;
}
