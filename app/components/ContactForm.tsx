"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { sendEnquiry } from "../actions/contact";
import {
  CONTACT_EMAIL as EMAIL,
  INTENTS,
  mailtoFor,
  toIntent,
  type Intent,
} from "../lib/contact";

/** The form, with the contact reason read from ?intent= in the URL. */
export default function ContactForm() {
  const params = useSearchParams();
  return <ContactFormBody fromUrl={toIntent(params.get("intent"))} />;
}

/** The same form with no reason preselected. Used as the server-rendered
 *  fallback while the URL is read, so the form is in the initial HTML and
 *  the page does not shift when it hydrates. */
export function ContactFormStatic() {
  return <ContactFormBody fromUrl={null} />;
}

function ContactFormBody({ fromUrl }: { fromUrl: Intent | null }) {
  const [intent, setIntent] = useState<Intent>(fromUrl ?? "general");
  // A link on the same page can change ?intent= without remounting the
  // form: follow it, while keeping any choice made in the select since.
  const [lastFromUrl, setLastFromUrl] = useState<Intent | null>(fromUrl);
  if (fromUrl !== lastFromUrl) {
    setLastFromUrl(fromUrl);
    if (fromUrl) setIntent(fromUrl);
  }
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
  const labelClass = "text-xs font-medium";
  const labelStyle = { color: "var(--text-secondary)" } as const;

  if (state === "sent") {
    return (
      <div className="flex flex-col gap-3" role="status">
        <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
          Message sent.
        </p>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          We read everything and reply personally, usually within two business days.
        </p>
      </div>
    );
  }

  const orgLabel =
    intent === "datasheet" || intent === "twin"
      ? "Organisation (professional affiliation)"
      : intent === "press"
        ? "Publication"
        : "Organisation";

  return (
    <form onSubmit={submit} className="flex flex-col gap-3.5">
      <div className="flex flex-col gap-1.5">
        <label className={labelClass} style={labelStyle} htmlFor="cf-intent">
          I am writing about
        </label>
        <select
          id="cf-intent"
          name="intent"
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
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelClass} style={labelStyle} htmlFor="cf-name">
          Name
        </label>
        <input
          id="cf-name"
          name="name"
          autoComplete="name"
          className={field}
          style={fieldStyle}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelClass} style={labelStyle} htmlFor="cf-email">
          Email
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          className={field}
          style={fieldStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelClass} style={labelStyle} htmlFor="cf-org">
          {orgLabel}
        </label>
        <input
          id="cf-org"
          name="organization"
          autoComplete="organization"
          className={field}
          style={fieldStyle}
          value={org}
          onChange={(e) => setOrg(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelClass} style={labelStyle} htmlFor="cf-message">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          className={field}
          style={{ ...fieldStyle, resize: "vertical", minHeight: 120 }}
          placeholder="How can we help?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
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
        <p role="alert" className="text-xs" style={{ color: "var(--text-primary)" }}>
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
