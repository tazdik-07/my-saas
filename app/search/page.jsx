import SearchClient from "./SearchClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

async function getDoctors(searchParams) {
  const query = searchParams.query || '';
  const city = searchParams.city || '';
  const speciality = searchParams.speciality || '';

  const conditions = [];

  if (query) {
    conditions.push({
      OR: [
        { firstName: { contains: query, mode: 'insensitive' } },
        { lastName: { contains: query, mode: 'insensitive' } },
        { speciality: { contains: query, mode: 'insensitive' } },
      ],
    });
  }
  if (city) {
    conditions.push({ city: { contains: city, mode: 'insensitive' } });
  }
  if (speciality) {
    conditions.push({ speciality: { contains: speciality, mode: 'insensitive' } });
  }

  const doctors = await prisma.doctor.findMany({
    where: conditions.length > 0 ? { AND: conditions } : undefined,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      specialty: true,
      clinicName: true,
      city: true,
      yearsOfExperience: true,
      consultationFee: true,
      photoUrl: true,
    },
  });
  return doctors;
}

export default async function SearchPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const doctors = await getDoctors(searchParams);

  return <SearchClient doctors={doctors} searchParams={searchParams} />;
}
