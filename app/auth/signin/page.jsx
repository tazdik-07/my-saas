"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { update } = useSession();
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setPopupMessage(result.error || "Login failed.");
        setIsSuccess(false);
        setShowPopup(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setIsRedirecting(true);
        await update();
        router.push("/");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setPopupMessage("An error occurred. Please try again.");
      setIsSuccess(false);
      setShowPopup(true);
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
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm bg-[#1c2434] p-8 rounded-lg shadow-xl border border-gray-700 glow">
        
        <div>
          
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mb-4 text-center text-2xl heading leading-9 tracking-tight text-white">
            Welcome Back!
          </h2>
        </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
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
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#02c39a] sm:text-sm sm:leading-6"
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
                <div className="text-sm">
                  <Link href="/auth/forgot-password" className="font-semibold text-[#02c39a] hover:text-[#05668d]">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#02c39a] sm:text-sm sm:leading-6"
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
              </div>

            </div>

            
            <div>
              <button
                type="submit"
                className="btn-primary flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-[#0c1322] shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#02c39a]"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-gray-400">
            New User?{" "}
            <Link
              href="/auth/signup"
              className="font-semibold leading-6 text-[#02c39a] hover:text-[#05668d]"
            >
              Sign Up
            </Link>
          </p>
          <p className="mt-2 text-center text-sm text-gray-400">
            Are you a Doctor?{" "}
            <Link
              href="/auth/doctor-signin"
              className="font-semibold leading-6 text-[#02c39a] hover:text-[#05668d]"
            >
              Doctor Login
            </Link>
          </p>
        </div>
      </div >
      {isRedirecting && (
        <div className="fixed inset-0 flex justify-center items-center bg-blur z-50">
          <div className="flex flex-col items-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <div className="text-white text-xl font-semibold">Login successful. Redirecting...</div>
          </div>
        </div>
      )}
      {showPopup && !isSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className={`p-6 rounded-lg shadow-xl text-white text-center ${isSuccess ? "bg-[#02c39a]" : "bg-red-600"}`}>
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