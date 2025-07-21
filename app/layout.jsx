// app/layout.jsx
import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

import SessionProviderWrapper from "./components/SessionProviderWrapper"; // <‑‑ client wrapper

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "700"],
});

export const metadata = {
  title: "fibula - Your Trusted Medical Partner",
  description:
    "Find the best doctors, book appointments, and get quality healthcare services. Your health is our priority.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`scroll-smooth bg-neutral-900 text-white ${inter.variable} ${GeistSans.variable}`}
    >
      <body className={`${GeistSans.variable} antialiased`}>
        {/* All client components (Header, pages) now live inside the SessionProvider */}
        <SessionProviderWrapper>
          <NextTopLoader color="#02c39a" showSpinner={false} />
          
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
