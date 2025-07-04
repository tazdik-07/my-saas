import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const doctor = await prisma.doctor.findUnique({ where: { email } });

    if (!doctor) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, doctor.password);

    if (!isValidPassword) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Exclude password from the returned doctor object
    const { password: doctorPassword, ...doctorWithoutPassword } = doctor;
    return NextResponse.json({ message: 'Login successful', doctor: doctorWithoutPassword }, { status: 200 });
  } catch (error) {
    console.error('Error during doctor login:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}