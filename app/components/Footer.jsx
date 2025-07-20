import { HeartIcon } from "@heroicons/react/24/outline"

const navigation = {
  services: [
    { name: "Find Doctors", href: "#" },
    { name: "Book Appointments", href: "#" },
    { name: "Emergency Care", href: "#" },
    { name: "Health Records", href: "#" },
    { name: "Telemedicine", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Our Team", href: "#" },
    { name: "Careers", href: "#" },
    { name: "News", href: "#" },
    { name: "Contact", href: "#" },
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Patient Portal", href: "#" },
    { name: "Insurance", href: "#" },
    { name: "Billing", href: "#" },
    { name: "FAQs", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "HIPAA Compliance", href: "#" },
    { name: "Accessibility", href: "#" },
    { name: "Sitemap", href: "#" },
  ],
}

const socialLinks = [
  { name: "Facebook", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0b1220] border-t border-gray-700/50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <HeartIcon className="h-8 w-8 text-[#02c39a]" />
              <span className="font-heading font-bold text-xl text-white">HealthCare Pro</span>
            </div>
            <p className="text-gray-400 text-sm leading-6 mb-6">
              Your trusted partner in healthcare. Connecting patients with qualified medical professionals for better
              health outcomes.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-[#02c39a] transition-colors duration-200"
                >
                  <span className="sr-only">{item.name}</span>
                  <div className="w-6 h-6 bg-gray-700 rounded"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-sm font-semibold leading-6 text-white mb-6">Services</h3>
            <ul role="list" className="space-y-4">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm leading-6 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading text-sm font-semibold leading-6 text-white mb-6">Company</h3>
            <ul role="list" className="space-y-4">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm leading-6 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading text-sm font-semibold leading-6 text-white mb-6">Support</h3>
            <ul role="list" className="space-y-4">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm leading-6 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading text-sm font-semibold leading-6 text-white mb-6">Legal</h3>
            <ul role="list" className="space-y-4">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm leading-6 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs leading-5 text-gray-400">&copy; 2024 HealthCare Pro. All rights reserved.</p>
            <p className="text-xs leading-5 text-gray-400 mt-4 md:mt-0">HIPAA Compliant • SSL Secured • 24/7 Support</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
