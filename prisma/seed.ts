import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "dev@ag.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("arianaiscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const child = await prisma.child.create({
    data: {
      firstName: "Ariana",
      lastName: "Guerra",
      birthDate: new Date("2023-03-16"),
      parents: {
        connect: [
          {
            id: user.id,
          },
        ],
      },
    },
  });

  await prisma.activity.create({
    data: {
      type: "DIAPER_CHANGE",
      notes: "Diaper was wet",
      childId: child.id,
      timestamp: new Date(),
      metadata: JSON.stringify({ number: 1 }),
    },
  });

  // eslint-disable-next-line no-console
  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
