"use client";

import { useState, type FormEvent } from "react";
import { tinaField } from "tinacms/dist/react";
import type { GetInTouchPageQuery } from "../../tina/__generated__/types";

type Status = "idle" | "submitting" | "success" | "error";

type FormCopy = GetInTouchPageQuery["getInTouchPage"]["form"];

// Submissions go straight from the visitor's browser to Web3Forms, which
// emails them to the inbox this key was issued for and doesn't keep a copy.
// Nothing passes through or is logged on our own hosting. The key only says
// where to deliver, so it's safe to ship in the page.
const WEB3FORMS_ACCESS_KEY = "7d502aa7-3ec3-4d6a-983c-67577ca54efd";

// Ticking "join the mailing list" adds the person to the Newsletter Sign Ups
// group in Childhood is Now's MailerLite account, again straight from the
// browser. MailerLite then emails them a confirm link (double opt-in), so
// nobody is subscribed without confirming.
const MAILERLITE_SUBSCRIBE_URL =
  "https://assets.mailerlite.com/jsonp/2725193/forms/201933591740942027/subscribe";

async function subscribeToMailingList(email: string, name: string) {
  try {
    const body = new URLSearchParams({
      "fields[email]": email,
      "fields[name]": name,
      "ml-submit": "1",
      anticsrf: "true",
    });
    const res = await fetch(MAILERLITE_SUBSCRIBE_URL, { method: "POST", body });
    const json = await res.json().catch(() => ({}));
    return res.ok && json.success === true;
  } catch {
    return false;
  }
}

const FAILED_MESSAGE =
  "Sorry, your message didn't send. Please try again, or email us at info@childhoodisnow.co.uk.";

// Labels and messages are edited in Tina (Get In Touch Page → Form section).
// The failure message stays in code so it always names a working address.
export function ContactForm({ copy }: { copy: FormCopy }) {
  const field = (name: Exclude<keyof NonNullable<FormCopy>, "__typename">) =>
    copy ? tinaField(copy, name) : undefined;
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = `${data.get("firstName") ?? ""} ${data.get("lastName") ?? ""}`.trim();
    const email = String(data.get("email") ?? "");
    const wantsNews = data.get("mailingList") === "on";

    // A failed sign-up mustn't block the enquiry; the email to info@ says
    // whether it worked, so they can add the person by hand if not.
    const subscribed = wantsNews ? await subscribeToMailingList(email, name) : false;
    const mailingList = !wantsNews
      ? "No"
      : subscribed
        ? "Yes, opted in. Added to MailerLite; they'll get an email to confirm."
        : "Yes, opted in. Couldn't add them to MailerLite automatically, please add them by hand.";

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Website enquiry from ${name}`,
          from_name: "Childhood is Now website",
          // Web3Forms sets reply-to from "email", so replying answers the sender.
          name,
          email,
          phone: data.get("phone") || "Not given",
          message: data.get("message"),
          "Mailing list": mailingList,
          botcheck: data.get("botcheck") === "on",
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.success) throw new Error();

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
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

      {/* Honeypot: hidden from people, ticked by spam bots, rejected by Web3Forms. */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      {status === "error" && (
        <p role="alert" className="text-sm font-semibold text-brand-blue">
          {FAILED_MESSAGE}
        </p>
      )}

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
