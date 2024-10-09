import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const main = async () => {
  const alice = await db.user.upsert({
    where: { number: "9876543210" },
    update: {},
    create: {
      number: "9876543210",
      password: "alice",
      name: "alice",
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "122",
          provider: "HDFC Bank",
        },
      },
    },
  });

  const bob = await db.user.upsert({
    where: { number: "1234567890" },
    update: {},
    create: {
      number: "1234567890",
      password: "bob",
      name: "bob",
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "123",
          provider: "HDFC Bank",
        },
      },
    },
  });
  console.log({ alice, bob });
};

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await db.$disconnect();
    process.exit(1);
  });
