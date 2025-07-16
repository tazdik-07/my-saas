import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request, { params }) {
  try {
    

    const doctorId = params.id;

    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        dateOfBirth: true,
        gender: true,
        bloodGroup: true,
        specialty: true,
        registrationNumber: true,
        yearsOfExperience: true,
        clinicName: true,
        city: true,
        clinicAddress: true,
        consultationFee: true,
        photoUrl: true,
        availability: true, // Include availability
      },
    });

    if (!doctor) {
      return NextResponse.json({ message: 'Doctor not found' }, { status: 404 });
    }

    return NextResponse.json({ doctor }, { status: 200 });
  } catch (error) {
    console.error('Error fetching doctor profile:', error);
    console.log('Request params:', params);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}