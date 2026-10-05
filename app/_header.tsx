"use client";

/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element -- Full document navigation is intentional: client-side Link navigation is unreliable in the deployed Vinext worker. */

import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

const links = [
  ["Home", "/"],
  ["Experience", "/experience"],
  ["Education", "/education"],
  ["Projects", "/projects"],
  ["Trainings", "/trainings"],
  ["Seminars", "/seminars"],
] as const;

export function Header({ active = "Home" }: { active?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

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
