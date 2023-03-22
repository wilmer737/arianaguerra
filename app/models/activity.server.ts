import type { Activity } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Activity } from "@prisma/client";

export const activityTypes = {
  DIAPER_CHANGE: "DIAPER_CHANGE",
  FEEDING: "FEEDING",
  SLEEP: "SLEEP",
  MEDICATION: "MEDICATION",
  BATH: "BATH",
  TUMMY_TIME: "TUMMY_TIME",
  OTHER: "OTHER",
};

export function getActivityByChildId(childId: string) {
  return prisma.activity.findMany({
    where: {
      childId,
    },
  });
}

export function createActivity(
  childId: string,
  activity: Pick<Activity, "notes" | "type" | "timestamp">
) {
  return prisma.activity.create({
    data: {
      ...activity,
      childId,
    },
  });
}
