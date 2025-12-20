import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import BalanceSection from "./BalanceSection";
import TransactionLimit from "./TransactionLimit";
import RecentTransaction, { type Tx } from "./RecentTransaction";
import LoadingDashboard from "./LoadingDashboard";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

interface DashboardResponse {
  accountId: string;
  balance: number;
  dailyLimit: number;
  dailySpent: number;
  monthlyLimit: number;
  monthlySpent: number;
  recentTransactions: Array<{
    transactionId: string;
    recipientName: string;
    recipientId: string;
    amount: number;
    createdAt: string;
  }>;
  dailySpendingData: Array<{
    day: string;
    amount: number;
  }>;
}

interface KycResponse {
  approved: boolean;
  status: "APPROVED" | "PENDING" | "REJECTED" | "NOT_FOUND";
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("sb_access_token");

    if (!token) {
      navigate("/auth", { replace: true });
      return;
    }

    const run = async () => {
      try {
        /* ===== KYC CHECK ===== */
        const kycRes = await fetch(
          `${BACKEND_URL}/api/dashboard/is-kyc-approved`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (kycRes.status === 401) {
          throw new Error("Unauthorized");
        }

        const kyc: KycResponse = await kycRes.json();

        if (!kyc.approved) {
          // 🔴 IMPORTANT: do NOT throw here
          if (kyc.status === "PENDING") {
            navigate("/pending", { replace: true });
            return;
          }

          if (kyc.status === "NOT_FOUND") {
            navigate("/kyc", { replace: true });
            return;
          }

          if (kyc.status === "REJECTED") {
            navigate("/kyc/rejected", { replace: true });
            return;
          }
        }

        /* ===== DASHBOARD DATA ===== */
        const dashRes = await fetch(`${BACKEND_URL}/api/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!dashRes.ok) {
          throw new Error("Unauthorized");
        }

        const dashData: DashboardResponse = await dashRes.json();
        setData(dashData);
        setLoading(false);
      } catch {
        localStorage.removeItem("sb_access_token");
        navigate("/auth", { replace: true });
      }
    };

    run();
  }, [navigate]);

  if (loading) {
    return <LoadingDashboard />;
  }

  if (!data) return null;

  const transactions: Tx[] = data.recentTransactions.map((tx) => ({
    id: tx.transactionId,
    name: tx.recipientName,
    userId: tx.recipientId,
    amount: tx.amount,
    date: new Date(tx.createdAt).toLocaleDateString("en-IN"),
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10 items-start">
          <BalanceSection
            balance={data.balance}
            accountId={data.accountId}
            lastReceived={
              transactions[0]
                ? {
                    from: transactions[0].name,
                    amount: transactions[0].amount,
                    date: transactions[0].date,
                  }
                : undefined
            }
          />

          <TransactionLimit
            dailyLimit={data.dailyLimit}
            dailySpent={data.dailySpent}
            monthlyLimit={data.monthlyLimit}
            monthlySpent={data.monthlySpent}
            dailySpendingData={data.dailySpendingData}
          />
        </div>

        <RecentTransaction transactions={transactions} />
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
