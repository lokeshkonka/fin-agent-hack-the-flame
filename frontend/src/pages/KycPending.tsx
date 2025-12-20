import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, ShieldCheck } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

const POLL_INTERVAL_MS = 15000; // 15 seconds

const KycPending = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("sb_access_token");

    if (!token) {
      navigate("/auth", { replace: true });
      return;
    }

    let intervalId: number;

    const checkKycStatus = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/dashboard/is-kyc-approved`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data: { approved: boolean } = await res.json();

        if (data.approved) {
          navigate("/dashboard", { replace: true });
        } else {
          setChecking(false);
        }
      } catch {
        localStorage.removeItem("sb_access_token");
        navigate("/auth", { replace: true });
      }
    };

    // Initial check
    checkKycStatus();

    // Poll every X seconds
    // eslint-disable-next-line prefer-const
    intervalId = window.setInterval(checkKycStatus, POLL_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [navigate]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="h-10 w-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6">
      <div className="max-w-md w-full rounded-2xl bg-white border border-slate-200 shadow-xl p-10 text-center space-y-6">
        <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-full bg-blue-50">
          <ShieldCheck className="h-7 w-7 text-blue-600" />
        </div>

        <h1 className="text-2xl font-semibold text-slate-900">
          KYC Verification in Progress
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed">
          Your documents have been submitted successfully.
          Our compliance team is reviewing your KYC details.
          This usually takes a short time.
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
          <Clock className="h-4 w-4" />
          We’ll automatically redirect you once approved
        </div>
      </div>
    </div>
  );
};

export default KycPending;
