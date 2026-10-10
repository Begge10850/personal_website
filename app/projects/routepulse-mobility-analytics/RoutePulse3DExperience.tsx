"use client";

import { useEffect, useRef, useState } from "react";

export function RoutePulse3DExperience() {
  const [active, setActive] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const frameWrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncFullscreen = () => setFullscreen(document.fullscreenElement === frameWrap.current);
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  async function toggleFullscreen() {
    if (!document.fullscreenElement) {
      await frameWrap.current?.requestFullscreen();
      setFullscreen(true);
    } else {
      await document.exitFullscreen();
      setFullscreen(false);
    }
  }
  if (!active) return <div className="rp-3d-launch">
    <div><span>Interactive 3D network</span><strong>Orbit five geographically aligned transport layers</strong><p>The map engine and route data load only when you launch the experience.</p></div>
    <button type="button" onClick={() => setActive(true)}>Launch interactive map</button>
  </div>;
  return <div className="rp-3d-frame-wrap" ref={frameWrap} style={fullscreen ? { padding: 14, marginTop: 0, background: "#071217" } : undefined}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 10, color: fullscreen ? "#b7cec9" : "#66706c", fontSize: 12 }}><span>Drag to rotate · Scroll to zoom</span><button type="button" onClick={toggleFullscreen} style={{ border: "1px solid #9cbdb5", borderRadius: 8, padding: "9px 12px", background: fullscreen ? "#72e1d1" : "#fff", color: "#183b32", font: "inherit", fontWeight: 800, cursor: "pointer" }}>{fullscreen ? "Exit full screen" : "View full screen"}</button></div>
    <iframe className="rp-3d-frame" style={fullscreen ? { height: "calc(100vh - 58px)", minHeight: 0 } : undefined} src="/projects/routepulse/3d/index.html" title="RoutePulse interactive 3D transport network" loading="lazy" allow="fullscreen" />
  </div>;
}
