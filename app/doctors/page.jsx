"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function DoctorPortalPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "doctor") {
      router.push("/doctors/dashboard");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0B1220]">
        <LoaderCircle className="animate-spin w-8 h-8 text-white" />
      </div>
    );
  }

  if (status === "unauthenticated" || session?.user?.role !== "doctor") {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#0B1220] text-white">
        <h1 className="text-3xl font-bold mb-8">Doctor Portal</h1>
        <div className="flex gap-4">
          <Link href="/auth/doctor-signin">
            <Button className="btn-primary">Login</Button>
          </Link>
          <Link href="/doctors/signup">
            <Button className="btn-primary">Signup</Button>
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
