"use server";
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export const createOnrampTransaction = async (
  amount: number,
  provider: string
) => {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session?.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }
  // ideally the token should have been come from hdfc/axis bank
  const token = Math.random().toString();
  await db.onRampTransaction.create({
    data: {
      provider,
      status: "Processing",
      startTime: new Date(),
      token: token,
      userId: Number(session?.user?.id),
      amount: Number(amount) * 100,
    },
  });
  return {
    message: "Done",
  };
};
