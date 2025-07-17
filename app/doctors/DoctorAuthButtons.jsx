import Link from "next/link";

export default function DoctorAuthButtons() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0B1220] via-[#0F1629] to-[#0B1220] text-white p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3E8BFF]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#4DAAFB]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3E8BFF]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#4DAAFB]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Welcome <span className="gradient-text">Doctor</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Please log in to access your portal or sign up if you are a new doctor.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-6">
        <Link href="/auth/doctor-signin">
          <button className="btn-primary py-3 px-8 rounded-xl text-white font-semibold text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg">
            Doctor Login
          </button>
        </Link>
        <Link href="/doctors/signup">
          <button className="btn-secondary py-3 px-8 rounded-xl text-white font-semibold text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg">
            Doctor Sign Up
          </button>
        </Link>
      </div>
    </section>
  );
}
