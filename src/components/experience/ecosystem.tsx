"use client";

import { useState } from "react";
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
const filters = [{ id: "all", label: "همه برندها" }, { id: "credit", label: "اعتبار و خرید" }, { id: "life", label: "سبک زندگی" }, { id: "special", label: "خدمات تخصصی" }];

function BrandArtwork({ kind }: { kind: string }) {
  return (
    <div className={`brand-art art-${kind}`} aria-hidden="true">
      <div className="art-halo" /><div className="art-piece piece-one" /><div className="art-piece piece-two" /><div className="art-piece piece-three" />
      {kind === "car" ? <svg viewBox="0 0 180 80"><path d="M18 52L27 37L65 32L87 16H119L141 33L159 39L165 53V63H149M126 63H58M34 63H16V53Z"/><circle cx="46" cy="61" r="12"/><circle cx="138" cy="61" r="12"/><path d="M76 32H130M96 18V32"/></svg> : null}
    </div>
  );
}

export function Ecosystem() {
  const [filter, setFilter] = useState("all");
  const selected = brands.filter(brand => filter === "all" || brand.category === filter);
  return (
    <section id="ecosystem" className="ecosystem-section section-shell" aria-labelledby="ecosystem-heading">
      <div className="section-heading">
        <div><div className="eyebrow"><span className="line" /> جهان اردیبهشت</div><h2 id="ecosystem-heading">یک نگاه مشترک.<br /><span className="muted-heading">جهانی از امکان‌ها.</span></h2></div>
        <p>برندهایی مستقل، با یک باور مشترک:<br />زندگی بهتر، از دسترسی بهتر آغاز می‌شود.</p>
      </div>
      <div className="brand-filters" role="group" aria-label="فیلتر برندها">
        {filters.map(item => <button key={item.id} onClick={() => setFilter(item.id)} aria-pressed={filter === item.id}>{item.label}<span aria-hidden="true">{filter === item.id ? "−" : "+"}</span></button>)}
      </div>
      <p className="sr-only" role="status">{new Intl.NumberFormat("fa-IR").format(selected.length)} برند نمایش داده می‌شود</p>
      <div className="brand-grid">
        {selected.map(brand => <article key={brand.number} className="brand-card">
          <div className="brand-card-top"><span dir="ltr">{brand.number}</span><a href={brand.href} target="_blank" rel="noopener noreferrer" aria-label={`وب‌سایت ${brand.name}، در پنجره جدید`}><Arrow /></a></div>
          <BrandArtwork kind={brand.kind} />
          <div className="brand-copy"><span className="brand-english" dir="ltr">{brand.english}</span><h3>{brand.name}</h3><p>{brand.description}</p></div>
          <details><summary>درباره این برند <span aria-hidden="true">+</span></summary><p>{brand.detail}</p><a href={brand.href} target="_blank" rel="noopener noreferrer">ورود به وب‌سایت <Arrow /></a></details>
        </article>)}
      </div>
      <div className="ecosystem-note"><span className="status-dot" /> خدمات گروه، در مسیر توسعه و تکامل <span dir="ltr">ONE VISION. MANY POSSIBILITIES.</span></div>
    </section>
  );
}
