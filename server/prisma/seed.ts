import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Igor Silva",
      email: "igor.silva@gmail.com",
      avatarUrl: "https://github.com/IgorSilvaZZ.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Exemple Pool",
      code: "BOL123",
      ownerId: user.id,
      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-03T12:00:00.947Z",
      firstTeamCountryCode: "DE",
      secundTeamCountryCode: "BR",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-05T14:00:00.947Z",
      firstTeamCountryCode: "BR",
      secundTeamCountryCode: "AR",
      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
