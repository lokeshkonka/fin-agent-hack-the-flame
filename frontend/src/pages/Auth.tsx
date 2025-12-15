import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";

/* ================= TYPES ================= */

type Tab = "signin" | "signup";
type Step = 1 | 2 | 3;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  pan: string;
  aadhaar: string;
}

/* ================= MAIN ================= */

const Auth = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>("signin");
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [accepted, setAccepted] = useState<boolean>(false);
  const [addressProof, setAddressProof] = useState<File | null>(null);

  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    pan: "",
    aadhaar: "",
  });

  /* ================= MAGIC LINK LISTENER ================= */

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        event === "SIGNED_IN" &&
        session &&
        tab === "signup" &&
        step === 2
      ) {
        setStep(3);
      }
    });

    return () => subscription.unsubscribe();
  }, [step, tab]);

  /* ================= SIGN IN ================= */

  const handleSignIn = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    navigate("/");
  };

  /* ================= SIGN UP STEP 1 ================= */

  const sendMagicLink = async (): Promise<void> => {
    setError(null);

    if (!form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email: form.email,
      options: { shouldCreateUser: true },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setStep(2);
    setLoading(false);
  };

  /* ================= FINAL SUBMIT ================= */

  const submitSignup = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!accepted) {
      setError("You must accept Terms & Privacy Policy");
      return;
    }

    if (!addressProof || addressProof.type !== "application/pdf") {
      setError("Address proof must be a PDF file");
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      email: form.email,
      phone: form.phone,
      address: form.address,
      pan: form.pan,
      aadhaar: form.aadhaar,
      approved: false,
    };

    try {
      const res = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Signup failed");
      }

      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-blue-100 px-6">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-xl border border-slate-200">
        <Header />

        <Tabs
          tab={tab}
          setTab={(t) => {
            setTab(t);
            setStep(1);
          }}
        />

        <div className="px-10 py-8 space-y-6">
          {error && <ErrorBox message={error} />}

          {/* SIGN IN */}
          {tab === "signin" && (
            <form onSubmit={handleSignIn} className="space-y-6">
              <Field
                label="Email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />
              <Field
                label="Password"
                type="password"
                value={form.password}
                onChange={(v) => setForm({ ...form, password: v })}
              />
              <PrimaryButton loading={loading}>
                Sign In
              </PrimaryButton>
            </form>
          )}

          {/* STEP 1 */}
          {tab === "signup" && step === 1 && (
            <div className="space-y-6">
              <Field
                label="Email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />
              <Field
                label="Password"
                type="password"
                value={form.password}
                onChange={(v) => setForm({ ...form, password: v })}
              />
              <Field
                label="Confirm Password"
                type="password"
                value={form.confirmPassword}
                onChange={(v) =>
                  setForm({ ...form, confirmPassword: v })
                }
              />
              <PrimaryButton
                loading={loading}
                onClick={sendMagicLink}
              >
                Continue
              </PrimaryButton>
            </div>
          )}

          {/* STEP 2 */}
          {tab === "signup" && step === 2 && (
            <div className="text-center space-y-4">
              <div className="mx-auto h-10 w-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
              <p className="text-sm text-slate-600">
                Check your email to verify
              </p>
              <p className="font-medium text-slate-900">
                {form.email}
              </p>
            </div>
          )}

          {/* STEP 3 */}
          {tab === "signup" && step === 3 && (
            <form onSubmit={submitSignup} className="space-y-6">
              <Field
                label="Phone"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
              />

              <Textarea
                label="Residential Address"
                value={form.address}
                onChange={(v) => setForm({ ...form, address: v })}
              />

              <div className="grid grid-cols-2 gap-6">
                <Field
                  label="PAN"
                  value={form.pan}
                  onChange={(v) => setForm({ ...form, pan: v })}
                />
                <Field
                  label="Aadhaar"
                  value={form.aadhaar}
                  onChange={(v) =>
                    setForm({ ...form, aadhaar: v })
                  }
                />
              </div>

              {/* FILE UPLOAD */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Address Proof (PDF)
                </label>

                <label className="flex items-center justify-between gap-4 rounded-lg border border-dashed border-slate-300 px-4 py-3 cursor-pointer hover:border-blue-400 transition">
                  <span className="text-sm text-slate-600">
                    {addressProof
                      ? addressProof.name
                      : "Upload Aadhaar / Utility Bill (PDF)"}
                  </span>
                  <span className="text-xs font-medium text-blue-600">
                    Browse
                  </span>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) =>
                      setAddressProof(
                        e.target.files?.[0] ?? null
                      )
                    }
                  />
                </label>
              </div>

              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) =>
                    setAccepted(e.target.checked)
                  }
                />
                I agree to Terms & Privacy Policy
              </label>

              <PrimaryButton loading={loading}>
                Submit for Verification
              </PrimaryButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

/* ================= COMPONENTS ================= */

interface TabsProps {
  tab: Tab;
  setTab: (tab: Tab) => void;
}

const Tabs = ({ tab, setTab }: TabsProps) => (
  <div className="px-8">
    <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1.5 text-sm">
      <TabButton
        active={tab === "signin"}
        onClick={() => setTab("signin")}
      >
        Sign In
      </TabButton>
      <TabButton
        active={tab === "signup"}
        onClick={() => setTab("signup")}
      >
        Sign Up
      </TabButton>
    </div>
  </div>
);

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton = ({
  active,
  onClick,
  children,
}: TabButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-lg py-2.5 font-medium transition ${
      active
        ? "bg-white shadow"
        : "text-slate-600 hover:text-slate-900"
    }`}
  >
    {children}
  </button>
);

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

const Field = ({
  label,
  value,
  onChange,
  type = "text",
}: FieldProps) => (
  <div>
    <label className="block text-sm font-medium mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border px-4 py-3"
    />
  </div>
);

interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const Textarea = ({
  label,
  value,
  onChange,
}: TextareaProps) => (
  <div>
    <label className="block text-sm font-medium mb-2">
      {label}
    </label>
    <textarea
      rows={5}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border px-4 py-3 resize-none"
    />
  </div>
);

interface PrimaryButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
}

const PrimaryButton = ({
  children,
  loading,
  onClick,
}: PrimaryButtonProps) => (
  <button
    type={onClick ? "button" : "submit"}
    onClick={onClick}
    disabled={loading}
    className="w-full rounded-lg bg-blue-600 py-3 px-2 text-white font-medium disabled:opacity-60"
  >
    {loading ? "Processing..." : children}
  </button>
);

const ErrorBox = ({ message }: { message: string }) => (
  <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
    {message}
  </div>
);

const Header = () => (
  <div className="px-10 pt-10 pb-6 text-center">
    <img
      src="/icon.svg"
      className="h-14 w-14 mx-auto mb-4"
      alt="Logo"
    />
    <h1 className="text-3xl font-bold">SecureBank AI</h1>
    <p className="text-sm text-slate-600 mt-2">
      Secure onboarding with KYC verification
    </p>
  </div>
);

export default Auth;
