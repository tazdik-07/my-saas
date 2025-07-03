"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import { useSession } from "next-auth/react";

export default function HeaderWrapper() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const firstName = session?.user?.name?.split(" ")[0] || null;
  const lastName = session?.user?.name?.split(" ")[1] || null;

  const hideNavbar = pathname === "/auth/signin" || pathname === "/auth/signup" || pathname === "/profile" || pathname === "/doctors/signup" || pathname === "/auth/doctor-signin";

  if (hideNavbar) {
    return null;
  }

  return <Navbar isLoggedIn={isLoggedIn} firstName={firstName} lastName={lastName} />;
}
