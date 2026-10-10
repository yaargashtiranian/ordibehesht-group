import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { POST } from "../src/app/api/leads/route";

let directory: string;
const originalFetch = globalThis.fetch;
const previous = { storage: process.env.LEAD_STORAGE_DIR, key: process.env.RESEND_API_KEY, sender: process.env.LEAD_FROM_EMAIL };
beforeEach(async () => { directory = await mkdtemp(path.join(tmpdir(), "ordibehesht-leads-test-")); process.env.LEAD_STORAGE_DIR = directory; delete process.env.RESEND_API_KEY; delete process.env.LEAD_FROM_EMAIL; });
afterEach(async () => { globalThis.fetch = originalFetch; for (const [key,value] of Object.entries({ LEAD_STORAGE_DIR: previous.storage, RESEND_API_KEY: previous.key, LEAD_FROM_EMAIL: previous.sender })) { if(value === undefined) delete process.env[key]; else process.env[key] = value; } await rm(directory, { recursive: true, force: true }); });
function payload() { return { name: "Test Contact", organization: "Test Organization", phone: "۰۹۱۲۰۰۰۰۰۰۰", service: "خدمات اعتباری و رفاهی", website: "", requestId: randomUUID() }; }
function request(data: unknown, origin = "https://app.example.test") { return new Request("http://0.0.0.0:3000/api/leads", { method: "POST", headers: { "Content-Type": "application/json", Host: "app.example.test", Origin: origin }, body: JSON.stringify(data) }); }

test("persian contact digits persist as a normalized lead; missing mail credentials are reported honestly", async () => {
 const lead = payload(); const response = await POST(request(lead)); assert.equal(response.status,201); const result=await response.json(); assert.equal(result.emailDelivered,false);
 const saved=JSON.parse(await readFile(path.join(directory,`${lead.requestId}.json`),"utf8")); assert.equal(saved.phone,"09120000000"); assert.equal(saved.organization,lead.organization); assert.equal(saved.emailStatus,"pending");
});
test("invalid contact information and honeypot submissions never create a record", async () => {
 for(const data of [{...payload(),phone:"123"},{...payload(),name:" "},{...payload(),website:"spam"},{...payload(),requestId:"../not-a-valid-identifier"}]) assert.equal((await POST(request(data))).status,422);
 assert.deepEqual(await readdir(directory),[]);
});
test("cross-origin, malformed JSON, and oversized requests are rejected before persistence", async () => {
 assert.equal((await POST(request(payload(),"https://other.example.test"))).status,403);
 assert.equal((await POST(new Request("https://app.example.test/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:"{"}))).status,400);
 assert.equal((await POST(request({data:"a".repeat(9000)}))).status,413);
 assert.deepEqual(await readdir(directory),[]);
});
test("duplicate requests are idempotent and do not overwrite the original lead",async()=>{
 const lead=payload();await POST(request(lead));assert.equal((await POST(request(lead))).status,200);assert.equal((await POST(request({...lead,organization:"Different Organization"}))).status,409);assert.equal((await readdir(directory)).length,1);
});
test("mail acceptance sends the lead to the requested recipient exactly once",async()=>{
 process.env.RESEND_API_KEY="unit-test-key";process.env.LEAD_FROM_EMAIL="sender@example.test";let calls=0;
 globalThis.fetch=async (url,options)=>{assert.equal(url,"https://api.resend.com/emails");const body=JSON.parse(String(options?.body));assert.deepEqual(body.to,["info@ordibehesht.group"]);assert.match(body.text,/Test Organization/);calls++;return Response.json({id:"mock-provider-id"});};
 const lead=payload();assert.equal((await (await POST(request(lead))).json()).emailDelivered,true);assert.equal((await (await POST(request(lead))).json()).emailDelivered,true);assert.equal(calls,1);
});
test("provider failure preserves the lead and a retry can send the pending notification",async()=>{
 process.env.RESEND_API_KEY="unit-test-key";process.env.LEAD_FROM_EMAIL="sender@example.test";let calls=0;
 globalThis.fetch=async()=>{calls++;if(calls===1)throw new Error("mock network failure");return Response.json({id:"mock-provider-id"});};
 const lead=payload();assert.equal((await (await POST(request(lead))).json()).emailDelivered,false);assert.equal((await (await POST(request(lead))).json()).emailDelivered,true);assert.equal((await readdir(directory)).length,1);
});
test("an unavailable storage directory cannot produce a false successful registration",async()=>{
 const file=path.join(directory,"file");const {writeFile}=await import("node:fs/promises");await writeFile(file,"existing");process.env.LEAD_STORAGE_DIR=file;
 assert.equal((await POST(request(payload()))).status,503);
});
