import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import Navbar from "../dashboard/Navbar";
import Footer from "../dashboard/Footer";
import SendUI from "./SendUI";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

 interface ReceiverInfo {
  userId: string;
  accountId: string;
  name: string;
  isFrozen: boolean;
}

const Send = () => {
  const navigate = useNavigate();

  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);

  const [senderFrozen, setSenderFrozen] = useState(false);
  const [receiverAccountId, setReceiverAccountId] = useState("");
  const [receiver, setReceiver] = useState<ReceiverInfo | null>(null);
  const [amount, setAmount] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [showQR, setShowQR] = useState(false);

  /* ================= CHECK SENDER ================= */

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
        if (data.status !== "OK") setSenderFrozen(true);
      })
      .catch(() => setError("Unable to verify account"))
      .finally(() => setChecking(false));
  }, [navigate]);

  /* ================= VALIDATE RECEIVER ================= */

  const validateReceiver = async () => {
    setError(null);
    setReceiver(null);

    if (!receiverAccountId.trim()) {
      setError("Receiver Account ID required");
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

      if (!res.ok) throw new Error("Invalid or frozen receiver");

      const data: ReceiverInfo = await res.json();
      if (data.isFrozen) throw new Error("Receiver account frozen");

      setReceiver(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Validation failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SEND MONEY ================= */

  const sendMoney = async () => {
    setError(null);

    if (!receiver) {
      setError("Verify receiver first");
      return;
    }

    const amt = Number(amount);
    if (!amt || amt <= 0) {
      setError("Enter valid amount");
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

      if (data.status !== "success") throw new Error(data.message);

      setSuccess("Transaction completed successfully");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= QR ================= */

  useEffect(() => {
    if (!showQR) return;

    const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 }, false);

    scanner.render(
      (text: string) => {
        try {
          const url = new URL(text);
          const id = url.searchParams.get("accountId");
          if (!id) throw new Error();
          setReceiverAccountId(id);
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

  if (checking) return null;

  return (
    <>
      <Navbar />
      <SendUI
        senderFrozen={senderFrozen}
        receiver={receiver}
        receiverAccountId={receiverAccountId}
        amount={amount}
        loading={loading}
        error={error}
        success={success}
        showQR={showQR}
        onAccountChange={setReceiverAccountId}
        onAmountChange={setAmount}
        onValidate={validateReceiver}
        onSend={sendMoney}
        onCloseQR={() => setShowQR(false)}
        onOpenQR={() => setShowQR(true)}
        onCloseError={() => setError(null)}
        onCloseSuccess={() => {
          setSuccess(null);
          navigate("/dashboard", { replace: true });
        }}
      />
      <Footer />
    </>
  );
};

export default Send;
