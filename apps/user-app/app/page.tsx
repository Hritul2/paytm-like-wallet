import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";
// TODO: Add the Landing Page
const page = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/dashboard");
  }
  redirect("/api/auth/signin");
};

export default page;
