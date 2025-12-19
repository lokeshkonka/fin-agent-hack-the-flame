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
        <div className="rounded-3xl bg-white p-10 border shadow text-center space-y-4">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-600" />
          <h2 className="text-xl font-semibold text-red-600">
            Account Frozen
          </h2>
          <p className="text-sm text-slate-600">
            Visit your nearest branch for verification.
          </p>
          <Link to="/dashboard" className="text-blue-600 font-medium">
            <ArrowLeft size={16} className="inline" /> Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-md mx-auto bg-white rounded-3xl border p-8 space-y-6
                      transition hover:shadow-xl">

        {/* Receiver */}
        <div>
          <label className="text-sm font-medium">Receiver Account ID</label>
          <div className="mt-2 flex gap-2">
            <input
              value={receiverAccountId}
              onChange={(e) => onAccountChange(e.target.value)}
              className="flex-1 rounded-xl border px-4 py-3
                         focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
              placeholder="ABC123456"
            />
            <button
              type="button"
              onClick={onOpenQR}
              className="rounded-xl border px-4 hover:bg-blue-50 transition"
            >
              <QrCode />
            </button>
          </div>
        </div>

        <button
          onClick={onValidate}
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 text-white
                     font-medium hover:bg-blue-700 transition disabled:opacity-60"
        >
          Verify Receiver
        </button>

        {receiver && (
          <div className="rounded-xl bg-blue-50 p-4 text-sm flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <span className="font-medium">{receiver.name}</span>
          </div>
        )}

        {/* Amount */}
        <div>
          <label className="text-sm font-medium">Amount</label>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            className="mt-2 w-full rounded-xl border px-4 py-3
                       focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
            placeholder="₹ 0"
          />
        </div>

        <button
          onClick={onSend}
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 text-white
                     font-medium flex justify-center gap-2
                     hover:bg-blue-700 transition disabled:opacity-60"
        >
          <SendIcon size={18} />
          Send Money
        </button>
      </div>

      {/* ERROR MODAL */}
      {error && (
        <Modal title="Error" message={error} onClose={onCloseError} />
      )}

      {/* SUCCESS MODAL */}
      {success && (
        <Modal title="Success" message={success} onClose={onCloseSuccess} success />
      )}

      {/* QR MODAL */}
      {showQR && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-6 w-90">
            <div id="qr-reader" />
            <button
              onClick={onCloseQR}
              className="mt-4 w-full text-sm text-blue-600 hover:underline"
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
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    <div className={`bg-white rounded-3xl p-8 max-w-sm w-full border
                    ${success ? "border-blue-300" : "border-red-300"}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-semibold ${success ? "text-blue-600" : "text-red-600"}`}>
          {title}
        </h3>
        <button onClick={onClose}>
          <X size={18} />
        </button>
      </div>
      <p className="text-sm text-slate-600">{message}</p>
    </div>
  </div>
);

export default SendUI;
