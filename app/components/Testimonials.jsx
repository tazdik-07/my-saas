"use client"

import { useState } from "react"
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

const testimonials = [
  {
    id: 1,
    name: "Jennifer Martinez",
    role: "Patient",
    content:
      "HealthCare Pro made it so easy to find and book an appointment with a specialist. The entire process was seamless, and the doctor was incredibly professional and caring.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Robert Thompson",
    role: "Patient",
    content:
      "I was impressed by the quality of care and the convenience of the platform. Being able to access my medical records online and communicate with my doctor has been a game-changer.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Lisa Chen",
    role: "Patient",
    content:
      "The 24/7 emergency support saved my life. When I had a medical emergency at 2 AM, I was able to get immediate consultation and guidance. Truly exceptional service.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index) => {
    setCurrentIndex(index)
  }

  return (
    <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-[#0F1629] to-[#0B1220]">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            What Our <span className="gradient-text">Patients Say</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Real stories from real patients who have experienced exceptional care through our platform.
          </p>
        </div>

        <div className="mx-auto max-w-4xl relative">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
            <div className="flex items-center mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
              ))}
            </div>

            <blockquote className="text-lg leading-8 text-gray-300 mb-8">
              "{testimonials[currentIndex].content}"
            </blockquote>

            <div className="flex items-center">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={testimonials[currentIndex].image || "/placeholder.svg"}
                alt={testimonials[currentIndex].name}
              />
              <div className="ml-4">
                <div className="font-heading text-lg font-semibold text-white">{testimonials[currentIndex].name}</div>
                <div className="text-gray-400">{testimonials[currentIndex].role}</div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="h-6 w-6 text-white" />
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? "bg-[#3E8BFF]" : "bg-gray-600"
                }`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
