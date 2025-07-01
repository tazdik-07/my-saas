import { CalendarDaysIcon, ClockIcon, ShieldCheckIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline"

const features = [
  {
    name: "Easy Appointment Booking",
    description:
      "Schedule appointments with your preferred doctors in just a few clicks. Our intuitive booking system makes healthcare accessible.",
    icon: CalendarDaysIcon,
  },
  {
    name: "24/7 Emergency Support",
    description:
      "Round-the-clock emergency medical support and consultation. Your health emergencies are our priority, anytime, anywhere.",
    icon: ClockIcon,
  },
  {
    name: "Secure Medical Records",
    description:
      "Your medical data is encrypted and securely stored. Access your health records anytime while maintaining complete privacy.",
    icon: ShieldCheckIcon,
  },
  {
    name: "Mobile Health App",
    description:
      "Take your healthcare on the go with our mobile app. Monitor health, book appointments, and consult doctors from anywhere.",
    icon: DevicePhoneMobileIcon,
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 lg:px-8 bg-gradient-to-b from-[#0B1220] to-[#0F1629]">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Why Choose <span className="gradient-text">HealthCare Pro</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            We provide comprehensive healthcare solutions designed to make your medical journey smooth, secure, and
            accessible.
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:gap-12">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className="card-hover bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#3E8BFF]/20">
                  <feature.icon className="h-6 w-6 text-[#3E8BFF]" aria-hidden="true" />
                </div>
                <h3 className="ml-4 font-heading text-xl font-semibold text-white">{feature.name}</h3>
              </div>
              <p className="text-gray-300 leading-7">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
