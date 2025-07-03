import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query      = searchParams.get('query')      || '';
  const speciality = searchParams.get('speciality') || '';
  const city       = searchParams.get('city')       || '';

  const doctors = await prisma.doctor.findMany({
    where: {
      AND: [
        /* name OR clinicName matches search box */
        {
          OR: [
            { firstName:   { contains: query, mode: 'insensitive' } },
            { lastName:    { contains: query, mode: 'insensitive' } },
            { clinicName:  { contains: query, mode: 'insensitive' } },
          ],
        },
        speciality ? { specialty: { equals: speciality } } : {},
        city       ? { city:      { equals: city } }       : {},
      ],
    },
    take: 30,
    orderBy: { firstName: 'asc' },
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
  });

  /* map to front‑end shape */
  const mapped = doctors.map((d) => ({
    id: d.id,
    name: `${d.firstName} ${d.lastName}`,
    speciality: d.specialty,
    clinicName: d.clinicName,
    city: d.city ?? '',
    photoUrl: d.photoUrl ?? '/img/doctor-placeholder.png',
    consultationFee: d.consultationFee,
    yearsOfExperience: d.yearsOfExperience,
  }));

  return NextResponse.json({ doctors: mapped });
}
