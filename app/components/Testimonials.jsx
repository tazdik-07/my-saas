import { StarIcon } from '@heroicons/react/20/solid';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Fibula has made managing my family's appointments so much easier. The real-time updates are a lifesaver!",
      name: "Sarah Anderson",
      rating: 5,
    },
    {
      quote: "I love how I can book and cancel appointments anytime. It's so convenient and fits perfectly into my busy schedule.",
      name: "Michael Johnson",
      rating: 5,
    },
    {
      quote: "Finding a specialist used to be a headache, but with Fibula's smart search, I found the perfect doctor in minutes.",
      name: "Emily Chen",
      rating: 4,
    },
  ];

  const getInitials = (name) => {
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    } else if (parts[0]) {
      return parts[0][0].toUpperCase();
    }
    return '';
  };

    return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#0b1220] text-white">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Trusted by <span className="gradient-text">Patients</span></h2>
        <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto">Real experiences from real patients</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#1c2434]/60 backdrop-blur-sm border border-gray-700/30 p-6 sm:p-8 rounded-xl shadow-lg flex flex-col items-start text-left card-hover">
              <div className="flex items-center mb-4 w-full">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#02c39a] to-[#05668d] text-white text-sm sm:text-lg font-bold flex-shrink-0 mr-3 sm:mr-4">
                  {getInitials(testimonial.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white text-base sm:text-lg truncate">{testimonial.name}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className={`h-4 w-4 sm:h-5 sm:w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
