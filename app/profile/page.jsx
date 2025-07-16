import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import ProfileClient from "./ProfileClient";

async function getProfile(session) {
  if (!session?.user?.id) {
    return null;
  }

  return await prisma.user.findUnique({
    where: { id: session.user.id },
  });
}

async function getFamilyMembers(session) {
  if (!session?.user?.id) {
    return [];
  }

  return await prisma.familyMember.findMany({
    where: { userId: session.user.id },
  });
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const [user, familyMembers] = await Promise.all([
    getProfile(session),
    getFamilyMembers(session),
  ]);

  return <ProfileClient user={user} familyMembers={familyMembers} />;
}
