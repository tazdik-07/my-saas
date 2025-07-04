// app/layout.jsx
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

import SessionProviderWrapper from "./components/SessionProviderWrapper"; // <‑‑ client wrapper

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "700"],
});

export const metadata = {
  title: "HealthCare Pro - Your Trusted Medical Partner",
  description:
    "Find the best doctors, book appointments, and get quality healthcare services. Your health is our priority.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`scroll-smooth bg-neutral-900 text-white ${inter.variable} ${poppins.variable}`}
    >
      <body className="font-sans antialiased">
        {/* All client components (Header, pages) now live inside the SessionProvider */}
        <SessionProviderWrapper>
          <NextTopLoader color="#3e8bff" showSpinner={false} />
          
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
