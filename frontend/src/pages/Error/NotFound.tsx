import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div
        className="max-w-lg w-full rounded-3xl bg-white border border-slate-200
                   shadow-xl p-10 text-center space-y-6
                   animate-[fadeScale_0.25s_ease-out]"
      >
        <h1 className="text-6xl font-bold text-blue-600">404</h1>

        <h2 className="text-2xl font-semibold text-slate-900">
          Page not found
        </h2>

        <p className="text-slate-600">
          The page you are looking for doesn’t exist or was moved.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 rounded-xl
                     bg-blue-600 px-6 py-3 text-white font-medium
                     transition-all hover:bg-blue-700
                     active:scale-[0.97]"
        >
          <ArrowLeft size={18} />
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
