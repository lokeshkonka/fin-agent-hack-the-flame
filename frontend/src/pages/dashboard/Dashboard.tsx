import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import BalanceSection from "./BalanceSection";
import TransactionLimit from "./TransactionLimit";
import RecentTransaction, { type Tx } from "./RecentTransaction";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

const Dashboard = () => {
  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("sb_access_token");

  if (!token) {
    navigate("/auth", { replace: true });
    return;
  }
  fetch(`${BACKEND_URL}/secure/ping`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) {
      localStorage.removeItem("sb_access_token");
      navigate("/auth", { replace: true });
    }
  });
}, [navigate]);


  const transactions: Tx[] = [
    {
      id: "1",
      name: "Rahul Sharma",
      userId: "USR1023",
      amount: 2500,
      date: "15 Dec 2025",
    },
  ];


  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            <BalanceSection
              balance={125000}
              userId="USR1023"
              lastReceived={{
                from: "Anita Verma",
                amount: 7200,
                date: "14 Dec 2025",
              }}
            />

            <RecentTransaction transactions={transactions} />
          </div>

          {/* RIGHT COLUMN */}
          <TransactionLimit
            dailyLimit={50000}
            dailySpent={12000}
            monthlyLimit={300000}
            monthlySpent={98000}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
