"use client";

import { useEffect, useRef, useState } from "react";

const mapUrl = "/projects/routepulse/3d/index.html?v=mobile-data-v2";

export function RoutePulse3DExperience() {
  const [active, setActive] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenSupported, setFullscreenSupported] = useState(false);
  const frameWrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFullscreenSupported(typeof frameWrap.current?.requestFullscreen === "function");
    const syncFullscreen = () => setFullscreen(document.fullscreenElement === frameWrap.current);
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await frameWrap.current?.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      window.location.assign(mapUrl);
    }
  }

  if (!active) return <div className="rp-3d-launch">
    <div><span>Interactive 3D network</span><strong>Orbit five geographically aligned transport layers</strong><p>The map engine and route data load only when you launch the experience.</p></div>
    <button className="rp-desktop-launch" type="button" onClick={() => setActive(true)}>Launch interactive map</button>
    <a className="rp-mobile-launch" href={mapUrl}>Open interactive map</a>
  </div>;
  return <div className="rp-3d-frame-wrap" ref={frameWrap} style={fullscreen ? { padding: 14, marginTop: 0, background: "#071217" } : undefined}>
    <div className="rp-3d-toolbar"><span>Drag to rotate · Pinch or scroll to zoom</span><div><a href={mapUrl}>Open full-page map</a>{fullscreenSupported && <button type="button" onClick={toggleFullscreen}>{fullscreen ? "Exit full screen" : "View full screen"}</button>}</div></div>
    <iframe className="rp-3d-frame" style={fullscreen ? { height: "calc(100vh - 58px)", minHeight: 0 } : undefined} src={mapUrl} title="RoutePulse interactive 3D transport network" loading="lazy" allow="fullscreen" />
  </div>;
}
