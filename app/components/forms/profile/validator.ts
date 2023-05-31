import { z } from "zod";

export const profileValidator = z.object({
  email: z.string().email(),
  name: z.string().min(3),
});
