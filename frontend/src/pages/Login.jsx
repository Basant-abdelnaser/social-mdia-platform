import React from "react";
import { assets } from "../assets/vibes-assets/assets/assets";
import { Rss, Star } from "lucide-react";
import { SignIn, SignUp } from "@clerk/react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-10 relative overflow-hidden">
      {/* Background */}
      <img
        src={assets.bgImage}
        alt="bg-img"
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      />
      {/* Logo */}
      <div className="flex gap-2 text-2xl md:text-3xl font-bold text-purple-900 absolute top-4 left-4">
        <Rss size={28} />
        <span>Vibez</span>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-6xl flex flex-col gap-6">
        {/* Content */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Left Side */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <img src={assets.group_users} alt="" className="h-8" />

              <div className="flex flex-col gap-1">
                <div className="flex gap-1 justify-center md:justify-start">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      size={12}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-xs">Used by 12k+ developers</p>
              </div>
            </div>

            <h1 className="text-2xl md:text-4xl text-purple-900 font-bold mb-3 leading-snug">
              More than just friends truly connect
            </h1>

            <p className="text-md md:text-lg text-purple-900">
              Connect with global community on Vibez
            </p>
          </div>

          {/* Right Side (Form) */}
          <div className="w-full md:w-1/2 flex justify-center">
            {/* <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-6">
              <h1 className="text-xl font-bold text-purple-900 text-center mt-2">
                Sign in to
              </h1>

              <p className="text-sm text-purple-900 text-center mb-5">
                Welcome back! Please sign in to continue
              </p>

              <form className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  autoFocus
                  className="p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-400"
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-400"
                />

                <button className="bg-purple-900 text-white p-2 w-full rounded-md hover:bg-purple-800 transition">
                  Sign in
                </button>
              </form>

              <p className="text-sm mt-4 p-3 bg-gray-100 rounded-md text-center text-purple-900">
                Not a member yet?{" "}
                <span className="font-bold cursor-pointer">Sign up</span>
              </p>
            </div> */}

            <SignIn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
