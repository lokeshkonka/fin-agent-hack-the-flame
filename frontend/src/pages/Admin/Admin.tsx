import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../dashboard/Navbar";
import Footer from "../dashboard/Footer";
import AdminUI from "./AdminUI";
import AdminLoading from "./AdminLoading";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

/* ================= TYPES ================= */

export interface AdminStats {
  totalUsers: number;
  totalFrozenUsers: number;
  totalTransactionsToday: number;
  totalFraudTransactionsToday: number;
  totalKycPending: number;
}

export interface SimpleUser {
  userId: string;
  email: string;
  name: string;
}

export interface FraudTransaction {
  fraudTransactionId: string;
  receiverAccountId: string;
  amount: number;
  fraudType: string;
  fraudReason: string;
  createdAt: string;
}

export interface UserFraudDetail {
  userId: string;
  email: string;
  name: string;
  balance: number;
  isFrozen: boolean;
  fraudTransactions: FraudTransaction[];
}

export interface KycDetails {
  userId: string;
  email: string;
  name: string;
  phoneNumber: string;
  address: string;
  aadharNumber: string;
  panNumber: string;
  kycStatus: string;
  aadharPdfUrl: string;
  panPdfUrl: string;
  profilePicUrl: string;
}

export interface TimePoint {
  hour: number;
  value: number;
}

/* ================= HELPERS ================= */

const generateHourlySeries = (total: number): TimePoint[] => {
  const currentHour = new Date().getHours() + 1;
  let cumulative = 0;

  return Array.from({ length: 24 }, (_, hour) => {
    if (hour < currentHour) {
      cumulative = Math.min(
        total,
        cumulative + Math.ceil(total / currentHour)
      );
    }
    return { hour, value: cumulative };
  });
};

/* ================= COMPONENT ================= */

const Admin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("sb_access_token");

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [frozenUsers, setFrozenUsers] = useState<SimpleUser[]>([]);
  const [pendingKyc, setPendingKyc] = useState<SimpleUser[]>([]);
  const [loading, setLoading] = useState(true);

  const [fraudDetail, setFraudDetail] =
    useState<UserFraudDetail | null>(null);
  const [kycDetail, setKycDetail] = useState<KycDetails | null>(null);
  const [approvingKyc, setApprovingKyc] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/auth", { replace: true });
      return;
    }

    Promise.all([
      fetch(`${BACKEND_URL}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`${BACKEND_URL}/api/admin/frozen-users`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`${BACKEND_URL}/api/admin/pending-kyc`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ])
      .then(async ([statsRes, frozenRes, kycRes]) => {
        if (!statsRes.ok) throw new Error("Unauthorized");

        setStats(await statsRes.json());
        setFrozenUsers(await frozenRes.json());
        setPendingKyc(await kycRes.json());
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("sb_access_token");
        navigate("/dashboard", { replace: true });
      });
  }, [navigate, token]);

  const fetchFraudDetails = async (userId: string) => {
    if (!token) return;
    const res = await fetch(
      `${BACKEND_URL}/api/admin/user-fraud?userId=${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.ok) setFraudDetail(await res.json());
  };

  const fetchKycDetails = async (email: string) => {
    if (!token) return;
    const res = await fetch(
      `${BACKEND_URL}/api/admin/kyc-details?email=${email}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.ok) setKycDetail(await res.json());
  };

  const approveKyc = async (email: string) => {
    if (!token) return;
    setApprovingKyc(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/approve-kyc`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Approval failed");

      setPendingKyc((prev) => prev.filter((u) => u.email !== email));
      setStats((prev) =>
        prev
          ? { ...prev, totalKycPending: prev.totalKycPending - 1 }
          : prev
      );
      setKycDetail(null);
    } finally {
      setApprovingKyc(false);
    }
  };

  const unfreezeUser = async (email: string) => {
    if (!token) return;

    await fetch(`${BACKEND_URL}/api/admin/unfreeze`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    setFrozenUsers((prev) => prev.filter((u) => u.email !== email));
    setFraudDetail(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {loading ? (
        <AdminLoading />
      ) : (
        <AdminUI
          stats={stats}
          frozenUsers={frozenUsers}
          pendingKyc={pendingKyc}
          transactionSeries={
            stats ? generateHourlySeries(stats.totalTransactionsToday) : []
          }
          fraudSeries={
            stats
              ? generateHourlySeries(stats.totalFraudTransactionsToday)
              : []
          }
          frozenSeries={
            stats ? generateHourlySeries(stats.totalFrozenUsers) : []
          }
          onViewFraud={fetchFraudDetails}
          onViewKyc={fetchKycDetails}
          onUnfreeze={unfreezeUser}
          onApproveKyc={approveKyc}
          approvingKyc={approvingKyc}
          fraudDetail={fraudDetail}
          kycDetail={kycDetail}
          closeFraud={() => setFraudDetail(null)}
          closeKyc={() => setKycDetail(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default Admin;
