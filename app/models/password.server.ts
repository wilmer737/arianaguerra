import bcrypt from "bcryptjs";
import { prisma } from "~/db.server";

export type { Password } from "@prisma/client";

export async function updatePassword(id: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.update({
    where: { id },
    data: {
      password: {
        update: {
          hash: hashedPassword,
        },
      },
    },
  });
}
