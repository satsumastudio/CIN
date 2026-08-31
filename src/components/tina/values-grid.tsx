"use client";

import Image from "next/image";
import { useTina, tinaField } from "tinacms/dist/react";
import { Card } from "@/components/section-heading";
import type { ValueConnectionQuery, ValueConnectionQueryVariables } from "../../../tina/__generated__/types";

const chips = ["bg-green-30t", "bg-red-30t", "bg-yellow-30t", "bg-blue-30t"];

export function ValuesGrid({
  data: initialData,
  query,
  variables,
}: {
  data: ValueConnectionQuery;
  query: string;
  variables: ValueConnectionQueryVariables;
}) {
  const { data } = useTina({ query, variables, data: initialData });
  const values = (data.valueConnection.edges ?? []).flatMap((edge) =>
    edge?.node ? [edge.node] : []
  );

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {values.map((value, i) => (
        <Card
          key={value.id}
          hover
          className={`tilt-hover p-6 ${i % 2 === 0 ? "tilt-sl" : "tilt-sr"}`}
          data-tina-field={tinaField(value, "title")}
        >
          <span
            className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full ${chips[i % chips.length]}`}
          >
            {value.image && (
              <Image src={value.image} alt="" width={28} height={28} className="h-6 w-6" />
            )}
          </span>
          <h3 className="text-lg" data-tina-field={tinaField(value, "title")}>
            {value.title}
          </h3>
          <p className="mt-2 text-sm font-bold text-brand-blue/80" data-tina-field={tinaField(value, "strapline")}>
            {value.strapline}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-brand-blue/70" data-tina-field={tinaField(value, "description")}>
            {value.description}
          </p>
        </Card>
      ))}
    </div>
  );
}

