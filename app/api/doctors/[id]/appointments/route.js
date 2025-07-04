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

    const appointments = await prisma.appointment.findMany({
      where: { doctorId: doctorId },
      include: {
        patient: {
          select: { firstName: true, lastName: true },
        },
      },
      orderBy: {
        appointmentTime: 'asc',
      },
    });

    // Format appointments for the dashboard
    const formattedAppointments = appointments.map(appt => ({
      id: appt.id,
      patient: `${appt.patient.firstName} ${appt.patient.lastName}`,
      time: new Date(appt.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: appt.status,
    }));

    return NextResponse.json(formattedAppointments, { status: 200 });
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    console.log('Request params:', params);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
