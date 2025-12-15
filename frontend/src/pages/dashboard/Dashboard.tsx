import Navbar from "./Navbar";
import Footer from "./Footer";
import BalanceSection from "./BalanceSection";
import TransactionLimit from "./TransactionLimit";
import RecentTransaction, { type Tx } from "./RecentTransaction";

const Dashboard = () => {
  const isAdmin = true;

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
      <Navbar isAdmin={isAdmin} />
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
