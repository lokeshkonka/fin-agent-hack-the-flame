import { useNavigate, useLocation } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const message =
    (location.state as { message?: string })?.message ??
    "Something went wrong. Please try again.";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div
        className="max-w-lg w-full rounded-3xl bg-white border border-red-200
                   shadow-xl p-10 space-y-6 text-center
                   animate-[fadeScale_0.25s_ease-out]"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center
                        rounded-full bg-red-100 text-red-600">
          <AlertTriangle size={28} />
        </div>

        <h1 className="text-2xl font-semibold text-slate-900">
          Unexpected Error
        </h1>

        <p className="text-slate-600">{message}</p>

        <div className="flex gap-4 justify-center pt-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-xl bg-blue-600 px-6 py-3 text-white font-medium
                       transition hover:bg-blue-700"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/auth")}
            className="rounded-xl border border-slate-300 px-6 py-3
                       font-medium text-slate-700
                       hover:bg-slate-50 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
