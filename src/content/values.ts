import value1 from "../../content/values/value-1.json";
import value2 from "../../content/values/value-2.json";
import value3 from "../../content/values/value-3.json";
import value4 from "../../content/values/value-4.json";

export type Value = {
  title: string;
  strapline: string;
  description: string;
  color: "navy" | "coral" | "teal" | "amber";
  image: string;
};

// Content lives in content/values/*.json, editable via the Tina CMS admin
// at /admin.
export const values: Value[] = [value1, value2, value3, value4] as Value[];
