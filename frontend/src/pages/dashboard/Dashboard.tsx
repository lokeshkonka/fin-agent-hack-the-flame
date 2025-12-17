'use client';

import { useEffect, useState } from 'react';

type Transaction = {
  transactionId: string;
  recipientName: string;
  recipientId: string | null;
  amount: number;
  transactionType: 'INCOME' | 'EXPENSE';
  description: string | null;
  createdAt: string;
};

type DailySpendingPoint = {
  date: string;
  day: string;
  amount: number;
};

type IncomeVsExpensePoint = {
  type: 'Income' | 'Expense';
  amount: number;
};

type DashboardData = {
  userId: string;
  accountId: string;
  name: string;
  email: string;
  balance: number;
  dailyLimit: number;
  dailySpent: number;
  monthlyLimit: number;
  monthlySpent: number;
  avgDailySpending: number;
  totalMonthlySpending: number;
  recentTransactions: Transaction[];
  dailySpendingData: DailySpendingPoint[];
  incomeVsExpenseData: IncomeVsExpensePoint[];
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem('sb_access_token'); // or your actual key

      const res = await fetch('http://localhost:8080/api/dashboard', {  // <– use full URL if needed
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        }
      });

      const text = await res.text();            // <– read raw text
      console.log('Dashboard raw response:', text, 'status:', res.status);

      if (!res.ok) {
        throw new Error(`Failed to fetch dashboard: ${res.status} ${text}`);
      }

      const json = JSON.parse(text) as DashboardData;  // parse only if it's actually JSON
      setData(json);
    } catch (err) {
      console.error('Failed to fetch dashboard', err);
    } finally {
      setLoading(false);
    }
  };

  fetchDashboard();
}, []);


  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (!data) {
    return <div>Failed to load dashboard.</div>;
  }

  const dailyUsagePercent =
    data.dailyLimit > 0 ? Math.min(100, (data.dailySpent / data.dailyLimit) * 100) : 0;

  const monthlyUsagePercent =
    data.monthlyLimit > 0 ? Math.min(100, (data.monthlySpent / data.monthlyLimit) * 100) : 0;

  return (
    <div className="flex flex-col gap-4">
      {/* User summary section */}
      <section className="rounded-xl border p-4">
        <h2 className="text-lg font-semibold">Welcome back, {data.name}</h2>
        <p className="text-sm text-gray-500">Account ID: {data.accountId}</p>
        <p className="text-sm text-gray-500">Email: {data.email}</p>
        <div className="mt-4 flex gap-8">
          <div>
            <div className="text-xs text-gray-400">Current Balance</div>
            <div className="text-2xl font-bold">₹{data.balance.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Avg Daily Spending (This Month)</div>
            <div className="text-lg font-semibold">
              ₹{data.avgDailySpending.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Total Monthly Spending</div>
            <div className="text-lg font-semibold">
              ₹{data.totalMonthlySpending.toLocaleString()}
            </div>
          </div>
        </div>
      </section>

      {/* Limits section */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border p-4">
          <div className="flex justify-between text-sm">
            <span>Daily Limit</span>
            <span>
              ₹{data.dailySpent.toLocaleString()} / ₹{data.dailyLimit.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-emerald-500"
              style={{ width: `${dailyUsagePercent}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <div className="flex justify-between text-sm">
            <span>Monthly Spending</span>
            <span>
              ₹{data.monthlySpent.toLocaleString()} / ₹{data.monthlyLimit.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-500"
              style={{ width: `${monthlyUsagePercent}%` }}
            />
          </div>
        </div>
      </section>

      {/* Charts section */}
      <section className="grid gap-4 md:grid-cols-2">
        {/* Daily expense (7-day) */}
        <div className="rounded-xl border p-4">
          <h3 className="text-sm font-semibold mb-2">Last 7 Days Spending</h3>
          <div className="flex items-end justify-between gap-2 h-40">
            {data.dailySpendingData.map((d) => {
              const max = Math.max(...data.dailySpendingData.map((x) => x.amount), 1);
              const h = (d.amount / max) * 100;
              return (
                <div key={d.date} className="flex flex-col items-center gap-1">
                  <div className="w-6 rounded bg-emerald-500" style={{ height: `${h}%` }} />
                  <span className="text-[10px] text-gray-500">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Income vs Expense */}
        <div className="rounded-xl border p-4">
          <h3 className="text-sm font-semibold mb-2">Income vs Expense (This Month)</h3>
          <div className="flex gap-4">
            {data.incomeVsExpenseData.map((item) => (
              <div key={item.type} className="flex-1 rounded-lg bg-gray-50 p-3">
                <div className="text-xs text-gray-500">{item.type}</div>
                <div className="text-lg font-semibold">₹{item.amount.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent transactions */}
      <section className="rounded-xl border p-4">
        <h3 className="text-sm font-semibold mb-2">Recent Transactions</h3>
        <div className="space-y-2">
          {data.recentTransactions.map((tx) => (
            <div
              key={tx.transactionId}
              className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm"
            >
              <div>
                <div className="font-medium">{tx.recipientName}</div>
                <div className="text-[11px] text-gray-500">
                  {new Date(tx.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div
                  className={
                    tx.transactionType === 'INCOME'
                      ? 'text-emerald-600 font-semibold'
                      : 'text-red-500 font-semibold'
                  }
                >
                  {tx.transactionType === 'INCOME' ? '+' : '-'}₹
                  {tx.amount.toLocaleString()}
                </div>
                <div className="text-[11px] text-gray-500">
                  {tx.transactionType.charAt(0) + tx.transactionType.slice(1).toLowerCase()}
                </div>
              </div>
            </div>
          ))}
          {data.recentTransactions.length === 0 && (
            <div className="text-xs text-gray-500">No recent transactions.</div>
          )}
        </div>
      </section>
    </div>
  );
}
