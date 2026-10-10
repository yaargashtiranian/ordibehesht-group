"use client";

import { useRef, useState } from "react";
import { normalizePhone, services } from "@/lib/lead-validation";
import { Arrow } from "./arrow";

export function LeadForm() {
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ id: string; emailDelivered: boolean } | null>(null);
  const requestId = useRef<string | null>(null);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (pending) return;
    const form = event.currentTarget; const values = new FormData(form);
    const phone = normalizePhone(String(values.get("phone")));
    if (!/^0\d{10}$/.test(phone)) { setErrors({ phone: "شماره تماس را با صفر و ۱۱ رقم وارد کنید." }); form.querySelector<HTMLInputElement>("#lead-phone")?.focus(); return; }
    setPending(true); setErrors({});
    requestId.current ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: values.get("name"), organization: values.get("organization"), phone, service: values.get("service"), website: values.get("website"), requestId: requestId.current }) });
      const data = await response.json();
      if (!response.ok) { setErrors(data.errors || { form: data.error || "ثبت درخواست انجام نشد؛ دوباره تلاش کنید." }); return; }
      setResult(data);
    } catch { setErrors({ form: "ارتباط برقرار نشد. اطلاعات شما در فرم حفظ شده؛ دوباره تلاش کنید." }); }
    finally { setPending(false); }
  }
  if (result) return <div className="lead-success" role="status"><span className="success-symbol" aria-hidden="true">✓</span><h3>درخواست شما ثبت شد.</h3><p>کد پیگیری: <span dir="ltr">{result.id.slice(0,8)}</span></p>{result.emailDelivered ? <p>اعلان درخواست برای گروه اردیبهشت ارسال شد.</p> : <><p>درخواست ذخیره شد، اما ایمیل پیگیری هنوز ارسال نشده است. برای پیگیری مستقیم، از راه‌های زیر استفاده کنید.</p><a href="mailto:info@ordibehesht.group">ارسال ایمیل به گروه <Arrow /></a><a href="tel:+982192005001" dir="ltr">۰۲۱–۹۲۰۰۵۰۰۱</a></>}<button onClick={() => { setResult(null); requestId.current = null; }}>ثبت درخواست دیگر</button></div>;
  return <form className="lead-form" onSubmit={submit} aria-busy={pending}>
    <div className="lead-form-header"><span className="eyebrow light">شروع همکاری</span><h3>برای سازمان شما،<br />چه امکانی بسازیم؟</h3><p>سه اطلاعات کوتاه؛ شروع یک گفت‌وگوی تازه.</p></div>
    <div className="lead-field"><label htmlFor="lead-name">نام و نام خانوادگی <span>ضروری</span></label><input id="lead-name" name="name" autoComplete="name" required minLength={2} maxLength={80} placeholder="نام شما" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name ? <p id="name-error" className="field-error">{errors.name}</p> : null}</div>
    <div className="lead-field"><label htmlFor="lead-organization">نام سازمان <span>ضروری</span></label><input id="lead-organization" name="organization" autoComplete="organization" required minLength={2} maxLength={120} placeholder="نام شرکت یا سازمان" aria-invalid={!!errors.organization} aria-describedby={errors.organization ? "organization-error" : undefined} />{errors.organization ? <p id="organization-error" className="field-error">{errors.organization}</p> : null}</div>
    <div className="lead-field"><label htmlFor="lead-phone">شماره تماس <span>ضروری</span></label><input id="lead-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={20} placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />{errors.phone ? <p id="phone-error" className="field-error">{errors.phone}</p> : null}</div>
    <div className="lead-field"><label htmlFor="lead-service">حوزه مورد علاقه</label><select id="lead-service" name="service" defaultValue={services[0]}>{services.map(service => <option key={service}>{service}</option>)}</select></div>
    <div className="lead-honeypot" aria-hidden="true"><label htmlFor="lead-website">Website</label><input id="lead-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    {errors.form ? <p className="field-error" role="alert">{errors.form}</p> : null}
    <button className="lead-submit" type="submit" disabled={pending}>{pending ? "در حال ثبت درخواست…" : "درخواست گفت‌وگوی همکاری"}<Arrow /></button>
    <p className="lead-privacy">اطلاعات شما فقط برای پیگیری همین درخواست استفاده می‌شود.</p>
  </form>;
}
