import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    /* 1️⃣  read body -----------------------------------------------------*/
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth,
      gender,
      bloodGroup,
      specialty,
      registrationNumber,
      yearsOfExperience,
      consultationFee,          // 🆕  <‑‑ here
      clinicName,
      clinicCity,
      clinicAddress,
      password,
    } = await request.json();

    /* 2️⃣  required‑field check -----------------------------------------*/
    const required = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      gender,
      specialty,
      registrationNumber,
      yearsOfExperience,
      consultationFee,          // 🆕  <‑‑ here
      clinicName,
      clinicCity,
      clinicAddress,
    };
    for (const [k, v] of Object.entries(required)) {
      if (!v || (typeof v === 'string' && !v.trim()))
        return NextResponse.json({ message: `${k} is required` }, { status: 400 });
    }

    /* 3‑4  caps + uniqueness  (unchanged) -------------------------------*/

    /* 5️⃣  create row ----------------------------------------------------*/
    const hashed = await bcrypt.hash(password, 10);
    const cap = (str = '') =>
      str
        .trim()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const doctor = await prisma.doctor.create({
      data: {
        firstName: cap(firstName),
        lastName: cap(lastName),
        email,
        phoneNumber,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        bloodGroup,
        specialty,
        registrationNumber,
        yearsOfExperience: parseInt(yearsOfExperience, 10),
        consultationFee: parseInt(consultationFee, 10),   // 🆕  <‑‑ here
        clinicName,
        city: clinicCity,
        clinicAddress,
        password: hashed,
      },
      select: { id: true, email: true, firstName: true, lastName: true },
    });

    return NextResponse.json(
      { message: 'Doctor registered successfully', doctor },
      { status: 201 },
    );
  } catch (err) {
    console.error('Doctor signup error:', err);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
