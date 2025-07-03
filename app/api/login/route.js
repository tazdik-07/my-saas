import { NextResponse } from 'next/server';
import { signIn } from "next-auth/react";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      return NextResponse.json({ message: result.error }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
