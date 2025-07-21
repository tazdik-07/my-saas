"use client"
import { useState } from "react"
import Link from "next/link"
import { Bars3Icon, XMarkIcon, HeartIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "How it Works", href: "/#how-it-works" },
  { name: "For Doctors", href: "/doctors" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
]

export default function SearchNavbar() {
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
    <header className="inset-x-0 top-0 z-50">
      <nav
        className="flex items-center px-4 py-3 sm:px-6 lg:px-8 mx-auto flex-row justify-between bg-[#0B1220]/90 backdrop-blur-md border-b border-gray-800/50"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
            <HeartIcon className="h-7 w-7 sm:h-8 sm:w-8 text-[#02c39a]" />
            <span className="font-heading font-bold text-lg sm:text-xl text-[#02c39a]">
              fibula
            </span>
          </Link>
        </div>
        {/* Mobile menu button with better touch target */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="relative inline-flex items-center justify-center rounded-lg p-3 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden flex-1 justify-center lg:flex lg:justify-center lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium leading-6 text-gray-300 hover:text-[#02c39a] transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>
        {/* Desktop auth section */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 text-center justify-center items-center">
          {isLoggedIn && role !== 'doctor' ? (
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#02c39a] to-[#05668d] flex items-center justify-center text-white text-lg font-semibold cursor-pointer hover:shadow-lg transition-all duration-200"
              >
                {firstName?.charAt(0).toUpperCase()}{lastName?.charAt(0).toUpperCase()}
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#0B1220]/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl py-2 z-50">
                  <Link
                    href="/profile"
                    className="block w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors duration-200"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-red-600/20 hover:text-red-400 transition-colors duration-200"
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
                className="btn-primary rounded-lg px-4 py-2 text-sm font-semibold text-[#0c1322] shadow-sm hover:shadow-lg transition-all duration-200"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu - Enhanced with better animations and touch targets */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#0B1220]/95 backdrop-blur-lg px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-800/50 shadow-2xl">
            <div className="flex items-center justify-between pb-4">
              <Link
                href="/"
                className="-m-1.5 p-1.5 flex items-center space-x-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <HeartIcon className="h-8 w-8 text-[#02c39a]" />
                <span className="font-heading font-bold text-xl text-[#02c39a]">
                  fibula
                </span>
              </Link>
              <button
                type="button"
                className="rounded-lg p-3 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-800/50">
                <div className="space-y-1 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-xl px-4 py-4 text-lg font-medium leading-7 text-gray-300 hover:bg-gray-800/50 hover:text-[#02c39a] transition-all duration-200 border border-transparent hover:border-gray-700/50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6 space-y-4">
                  {isLoggedIn && role !== 'doctor' ? (
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 px-3 py-4 rounded-xl bg-gray-800/30 border border-gray-700/50">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#02c39a] to-[#05668d] flex items-center justify-center text-white text-lg font-semibold">
                            {firstName?.charAt(0).toUpperCase()}{lastName?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-white font-medium">Welcome back!</p>
                            <p className="text-sm text-gray-400">{firstName} {lastName}</p>
                          </div>
                        </div>
                        <Link
                          href="/profile"
                          className="-mx-3 block rounded-xl px-4 py-4 text-lg font-medium leading-7 text-gray-300 hover:bg-gray-800/50 hover:text-[#02c39a] transition-all duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="-mx-3 block w-full text-left rounded-xl px-4 py-4 text-lg font-medium leading-7 text-gray-300 hover:bg-red-600/20 hover:text-red-400 transition-all duration-200"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                    <>
                      <Link
                        href="/auth/signin"
                        className="-mx-3 block rounded-xl px-4 py-4 text-lg font-medium leading-7 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-200 border border-gray-700/50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Log in
                      </Link>
                      <Link
                        href="/auth/signup"
                        className="-mx-3 block rounded-xl px-4 py-4 text-lg font-medium leading-7 btn-primary text-[#0c1322] shadow-lg transition-all duration-200 text-center"
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