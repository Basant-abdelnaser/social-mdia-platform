import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center gap-4  backdrop-blur-lg px-8 py-6 rounded-2xl ">
        {/* Spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-purple-200 rounded-full animate-spin border-t-purple-700"></div>
        </div>

        {/* Text */}
        <p className="text-purple-900 font-semibold animate-pulse">
          Loading ...
        </p>
      </div>
    </div>
  );
};

export default Loading;
