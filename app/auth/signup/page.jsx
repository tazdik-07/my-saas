"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      <div className="mt-8 sm:mt-2 mx-auto w-full max-w-sm sm:max-w-md bg-[#1c2434]/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700/50 glow">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl heading font-bold text-white mb-2">
            Create a New Account
          </h2>
          <p className="text-sm text-gray-400">
            Join us and take control of your health
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="flex gap-4">
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
                  autoComplete="given-name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                  autoComplete="family-name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a]/50 focus:border-[#02c39a]/50 transition-all duration-200 text-sm sm:text-base"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordError(validatePassword(password))}
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
            {passwordError.length > 0 && (
              <ul className="text-red-500 text-xs mt-2 list-disc list-inside pl-2">
                {passwordError.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-white"
              >
                Confirm Password
              </label>
            </div>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
          </div>

          <button
            type="submit"
            className="btn-primary flex w-full justify-center items-center rounded-xl px-4 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-[#0c1322] shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0c1322] mr-2"></div>
                Signing Up...
              </>
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-sm text-gray-400">
            Already registered?{" "}
            <Link
              href="/auth/signin"
              className="font-semibold text-[#02c39a] hover:text-[#05668d] transition-colors duration-200"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center bg-[#1c2434]/90 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <div className="text-white text-lg sm:text-xl font-semibold text-center">
              Creating your account...
            </div>
          </div>
        </div>
      )}

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