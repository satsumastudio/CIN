"use client";

import Image from "next/image";
import { useTina, tinaField } from "tinacms/dist/react";
import { Card } from "@/components/section-heading";
import { Button } from "@/components/button";
import type { TeamConnectionQuery, TeamConnectionQueryVariables } from "../../../tina/__generated__/types";

export function TeamGrid({
  data: initialData,
  query,
  variables,
}: {
  data: TeamConnectionQuery;
  query: string;
  variables: TeamConnectionQueryVariables;
}) {
  const { data } = useTina({ query, variables, data: initialData });
  const team = (data.teamConnection.edges ?? []).flatMap((edge) =>
    edge?.node ? [edge.node] : []
  );

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2">
      {team.map((member) => (
        <Card key={member.id} hover className="flex flex-col overflow-hidden">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            {member.photo && (
              <Image
                src={member.photo}
                alt={member.name ?? ""}
                fill
                sizes="(min-width: 640px) 32rem, 92vw"
                className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.04]"
                data-tina-field={tinaField(member, "photo")}
              />
            )}
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-2xl" data-tina-field={tinaField(member, "name")}>
              {member.name}
            </h3>
            <p
              className="mt-1 text-sm font-bold uppercase tracking-wide text-brand-blue/70"
              data-tina-field={tinaField(member, "role")}
            >
              {member.role}
            </p>
            <p
              className="mt-4 flex-1 text-sm leading-relaxed text-brand-blue/75"
              data-tina-field={tinaField(member, "shortBio")}
            >
              {member.shortBio}
            </p>
            <a
              href={`mailto:${member.email}`}
              className="mt-4 inline-flex min-h-11 items-center break-all text-sm text-brand-blue/80 hover:text-brand-blue"
              data-tina-field={tinaField(member, "email")}
            >
              {member.email}
            </a>
            <Button
              href={`/who-we-are/${member._sys.filename}`}
              variant="primary"
              className="mt-2 self-start"
            >
              Read full biography
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

