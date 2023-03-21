import type { TailwindColor } from "~/tailwind/types";

export type MetaData = {
  name: string;
  type: "text" | "number" | "radio" | "duration";
  unit?: string;
  options?: string[];
  label?: string;
};

export type ActivityFormType = {
  value: string;
  label: string;
  icon: string;
  color: TailwindColor;
  metadata?: MetaData[];
};
