import { UserGroupIcon, ClockIcon, HeartIcon, StarIcon } from "@heroicons/react/24/outline"

const stats = [
  {
    id: 1,
    name: "Qualified Doctors",
    value: "500+",
    icon: UserGroupIcon,
    description: "Certified medical professionals",
  },
  {
    id: 2,
    name: "Happy Patients",
    value: "10K+",
    icon: HeartIcon,
    description: "Satisfied with our services",
  },
  {
    id: 3,
    name: "Years Experience",
    value: "15+",
    icon: ClockIcon,
    description: "Serving the community",
  },
  {
    id: 4,
    name: "Success Rate",
    value: "98%",
    icon: StarIcon,
    description: "Patient satisfaction rate",
  },
]

export default function Stats() {
  return (
    <section className="py-20 px-6 lg:px-8 bg-[#0B1220]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="card-hover bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center border border-gray-800 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#3E8BFF]/20 mb-6">
                <stat.icon className="h-8 w-8 text-[#3E8BFF]" aria-hidden="true" />
              </div>
              <div className="font-heading text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-xl font-semibold text-gray-200 mb-2">{stat.name}</div>
              <div className="text-sm text-gray-400">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
