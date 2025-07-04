import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.id !== params.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const doctorId = params.id;

    // For demonstration, generating dummy earnings data
    // In a real application, you would query your database for actual earnings
    const earningsData = [
      { name: "Jan", earnings: Math.floor(Math.random() * 2000) + 3000 },
      { name: "Feb", earnings: Math.floor(Math.random() * 2000) + 3000 },
      { name: "Mar", earnings: Math.floor(Math.random() * 2000) + 3000 },
      { name: "Apr", earnings: Math.floor(Math.random() * 2000) + 3000 },
      { name: "May", earnings: Math.floor(Math.random() * 2000) + 3000 },
      { name: "Jun", earnings: Math.floor(Math.random() * 2000) + 3000 },
    ];

    return NextResponse.json(earningsData, { status: 200 });
  } catch (error) {
    console.error('Error fetching doctor earnings:', error);
    console.log('Request params:', params);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
