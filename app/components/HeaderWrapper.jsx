"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function HeaderWrapper({ isLoggedIn, firstName, lastName }) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/auth/signin" || pathname === "/auth/signup" || pathname === "/profile";

  if (hideNavbar) {
    return null;
  }

  return <Navbar isLoggedIn={isLoggedIn} firstName={firstName} lastName={lastName} />;
}
