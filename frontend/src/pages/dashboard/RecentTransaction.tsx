import { X } from "lucide-react";
import { useState } from "react";

/* ================= TYPES ================= */

export interface Tx {
  id: string;
  name: string;
  userId: string;
  amount: number;
  date: string;
}

interface Props {
  transactions: Tx[];
}

/* ================= COMPONENT ================= */

const RecentTransaction = ({ transactions }: Props) => {
  const [selected, setSelected] = useState<Tx | null>(null);

  return (
    <>
      {/* ================= MAIN CARD ================= */}
      <div
        className="rounded-3xl border border-blue-100 bg-white p-8 space-y-6
                   shadow-[0_6px_20px_-10px_rgba(0,0,0,0.25)]
                   transition-all duration-300
                   hover:shadow-[0_16px_40px_-12px_rgba(37,99,235,0.25)]"
      >
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Recent Transactions
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Latest activity on your account
          </p>
        </div>

        {/* List */}
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              No transactions yet
            </div>
          ) : (
            transactions.map((tx) => (
              <button
                key={tx.id}
                type="button"
                onClick={() => setSelected(tx)}
                className="group relative w-full overflow-hidden rounded-2xl
                           border border-slate-200 bg-white px-6 py-5 text-left
                           shadow-sm transition-all duration-300
                           hover:border-blue-300 hover:bg-blue-50/40
                           hover:shadow-md active:scale-[0.985]"
              >
                {/* Left accent */}
                <span
                  className="absolute left-0 top-0 h-full w-1 bg-blue-500
                             opacity-0 transition-opacity duration-300
                             group-hover:opacity-100"
                />

                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="font-medium text-slate-900">
                      {tx.name}
                    </p>
                    <p className="text-xs text-slate-500 font-mono">
                      {tx.userId}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold text-slate-900">
                      ₹ {tx.amount.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-slate-500">
                      {tx.date}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-white p-10
                       shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]
                       animate-[fadeScale_0.25s_ease-out]"
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-5 top-5 rounded-full p-2
                         text-slate-500 transition
                         hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-slate-900">
                Transaction Details
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Detailed breakdown of this transaction
              </p>
            </div>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-2 gap-6">
              <DetailBox label="Name" value={selected.name} />
              <DetailBox
                label="User ID"
                value={selected.userId}
                mono
              />
              <DetailBox
                label="Amount"
                value={`₹ ${selected.amount.toLocaleString("en-IN")}`}
                highlight
              />
              <DetailBox label="Date" value={selected.date} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* ================= SUB COMPONENT ================= */

interface DetailBoxProps {
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
}

const DetailBox = ({
  label,
  value,
  mono,
  highlight,
}: DetailBoxProps) => (
  <div
    className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5
               shadow-sm transition hover:shadow-md hover:bg-slate-100"
  >
    <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
      {label}
    </p>
    <p
      className={`font-semibold ${
        mono ? "font-mono text-sm" : "text-base"
      } ${
        highlight ? "text-blue-600 text-lg" : "text-slate-900"
      }`}
    >
      {value}
    </p>
  </div>
);

export default RecentTransaction;
