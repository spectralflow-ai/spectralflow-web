"use client";

import { useState } from "react";
import { CONTACT_EMAIL as EMAIL } from "../lib/contact";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`SpectralFlow enquiry — ${name || "website"}`);
    const body = encodeURIComponent(`Name: ${name}\nOrganisation: ${org}\n\n${message}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }

  const field =
    "w-full rounded-lg px-4 py-3 text-sm bg-transparent outline-none transition-colors";
  const fieldStyle = {
    border: "1px solid var(--border-strong)",
    color: "var(--text-primary)",
  } as const;

  return (
    <form onSubmit={submit} className="flex flex-col gap-3.5">
      <input
        className={field}
        style={fieldStyle}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className={field}
        style={fieldStyle}
        placeholder="Organisation"
        value={org}
        onChange={(e) => setOrg(e.target.value)}
      />
      <textarea
        className={field}
        style={{ ...fieldStyle, resize: "vertical", minHeight: 120 }}
        placeholder="How can we help?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit" className="btn-primary self-start">
        Send message <span>→</span>
      </button>
      <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
        Opens your email client. Or write directly to {EMAIL}.
      </p>
    </form>
  );
}
