import express from "express";
import db from "@repo/db/client";
const app = express();

app.post("/hdfcWebhook", async (req, res) => {
  // TODO: Add zod validation here
  // TODO: HDFC bank should ideally send us the scecret
  const payemtInformation: { token: string; userId: string; amount: string } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
    await db.$transaction([
      db.balance.update({
        where: {
          userId: Number(payemtInformation.userId),
        },
        data: {
          amount: {
            increment: Number(payemtInformation.amount),
          },
        },
      }),
      db.onRampTransaction.update({
        where: {
          token: payemtInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(411).json({ message: "Failed" });
  }
});

app.listen(3003, () => {
  console.log("Bank-Webhook is running on 3003");
});
