"use client";

import { useState } from "react";

export function ToggleDetails({ label = "Responsibilities", items }: { label?: string; items: string[] }) {
  const [open, setOpen] = useState(false);
  return <div className="toggle-details"><button type="button" className="underlink" aria-expanded={open} onClick={() => setOpen(value => !value)}>{open ? `Hide ${label}` : `Show ${label}`}</button>{open && <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>}</div>;
}
