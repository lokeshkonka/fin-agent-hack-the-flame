import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useEffect, useState } from "react";

/* ================= TYPES ================= */

interface LimitProps {
  dailyLimit: number;
  dailySpent: number;
  monthlyLimit: number;
  monthlySpent: number;
}

interface GraphPoint {
  time: string;
  spend: number;
}

/* ================= PROGRESS BAR ================= */

const ProgressBar = ({ value }: { value: number }) => {
  const width = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-700 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

/* ================= MAIN ================= */

const TransactionLimit = ({
  dailyLimit,
  dailySpent,
  monthlyLimit,
  monthlySpent,
}: LimitProps) => {
  const [graphData, setGraphData] = useState<GraphPoint[]>([
    { time: "00:01", spend: dailySpent * 0.5 },
    { time: "00:02", spend: dailySpent * 0.6 },
    { time: "00:03", spend: dailySpent * 0.7 },
  ]);

  /* ===== Simulated realtime AI monitoring (1s tick) ===== */
  useEffect(() => {
    const interval = setInterval(() => {
      setGraphData((prev) => {
        const last = prev[prev.length - 1];
        const nextSpend = Math.min(
          dailyLimit,
          last.spend + Math.random() * dailyLimit * 0.03
        );

        const now = new Date().toLocaleTimeString().slice(3, 8);

        return [...prev.slice(-9), { time: now, spend: nextSpend }];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [dailyLimit]);

  return (
    <div className="rounded-3xl border border-blue-100 bg-white p-8 space-y-8 shadow-sm transition hover:shadow-md">
      {/* HEADER */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          AI Transaction Monitoring
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Real-time spend velocity & risk enforcement
        </p>
      </div>

      {/* ================= GRAPH ================= */}
      <div
        style={{ width: "100%", height: 260 }}
        className="rounded-2xl bg-blue-50 p-4"
      >
        <p className="text-sm font-medium text-slate-700 mb-2">
          Live AI Spend Analysis (per second)
        </p>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={graphData}>
            <XAxis dataKey="time" tick={{ fontSize: 11 }} />
            <YAxis
              domain={[0, dailyLimit]}
              tick={{ fontSize: 11 }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 8,
                borderColor: "#c7d2fe",
              }}
            />

            <ReferenceLine
              y={dailyLimit}
              stroke="#94a3b8"
              strokeDasharray="4 4"
            />

            <Line
              type="monotone"
              dataKey="spend"
              stroke="#2563eb"
              strokeWidth={2.5}
              dot={false}
              isAnimationActive
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ================= DAILY LIMIT ================= */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Daily Limit</span>
          <span className="font-medium">
            ₹ {dailySpent.toLocaleString("en-IN")} / ₹{" "}
            {dailyLimit.toLocaleString("en-IN")}
          </span>
        </div>
        <ProgressBar value={(dailySpent / dailyLimit) * 100} />
      </div>

      {/* ================= MONTHLY LIMIT ================= */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Monthly Limit</span>
          <span className="font-medium">
            ₹ {monthlySpent.toLocaleString("en-IN")} / ₹{" "}
            {monthlyLimit.toLocaleString("en-IN")}
          </span>
        </div>
        <ProgressBar value={(monthlySpent / monthlyLimit) * 100} />
      </div>

      <p className="text-xs text-slate-500">
        AI continuously evaluates transaction velocity against user-specific
        limits to prevent fraud in real time.
      </p>
    </div>
  );
};

export default TransactionLimit;
