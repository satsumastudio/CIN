"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "./container";
import { ctaNav, primaryNav } from "@/lib/nav";

// Light header. The previous dark bar put the page's heaviest element at the
// top before any content had earned it; keeping the chrome light lets the
// photography and the closing navy block carry the weight instead.
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-brand-blue/10 bg-white/95 backdrop-blur-sm">
        <Container className="flex h-20 items-center justify-between gap-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="focus-ring shrink-0 transition-transform duration-200 hover:scale-[1.03] active:scale-100"
          >
            <Image
              src="/images/logos/logo-blue.png"
              alt="Childhood is Now"
              width={160}
              height={48}
              className="h-9 w-auto sm:h-10"
              priority
            />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 lg:flex"
          >
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring group relative inline-flex min-h-11 items-center text-sm font-bold text-brand-blue"
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-blue-50t transition-transform duration-200 ease-out group-hover:scale-x-100"
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={ctaNav.href}
              className="focus-ring inline-flex min-h-11 items-center rounded-full bg-brand-blue px-5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50t hover:shadow-md active:translate-y-0 active:scale-[0.97]"
            >
              {ctaNav.label}
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand-blue transition-colors hover:bg-brand-blue/5 active:scale-95 lg:hidden"
            >
              <span className="sr-only">Open menu</span>
              <div className="flex flex-col gap-1.5">
                <span className="h-0.5 w-5 bg-brand-blue" />
                <span className="h-0.5 w-5 bg-brand-blue" />
                <span className="h-0.5 w-5 bg-brand-blue" />
              </div>
            </button>
          </div>
        </Container>
      </header>

      <div
        className={`fixed inset-0 z-50 transition-opacity lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-brand-blue/50"
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-brand-blue p-6 text-white transition-transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <Image
              src="/images/logos/logo-white.png"
              alt="Childhood is Now"
              width={140}
              height={42}
              className="h-9 w-auto"
            />
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/40 transition-colors hover:bg-white/10 active:scale-95"
            >
              ✕
            </button>
          </div>

          <nav aria-label="Mobile primary" className="flex flex-col">
            {[...primaryNav, ctaNav].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="focus-ring group flex items-center justify-between border-b border-white/20 py-4 text-lg font-bold transition-colors hover:text-green-30t"
              >
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  {item.label}
                </span>
                <span
                  aria-hidden
                  className={`h-2.5 w-2.5 rounded-full transition-transform duration-200 group-hover:scale-125 ${
                    ["bg-green-30t", "bg-yellow-30t", "bg-red-30t", "bg-blue-30t", "bg-green-50t"][i % 5]
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <Link
              href={ctaNav.href}
              onClick={() => setOpen(false)}
              className="focus-ring block w-full rounded-full bg-green-30t py-3.5 text-center font-bold text-brand-blue transition-colors hover:bg-green-50t active:scale-[0.98]"
            >
              {ctaNav.label}
            </Link>
            <p className="mt-4 text-center text-sm text-white/80">
              info@childhoodisnow.co.uk
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
