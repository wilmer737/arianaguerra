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
        connect: [{ id: parentId }],
      },
    },
  });
}

export async function updateChild(childId: string, child: Partial<Child>) {
  return prisma.child.update({
    where: { id: childId },
    data: child,
  });
}
