import { Link } from "react-router-dom";
import {
  ArrowLeft,
  AlertTriangle,
  QrCode,
  Send as SendIcon,
  CheckCircle,
  X,
} from "lucide-react";

interface ReceiverInfo {
  userId: string;
  accountId: string;
  name: string;
  isFrozen: boolean;
}

interface Props {
  senderFrozen: boolean;
  receiver: ReceiverInfo | null;
  receiverAccountId: string;
  amount: string;
  loading: boolean;
  error: string | null;
  success: string | null;
  showQR: boolean;

  onAccountChange: (v: string) => void;
  onAmountChange: (v: string) => void;
  onValidate: () => void;
  onSend: () => void;

  onOpenQR: () => void;
  onCloseQR: () => void;
  onCloseError: () => void;
  onCloseSuccess: () => void;
}

const SendUI = ({
  senderFrozen,
  receiver,
  receiverAccountId,
  amount,
  loading,
  error,
  success,
  showQR,
  onAccountChange,
  onAmountChange,
  onValidate,
  onSend,
  onOpenQR,
  onCloseQR,
  onCloseError,
  onCloseSuccess,
}: Props) => {
  if (senderFrozen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md w-full rounded-3xl bg-white border border-slate-200 p-12 text-center space-y-5 shadow-sm">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="text-xl font-semibold text-slate-900">
            Account Frozen
          </h2>
          <p className="text-sm text-slate-600">
            Please visit your nearest branch for verification.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-slate-50 px-6 py-14">
      <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 p-12 space-y-10 shadow-sm">
        {/* HEADER */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900">
            Send Payment
          </h1>
          <p className="text-sm text-slate-500">
            Securely transfer money to another account
          </p>
        </div>

        {/* Receiver */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Receiver Account ID
          </label>

          <div className="flex gap-3">
            <input
              value={receiverAccountId}
              onChange={(e) => onAccountChange(e.target.value)}
              placeholder="ABC123456"
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm
                         focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500
                         transition"
            />

            <button
              type="button"
              onClick={onOpenQR}
              className="rounded-xl border border-slate-300 px-4
                         flex items-center justify-center
                         hover:bg-blue-50 hover:border-blue-300
                         transition active:scale-95"
            >
              <QrCode size={18} className="text-slate-700" />
            </button>
          </div>
        </div>

        <button
          onClick={onValidate}
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white
                     hover:bg-blue-700 transition disabled:opacity-60"
        >
          Verify Receiver
        </button>

        {receiver && (
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-slate-800">
              {receiver.name}
            </span>
          </div>
        )}

        {/* Amount */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Amount
          </label>

          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="₹ 0"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
                       focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500
                       transition"
          />
        </div>

        <button
          onClick={onSend}
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white
                     flex items-center justify-center gap-2
                     hover:bg-blue-700 transition disabled:opacity-60"
        >
          <SendIcon size={18} />
          Send Money
        </button>

        {/* BREADCRUMB */}
        <div className="pt-4 text-xs text-slate-500 flex items-center gap-1">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <span>/</span>
          <Link to="/dashboard" className="hover:text-blue-600 transition">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">
            Send Payment
          </span>
        </div>
      </div>

      {/* ERROR MODAL */}
      {error && (
        <Modal title="Error" message={error} onClose={onCloseError} />
      )}

      {/* SUCCESS MODAL */}
      {success && (
        <Modal
          title="Transaction Successful"
          message={success}
          onClose={onCloseSuccess}
          success
        />
      )}

      {/* QR MODAL */}
      {showQR && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm border border-slate-200 shadow-xl">
            <div id="qr-reader" />
            <button
              onClick={onCloseQR}
              className="mt-6 w-full text-sm font-medium text-blue-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

const Modal = ({
  title,
  message,
  onClose,
  success,
}: {
  title: string;
  message: string;
  onClose: () => void;
  success?: boolean;
}) => (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
    <div
      className={`bg-white rounded-3xl p-10 w-full max-w-sm border shadow-xl
                  animate-[scaleFade_0.2s_ease-out]
                  ${success ? "border-blue-300" : "border-red-300"}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-lg font-semibold ${
            success ? "text-blue-600" : "text-red-600"
          }`}
        >
          {title}
        </h3>
        <button onClick={onClose}>
          <X size={18} />
        </button>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">
        {message}
      </p>
    </div>
  </div>
);

export default SendUI;
