"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { sendEnquiry } from "../actions/contact";
import {
  CONTACT_EMAIL as EMAIL,
  INTENTS,
  isIntent,
  mailtoFor,
  type Intent,
} from "../lib/contact";

export default function ContactForm() {
  const params = useSearchParams();
  const initial = params.get("intent");

  const [intent, setIntent] = useState<Intent>(isIntent(initial) ? initial : "general");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    const fields = { intent, name, org, email, message };
    const res = await sendEnquiry({ ...fields, company_website: website });
    if (res.ok) {
      setState("sent");
      return;
    }
    if (res.reason === "invalid") {
      setState("error");
      return;
    }
    // Server side unavailable: hand the message to the visitor's mail client.
    setState("idle");
    window.location.href = mailtoFor(fields);
  }

  const field =
    "w-full rounded-lg px-4 py-3 text-sm bg-transparent outline-none transition-colors";
  const fieldStyle = {
    border: "1px solid var(--border-strong)",
    color: "var(--text-primary)",
  } as const;

  if (state === "sent") {
    return (
      <div className="flex flex-col gap-3">
        <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
          Message sent.
        </p>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          We read everything and reply personally, usually within two business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3.5">
      <label className="sr-only" htmlFor="intent">
        I am writing about
      </label>
      <select
        id="intent"
        className={field}
        style={fieldStyle}
        value={intent}
        onChange={(e) => setIntent(e.target.value as Intent)}
      >
        {INTENTS.map((i) => (
          <option key={i.value} value={i.value}>
            {i.label}
          </option>
        ))}
      </select>
      <input
        className={field}
        style={fieldStyle}
        aria-label="Name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className={field}
        style={fieldStyle}
        type="email"
        aria-label="Email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className={field}
        style={fieldStyle}
        aria-label="Organisation"
        placeholder={
          intent === "datasheet" ? "Organisation (professional affiliation)" : "Organisation"
        }
        value={org}
        onChange={(e) => setOrg(e.target.value)}
      />
      <textarea
        className={field}
        style={{ ...fieldStyle, resize: "vertical", minHeight: 120 }}
        aria-label="Message"
        placeholder="How can we help?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      {/* Honeypot: hidden from people, tempting to bots. */}
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
      <button type="submit" className="btn-primary self-start" disabled={state === "sending"}>
        {state === "sending" ? "Sending" : "Send message"} <span>→</span>
      </button>
      {state === "error" && (
        <p className="text-xs" style={{ color: "var(--text-primary)" }}>
          Please check the name, email and message fields.
        </p>
      )}
      <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
        We read everything and reply personally, usually within two business days. Or write
        directly to {EMAIL}.
      </p>
    </form>
  );
}
