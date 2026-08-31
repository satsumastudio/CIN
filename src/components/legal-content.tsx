import { tinaField } from "tinacms/dist/react";
import { Band, PageBand } from "@/components/page-band";
import { SectionCurve } from "@/components/section-curve";

type LegalSection = { heading?: string | null; paragraphs?: Array<string | null> | null };

type LegalContentData = {
  title?: string | null;
  intro?: string | null;
  sections?: Array<LegalSection | null> | null;
  lastUpdated?: string | null;
};

// Emails and web addresses written into the notices become real links, so a
// reader can act on "email us" or "contact the ICO" without copying text out.
// The domain parts can't end on a dot, so trailing full stops stay as text.
const LINKABLE = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+|www\.[\w-]+(?:\.[\w-]+)+)/g;

function linkify(text: string) {
  return text.split(LINKABLE).map((part, i) => {
    if (i % 2 === 0) return part;
    const isEmail = part.includes("@");
    return (
      <a
        key={i}
        href={isEmail ? `mailto:${part}` : `https://${part}`}
        {...(isEmail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        className="font-bold underline underline-offset-4 transition-colors hover:text-blue-50t"
      >
        {part}
      </a>
    );
  });
}

export function LegalContent({ content, rule }: { content: LegalContentData; rule: string }) {
  return (
    <>
      <PageBand title={content.title ?? ""} rule={rule} />
      <Band tone="white">
        <div className="max-w-2xl">
          {content.intro && (
            <p className="text-lg leading-relaxed text-brand-blue/80" data-tina-field={tinaField(content, "intro")}>
              {linkify(content.intro)}
            </p>
          )}
          {(content.sections ?? []).map(
            (section, i) =>
              section && (
                <div key={i} className="mt-10">
                  <h2 className="text-xl text-brand-blue sm:text-2xl" data-tina-field={tinaField(section, "heading")}>
                    {section.heading}
                  </h2>
                  <div
                    className="mt-3 space-y-3 leading-relaxed text-brand-blue/80"
                    data-tina-field={tinaField(section, "paragraphs")}
                  >
                    {(section.paragraphs ?? []).map((p, j) => p && <p key={j}>{linkify(p)}</p>)}
                  </div>
                </div>
              )
          )}
          <p className="mt-10 text-sm text-brand-blue/70" data-tina-field={tinaField(content, "lastUpdated")}>
            {content.lastUpdated}
          </p>
        </div>
      </Band>
      <SectionCurve from="white" to="navy" variant={1} straight />
    </>
  );
}
