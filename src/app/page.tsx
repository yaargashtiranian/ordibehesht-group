import { LeadForm } from "@/components/experience/lead-form";
import { Arrow } from "@/components/experience/arrow";
import { Navigation } from "@/components/experience/navigation";
import { Sculpture } from "@/components/experience/sculpture";
import { ScrollStory } from "@/components/experience/scroll-story";
import { Ecosystem } from "@/components/experience/ecosystem";
import { BrandMark } from "@/components/experience/brand-mark";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">رفتن به محتوای اصلی</a>
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: "گروه شرکت‌های اردیبهشت", url: "https://ordibehesht.group/", email: "info@ordibehesht.group", telephone: "+98-21-92005001" }) }} />
      <main id="main">
        <section id="home" className="hero" aria-labelledby="hero-heading">
          <div className="hero-watermark" aria-hidden="true" dir="ltr">O</div>
          <div className="hero-copy">
            <div className="eyebrow"><span className="line" /> آینده‌ای که با هم می‌سازیم</div>
            <h1 id="hero-heading">زندگی،<br />در مدارِ <span className="gold-word">اردیبهشت.</span></h1>
            <p>ما میان توان سازمان‌ها و خواسته‌های آدم‌ها،<br className="desktop-break" /> پلی از امکان می‌سازیم.</p>
            <a href="#ecosystem" className="text-link">کشف جهان اردیبهشت <span className="circle-arrow"><Arrow direction="down" /></span></a>
          </div>
          <div className="hero-art"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><Sculpture /><div className="sculpture-label" dir="ltr"><span>THE ART OF POSSIBILITY</span><span>FORM / FLOW / POSSIBILITY</span></div></div>
          <div className="hero-bottom"><a href="#vision" className="scroll-cue"><span className="scroll-line" /> روایت ما را دنبال کنید</a><span dir="ltr">A GROUP. A VISION. A BETTER LIFE.</span><span className="hero-index" dir="ltr">01 — 05</span></div>
        </section>
        <div className="brand-strip" aria-label="حوزه‌های فعالیت"><span>اعتبار و رفاه</span><span className="strip-star" aria-hidden="true">✳</span><span>سفر و تجربه</span><span className="strip-star" aria-hidden="true">✳</span><span>سلامت و زندگی</span><span className="strip-star" aria-hidden="true">✳</span><span>تجارت و فرصت</span></div>
        <section id="vision" className="vision-section section-shell" aria-labelledby="vision-heading">
          <div className="eyebrow"><span className="line" /> نگاه اردیبهشت <span className="section-count" dir="ltr">01 / THE VISION</span></div>
          <div className="vision-content"><h2 id="vision-heading">هر سازمان،<br />جهانی از <span>آدم‌هاست.</span></h2><div className="vision-copy"><p className="large-copy">و هر آدم، جهانی از آرزوها.</p><p>گروه شرکت‌های اردیبهشت با تمرکز بر بازار سازمانی، خدمات رفاهی و خرید اعتباری را به زندگی کارکنان پیوند می‌دهد؛ تا فاصله میان خواستن و توانستن، کوتاه‌تر شود.</p><p>از سازمان‌های دولتی و خصوصی تا بانک‌ها و شرکت‌های بزرگ؛ نگاه ما به همکاری، از نیازهای واقعی آدم‌ها آغاز می‌شود.</p><div className="vision-signature"><BrandMark /><span>رفاه برای کارکنان.<br />ارزش برای سازمان‌ها.</span></div></div></div>
        </section>
        <ScrollStory />
        <Ecosystem />
        <section id="partnership" className="partnership-section section-shell" aria-labelledby="partnership-heading">
          <div className="partnership-ambient" aria-hidden="true"><div /><div /><div /></div>
          <div className="eyebrow light"><span className="line" /> همکاری سازمانی</div>
          <div className="partnership-content"><div><h2 id="partnership-heading">فصل بعدی را،<br /><span>با هم بنویسیم.</span></h2><p>ظرفیت‌های اردیبهشت، در کنار اهداف سازمان شما.<br />برای کارکنانی که شایسته تجربه‌ای بهترند.</p><div className="contact-details"><a href="mailto:info@ordibehesht.group" dir="ltr">info@ordibehesht.group</a><a href="tel:+982192005001" dir="ltr" aria-label="تماس با گروه اردیبهشت، ۰۲۱ ۹۲۰۰۵۰۰۱">۰۲۱–۹۲۰۰۵۰۰۱</a></div></div><LeadForm /></div>
        </section>
      </main>
      <footer className="site-footer section-shell"><div className="footer-top"><a href="#home" className="wordmark" aria-label="گروه شرکت‌های اردیبهشت، بازگشت به ابتدا"><BrandMark /></a><p>آینده، از امکان‌های امروز ساخته می‌شود.</p><a href="#home" className="back-top">بازگشت به بالا <span><Arrow direction="up" /></span></a></div><div className="footer-bottom"><span>گروه شرکت‌های اردیبهشت</span><span dir="ltr">DESIGNED AROUND PEOPLE.</span><span>تمام حقوق محفوظ است.</span></div></footer>
    </>
  );
}
