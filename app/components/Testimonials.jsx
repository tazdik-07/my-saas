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
    <section className="py-20 bg-[#0b1220] text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-6">Trusted by <span className="gradient-text">Patients</span></h2>
        <p className="text-lg text-gray-400 mb-12">Real experiences from real patients</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#1c2434] p-8 rounded-xl shadow-lg flex flex-col items-start text-left">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#0c1322] text-[#02c39a] text-lg font-bold flex-shrink-0 mr-4">
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <p className="font-bold text-white text-lg">{testimonial.name}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-base leading-relaxed">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}