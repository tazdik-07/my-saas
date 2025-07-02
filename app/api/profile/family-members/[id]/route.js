import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function PUT(request, { params }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const { id } = params;

    const { firstName, lastName, phoneNumber, dateOfBirth, bloodGroup, gender, relation } = await request.json();

    if (!firstName || !lastName) {
      return NextResponse.json({ message: 'First name and last name are required' }, { status: 400 });
    }

    // Ensure the family member belongs to the current user before updating
    const familyMember = await prisma.familyMember.findUnique({
      where: { id },
    });

    if (!familyMember || familyMember.userId !== userId) {
      return NextResponse.json({ message: 'Unauthorized or family member not found' }, { status: 403 });
    }

    const updatedFamilyMember = await prisma.familyMember.update({
      where: { id },
      data: {
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        bloodGroup,
        gender,
        relation,
      },
    });

    return NextResponse.json({ message: 'Family member updated successfully', familyMember: updatedFamilyMember }, { status: 200 });
  } catch (error) {
    console.error('Error updating family member:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: 'Family member ID is required' }, { status: 400 });
    }

    // Ensure the family member belongs to the current user before deleting
    const familyMember = await prisma.familyMember.findUnique({
      where: { id },
    });

    if (!familyMember || familyMember.userId !== userId) {
      return NextResponse.json({ message: 'Unauthorized or family member not found' }, { status: 403 });
    }

    await prisma.familyMember.delete({ where: { id } });

    return NextResponse.json({ message: 'Family member deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting family member:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
