
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: params.id },
    });

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    // For now, we'll return dummy availability data.
    // In a real application, this would be fetched from the database.
    const availability = {
      "2025-07-15": ["10:00 AM", "11:00 AM", "02:00 PM"],
      "2025-07-16": ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"],
      "2025-07-17": ["10:00 AM", "02:00 PM", "03:00 PM"],
    };

    return NextResponse.json({ doctor, availability });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
