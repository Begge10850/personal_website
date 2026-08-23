"use client";

import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

export function Header({ active = "Home" }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const extraRef = useRef<HTMLDivElement>(null);
  const nav = ["Home", "Experience", "Education", "Projects"];
  const extraActive = ["Trainings", "Seminars"].includes(active);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!extraRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  return <header className="site-header"><div className="header-inner"><a className="logo" href="/" aria-label="Treva Antony Ogwang — Home"><img src="/owl-mark.png" alt=""/></a><nav>{nav.map(item => <a key={item} className={active === item ? "active" : ""} href={item === "Home" ? "/" : `/${item.toLowerCase()}`}>{item}</a>)}<div className={`extra ${open ? "open" : ""}`} ref={extraRef}><button className={extraActive ? "active" : ""} type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(value => !value)}>Extra <FiChevronDown aria-hidden="true"/></button><div className="extra-menu" role="menu"><a href="/trainings" role="menuitem"><b>Trainings</b><span>Courses and certifications</span></a><a href="/seminars" role="menuitem"><b>Seminars</b><span>Workshops and events</span></a></div></div><a className={active === "Contact" ? "active" : ""} href="/contact">Contact</a></nav><div className="socials"><a href="https://github.com/Begge10850" target="_blank" rel="noreferrer" aria-label="Treva on GitHub"><FaGithub/></a><span className="social-divider"/><a href="https://de.linkedin.com/in/treva-ogwang-87235626b" target="_blank" rel="noreferrer" aria-label="Treva on LinkedIn"><FaLinkedinIn/></a></div></div></header>;
}
