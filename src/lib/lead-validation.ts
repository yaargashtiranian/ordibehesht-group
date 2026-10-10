export const services = ["خدمات اعتباری و رفاهی", "خرید کالا و خودرو", "گردشگری سازمانی", "خدمات سلامت", "سایر همکاری‌ها"] as const;
export function normalizePhone(value: string) {
  const digits = value.replace(/[۰-۹]/g, c => String(c.charCodeAt(0) - 1776)).replace(/[٠-٩]/g, c => String(c.charCodeAt(0) - 1632)).replace(/[\s()\-–]/g, "");
  return digits.replace(/^(?:\+98|0098)/, "0");
}
export type LeadInput = { name: string; organization: string; phone: string; service: string; website: string; requestId: string };
export function validateLead(value: unknown): { data?: LeadInput; errors: Record<string,string> } {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { errors: { form: "اطلاعات درخواست معتبر نیست." } };
  const v = value as Record<string,unknown>;
  const text = (key: string) => typeof v[key] === "string" ? (v[key] as string).trim() : "";
  const data = { name: text("name"), organization: text("organization"), phone: normalizePhone(text("phone")), service: text("service"), website: text("website"), requestId: text("requestId") };
  const errors: Record<string,string> = {};
  if (data.name.length < 2 || data.name.length > 80) errors.name = "نام و نام خانوادگی را وارد کنید.";
  if (data.organization.length < 2 || data.organization.length > 120) errors.organization = "نام سازمان را وارد کنید.";
  if (!/^0\d{10}$/.test(data.phone)) errors.phone = "شماره تماس ۱۱ رقمی با صفر یا پیش‌شماره ۹۸ وارد کنید.";
  if (!(services as readonly string[]).includes(data.service)) errors.service = "حوزه همکاری را انتخاب کنید.";
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(data.requestId)) errors.form = "شناسه درخواست معتبر نیست؛ صفحه را دوباره باز کنید.";
  return { data, errors };
}
