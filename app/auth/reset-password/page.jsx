"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Home } from "lucide-react";

export default function ResetPassword() {
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
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setIsSuccess(false);
      setPopupMessage("No reset token provided.");
      setShowPopup(true);
    }
  }, [token]);

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
      setPopupMessage("Passwords do not match!");
      setIsSuccess(false);
      setShowPopup(true);
      return;
    }

    if (!token) {
      setPopupMessage("No reset token found. Please request a new link.");
      setIsSuccess(false);
      setShowPopup(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setPopupMessage(data.message || "Your password has been reset successfully.");
        // Optionally redirect to login page after a short delay
        setTimeout(() => {
          router.push("/auth/signin");
        }, 3000);
      } else {
        setIsSuccess(false);
        setPopupMessage(data.message || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      setIsSuccess(false);
      setPopupMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setShowPopup(true);
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

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm bg-[#1E2741] p-8 rounded-lg shadow-xl border border-gray-700 glow">
        <div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mb-4 text-center text-2xl heading leading-9 tracking-tight text-white">
              Reset Your Password
            </h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  New Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPasswordError(validatePassword(password))}
                  className="block w-full p-2 pr-10 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </div>
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
                  Confirm New Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full p-2 pr-10 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="btn-primary flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-gray-400">
            <Link
              href="/auth/signin"
              className="font-semibold leading-6 gradient-text"
            >
              Back to Login
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
