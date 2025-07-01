import { Inter, Poppins } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata = {
  title: "HealthCare Pro - Your Trusted Medical Partner",
  description:
    "Find the best doctors, book appointments, and get quality healthcare services. Your health is our priority.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth bg-neutral-900 text-white ${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
