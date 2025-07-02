import { NextResponse } from 'next/server';

export async function POST() {
  const response = new NextResponse(JSON.stringify({ message: 'Logout successful' }));
  response.cookies.set('token', '', { httpOnly: true, maxAge: -1 });
  return response;
}
