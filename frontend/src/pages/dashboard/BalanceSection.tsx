import { QrCode, Eye, EyeOff, Send, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

interface LastTransaction {
  from: string;
  amount: number;
  date: string;
}

interface BalanceProps {
  balance: number;
  userId: string;
  lastReceived?: LastTransaction;
}

const BalanceSection = ({
  balance,
  userId,
  lastReceived,
}: BalanceProps) => {
  const navigate = useNavigate();

  const [showQR, setShowQR] = useState<boolean>(false);
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const copyUserId = async (): Promise<void> => {
    await navigator.clipboard.writeText(userId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      {/* ================= BALANCE CARD ================= */}
      <div className="relative rounded-3xl border border-slate-200 bg-white p-10 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <h2 className="text-sm font-medium text-slate-600 mb-4">
          Available Balance
        </h2>

        {/* Balance + Eye */}
        <div className="flex items-center gap-3 mb-3">
          <p className="text-5xl font-bold tracking-tight text-slate-900">
            {showBalance
              ? `₹ ${balance.toLocaleString("en-IN")}`
              : "₹ ••••••"}
          </p>

          <button
            type="button"
            onClick={() => setShowBalance((prev) => !prev)}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 transition"
            aria-label="Toggle balance visibility"
          >
            {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <p className="text-sm text-slate-500 mb-6">
          Funds available for transactions after KYC approval
        </p>

        {/* Last Transaction */}
        {lastReceived && (
          <div className="mb-8 rounded-xl bg-blue-50 px-5 py-4 text-sm">
            <p className="text-slate-600">
              Last received from{" "}
              <span className="font-medium text-slate-900">
                {lastReceived.from}
              </span>
            </p>
            <p className="font-semibold text-blue-700 mt-1">
              ₹ {lastReceived.amount.toLocaleString("en-IN")}
              <span className="ml-2 text-xs font-normal text-slate-500">
                · {lastReceived.date}
              </span>
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setShowQR(true)}
            className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
          >
            <QrCode size={18} />
            Receive
          </button>

          <button
            type="button"
            onClick={() => navigate("/send")}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 hover:shadow-md active:scale-[0.98]"
          >
            <Send size={18} />
            Send Money
          </button>
        </div>
      </div>

      {/* ================= QR MODAL ================= */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative w-[380px] rounded-3xl bg-white p-8 shadow-2xl animate-[fadeScale_0.25s_ease-out]">
            <button
              type="button"
              onClick={() => setShowQR(false)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-slate-500 hover:bg-slate-100"
              aria-label="Close"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold text-center mb-1">
              Receive Money
            </h3>

            <p className="text-sm text-center text-slate-500 mb-6">
              Scan QR or copy User ID
            </p>

            {/* REAL QR CODE */}
            <div className="mx-auto mb-6 flex items-center justify-center rounded-2xl bg-white border border-slate-200 p-4">
              <QRCodeSVG
                value={`securebank://pay?userId=${userId}`}
                size={220}
                bgColor="#ffffff"
                fgColor="#2563eb"
                level="H"
                includeMargin
              />
            </div>

            {/* User ID */}
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-5 py-3 text-sm">
              <span className="text-slate-600 truncate">{userId}</span>
              <button
                type="button"
                onClick={copyUserId}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BalanceSection;
