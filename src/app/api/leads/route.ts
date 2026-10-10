import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import path from "node:path";
import { validateLead } from "@/lib/lead-validation";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      const parsed = new URL(origin);
      const host = request.headers.get("host") || new URL(request.url).host;
      if (parsed.host !== host || !["http:", "https:"].includes(parsed.protocol)) return Response.json({ error: "مبدأ درخواست معتبر نیست." }, { status: 403 });
    } catch { return Response.json({ error: "مبدأ درخواست معتبر نیست." }, { status: 403 }); }
  }
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "نوع درخواست معتبر نیست." }, { status: 415 });
  if (Number(request.headers.get("content-length") || 0) > 8192) return Response.json({ error: "درخواست بیش از حد طولانی است." }, { status: 413 });
  let value: unknown;
  try { const text = await request.text(); if (text.length > 8192) return Response.json({ error: "درخواست بیش از حد طولانی است." }, { status: 413 }); value = JSON.parse(text); } catch { return Response.json({ error: "اطلاعات درخواست معتبر نیست." }, { status: 400 }); }
  const { data, errors } = validateLead(value);
  if (!data || Object.keys(errors).length) return Response.json({ errors }, { status: 422 });
  if (data.website) return Response.json({ error: "درخواست معتبر نیست." }, { status: 422 });
  const directory = process.env.LEAD_STORAGE_DIR || path.join(process.cwd(), ".data", "leads");
  const filename = path.join(directory, `${data.requestId}.json`);
  let record = { id: data.requestId, createdAt: new Date().toISOString(), name: data.name, organization: data.organization, phone: data.phone, service: data.service, emailStatus: "pending" };
  try {
    await mkdir(directory, { recursive: true, mode: 0o700 });
    try { await writeFile(filename, JSON.stringify(record), { flag: "wx", mode: 0o600 }); }
    catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      const existing = JSON.parse(await readFile(filename, "utf8"));
      if (existing.phone !== record.phone || existing.organization !== record.organization || existing.name !== record.name || existing.service !== record.service) return Response.json({ error: "شناسه درخواست تکراری است؛ صفحه را تازه کنید." }, { status: 409 });
      if (existing.emailStatus === "accepted" || !process.env.RESEND_API_KEY || !process.env.LEAD_FROM_EMAIL) return Response.json({ id: existing.id, emailDelivered: existing.emailStatus === "accepted", duplicate: true }, { status: 200 });
      record = existing;
    }
  } catch { return Response.json({ error: "ثبت درخواست انجام نشد. دوباره تلاش کنید یا با ما تماس بگیرید." }, { status: 503 }); }
  let emailDelivered = false;
  if (process.env.RESEND_API_KEY && process.env.LEAD_FROM_EMAIL) {
    try {
      const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Idempotency-Key": record.id }, body: JSON.stringify({ from: process.env.LEAD_FROM_EMAIL, to: ["info@ordibehesht.group"], subject: `درخواست همکاری سازمانی — ${record.organization}`, text: `نام: ${record.name}\nسازمان: ${record.organization}\nشماره تماس: ${record.phone}\nحوزه همکاری: ${record.service}\nشناسه: ${record.id}` }), signal: AbortSignal.timeout(10000) });
      emailDelivered = response.ok;
    } catch { /* Record remains available for follow-up if the mail service is down. */ }
  }
  record.emailStatus = emailDelivered ? "accepted" : "pending";
  try { const temporary = `${filename}.tmp`; await writeFile(temporary, JSON.stringify(record), { mode: 0o600 }); await rename(temporary, filename); } catch { /* The original persisted lead is retained. */ }
  return Response.json({ id: record.id, emailDelivered }, { status: 201 });
}
