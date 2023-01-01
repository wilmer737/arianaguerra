import type { Child } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Child } from "@prisma/client";

export async function createChild(
  parentId: string,
  child: Pick<Child, "firstName" | "lastName" | "birthDate">
) {
  return prisma.child.create({
    data: {
      ...child,
      parents: {
        connect: [
          {
            id: parentId,
          },
        ],
      },
    },
  });
}
