"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";

export const p2pTransfer = async (to: string, amount: number) => {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;
  if (!from) {
    return {
      message: "Unauthenticated request",
    };
  }
  const toUser = await db.user.findFirst({
    where: {
      number: to,
    },
  });

  if (!toUser) {
    return {
      message: "User not found",
    };
  }
  const amountInPaise = amount * 100;
  await db.$transaction(async (tx) => {
    // Prisma doesnt allow the Lock out of the box therefore we need to create raw query
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${Number(from)} FOR UPDATE`;
    const fromBalance = await tx.balance.findUnique({
      where: { userId: Number(from) },
    });
    if (!fromBalance || fromBalance.amount < amountInPaise) {
      throw new Error("Insufficient funds");
    }

    await tx.balance.update({
      where: { userId: Number(from) },
      data: { amount: { decrement: amountInPaise } },
    });

    await tx.balance.update({
      where: { userId: toUser.id },
      data: { amount: { increment: amountInPaise } },
    });
  });
};
