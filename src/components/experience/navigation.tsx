"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "./arrow";
import { BrandMark } from "./brand-mark";

const links = [{ href: "#vision", label: "نگاه ما" }, { href: "#ecosystem", label: "جهان اردیبهشت" }, { href: "#partnership", label: "همکاری سازمانی" }];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="site-header">
      <a href="#home" className="wordmark" aria-label="گروه اردیبهشت، صفحه اصلی" onClick={() => setOpen(false)}>
        <BrandMark />
      </a>
      <nav className="desktop-nav" aria-label="ناوبری اصلی">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
      <a href="#partnership" className="header-cta">آغاز یک همکاری <Arrow /></a>
      <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "بستن منو" : "باز کردن منو"} onClick={() => setOpen(!open)}>{open ? "بستن −" : "منو +"}</button>
      <nav id="mobile-menu" className="mobile-nav" aria-label="ناوبری موبایل" hidden={!open}>
        {links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<Arrow /></a>)}
      </nav>
    </header>
  );
}
