import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Stats from "./components/Stats"
import Features from "./components/Features"
import Doctors from "./components/Doctors"
import Testimonials from "./components/Testimonials"
import CTA from "./components/CTA"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />
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
