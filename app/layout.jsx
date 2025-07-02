import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import NextTopLoader from "nextjs-toploader";
import HeaderWrapper from "./components/HeaderWrapper";



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "700"],
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "700"],
})

export const metadata = {
  title: "HealthCare Pro - Your Trusted Medical Partner",
  description:
    "Find the best doctors, book appointments, and get quality healthcare services. Your health is our priority.",
}

import { isAuthenticated } from "../lib/auth";

export default async function RootLayout({ children }) {
  const { isLoggedIn, firstName, lastName } = await isAuthenticated();
  return (
    <html lang="en" className={`scroll-smooth bg-neutral-900 text-white ${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <NextTopLoader color="#3e8bff" showSpinner={false} />
        <HeaderWrapper isLoggedIn={isLoggedIn} firstName={firstName} lastName={lastName} />
        {children}
      </body>
    </html>
  );
}
