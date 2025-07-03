import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

/* ────────────── GET /api/profile ────────────── */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        dateOfBirth: true,
        bloodGroup: true,
        gender: true,
        familyMembers: true,   // includes linked family‑member rows
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);        // 200 OK
  } catch (err) {
    console.error('Error fetching user profile:', err);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

/* ────────────── PUT /api/profile ────────────── */
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    const {
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      bloodGroup,
      gender,
    } = await request.json();

    /* date validation */
    let parsedDOB = null;
    if (dateOfBirth) {
      parsedDOB = new Date(dateOfBirth);          // expects YYYY‑MM‑DD
      if (isNaN(parsedDOB.getTime())) {
        return NextResponse.json(
          { message: 'Invalid date format – use YYYY‑MM‑DD' },
          { status: 400 },
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth: parsedDOB,
        bloodGroup,
        gender,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        dateOfBirth: true,
        bloodGroup: true,
        gender: true,
      },
    });

    return NextResponse.json(
      { message: 'Profile updated successfully', user: updatedUser },
      { status: 200 },
    );
  } catch (err) {
    console.error('Error updating user profile:', err);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
