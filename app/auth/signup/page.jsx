"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const validatePassword = (pwd) => {
    const errors = [];
    if (pwd.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    if (!/[A-Z]/.test(pwd)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(pwd)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (!/[0-9]/.test(pwd)) {
      errors.push("Password must contain at least one number.");
    }
    if (!/[^A-Za-z0-9]/.test(pwd)) {
      errors.push("Password must contain at least one symbol.");
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pwdErrors = validatePassword(password);
    if (pwdErrors.length > 0) {
      setPasswordError(pwdErrors);
      return;
    } else {
      setPasswordError([]);
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      const data = await response.json();

      if (response.ok) {
        setPopupMessage(data.message);
        setIsSuccess(true);
        setShowPopup(true);
        window.location.href = "/";
        
      } else {
        setPopupMessage(data.message || "Something went wrong during registration.");
        setIsSuccess(false);
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Sign Up Error:", error);
      setPopupMessage("An error occurred. Please try again.");
      setIsSuccess(false);
      setShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-br from-[#0B1220] via-[#0F1629] to-[#0B1220] ">
      <div className="fixed top-14 left-8 z-50">
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

      {/* This is the div that acts as the card container */}
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm bg-[#1E2741] p-8 rounded-lg shadow-xl border border-gray-700 glow">
        <div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mb-4 text-center text-2xl heading leading-9 tracking-tight text-white">
            Create a New Account
          </h2>
        </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="block w-full p-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="block w-full p-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPasswordError(validatePassword(password))}
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {passwordError.length > 0 && (
                  <ul className="text-red-500 text-xs mt-1 list-disc list-inside">
                    {passwordError.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="btn-primary flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "Sign up"}
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-gray-400">
            Already registered?{" "}
            <Link
              href="/auth/signin"
              className="font-semibold leading-6 gradient-text"
            >
              Login
            </Link>
          </p>
        </div>
      </div >
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}
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
    </div >
  );
}