import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";


export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    const familyMembers = await prisma.familyMember.findMany({
      where: { userId: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        dateOfBirth: true,
        bloodGroup: true,
        gender: true,
        relation: true,
      },
    });

    return NextResponse.json(familyMembers, { status: 200 });
  } catch (error) {
    console.error('Error fetching family members:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    const { firstName, lastName, phoneNumber, dateOfBirth, bloodGroup, gender, relation } = await request.json();

    if (!firstName || !lastName || !relation) {
      return NextResponse.json({ message: 'First name, last name, and relation are required' }, { status: 400 });
    }

    const newFamilyMember = await prisma.familyMember.create({
      data: {
        userId,
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        bloodGroup,
        gender,
        relation,
      },
    });

    return NextResponse.json({ message: 'Family member added successfully', familyMember: newFamilyMember }, { status: 201 });
  } catch (error) {
    console.error('Error adding family member:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}


