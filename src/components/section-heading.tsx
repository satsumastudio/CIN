import type { ReactNode } from "react";

// Single source for section headings so every page opens a block the same
// way: a coloured rule, the heading at one shared scale, optional standfirst.
// The rule colour rotates through the pastel 50% tints, which is what gives
// the pages a common rhythm without repeating one accent everywhere.
const rules = [
  "bg-green-50t",
  "bg-red-50t",
  "bg-yellow-50t",
  "bg-blue-50t",
];

export function SectionHeading({
  children,
  standfirst,
  tone = 0,
  className = "",
  ...rest
}: {
  children: ReactNode;
  standfirst?: ReactNode;
  tone?: number;
  className?: string;
} & Record<`data-${string}`, string | undefined>) {
  return (
    <div className={className}>
      <span className={`rule-top mb-6 block ${rules[tone % rules.length]}`} />
      <h2 className="text-balance text-3xl sm:text-4xl lg:text-5xl" {...rest}>
        {children}
      </h2>
      {standfirst && (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-brand-blue/75">
          {standfirst}
        </p>
      )}
    </div>
  );
}

// Shared card shell. One border weight and radius across the whole site —
// Get In Touch was still carrying the heavier 2px border from the earlier pass.
//
// `hover` is opt-in and reserved for cards that actually lead somewhere
// (a founder's full biography, a value tile you're meant to read closely).
// A card with no destination shouldn't lift on hover — that feedback implies
// clickability that isn't there. Cards used purely to hold content (the quote
// wrapper, the form panel) stay static.
export function Card({
  children,
  hover = false,
  className = "",
  ...rest
}: {
  children: ReactNode;
  hover?: boolean;
  className?: string;
} & Record<`data-${string}`, string | undefined>) {
  return (
    <div
      className={`group rounded-sm border border-brand-blue/15 bg-white transition-all duration-200 ${
        hover
          ? "hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-lg"
          : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
