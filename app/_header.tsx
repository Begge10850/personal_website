"use client";

import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";

const links = [
  ["Home", "/"],
  ["Experience", "/experience"],
  ["Education", "/education"],
  ["Projects", "/projects"],
] as const;

export function Header({ active = "Home" }: { active?: string }) {
  const [extraOpen, setExtraOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const extraRef = useRef<HTMLDivElement>(null);
  const extraActive = ["Trainings", "Seminars"].includes(active);

  useEffect(() => {
    const closeExtra = (event: MouseEvent) => {
      if (!extraRef.current?.contains(event.target as Node)) setExtraOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExtraOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", closeExtra);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", closeExtra);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", mobileOpen);
    return () => document.body.classList.remove("mobile-menu-open");
  }, [mobileOpen]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <button
          className="mobile-menu-button"
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="primary-navigation"
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>

        <a className="logo" href="/" aria-label="Treva Antony Ogwang — Home">
          <img src="/owl-mark.png" alt="" />
        </a>

        <nav id="primary-navigation" className={mobileOpen ? "mobile-open" : ""}>
          <span className="mobile-menu-label">Menu</span>
          {links.map(([label, href]) => (
            <a key={label} className={active === label ? "active" : ""} href={href}>{label}</a>
          ))}
          <div className={`extra ${extraOpen ? "open" : ""}`} ref={extraRef}>
            <button
              className={extraActive ? "active" : ""}
              type="button"
              aria-haspopup="menu"
              aria-expanded={extraOpen}
              onClick={() => setExtraOpen((value) => !value)}
            >
              Extra <FiChevronDown aria-hidden="true" />
            </button>
            <div className="extra-menu" role="menu">
              <a href="/trainings" role="menuitem"><b>Trainings</b><span>Courses and certifications</span></a>
              <a href="/seminars" role="menuitem"><b>Seminars</b><span>Workshops and events</span></a>
            </div>
          </div>
          <div className="mobile-extra-links">
            <a className={active === "Trainings" ? "active" : ""} href="/trainings">Trainings</a>
            <a className={active === "Seminars" ? "active" : ""} href="/seminars">Seminars</a>
          </div>
          <a className={active === "Contact" ? "active" : ""} href="/contact">Contact</a>
          <div className="mobile-social-links">
            <span className="mobile-menu-label">Socials</span>
            <a href="https://github.com/Begge10850" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/treva-ogwang/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </nav>

        <div className="socials">
          <a href="https://github.com/Begge10850" target="_blank" rel="noreferrer" aria-label="Treva on GitHub"><FaGithub /></a>
          <span className="social-divider" />
          <a href="https://www.linkedin.com/in/treva-ogwang/" target="_blank" rel="noreferrer" aria-label="Treva on LinkedIn"><FaLinkedinIn /></a>
        </div>
      </div>
    </header>
  );
}
