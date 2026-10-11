"use client";

import { useState } from "react";

// No backend needed: composes an email in the visitor's mail app.
export default function ContactForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `Project inquiry from ${f.get("company") || f.get("name")}`;
    const body = [
      `Name: ${f.get("name")}`,
      `Brand / company: ${f.get("company")}`,
      `Budget: ${f.get("budget")}`,
      "",
      `${f.get("message")}`,
    ].join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full border-b border-hair bg-transparent py-3 text-base text-ink placeholder:text-ink-2/70 focus:border-gilt-line focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <input name="name" required placeholder="Your name" autoComplete="name" className={field} />
        <input name="company" required placeholder="Brand / company" autoComplete="organization" className={field} />
      </div>
      <select name="budget" defaultValue="" required className={`${field} appearance-none`}>
        <option value="" disabled>
          Budget
        </option>
        <option>Under $500</option>
        <option>$500 – $1,500</option>
        <option>$1,500 – $5,000</option>
        <option>$5,000+</option>
      </select>
      <textarea name="message" required rows={4} placeholder="Tell me about the project" className={`${field} resize-none`} />
      {!email && <p className="text-sm text-ink-2">The inquiry form opens once a contact email is added.</p>}
      <button
        type="submit"
        disabled={!email}
        className="w-full rounded-full bg-gold px-8 py-4 text-sm font-medium text-wall active:scale-[0.97] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 md:w-auto"
      >
        {sent ? "Opening your email…" : "Send inquiry"}
      </button>
    </form>
  );
}
