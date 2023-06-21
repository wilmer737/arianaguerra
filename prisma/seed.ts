import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { activityTypes } from "~/models/activity.server";

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
      imgUrl:
        "https://res.cloudinary.com/dl6hy5t8h/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1686632727/babyguerra/fake-id/57cc1411-561f-4a50-94ca-4475007835d7.avif",
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

  for (const type of Object.values(activityTypes)) {
    await prisma.activity.create({
      data: {
        type,
        notes: "Diaper was wet",
        childId: child.id,
        timestamp: new Date(),
        metadata: JSON.stringify({ number: 1 }),
      },
    });
  }

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
