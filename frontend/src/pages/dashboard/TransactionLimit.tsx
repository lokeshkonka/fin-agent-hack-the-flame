import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

/* ================= TYPES ================= */

interface Props {
  dailyLimit: number;
  dailySpent: number;
  monthlyLimit: number;
  monthlySpent: number;
  dailySpendingData: { day: string; amount: number }[];
}

/* ================= SUB COMPONENT ================= */

const ProgressBar = ({ value }: { value: number }) => (
  <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
    <div
      className="
        h-2.5 rounded-full
        bg-gradient-to-r from-blue-500 to-blue-600
        transition-all duration-700 ease-out
      "
      style={{ width: `${Math.min(100, value)}%` }}
    />
  </div>
);

/* ================= MAIN ================= */

const TransactionLimit = ({
  dailyLimit,
  dailySpent,
  monthlyLimit,
  monthlySpent,
  dailySpendingData,
}: Props) => {
  return (
    <div className="flex flex-col gap-6 min-h-[520px]">
      {/* ================= GRAPH CARD ================= */}
      <div
        className="
          rounded-3xl border border-blue-100 bg-white p-6
          transition-all duration-300 ease-out
          hover:-translate-y-[2px]
          hover:shadow-[0_16px_36px_-14px_rgba(37,99,235,0.25)]
        "
      >
        {/* HEADER */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Spending Trend
          </h2>
          <p className="text-sm text-slate-500">
            Monitor daily spending
          </p>
        </div>

        {/* GRAPH */}
        <div className="h-[200px] rounded-2xl bg-blue-50 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailySpendingData}>
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "#64748b" }}
              />
              <YAxis
                domain={[0, dailyLimit]}
                tick={{ fontSize: 11, fill: "#64748b" }}
              />
              <Tooltip />
              <ReferenceLine
                y={dailyLimit}
                stroke="#94a3b8"
                strokeDasharray="4 4"
              />
              <Line
                dataKey="amount"
                stroke="#2563eb"
                strokeWidth={2.5}
                dot={{ r: 2.5 }}
                activeDot={{ r: 4 }}
                isAnimationActive
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= STATUS / LIMIT CARD ================= */}
      <div
        className="
          rounded-3xl border border-blue-100 bg-white p-6
          transition-all duration-300 ease-out
          hover:-translate-y-[2px]
          hover:shadow-[0_16px_36px_-14px_rgba(37,99,235,0.25)]
        "
      >
        <h3 className="text-base font-semibold text-slate-900 mb-5">
          Transaction Limits
        </h3>

        <div className="space-y-6">
          {/* DAILY */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600">
                Daily Limit
              </span>
              <span className="font-medium text-slate-900">
                ₹ {dailySpent.toLocaleString("en-IN")} / ₹{" "}
                {dailyLimit.toLocaleString("en-IN")}
              </span>
            </div>
            <ProgressBar value={(dailySpent / dailyLimit) * 100} />
          </div>

          {/* MONTHLY */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600">
                Monthly Limit
              </span>
              <span className="font-medium text-slate-900">
                ₹ {monthlySpent.toLocaleString("en-IN")} / ₹{" "}
                {monthlyLimit.toLocaleString("en-IN")}
              </span>
            </div>
            <ProgressBar value={(monthlySpent / monthlyLimit) * 100} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionLimit;
