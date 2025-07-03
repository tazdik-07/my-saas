"use client";

import { useState } from "react";
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
          router.push("/auth/signin");
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
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-br from-[#0B1220] via-[#0F1629] to-[#0B1220]">
      <div className="sticky top-14 left-8">
        <button
          onClick={() => {
            router.push("/");
          }}
          className="btn-primary px-4 py-2 rounded-md text-sm font-semibold flex items-center space-x-2 cursor-pointer"
        >
          <Home size={18} />
          <span>Go to Home</span>
        </button>
      </div>
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md bg-[#1E2741] p-8 rounded-lg shadow-xl border border-gray-700 glow">
        <div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mb-4 text-center text-2xl heading leading-9 tracking-tight text-white">
              Doctor Registration
            </h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-white">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={capitalizeFirstLetter(formData.firstName)}
                  onChange={handleInputChange}
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-white">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={capitalizeFirstLetter(formData.lastName)}
                  onChange={handleInputChange}
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full p-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-white">Phone Number</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 border-gray-600"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  required
                />
              </div>
              {phoneNumberError && <span className="text-red-500 text-xs mt-1">{phoneNumberError}</span>}
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium leading-6 text-white">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600 text-xs text-gray-400"
                required
              />
              {dateOfBirthError && <span className="text-red-500 text-xs mt-1">{dateOfBirthError}</span>}
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="gender" className="block text-sm font-medium leading-6 text-white">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600 text-xs text-gray-400"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="bloodGroup" className="block text-sm font-medium leading-6 text-white">Blood Group</label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600 text-xs text-gray-400"
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

            <div>
              <label htmlFor="specialty" className="block text-sm font-medium leading-6 text-white">Specialty</label>
              <select
                id="specialty"
                name="specialty"
                required
                value={formData.specialty}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600 text-xs text-gray-400"
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


            <div>
              <label htmlFor="registrationNumber" className="block text-sm font-medium leading-6 text-white">Registration Number</label>
              <input
                id="registrationNumber"
                name="registrationNumber"
                type="text"
                required
                value={formData.registrationNumber}
                onChange={handleInputChange}
                className="block w-full p-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <label htmlFor="yearsOfExperience" className="block text-sm font-medium leading-6 text-white">Years of Experience</label>
              <input
                id="yearsOfExperience"
                name="yearsOfExperience"
                type="number"
                required
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
                className="block w-full p-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="clinicName" className="block text-sm font-medium leading-6 text-white">
                  Clinic Name
                </label>
                <input
                  id="clinicName"
                  name="clinicName"
                  type="text"
                  required
                  value={capitalizeFirstLetter(formData.clinicName)}
                  onChange={handleInputChange}
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="clinicCity" className="block text-sm font-medium leading-6 text-white">
                  City
                </label>
                <input
                  id="clinicCity"
                  name="clinicCity"
                  type="text"
                  required
                  value={capitalizeFirstLetter(formData.clinicCity)}
                  onChange={handleInputChange}
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="clinicAddress" className="block text-sm font-medium leading-6 text-white">Clinic Address</label>
              <textarea
                id="clinicAddress"
                name="clinicAddress"
                required
                value={formData.clinicAddress}
                onChange={handleInputChange}
                rows="3"
                className="block w-full p-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
            <div>
              <label htmlFor="consultationFee" className="block text-sm font-medium leading-6 text-white">
                Consultation Fee (₹)
              </label>
              <input
                id="consultationFee"
                name="consultationFee"
                type="number"
                required
                value={formData.consultationFee}
                onChange={handleInputChange}
                className="block w-full p-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>


            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full p-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-white">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="block w-full p-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {passwordError && <span className="text-red-500 text-xs mt-1">{passwordError}</span>}
            </div>

            <div>
              <button
                type="submit"
                className="btn-primary flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register as Doctor"}
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-gray-400">
            Already registered as doctor?{" "}
            <Link
              href="/auth/doctor-signin"
              className="font-semibold leading-6 gradient-text"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className={`p-6 rounded-lg shadow-xl text-white text-center ${isSuccess ? "bg-green-600" : "bg-red-600"}`}>
            <p className="text-lg font-semibold">{popupMessage}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}