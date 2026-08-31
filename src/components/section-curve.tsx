type Tone = "white" | "soft" | "green" | "yellow" | "navy";

const toneFill: Record<Tone, string> = {
  white: "#ffffff",
  soft: "var(--color-soft)",
  green: "var(--color-green-30t)",
  yellow: "var(--color-yellow-30t)",
  navy: "var(--color-brand-blue)",
};

// Three shallow, deliberately asymmetric curves. A symmetrical wave reads as
// a stock divider; an uneven one echoes the same hand-placed quality as the
// tilted photography, so the section breaks extend an existing idea rather
// than introducing a new decoration. Amplitude stays low — across a full
// viewport these resolve to a very soft lean, not a scallop.
const paths = [
  "M0,20 C 320,52 700,4 1080,26 C 1260,36 1360,30 1440,24 L1440,60 L0,60 Z",
  "M0,32 C 260,6 620,46 1000,28 C 1200,19 1320,42 1440,36 L1440,60 L0,60 Z",
  "M0,26 C 420,56 920,6 1440,30 L1440,60 L0,60 Z",
];

// A flat handoff, no wave. Used going into the footer, where a heavy solid
// block reads better sitting on a straight edge than leaning off a curve.
const straightPath = "M0,30 L1440,30 L1440,60 L0,60 Z";

export function SectionCurve({
  from,
  to,
  variant = 0,
  straight = false,
}: {
  from: Tone;
  to: Tone;
  variant?: number;
  straight?: boolean;
}) {
  return (
    <div
      aria-hidden
      className="leading-[0]"
      style={{ backgroundColor: toneFill[from] }}
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="block h-7 w-full sm:h-12"
        style={{ marginBottom: "-1px" }}
        focusable="false"
      >
        {/* Safari leaves a hairline antialiasing gap between a
            non-integer-scaled SVG and the block after it; pulling the svg
            down 1px overlaps that gap with the identical colour of the
            section that follows, so it disappears. */}
        <path
          d={straight ? straightPath : paths[variant % paths.length]}
          fill={toneFill[to]}
        />
      </svg>
    </div>
  );
}
