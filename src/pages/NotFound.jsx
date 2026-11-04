import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 via-pink-50 to-teal-100">
      <div className="max-w-2xl mx-auto text-center px-4">
        <div className="relative mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#10062B] to-[#4F0129]">
            404
          </h1>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-[#10062B] to-[#4F0129] rounded-full"></div>
        </div>

        {/* Main Message */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          ¡Vaya! Página no encontrada
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          La página que buscas no existe o se ha movido.
        </p>

        {/* Decorative Elements */}
        <div className="flex justify-center space-x-2 mb-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-[#10062B] to-[#4F0129] animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-lg bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
Volver
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#10062B] to-[#4F0129] text-white hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
Ir al inicio
          </button>
        </div>

        {/* Additional Info */}
        <p className="mt-8 text-sm text-gray-500">
          Intentaste acceder a:{" "}
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">
            {location.pathname}
          </span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
