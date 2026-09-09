import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const contactRequiredFields = ["name", "company", "email", "phone", "website", "industry", "service", "budget", "description"];
const auditRequiredFields = ["name", "company", "email", "phone", "website", "industry", "location", "budget", "objective", "channels", "challenge"];
const maxLengths: Record<string, number> = { name: 100, company: 120, email: 160, website: 200, industry: 100, location: 100, budget: 100, objective: 1000, channels: 1000, challenge: 1000, phone: 40, service: 120, description: 1500 };
const rateLimitWindowMs = 60_000;
const configuredRateLimit = Number(process.env.CONTACT_RATE_LIMIT ?? 5);
const rateLimitMaxRequests = Number.isFinite(configuredRateLimit) && configuredRateLimit > 0 ? Math.floor(configuredRateLimit) : 5;
const maxRequestBytes = 32_768;
const requestLog = new Map<string, number[]>();
const submissionStore = process.env.CONTACT_SUBMISSIONS_PATH ?? path.join(process.cwd(), ".data", "contact-submissions.json");

function isNonEmptyString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}

function getClientAddress(request: Request) {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || "unknown";
}

function checkRateLimit(address: string) {
  const now = Date.now();
  const recent = (requestLog.get(address) ?? []).filter((time) => now - time < rateLimitWindowMs);

  if (requestLog.size > 10_000) {
    for (const [key, timestamps] of requestLog) {
      if (!timestamps.some((time) => now - time < rateLimitWindowMs)) requestLog.delete(key);
    }
  }

  if (recent.length >= rateLimitMaxRequests) {
    const retryAfter = Math.max(1, Math.ceil((recent[0] + rateLimitWindowMs - now) / 1000));
    return { allowed: false, retryAfter };
  }

  requestLog.set(address, [...recent, now]);
  return { allowed: true, retryAfter: 0 };
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

async function deliverToHubSpot(submission: Record<string, string>) {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) return true;

  const nameParts = submission.name.split(/\s+/);
  const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({
      properties: {
        email: submission.email,
        firstname: nameParts[0],
        lastname: nameParts.slice(1).join(" "),
        company: submission.company,
        phone: submission.phone,
        website: submission.website,
        lifecyclestage: "lead",
      },
    }),
    cache: "no-store",
  });

  if (response.ok || response.status === 409) return true;
  throw new Error("HubSpot delivery failed");
}

async function deliverToResend(submission: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return true;

  const lines = Object.entries(submission)
    .filter(([key]) => !["ipAddress", "consent"].includes(key))
    .map(([key, value]) => `<p><strong>${escapeHtml(key)}:</strong> ${escapeHtml(value)}</p>`)
    .join("");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
      to: [process.env.RESEND_TO_EMAIL ?? "thedarkeight8@gmail.com"],
      subject: `${submission.formType === "growth-audit" ? "Growth audit" : "Contact enquiry"}: ${submission.company}`,
      html: `<h2>TheDark8 Tech enquiry</h2>${lines}`,
      reply_to: submission.email,
    }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Resend delivery failed");
  return true;
}

async function persistSubmission(submission: Record<string, unknown>) {
  await mkdir(path.dirname(submissionStore), { recursive: true });

  let payload: unknown[] = [];

  try {
    const existing = await readFile(/* turbopackIgnore: true */ submissionStore, "utf8");
    const parsed = JSON.parse(existing);
    if (Array.isArray(parsed)) payload = parsed;
  } catch {
    payload = [];
  }

  payload.push({
    ...submission,
    createdAt: new Date().toISOString(),
  });

  await writeFile(submissionStore, JSON.stringify(payload, null, 2), "utf8");
}

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: "Cross-origin requests are not allowed." }, { status: 403 });
    }

    if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
      return NextResponse.json({ error: "JSON request body required." }, { status: 415 });
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > maxRequestBytes) {
      return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    }

    const address = getClientAddress(request);
    const rateLimit = checkRateLimit(address);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } },
      );
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > maxRequestBytes) {
      return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    }

    const parsedBody: unknown = JSON.parse(rawBody);
    if (!parsedBody || typeof parsedBody !== "object" || Array.isArray(parsedBody)) {
      return NextResponse.json({ error: "A JSON object is required." }, { status: 400 });
    }

    const body = parsedBody as Record<string, unknown>;
    if (body.websiteConfirm) {
      return NextResponse.json({ ok: true });
    }

    const formType = body.formType === "growth-audit" ? "growth-audit" : "contact";
    const requiredFields = formType === "growth-audit" ? auditRequiredFields : contactRequiredFields;
    const missing = requiredFields.filter((field) => !isNonEmptyString(body[field]));

    if (formType === "growth-audit") {
      if (!isNonEmptyString(body.challenge) || !isNonEmptyString(body.location) || !isNonEmptyString(body.channels)) {
        missing.push("challenge", "location", "channels");
      }
    }

    if (missing.length) {
      return NextResponse.json({ error: `Missing fields: ${[...new Set(missing)].join(", ")}` }, { status: 400 });
    }

    if (typeof body.consent !== "string" || body.consent.toLowerCase() !== "on") {
      return NextResponse.json({ error: "Consent is required." }, { status: 400 });
    }

    const email = String(body.email).trim();
    if (!email.includes("@") || !email.includes(".")) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    const website = String(body.website ?? "").trim();
    if (!website || !/^https?:\/\//i.test(website)) {
      return NextResponse.json({ error: "A valid website URL is required." }, { status: 400 });
    }

    for (const [field, maxLength] of Object.entries(maxLengths)) {
      if (typeof body[field] === "string" && body[field].length > maxLength) {
        return NextResponse.json({ error: `${field} is too long.` }, { status: 400 });
      }
    }

    const textField = (field: string) => typeof body[field] === "string" ? String(body[field]).trim() : "";
    const cleanedBody = {
      formType,
      name: String(body.name).trim(),
      company: String(body.company).trim(),
      email,
      website: textField("website"),
      industry: textField("industry"),
      service: textField("service"),
      budget: textField("budget"),
      phone: textField("phone"),
      description: textField("description"),
      objective: textField("objective"),
      challenge: textField("challenge"),
      location: textField("location"),
      channels: textField("channels"),
      source: "website-contact-form",
      ipAddress: address,
    } as Record<string, string>;

    const deliveryTasks = [
      process.env.HUBSPOT_PRIVATE_APP_TOKEN ? deliverToHubSpot(cleanedBody) : Promise.resolve(true),
      process.env.RESEND_API_KEY ? deliverToResend(cleanedBody) : Promise.resolve(true),
      process.env.CONTACT_WEBHOOK_URL ? fetch(process.env.CONTACT_WEBHOOK_URL, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(cleanedBody), cache: "no-store" }).then((response) => { if (!response.ok) throw new Error("Webhook delivery failed"); }) : Promise.resolve(true),
    ];

    const deliveryResults = await Promise.allSettled(deliveryTasks);
    const providerFailures = deliveryResults.filter((result) => result.status === "rejected");

    await persistSubmission(cleanedBody);

    if (providerFailures.length > 0) {
      return NextResponse.json({
        ok: true,
        stored: true,
        delivery: "local-only",
        warning: "External delivery failed; submission was saved locally for review.",
      }, { status: 200 });
    }

    return NextResponse.json({ ok: true, stored: true, delivery: "sent" });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
