"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";

export default function Home() {
  const session = useSession();
  return (
    <div>
      <Appbar user={session.data?.user} onSignin={signIn} onSignout={signOut} />
    </div>
  );
}
