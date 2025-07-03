import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

/* ───────────────────────────── PUT /api/profile/family-members/[id] ───────────────────────────── */
export async function PUT(request, { params }) {
  try {
    /* ---------- auth ---------- */
    const tokenCookie = (await cookies()).get('token');
    if (!tokenCookie) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const { userId } = jwt.verify(tokenCookie.value, process.env.JWT_SECRET);

    /* ---------- params ---------- */
    const { id } = params;                       // ✅ await params
    if (!id) {
      return NextResponse.json({ message: 'Family‑member ID is required' }, { status: 400 });
    }

    /* ---------- body ---------- */
    const {
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      bloodGroup,
      gender,
      relation,
    } = await request.json();

    if (!firstName || !lastName) {
      return NextResponse.json({ message: 'First & last name are required' }, { status: 400 });
    }

    /* ---------- ownership check ---------- */
    const fm = await prisma.familyMember.findUnique({ where: { id } });
    if (!fm || fm.userId !== userId) {
      return NextResponse.json({ message: 'Unauthorized or not found' }, { status: 403 });
    }

    /* ---------- validate dateOfBirth ---------- */
    let parsedDOB = null;
    if (dateOfBirth) {
      parsedDOB = new Date(dateOfBirth);               // expects “YYYY‑MM‑DD”
      if (isNaN(parsedDOB.getTime())) {
        return NextResponse.json(
          { message: 'Invalid date format – use YYYY‑MM‑DD' },
          { status: 400 },
        );
      }
    }

    /* ---------- update ---------- */
    const updated = await prisma.familyMember.update({
      where: { id },
      data: {
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth: parsedDOB,
        bloodGroup,
        gender,
        relation,
      },
    });

    return NextResponse.json(
      { message: 'Family member updated', familyMember: updated },
      { status: 200 },
    );
  } catch (err) {
    console.error('Error updating family member:', err);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

/* ─────────────────────────── DELETE /api/profile/family-members/[id] ─────────────────────────── */
export async function DELETE(request, { params }) {
  try {
    const tokenCookie = (await cookies()).get('token');
    if (!tokenCookie) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const { userId } = jwt.verify(tokenCookie.value, process.env.JWT_SECRET);

    const { id } = params;                      
    if (!id) {
      return NextResponse.json({ message: 'Family‑member ID is required' }, { status: 400 });
    }

    const fm = await prisma.familyMember.findUnique({ where: { id } });
    if (!fm || fm.userId !== userId) {
      return NextResponse.json({ message: 'Unauthorized or not found' }, { status: 403 });
    }

    await prisma.familyMember.delete({ where: { id } });

    return NextResponse.json(
      { message: 'Family member deleted successfully' },
      { status: 200 },
    );
  } catch (err) {
    console.error('Error deleting family member:', err);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
