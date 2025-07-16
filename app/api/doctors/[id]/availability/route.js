import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.id !== params.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const doctorId = params.id;
    const { availability } = await request.json();

    if (!availability) {
      return NextResponse.json({ message: 'Availability data is required' }, { status: 400 });
    }

    const updatedDoctor = await prisma.doctor.update({
      where: { id: doctorId },
      data: {
        availability: availability,
      },
    });

    return NextResponse.json({ message: 'Availability updated successfully', doctor: updatedDoctor }, { status: 200 });
  } catch (error) {
    console.error('Error updating doctor availability:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
