"use client"
import { useState } from "react"
import { Bars3Icon, XMarkIcon, HeartIcon } from "@heroicons/react/24/outline"

const navigation = [
  { name: "Home", href: "#" },
  { name: "Services", href: "#features" },
  { name: "Doctors", href: "#doctors" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#0B1220]/95 backdrop-blur-sm border-b border-gray-800">
      <nav className="flex items-center p-5 lg:px-8 mx-auto flex-row justify-between" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-2">
            <HeartIcon className="h-8 w-8 text-[#3E8BFF]" />
            <span className="font-heading font-bold text-xl text-white">HealthCare Pro</span>
          </a>
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
        <div className="hidden flex-1 justify-center lg:flex lg:justify-start lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium leading-6 text-gray-300 hover:text-[#3E8BFF] transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 text-center justify-center items-center">
          
          <a
            href="#"
            className="text-sm font-medium leading-6 text-gray-300 hover:text-white transition-colors duration-200 text-center"
          >
            Log In
          </a>
          <a href="#" className="btn-primary rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm">
            Sign Up
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#0B1220] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-800">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-2">
                <HeartIcon className="h-8 w-8 text-[#3E8BFF]" />
                <span className="font-heading font-bold text-xl text-white">HealthCare Pro</span>
              </a>
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
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-gray-300 hover:bg-gray-800 hover:text-[#3E8BFF]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6 space-y-4">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium leading-7 text-gray-300 hover:bg-gray-800"
                  >
                    Log in
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium leading-7 text-gray-300 hover:bg-gray-800"
                  >
                    Sign up
                  </a>
                  <a
                    href="#"
                    className="btn-primary block rounded-md px-3 py-2.5 text-center text-base font-semibold text-white shadow-sm"
                  >
                    Book Appointment
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}