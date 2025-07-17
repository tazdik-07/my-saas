
import Hero from "./components/Hero"
import Stats from "./components/Stats"
import Features from "./components/Features"
import Doctors from "./components/Doctors"
import Testimonials from "./components/Testimonials"
import CTA from "./components/CTA"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session;
  const firstName = session?.user?.name?.split(' ')[0] || '';
  const lastName = session?.user?.name?.split(' ')[1] || '';

  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar isLoggedIn={isLoggedIn} firstName={firstName} lastName={lastName} />
      <Hero />
      <Stats />
      <Features />
      <Doctors />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
