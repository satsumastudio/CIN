import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "soft" | "outline";

// Pastel system. The bold red carried too much weight for a warm early-years
// brand, and none of the pastels can hold white text — so navy does the
// anchoring and the pastels supply the colour, always with navy on top.
const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-blue text-white hover:bg-blue-50t", // 18.98:1
  soft:
    "bg-green-30t text-brand-blue hover:bg-green-50t", // 15.11:1
  outline:
    "bg-transparent text-brand-blue border-2 border-brand-blue hover:bg-brand-blue hover:text-white",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`focus-ring inline-flex min-h-12 items-center justify-center rounded-full px-7 text-center text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.97] active:shadow-none ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
