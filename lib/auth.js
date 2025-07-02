"use server";

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  console.log("Token from cookie:", token);

  if (!token) {
    console.log("No token found, user is not logged in.");
    return { isLoggedIn: false, firstName: null, lastName: null };
  }

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    return { isLoggedIn: true, firstName: decoded.firstName, lastName: decoded.lastName };
  } catch (error) {
    console.error("Token verification failed:", error);
    return { isLoggedIn: false, firstName: null, lastName: null };
  }
}