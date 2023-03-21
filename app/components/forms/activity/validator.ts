import { z } from "zod";
import { activityTypes } from "~/models/activity.server";

export const validator = z.object({
  timestamp: z.date(),
  notes: z.string().nullable().optional(),
  type: z.nativeEnum(activityTypes),
});
