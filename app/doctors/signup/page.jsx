"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { Phone, Home } from "lucide-react";

export default function DoctorSignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    specialty: "",
    clinicName: "",
    clinicCity: "",
    registrationNumber: "",
    yearsOfExperience: "",
    clinicAddress: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      if (/^\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (value.length !== 10) {
          setPhoneNumberError("Phone number must be 10 digits long.");
        } else {
          setPhoneNumberError("");
        }
      }
    } else if (name === "dateOfBirth") {
      const year = value.substring(0, 4);
      if (year.length === 4 && /^[0-9]{4}$/.test(year)) {
        setDateOfBirthError("");
      } else {
        setDateOfBirthError("Enter a valid 4-digit birth year.");
      }
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (name === "password" || name === "confirmPassword") {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (name === "confirmPassword" && formData.password !== value) {
        setPasswordError("Passwords do not match.");
      } else if (name === "password" && formData.confirmPassword && formData.confirmPassword !== value) {
        setPasswordError("Passwords do not match.");
      } else {
        setPasswordError("");
      }
    }
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dateOfBirthError || phoneNumberError || passwordError || formData.password !== formData.confirmPassword) {
      setPopupMessage("Please correct the errors in the form.");
      setIsSuccess(false);
      setShowPopup(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/doctors/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setPopupMessage(data.message || "Doctor registered successfully!");
        setIsSuccess(true);
        setShowPopup(true);
        setTimeout(() => {
          router.push("/doctors/dashboard");
        }, 2000);
      } else {
        setPopupMessage(data.message || "Registration failed.");
        setIsSuccess(false);
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setPopupMessage("An error occurred. Please try again.");
      setIsSuccess(false);
      setShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-4 py-8 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0B1220] via-[#0F1629] to-[#0B1220]">
      {/* Home Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => router.push("/")}
          className="btn-primary px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center space-x-1 sm:space-x-2 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Home size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline">Go to Home</span>
          <span className="sm:hidden">Home</span>
        </button>
      </div>

      {/* Main Card Container */}
      <div className="mt-8 sm:mt-2 mx-auto w-full max-w-md bg-[#1c2434]/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700/50 glow">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl heading font-bold text-white mb-2">
            Doctor Registration
          </h2>
          <p className="text-sm text-gray-400">
            Join our network of trusted medical professionals
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-white mb-2"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={capitalizeFirstLetter(formData.firstName)}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a]/50 focus:border-[#02c39a]/50 transition-all duration-200 text-sm sm:text-base"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-white mb-2"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={capitalizeFirstLetter(formData.lastName)}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a]/50 focus:border-[#02c39a]/50 transition-all duration-200 text-sm sm:text-base"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a]/50 focus:border-[#02c39a]/50 transition-all duration-200 text-sm sm:text-base"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium leading-6 text-white mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-4 py-3 sm:py-3.5 rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a]/50 focus:border-[#02c39a]/50 transition-all duration-200 text-sm sm:text-base"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  required
                  placeholder="Enter your phone number"
                />
              </div>
              {phoneNumberError && <span className="text-red-500 text-xs mt-2">{phoneNumberError}</span>}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium leading-6 text-white mb-2"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a]/50 focus:border-[#02c39a]/50 transition-all duration-200 text-sm sm:text-base"
                  required
                />
                {dateOfBirthError && <span className="text-red-500 text-xs mt-2">{dateOfBirthError}</span>}
              </div>
              <div className="flex-1">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6 text-white mb-2"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a]/50 focus:border-[#02c39a]/50 transition-all duration-200 text-sm sm:text-base"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label
                  htmlFor="specialty"
                  className="block text-sm font-medium leading-6 text-white mb-2"
                >
                  Specialty
                </label>
                <select
                  id="specialty"
                  name="specialty"
                  required
                  value={formData.specialty}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a]/50 focus:border-[#02c39a]/50 transition-all duration-200 text-sm sm:text-base"
                >
                  <option value="">Select Specialty</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Endocrinology">Endocrinology</option>
                  <option value="Gastroenterology">Gastroenterology</option>
                  <option value="General Surgery">General Surgery</option>
                  <option value="Gynecology">Gynecology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Oncology">Oncology</option>
                  <option value="Ophthalmology">Ophthalmology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Psychiatry">Psychiatry</option>
                  <option value="Pulmonology">Pulmonology</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Urology">Urology</option>
                </select>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="bloodGroup"
                  className="block text-sm font-medium leading-6 text-white mb-2"
                >
                  Blood Group
                </label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a]/50 focus:border-[#02c39a]/50 transition-all duration-200 text-sm sm:text-base"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label
                  htmlFor="registrationNumber"
                  className="block text-sm font-medium leading-6 text-white mb-2"
                >
                  Registration Number
                </label>
                <input
                  id="registrationNumber"
                  name="registrationNumber"
                  type="text"
                  required
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a]/50 focus:border-[#02c39a]/50 transition-all duration-200 text-sm sm:text-base"
                  placeholder="Enter your registration number"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="yearsOfExperience"
                  className="block text-sm font-medium leading-6 text-white mb-2"
                >
                  Years of Experience
                </label>
                <input
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  type="number"
                  required
                  value={formData.yearsOfExperience}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a]/50 focus:border-[#02c39a]/50 transition-all duration-200 text-sm sm:text-base"
                  placeholder="Enter your years of experience"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label
                  htmlFor="clinicName"
                  className="block text-sm font-medium leading-6 text-white mb-2"
                >
                  Clinic Name
                </label>
                <input
                  id="clinicName"
                  name="clinicName"
                  type="text"
                  required
                  value={capitalizeFirstLetter(formData.clinicName)}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a]/50 focus:border-[#02c39a]/50 transition-all duration-200 text-sm sm:text-base"
                  placeholder="Enter your clinic name"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="clinicCity"
                  className="block text-sm font-medium leading-6 text-white mb-2"
                >
                  City
                </label>
                <input
                  id="clinicCity"
                  name="clinicCity"
                  type="text"
                  required
                  value={capitalizeFirstLetter(formData.clinicCity)}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a]/50 focus:border-[#02c39a]/50 transition-all duration-200 text-sm sm:text-base"
                  placeholder="Enter your clinic city"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="clinicAddress"
                className="block text-sm font-medium leading-6 text-white mb-2"
              >
                Clinic Address
              </label>
              <textarea
                id="clinicAddress"
                name="clinicAddress"
                required
                value={formData.clinicAddress}
                onChange={handleInputChange}
                rows="3"
                className="block w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a]/50 focus:border-[#02c39a]/50 transition-all duration-200 text-sm sm:text-base"
                placeholder="Enter your clinic address"
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="consultationFee"
                className="block text-sm font-medium leading-6 text-white mb-2"
              >
                Consultation Fee (₹)
              </label>
              <input
                id="consultationFee"
                name="consultationFee"
                type="number"
                required
                value={formData.consultationFee}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a]/50 focus:border-[#02c39a]/50 transition-all duration-200 text-sm sm:text-base"
                placeholder="Enter your consultation fee"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 sm:py-3.5 pr-12 rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a]/50 focus:border-[#02c39a]/50 transition-all duration-200 text-sm sm:text-base"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-white mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 sm:py-3.5 pr-12 rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a]/50 focus:border-[#02c39a]/50 transition-all duration-200 text-sm sm:text-base"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {passwordError && <span className="text-red-500 text-xs mt-2">{passwordError}</span>}
            </div>

          <button
            type="submit"
            className="btn-primary flex w-full justify-center items-center rounded-xl px-4 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-[#0c1322] shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0c1322] mr-2"></div>
                Registering...
              </>
            ) : (
              "Register as Doctor"
            )}
          </button>
        </form>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-sm text-gray-400">
            Already registered as doctor?{" "}
            <Link
              href="/auth/doctor-signin"
              className="font-semibold text-[#02c39a] hover:text-[#05668d] transition-colors duration-200"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
          <div className={`${isSuccess ? 'bg-green-600/90' : 'bg-red-600/90'} backdrop-blur-lg p-6 rounded-2xl shadow-2xl text-white text-center max-w-sm w-full border ${isSuccess ? 'border-green-500/50' : 'border-red-500/50'}`}>
            <p className="text-lg font-semibold mb-4">{popupMessage}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/20"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}