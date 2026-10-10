"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "./arrow";

const brands = [
  { number: "01", name: "اردیبهشت پی", english: "ORDIBEHESHT PAY", category: "credit", kind: "pay", description: "اعتبار برای خواسته‌های بزرگ‌تر", detail: "راهکارهای رفاهی و خرید اعتباری برای کارکنان سازمان‌ها؛ با تمرکز بر خرید اقساطی کالا و خودرو.", href: "https://ordibehesht.shop" },
  { number: "02", name: "گلدی‌بهشت", english: "GOLD ORDIBEHESHT", category: "credit", kind: "gold", description: "درخشش یک انتخاب ماندگار", detail: "فروشگاه آنلاین طلا و زیورآلات، همراه با امکان خرید اعتباری و اقساطی.", href: "https://gold.ordibehesht.shop" },
  { number: "03", name: "خودروی اردیبهشت", english: "ORDIBEHESHT CAR", category: "credit", kind: "car", description: "یک قدم نزدیک‌تر به حرکت", detail: "مسیر خرید خودرو در اکوسیستم خدمات اعتباری و رفاهی گروه اردیبهشت.", href: "https://car.ordibehesht.shop" },
  { number: "04", name: "کالای اردیبهشت", english: "ORDIBEHESHT KALA", category: "credit", kind: "kala", description: "برای روزمره‌ای بهتر", detail: "مسیر خرید کالا و دسترسی کارکنان به نیازهای روزمره در شبکه خدمات گروه.", href: "https://kala.ordibehesht.shop" },
  { number: "05", name: "گردشگری اردیبهشت", english: "ORDIBEHESHT TRAVEL", category: "life", kind: "travel", description: "افق‌هایی برای کشف کردن", detail: "پرواز، هتل، تور و ویزا؛ همراه با راهکارهای سفر سازمانی و سفرهای تشویقی کارکنان.", href: "https://www.ordibehesht.travel" },
  { number: "06", name: "فرنگ ویزا", english: "FARANG VISA", category: "special", kind: "visa", description: "جهانی از فرصت‌های تازه", detail: "خدمات مهاجرت و مسیرهای مرتبط با ویزا، در شبکه برندهای معرفی‌شده توسط گروه.", href: "https://farangvisa.com" },
  { number: "07", name: "اردی هلث", english: "ORDI HEALTH", category: "life", kind: "health", description: "سلامت، بخشی از رفاه", detail: "شاخه خدمات سلامت‌محور در اکوسیستم اردیبهشت؛ برای کامل‌تر شدن مسیر رفاه.", href: "http://med.ordibehesht.shop/" },
  { number: "08", name: "اردی ترید", english: "ORDI TRADE", category: "special", kind: "trade", description: "پیوند ظرفیت‌ها و بازارها", detail: "خدمات بازرگانی گروه اردیبهشت و مسیری برای توسعه همکاری‌های تجاری.", href: "https://orditrade.com" },
];
const features: Record<string, string[]> = {
  pay: ["خرید اعتباری", "خدمات رفاهی", "همکاری سازمانی"],
  gold: ["طلا و زیورآلات", "خرید اقساطی", "فروشگاه آنلاین"],
  car: ["خرید خودرو", "مسیر اعتباری"],
  kala: ["خرید کالا", "نیازهای کارکنان"],
  travel: ["پرواز و هتل", "تور و ویزا", "سفرهای تشویقی"],
  visa: ["خدمات مهاجرت", "مسیرهای ویزا"],
  health: ["خدمات سلامت", "رفاه کارکنان"],
  trade: ["بازرگانی", "همکاری تجاری"],
};

export function BrandArtwork({ kind }: { kind: string }) {
  return (
    <div className={`brand-art art-${kind}`} aria-hidden="true">
      <div className="art-halo" /><div className="art-piece piece-one" /><div className="art-piece piece-two" /><div className="art-piece piece-three" />
      {kind === "car" ? <svg viewBox="0 0 180 80"><path d="M18 52L27 37L65 32L87 16H119L141 33L159 39L165 53V63H149M126 63H58M34 63H16V53Z"/><circle cx="46" cy="61" r="12"/><circle cx="138" cy="61" r="12"/><path d="M76 32H130M96 18V32"/></svg> : null}
    </div>
  );
}

export function Ecosystem() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [linear, setLinear] = useState(false);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width: 761px)");
    let frame = 0; let last = -1;
    const update = () => {
      frame = 0;
      setLinear(reduced.matches);
      if (!root.current || !track.current) return;
      if (!desktop.matches || reduced.matches) { track.current.style.transform = "none"; return; }
      const rect = root.current.getBoundingClientRect();
      const fraction = Math.max(0, Math.min(1, -rect.top / (rect.height - innerHeight)));
      track.current.style.transform = `translate3d(${fraction * (brands.length - 1) / brands.length * 100}%, 0, 0)`;
      if (progress.current) progress.current.style.transform = `scaleX(${fraction})`;
      const index = Math.round(fraction * (brands.length - 1));
      if (index !== last) { setActive(index); last = index; }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener("scroll", schedule, { passive: true }); addEventListener("resize", schedule);
    reduced.addEventListener("change", update); desktop.addEventListener("change", update); update();
    return () => { cancelAnimationFrame(frame); removeEventListener("scroll", schedule); removeEventListener("resize", schedule); reduced.removeEventListener("change", update); desktop.removeEventListener("change", update); };
  }, []);
  function goTo(index: number) {
    index = Math.max(0, Math.min(brands.length - 1, index));
    if (linear) { document.getElementById(`brand-${index}`)?.scrollIntoView({ block: "center" }); return; }
    if (innerWidth <= 760) { viewport.current?.scrollTo({ left: -index * viewport.current.clientWidth, behavior: "smooth" }); return; }
    if (!root.current) return;
    const rect = root.current.getBoundingClientRect();
    window.scrollTo({ top: scrollY + rect.top + index / (brands.length - 1) * (rect.height - innerHeight), behavior: "smooth" });
  }
  return (
    <section id="ecosystem" ref={root} className="brand-journey" aria-labelledby="ecosystem-heading">
      <div className="journey-sticky">
        <div className="journey-heading section-shell"><div><div className="eyebrow"><span className="line" /> جهان اردیبهشت</div><h2 id="ecosystem-heading">هشت مسیر.<span> یک جهان مشترک.</span></h2></div><p>اسکرول کنید؛ هر برند، فصل تازه‌ای از زندگی.</p></div>
        <div className="journey-viewport" ref={viewport} tabIndex={0} role="region" aria-label="روایت برندها؛ کلید چپ برای برند بعدی و راست برای قبلی" onKeyDown={event => { if (event.target !== event.currentTarget) return; if (event.key === "ArrowLeft") { event.preventDefault(); goTo(active + 1); } if (event.key === "ArrowRight") { event.preventDefault(); goTo(active - 1); } }} onScroll={() => { if (innerWidth <= 760 && viewport.current) setActive(Math.round(Math.abs(viewport.current.scrollLeft) / viewport.current.clientWidth)); }}>
          <div className="journey-track" ref={track}>
            {brands.map((brand, index) => <article id={`brand-${index}`} key={brand.number} className={`journey-panel panel-${brand.kind}`} aria-hidden={!linear && active !== index}>
              <div className="journey-copy"><span className="journey-kicker" dir="ltr">{brand.number} / {brand.english}</span><h3>{brand.name}</h3><p className="journey-promise">{brand.description}</p><p className="journey-detail">{brand.detail}</p><div className="journey-features">{features[brand.kind].map(feature => <span key={feature}>{feature}</span>)}</div><a href={brand.href} target="_blank" rel="noopener noreferrer" tabIndex={linear || active === index ? 0 : -1} className="text-link">کشف {brand.name}<span className="circle-arrow"><Arrow /></span></a></div>
              <div className="journey-art"><span className="journey-large-number" dir="ltr">{brand.number}</span><BrandArtwork kind={brand.kind} /><span className="journey-art-label" dir="ltr">{brand.english}</span></div>
            </article>)}
          </div>
        </div>
        <div className="journey-controls section-shell"><p aria-live="polite">فصل {new Intl.NumberFormat("fa-IR").format(active + 1)} <span>از ۸</span></p><div className="journey-dots" role="group" aria-label="انتخاب برند">{brands.map((brand,index) => <button key={brand.number} aria-label={brand.name} aria-pressed={active === index} onClick={() => goTo(index)}><span /></button>)}</div><div className="journey-arrows"><button aria-label="برند قبلی" disabled={active === 0} onClick={() => goTo(active - 1)}>→</button><button aria-label="برند بعدی" disabled={active === brands.length - 1} onClick={() => goTo(active + 1)}>←</button></div></div>
        <div className="journey-progress"><div ref={progress} /></div>
      </div>
    </section>
  );
}
