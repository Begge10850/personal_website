"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type ViewerProps = {
  label: string;
  children: ReactNode;
  enlarged: ReactNode;
};

function Viewer({ label, children, enlarged }: ViewerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return <>
    <button type="button" className="saidia-media-trigger" aria-label={label} onClick={() => setOpen(true)}>
      {children}
    </button>
    {open && createPortal(
      <div className="saidia-lightbox" role="dialog" aria-modal="true" aria-label={label} onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}>
        <button type="button" className="saidia-lightbox-close" aria-label="Close enlarged view" autoFocus onClick={() => setOpen(false)}>×</button>
        <div className="saidia-lightbox-content" onMouseDown={(event) => event.stopPropagation()}>{enlarged}</div>
      </div>,
      document.body,
    )}
  </>;
}

export function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  return <Viewer label={`Enlarge: ${alt}`} enlarged={<img className="saidia-lightbox-image" src={src} alt={alt}/>}>
    <img src={src} alt={alt}/>
  </Viewer>;
}

export function ZoomableDiagram({ title, children }: { title: string; children: ReactNode }) {
  return <Viewer label={`Enlarge diagram: ${title}`} enlarged={<div className="saidia-lightbox-diagram">{children}</div>}>
    {children}
  </Viewer>;
}
