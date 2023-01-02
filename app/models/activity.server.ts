// import type { Activity } from "@prisma/client";
// import { prisma } from "~/db.server";

export type { Activity } from "@prisma/client";

export const activityTypes = [
  "DIAPER_CHANGE",
  "FEEDING",
  "SLEEP",
  "BATH",
  "MEDICATION",
  "OTHER",
];
