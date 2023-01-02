import type { Activity } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Activity } from "@prisma/client";

export const activityTypes = [
  "DIAPER_CHANGE",
  "FEEDING",
  "SLEEP",
  "BATH",
  "MEDICATION",
  "TUMMY_TIME",
  "OTHER",
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
