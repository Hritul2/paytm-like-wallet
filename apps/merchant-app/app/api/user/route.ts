import { NextResponse } from "next/server";
import dbClient from "@repo/db/client";

export const GET = async () => {
  await dbClient.user.create({
    data: {
      email: "asd",
      name: "adsads",
    },
  });
  return NextResponse.json({
    message: "hi there",
  });
};
