
import Hero from "./components/Hero"
import Stats from "./components/Stats"

import Testimonials from "./components/Testimonials"
import FAQ from "./components/FAQ"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import HowItWorks from "./components/HowItWorks"
import BuiltForPatients from "./components/BuiltForPatients"
import JoinFibula from "./components/JoinFibula"

export default async function Home() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session;
  const firstName = session?.user?.name?.split(' ')[0] || '';
  const lastName = session?.user?.name?.split(' ')[1] || '';
  const role = session?.user?.role || '';

  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar isLoggedIn={isLoggedIn} firstName={firstName} lastName={lastName} role={role} />
      <Hero />
      <Stats />
      <HowItWorks />
      <BuiltForPatients />
      <Testimonials />
      <JoinFibula />
      <FAQ />
      <Footer />
    </main>
  )
}
