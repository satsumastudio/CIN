"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { Band } from "@/components/page-band";
import { Card } from "@/components/section-heading";
import { TiltedPhoto } from "@/components/tilted-photo";
import type { TeamQuery, TeamQueryVariables } from "../../../tina/__generated__/types";

const chips = ["bg-green-30t", "bg-red-30t", "bg-yellow-30t", "bg-blue-30t"];
const rules = ["bg-green-50t", "bg-red-50t", "bg-yellow-50t", "bg-blue-50t"];
const blocks = ["green", "red", "yellow", "blue"] as const;

export function TeamMemberContent({
  data: initialData,
  query,
  variables,
}: {
  data: TeamQuery;
  query: string;
  variables: TeamQueryVariables;
}) {
  const { data } = useTina({ query, variables, data: initialData });
  const member = data.team;

  // Deterministic per-founder accent so Louise and Lucy don't share one
  // colour, without needing their position in the team list threaded
  // through as a prop.
  const seed = (member._sys.filename ?? "").charCodeAt(0) || 0;
  const tone = seed % 4;
  const tilt = seed % 2 === 0 ? "left" : "right";

  const [lede, ...rest] = member.fullBio ?? [];

  return (
    <Band tone="white">
      <div className="max-w-4xl">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="mx-auto w-40 sm:w-48 lg:w-full lg:max-w-xs">
            {member.photo && (
              <TiltedPhoto
                src={member.photo}
                alt={member.name ?? ""}
                aspect="aspect-[4/5]"
                block={blocks[tone]}
                tilt={tilt}
                sizes="(min-width: 1024px) 20rem, 12rem"
                data-tina-field={tinaField(member, "photo")}
              />
            )}
          </div>
          <div>
            <span aria-hidden className={`rule-top mb-5 block ${rules[tone]}`} />
            <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl text-brand-blue" data-tina-field={tinaField(member, "name")}>
              {member.name}
            </h1>
            <div className="mt-4 flex flex-col items-start gap-3">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-blue ${chips[tone]}`}
                data-tina-field={tinaField(member, "role")}
              >
                {member.role}
              </span>
              <a
                href={`mailto:${member.email}`}
                className="inline-flex min-h-11 items-center text-sm text-brand-blue/70 underline underline-offset-4 hover:text-brand-blue"
                data-tina-field={tinaField(member, "email")}
              >
                {member.email}
              </a>
            </div>
          </div>
        </div>

        {lede && (
          <p
            className="mt-12 text-balance text-xl leading-snug text-brand-blue sm:text-2xl"
            data-tina-field={tinaField(member, "fullBio")}
          >
            {lede}
          </p>
        )}

        {rest.length > 0 && (
          <Card className="mt-8 p-6 sm:p-8">
            <div className="space-y-5 text-brand-blue/80 leading-relaxed">
              {rest.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Card>
        )}
      </div>
    </Band>
  );
}
