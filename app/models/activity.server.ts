import type { Activity } from "@prisma/client";
import { prisma } from "~/db.server";

import type { TailwindColor } from "~/tailwind/types";
export type { Activity } from "@prisma/client";

type MetaData = {
  name: string;
  type: "number" | "radio";
  unit?: string[];
  options?: string[];
};

export type ActivityFormType = {
  value: string;
  label: string;
  icon: string;
  color: TailwindColor;
  metadata?: MetaData[];
};

export const activityTypes: ActivityFormType[] = [
  {
    value: "MEDICATION",
    label: "Medication",
    color: "red",
    icon: "TbMedicineSyrup",
    metadata: [
      {
        name: "duration",
        type: "number",
        unit: ["min", "hr"],
      },
      {
        name: "amount",
        type: "number",
        unit: ["mg", "ml"],
      },
    ],
  },
  {
    value: "TUMMY_TIME",
    label: "Tummy Time",
    color: "fuchsia",
    icon: "GiBabyBottle",
    metadata: [
      {
        name: "duration",
        type: "number",
        unit: ["min", "hr"],
      },
      {
        name: "position",
        type: "radio",
        options: ["chest", "floor"],
      },
    ],
  },
  {
    color: "indigo",
    value: "BATH",
    label: "Bath",
    icon: "GiBathtub",
  },
  {
    value: "OTHER",
    color: "blue",
    label: "Other",
    icon: "GiBabyBottle",
  },
  {
    value: "SLEEP",
    color: "orange",
    label: "Sleep",
    icon: "GiNightSleep",
    metadata: [
      {
        name: "sleep_type",
        type: "radio",
        options: ["nap", "night"],
      },
      {
        name: "amount",
        type: "number",
        unit: ["min", "hr"],
      },
    ],
  },
  {
    value: "FEEDING",
    label: "Feeding",
    color: "violet",
    icon: "GiBabyBottle",
    metadata: [
      {
        name: "duration",
        type: "number",
      },
      {
        name: "input",
        type: "radio",
        options: ["breast", "formula", "solid"],
      },
      {
        name: "amount",
        type: "number",
        unit: ["oz", "ml", "tbsp", "tsp"],
      },
    ],
  },
  {
    value: "DIAPER_CHANGE",
    label: "Diaper Change",
    icon: "MdBabyChangingStation",
    color: "emerald",
    metadata: [
      {
        name: "input",
        type: "radio",
        options: ["wet", "soiled", "both"],
      },
    ],
  },
];

export function createActivity(
  childId: string,
  activity: Pick<Activity, "notes" | "type" | "timestamp">
) {
  return prisma.activity.create({
    data: {
      ...activity,
      child: {
        connect: { id: childId },
      },
    },
  });
}
