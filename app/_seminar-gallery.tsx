"use client";

import { useEffect, useState } from "react";

type Photo = { src: string; alt: string };

export function SeminarGallery({ photos }: { photos: Photo[] }) {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);

  return <>
    <div className="seminar-gallery">
      {photos.map((photo, index) => <button key={photo.src} type="button" onClick={() => setSelected(index)} aria-label={`Open ${photo.alt}`}>
        <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async"/>
      </button>)}
    </div>
    {selected !== null && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Expanded seminar photograph" onClick={() => setSelected(null)}>
      <button type="button" className="gallery-close" onClick={() => setSelected(null)} aria-label="Close expanded photograph">×</button>
      <img src={photos[selected].src} alt={photos[selected].alt} onClick={event => event.stopPropagation()}/>
    </div>}
  </>;
}
