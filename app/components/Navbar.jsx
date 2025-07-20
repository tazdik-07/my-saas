"use client"
import { useState } from "react"
import Link from "next/link"
import { Bars3Icon, XMarkIcon, HeartIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "How it Works", href: "/#how-it-works" },
  { name: "For Doctors", href: "/doctors" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
]

import { useSession } from "next-auth/react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const firstName = session?.user?.name?.split(' ')[0] || '';
  const lastName = session?.user?.name?.split(' ')[1] || '';
  const role = session?.user?.role || '';

  const handleLogout = async () => {
    setLoading(true);
    await signOut({ callbackUrl: "/" });
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className="flex items-center p-5 lg:px-8 mx-auto flex-row justify-between bg-[#0B1220]/80 backdrop-blur-sm border-b border-gray-800"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
            <span className="font-heading font-bold text-xl text-[#02c39a]">
              fibula
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden flex-1 justify-center lg:flex lg:justify-center lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium leading-6 text-gray-300 hover:text-[#3E8BFF] transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 text-center justify-center items-center">
          {isLoggedIn && role !== 'doctor' ? (
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white text-lg font-semibold cursor-pointer"
              >
                {firstName?.charAt(0).toUpperCase()}{lastName?.charAt(0).toUpperCase()}
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#0B1220] border border-gray-800 rounded-md shadow-lg py-1">
                  <Link
                    href="/profile"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="text-sm font-medium leading-6 text-gray-300 hover:text-white transition-colors duration-200 text-center"
              >
                Log In
              </Link>
              <Link
                href="/auth/signup"
                className="btn-primary rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#0B1220] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-800">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="-m-1.5 p-1.5 flex items-center space-x-2"
              >
                <HeartIcon className="h-8 w-8 text-[#3E8BFF]" />
                <span className="font-heading font-bold text-xl text-white">
                  HealthCare Pro
                </span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-800">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-gray-300 hover:bg-gray-800 hover:text-[#3E8BFF]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6 space-y-4">
                  {isLoggedIn ? (
                    role !== 'doctor' ? (
                      <div className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium leading-7 text-gray-300">
                        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white text-lg font-semibold mx-auto">
                          {firstName?.charAt(0).toUpperCase()}{lastName?.charAt(0).toUpperCase()}
                        </div>
                        <p className="text-center mt-2">Logged In</p>
                      </div>
                    ) : null
                  ) : (
                    <>
                      <Link
                        href="/auth/signin"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium leading-7 text-gray-300 hover:bg-gray-800"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Log in
                      </Link>
                      <Link
                        href="/auth/signup"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium leading-7 text-gray-300 hover:bg-gray-800"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign up
                      </Link>
                    </>
                  )}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-blur z-50">
          <div className="flex flex-col items-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <div className="text-white text-xl font-semibold">Logging out...</div>
          </div>
        </div>
      )}
    </header>
  )
}
