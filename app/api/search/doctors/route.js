import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query')?.trim() || '';
    const speciality = searchParams.get('speciality')?.trim() || '';
    const city = searchParams.get('city')?.trim() || '';
    
    // Build dynamic where conditions for better performance
    const whereConditions = {};
    const andConditions = [];

    // Only add search conditions if they exist
    if (query) {
      andConditions.push({
        OR: [
          { firstName: { contains: query, mode: 'insensitive' } },
          { lastName: { contains: query, mode: 'insensitive' } },
          { clinicName: { contains: query, mode: 'insensitive' } },
          { specialty: { contains: query, mode: 'insensitive' } },
        ],
      });
    }

    if (speciality && speciality !== 'ALL') {
      andConditions.push({ 
        specialty: { equals: speciality, mode: 'insensitive' } 
      });
    }

    if (city) {
      andConditions.push({ 
        city: { contains: city, mode: 'insensitive' } 
      });
    }

    // Only add AND condition if we have filters
    if (andConditions.length > 0) {
      whereConditions.AND = andConditions;
    }

    const doctors = await prisma.doctor.findMany({
      where: Object.keys(whereConditions).length > 0 ? whereConditions : undefined,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        specialty: true,
        clinicName: true,
        city: true,
        photoUrl: true,
        consultationFee: true,
        yearsOfExperience: true,
      },
      take: 50, // Increase limit but still reasonable
      orderBy: [
        // Better ordering - prioritize experience and then name
        { yearsOfExperience: 'desc' },
        { firstName: 'asc' }
      ],
    });

    // Simplified response without unnecessary mapping
    const response = doctors.map((doctor) => ({
      id: doctor.id,
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      specialty: doctor.specialty,
      clinicName: doctor.clinicName,
      city: doctor.city || '',
      photoUrl: doctor.photoUrl || '/img/doctor-placeholder.png',
      consultationFee: doctor.consultationFee,
      yearsOfExperience: doctor.yearsOfExperience,
    }));

    return NextResponse.json({ 
      doctors: response,
      total: response.length 
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to search doctors', doctors: [] },
      { status: 500 }
    );
  }
}
