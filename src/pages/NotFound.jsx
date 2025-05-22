import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white px-4">
      <h1 className="text-9xl font-extrabold mb-6 drop-shadow-lg">404</h1>
      <p className="text-2xl md:text-3xl mb-4 font-semibold">
        Oops! Page Not Found
      </p>
      <p className="mb-8 max-w-md text-center text-white/90">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-white text-purple-600 font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-purple-100 transition"
      >
        Go Back Home
      </button>
    </div>
  );
}
