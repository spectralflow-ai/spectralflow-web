"use server";

import { CONTACT_EMAIL, isIntent, subjectFor, type Intent } from "../lib/contact";

export type SendResult = { ok: boolean; reason?: "unconfigured" | "invalid" | "failed" };

/**
 * Relays a contact enquiry to the public address.
 *
 * Delivery uses Resend's REST API, so no dependency is added. When
 * RESEND_API_KEY is absent the action reports "unconfigured" and the form
 * falls back to opening the visitor's mail client: the message is never
 * silently dropped.
 */
export async function sendEnquiry(input: {
  intent: string;
  name: string;
  org: string;
  email: string;
  message: string;
  /** Honeypot: real people leave it empty. */
  company_website?: string;
}): Promise<SendResult> {
  if (input.company_website) return { ok: true };

  const intent: Intent = isIntent(input.intent) ? input.intent : "general";
  const name = input.name.trim().slice(0, 200);
  const org = input.org.trim().slice(0, 200);
  const email = input.email.trim().slice(0, 200);
  const message = input.message.trim().slice(0, 5000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, reason: "invalid" };
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM ?? "SpectralFlow site <onboarding@resend.dev>";
  if (!key) return { ok: false, reason: "unconfigured" };

  const text = [
    `Intent: ${subjectFor(intent)}`,
    `Name: ${name}`,
    `Organisation: ${org || "not given"}`,
    `Email: ${email}`,
    "",
    message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `${subjectFor(intent)} : ${name}`,
        text,
      }),
    });
    if (!res.ok) return { ok: false, reason: "failed" };
    return { ok: true };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
