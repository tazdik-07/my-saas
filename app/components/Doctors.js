import { StarIcon, MapPinIcon } from "@heroicons/react/24/solid"

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: "12 years",
    rating: 4.9,
    reviews: 156,
    location: "New York, NY",
    image: "/placeholder.svg?height=300&width=300",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    experience: "15 years",
    rating: 4.8,
    reviews: 203,
    location: "Los Angeles, CA",
    image: "/placeholder.svg?height=300&width=300",
    available: true,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    experience: "8 years",
    rating: 4.9,
    reviews: 189,
    location: "Chicago, IL",
    image: "/placeholder.svg?height=300&width=300",
    available: false,
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedic Surgeon",
    experience: "20 years",
    rating: 4.7,
    reviews: 142,
    location: "Houston, TX",
    image: "/placeholder.svg?height=300&width=300",
    available: true,
  },
]

export default function Doctors() {
  return (
    <section id="doctors" className="py-20 px-6 lg:px-8 bg-[#0B1220]">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Meet Our <span className="gradient-text">Expert Doctors</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Our team of qualified medical professionals is dedicated to providing you with the best healthcare services.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor, index) => (
            <div
              key={doctor.id}
              className="card-hover bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative mb-6">
                <img
                  className="w-full h-48 object-cover rounded-xl"
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                />
                <div
                  className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                    doctor.available
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}
                >
                  {doctor.available ? "Available" : "Busy"}
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-heading text-xl font-semibold text-white mb-1">{doctor.name}</h3>
                <p className="text-[#3E8BFF] font-medium mb-2">{doctor.specialty}</p>
                <p className="text-gray-400 text-sm mb-3">{doctor.experience} experience</p>

                <div className="flex items-center justify-center space-x-1 mb-3">
                  <StarIcon className="h-4 w-4 text-yellow-400" />
                  <span className="text-white font-medium">{doctor.rating}</span>
                  <span className="text-gray-400 text-sm">({doctor.reviews} reviews)</span>
                </div>

                <div className="flex items-center justify-center space-x-1 mb-4">
                  <MapPinIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">{doctor.location}</span>
                </div>

                <button className="w-full btn-primary py-2 px-4 rounded-lg text-white font-medium text-sm">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-primary py-3 px-8 rounded-xl text-white font-semibold">View All Doctors</button>
        </div>
      </div>
    </section>
  )
}
