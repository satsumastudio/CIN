"use client";

import { useState, type FormEvent } from "react";
import { tinaField } from "tinacms/dist/react";
import type { GetInTouchPageQuery } from "../../tina/__generated__/types";

type Status = "idle" | "submitting" | "success" | "error";

type FormCopy = GetInTouchPageQuery["getInTouchPage"]["form"];

// Labels and messages are edited in Tina (Get In Touch Page → Form section).
// Error messages stay in code: they come from the server's validation.
export function ContactForm({ copy }: { copy: FormCopy }) {
  const field = (name: Exclude<keyof NonNullable<FormCopy>, "__typename">) =>
    copy ? tinaField(copy, name) : undefined;
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
      mailingList: data.get("mailingList") === "on",
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
          <span data-tina-field={field("successHeading")}>{copy?.successHeading}</span>
        </p>
        <p className="text-sm text-brand-blue/80 mt-2">
          <span data-tina-field={field("successMessage")}>{copy?.successMessage}</span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-brand-blue mb-1.5">
            <span data-tina-field={field("firstNameLabel")}>{copy?.firstNameLabel}</span>
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
            <span data-tina-field={field("lastNameLabel")}>{copy?.lastNameLabel}</span>
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
          <span data-tina-field={field("emailLabel")}>{copy?.emailLabel}</span>
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
          <span data-tina-field={field("phoneLabel")}>{copy?.phoneLabel}</span>{" "}
          <span className="text-brand-blue/75" data-tina-field={field("optionalLabel")}>
            {copy?.optionalLabel}
          </span>
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
          <span data-tina-field={field("messageLabel")}>{copy?.messageLabel}</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-brand-blue/15 px-4 py-3 text-base sm:text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
        />
      </div>

      {/* Unticked by default: UK rules require marketing consent to be an active opt-in. */}
      <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-relaxed text-brand-blue">
        <input
          type="checkbox"
          name="mailingList"
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-brand-blue"
        />
        <span data-tina-field={field("mailingListLabel")}>{copy?.mailingListLabel}</span>
      </label>

      {error && <p className="text-sm text-brand-blue">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full min-h-12 rounded-sm bg-brand-blue py-3.5 text-base font-bold text-white hover:bg-blue-50t disabled:opacity-60 transition-colors"
      >
        {status === "submitting" ? (
          "Sending…"
        ) : (
          <span data-tina-field={field("submitLabel")}>{copy?.submitLabel}</span>
        )}
      </button>
    </form>
  );
}
