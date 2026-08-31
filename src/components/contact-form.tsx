"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phone: data.get("phone"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-green-10t p-8 text-center">
        <p className="text-lg font-semibold text-brand-blue">
          Thank you — your message has been sent.
        </p>
        <p className="text-sm text-brand-blue/80 mt-2">
          We&apos;ll be in touch as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-brand-blue mb-1.5">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            className="w-full rounded-xl border border-brand-blue/15 px-4 py-3 text-base sm:text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-brand-blue mb-1.5">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            className="w-full rounded-xl border border-brand-blue/15 px-4 py-3 text-base sm:text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-blue mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          className="w-full rounded-xl border border-brand-blue/15 px-4 py-3 text-base sm:text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-brand-blue mb-1.5">
          Phone <span className="text-brand-blue/75">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          className="w-full rounded-xl border border-brand-blue/15 px-4 py-3 text-base sm:text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-blue mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-brand-blue/15 px-4 py-3 text-base sm:text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
        />
      </div>

      {error && <p className="text-sm text-brand-blue">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full min-h-12 rounded-sm bg-brand-blue py-3.5 text-base font-bold text-white hover:bg-blue-50t disabled:opacity-60 transition-colors"
      >
        {status === "submitting" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
