import prisma from "@/lib/prisma";
import SearchClient from "./SearchClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

async function getDoctors(query, speciality, city) {
  const where = {};

  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { specialty: { contains: query, mode: "insensitive" } },
    ];
  }

  if (speciality) {
    where.specialty = speciality;
  }

  if (city) {
    where.city = { contains: city, mode: "insensitive" };
  }

  return await prisma.doctor.findMany({ where });
}

export default async function DoctorSearchPage({ searchParams }) {
  const { query, speciality, city } = searchParams;
  const doctors = await getDoctors(query, speciality, city);

  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session;
  const firstName = session?.user?.name?.split(' ')[0] || '';
  const lastName = session?.user?.name?.split(' ')[1] || '';

  return <SearchClient doctors={doctors} searchParams={searchParams} isLoggedIn={isLoggedIn} firstName={firstName} lastName={lastName} />;
}