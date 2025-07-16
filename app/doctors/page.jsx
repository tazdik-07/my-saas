import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import Doctors from "../components/Doctors";
import DoctorPortal from "./DoctorPortal";

export default async function DoctorsPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role === "doctor") {
    return <DoctorPortal />;
  }

  return <Doctors />;
}