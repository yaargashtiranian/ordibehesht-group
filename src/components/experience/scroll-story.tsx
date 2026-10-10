"use client";

import { useEffect, useRef, useState } from "react";

const chapters = [
  { number: "۰۱", title: "امکانِ بیشتر", subtitle: "اعتبار، نقطه شروع است.", text: "خرید اعتباری کالا و خودرو؛ راهی برای نزدیک‌تر شدن کارکنان به نیازها و خواسته‌هایشان.", word: "اعتبار", label: "ORDIBEHESHT PAY" },
  { number: "۰۲", title: "تجربه‌ای فراتر", subtitle: "رفاه، در زندگی جریان دارد.", text: "از سفر و تجربه‌های تازه تا خدمات سلامت؛ مسیرهایی برای بهتر زیستن، در کنار کار کردن.", word: "زندگی", label: "WELLBEING & EXPERIENCES" },
  { number: "۰۳", title: "ارزشِ مشترک", subtitle: "آینده، با همکاری ساخته می‌شود.", text: "پیوند ظرفیت‌های گروه با نیاز سازمان‌ها؛ برای شکل‌گیری خدماتی که به زندگی کارکنان معنا می‌دهند.", word: "همراهی", label: "A SHARED FUTURE" },
];

export function ScrollStory() {
  const container = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const root = container.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-chapter]"));
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.chapter));
      }
    }, { rootMargin: "-35% 0px -35% 0px", threshold: 0 });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return (
    <section className="story-section" ref={container} aria-labelledby="story-heading">
      <div className="story-visual" aria-hidden="true">
        <div className={`orbit-art chapter-${active}`}><div className="orbit-ring ring-a" /><div className="orbit-ring ring-b" /><div className="orbit-ring ring-c" /><div className="orbit-core">{chapters[active].word}</div></div>
        <div className="story-caption" dir="ltr"><span>{chapters[active].label}</span><span>0{active + 1} / 03</span></div>
      </div>
      <div className="story-chapters">
        {chapters.map((chapter, index) => (
          <article key={chapter.number} className="story-chapter" data-chapter={index}>
            <div className="eyebrow light"><span className="line" /> فصل {chapter.number}</div>
            <h2 id={index === 0 ? "story-heading" : undefined}>{chapter.title}</h2>
            <h3>{chapter.subtitle}</h3><p>{chapter.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
