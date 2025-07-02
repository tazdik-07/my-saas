import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';



export async function POST(request) {
  try {
    const { email, password, firstName, lastName } = await request.json();

    const capitalizeFirstLetter = (string) => {
      if (!string) return string;
      return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const capitalizedFirstName = capitalizeFirstLetter(firstName);
    const capitalizedLastName = capitalizeFirstLetter(lastName);

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: capitalizedFirstName,
        lastName: capitalizedLastName,
      },
    });

    const token = jwt.sign({ userId: newUser.id, firstName: newUser.firstName, lastName: newUser.lastName }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const response = NextResponse.json({ message: 'User registered successfully', user: newUser }, { status: 201 });
    response.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 60 * 60 }); // 1 hour
    return response;
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
