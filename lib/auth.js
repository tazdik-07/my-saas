

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

/* ---------------------------------------------------------------------
 * 1)  Re‑exportable authOptions  (used by getServerSession)
 * ------------------------------------------------------------------*/
export const authOptions = {
  // you only need these two fields for decoding JWT‑strategy sessions
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};


