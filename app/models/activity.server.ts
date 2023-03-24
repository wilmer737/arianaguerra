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

export async function getActivityByChildId(childId: string, date: string) {
  console.log(new Date(date));

  const d = new Date("2023-03-25");
  return prisma.activity.findMany({
    orderBy: {
      timestamp: "desc",
    },
    where: {
      childId,
      // timestamp: {
      //   gte: new Date(d),
      //   lt: new Date(d.getTime() + 24 * 60 * 60 * 1000),
      // },
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
