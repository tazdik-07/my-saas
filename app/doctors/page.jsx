import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import DoctorAuthButtons from "./DoctorAuthButtons";
import DoctorPortal from "./DoctorPortal";

export default async function DoctorsPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role === "doctor") {
    return <DoctorPortal />;
  }

  return <DoctorAuthButtons />;
}