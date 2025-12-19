import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  AlertTriangle,
  QrCode,
  Send as SendIcon,
  CheckCircle,
} from "lucide-react";
import { Html5QrcodeScanner } from "html5-qrcode";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

/* ================= TYPES ================= */

interface ReceiverInfo {
  userId: string;
  accountId: string;
  name: string;
  balance: number;
  isFrozen: boolean;
}

/* ================= MAIN ================= */

const Send = () => {
  const navigate = useNavigate();

  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);

  const [senderFrozen, setSenderFrozen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [receiverAccountId, setReceiverAccountId] = useState("");
  const [receiver, setReceiver] = useState<ReceiverInfo | null>(null);
  const [amount, setAmount] = useState("");

  const [showQR, setShowQR] = useState(false);

  /* ================= CHECK SENDER FROZEN ================= */

  useEffect(() => {
    const token = localStorage.getItem("sb_access_token");

    if (!token) {
      navigate("/auth", { replace: true });
      return;
    }

    fetch(`${BACKEND_URL}/api/transfer/check-frozen`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data: { status: string }) => {
        if (data.status !== "OK") {
          setSenderFrozen(true);
        }
      })
      .catch(() => {
        setError("Unable to verify account status");
      })
      .finally(() => setChecking(false));
  }, [navigate]);

  /* ================= VALIDATE RECEIVER ================= */

  const validateReceiver = async () => {
    setError(null);
    setReceiver(null);

    if (!receiverAccountId.trim()) {
      setError("Receiver Account ID is required");
      return;
    }

    const token = localStorage.getItem("sb_access_token");
    if (!token) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${BACKEND_URL}/api/transfer/validate-receiver?accountId=${receiverAccountId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) {
        throw new Error("Receiver account not found or frozen");
      }

      const data: ReceiverInfo = await res.json();

      if (data.isFrozen) {
        throw new Error("Receiver account is frozen");
      }

      setReceiver(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Receiver validation failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SEND PAYMENT ================= */

  const sendPayment = async () => {
    setError(null);

    const amt = Number(amount);
    if (!receiver) {
      setError("Validate receiver before sending");
      return;
    }

    if (!amt || amt <= 0) {
      setError("Enter a valid amount");
      return;
    }

    const token = localStorage.getItem("sb_access_token");
    if (!token) return;

    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/transfer/send`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiverAccountId: receiver.accountId,
          amount: amt,
        }),
      });

      const data: { status: string; message: string } = await res.json();

      if (data.status !== "success") {
        // Fraud / insufficient / frozen / service error
        throw new Error(data.message);
      }

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= QR SCANNER ================= */

  useEffect(() => {
    if (!showQR) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      (decodedText: string) => {
        try {
          const url = new URL(decodedText);
          const accountId = url.searchParams.get("accountId");
          if (!accountId) throw new Error();
          setReceiverAccountId(accountId);
          setShowQR(false);
        } catch {
          setError("Invalid QR code");
        }
      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => undefined);
    };
  }, [showQR]);

  /* ================= LOADING ================= */

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
      </div>
    );
  }

  /* ================= FROZEN ================= */

  if (senderFrozen) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full rounded-3xl bg-white p-10 border shadow">
          <div className="text-center space-y-4">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-600" />
            <h2 className="text-xl font-semibold text-red-600">
              Account Frozen
            </h2>
            <p className="text-sm text-slate-600">
              Your account has been frozen due to suspicious activity.
              Please visit your nearest branch.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-blue-600 font-medium"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/dashboard">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Link>
          <Shield className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-semibold">Send Money</h1>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-md mx-auto px-6 py-10">
        <div className="rounded-3xl bg-white border p-8 space-y-6 shadow
                        transition hover:shadow-xl">

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* RECEIVER */}
          <div>
            <label className="text-sm font-medium">Receiver Account ID</label>
            <div className="mt-2 flex gap-2">
              <input
                value={receiverAccountId}
                onChange={(e) => setReceiverAccountId(e.target.value)}
                className="flex-1 rounded-xl border px-4 py-3
                           focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                placeholder="ABC123456"
              />
              <button
                type="button"
                onClick={() => setShowQR(true)}
                className="rounded-xl border px-4 hover:bg-blue-50 transition"
              >
                <QrCode />
              </button>
            </div>
          </div>

          <button
            onClick={validateReceiver}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 text-white
                       font-medium hover:bg-blue-700 transition
                       disabled:opacity-60"
          >
            {loading ? "Checking..." : "Validate Receiver"}
          </button>

          {receiver && (
            <div className="rounded-xl bg-blue-50 p-4 text-sm space-y-1">
              <p className="font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                {receiver.name}
              </p>
              <p className="text-slate-600">
                Balance: ₹ {receiver.balance.toLocaleString("en-IN")}
              </p>
            </div>
          )}

          {/* AMOUNT */}
          <div>
            <label className="text-sm font-medium">Amount</label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-2 w-full rounded-xl border px-4 py-3
                         focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
              placeholder="₹ 0"
            />
          </div>

          <button
            onClick={sendPayment}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 text-white
                       font-medium flex items-center justify-center gap-2
                       hover:bg-blue-700 transition disabled:opacity-60"
          >
            <SendIcon size={18} />
            {loading ? "Processing..." : "Send Money"}
          </button>
        </div>
      </main>

      {/* QR MODAL */}
      {showQR && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-6 w-90">
            <div id="qr-reader" />
            <button
              onClick={() => setShowQR(false)}
              className="mt-4 w-full text-sm text-blue-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Send;
