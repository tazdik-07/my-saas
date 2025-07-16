import prisma from "@/lib/prisma";
import SearchClient from "./SearchClient";

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

  return <SearchClient doctors={doctors} searchParams={searchParams} />;
}