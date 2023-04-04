import type { Activity } from "@prisma/client";
import { prisma } from "~/db.server";
import { startOfDay, endOfDay } from "date-fns";

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

export async function getActivityByChildId(childId: string, date: Date) {
  return prisma.activity.findMany({
    orderBy: {
      timestamp: "desc",
    },
    where: {
      childId,
      timestamp: {
        gte: startOfDay(date),
        lt: endOfDay(date),
      },
    },
  });
}

export async function getActivityById(id: string) {
  return prisma.activity.findUnique({
    where: {
      id,
    },
  });
}

export async function createActivity(
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

export async function deleteActivity(id: string) {
  return prisma.activity.delete({
    where: {
      id,
    },
  });
}
