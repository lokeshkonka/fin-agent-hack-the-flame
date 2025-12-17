/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";


type Tab = "signin" | "signup";
type Step = 1 | 2 | 3;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  pan: string;
  aadhaar: string;
}

interface DocsState {
  aadhaarProof: File | null;
  panProof: File | null;
  addressProof: File | null;
}


const Auth = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>("signin");
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    pan: "",
    aadhaar: "",
  });

  const [docs, setDocs] = useState<DocsState>({
    aadhaarProof: null,
    panProof: null,
    addressProof: null,
  });



  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session && tab === "signup" && step === 2) {
        setStep(3);
      }
    });

    return () => subscription.unsubscribe();
  }, [step, tab]);

const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error || !data.session) throw new Error("Login failed");

      localStorage.setItem("sb_access_token", data.session.access_token);
      navigate("/dashboard", { replace: true });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

const sendMagicLink = async () => {
  setError(null);

  if (!form.name || !form.email || !form.password || !form.confirmPassword) {
    setError("All fields are required");
    return;
  }

  if (form.password !== form.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  setLoading(true);

  try {
    const { error } = await supabase.auth.signInWithOtp({
      email: form.email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/auth`,
      },
    });

    if (error) {
      throw new Error(
        error.message.includes("rate")
          ? "Too many attempts. Try again later."
          : error.message
      );
    }

    setStep(2);
  } catch (err) {
    setError(err instanceof Error ? err.message : "OTP failed");
  } finally {
    setLoading(false);
  }
};
const submitSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!accepted) return setError("Accept terms");
    if (!docs.aadhaarProof || !docs.panProof || !docs.addressProof)
      return setError("All documents required");

    setLoading(true);

    try {
      await supabase.auth.updateUser({ password: form.password });

      const { data } = await supabase.auth.getSession();
      if (!data.session) throw new Error("Session missing");

      const token = data.session.access_token;

      const fd = new FormData();
      fd.append(
        "data",
        new Blob(
          [
            JSON.stringify({
              name: form.name,
              email: form.email,
              phoneNumber: form.phone,
              address: form.address,
              panNumber: form.pan,
              aadharNumber: form.aadhaar,
            }),
          ],
          { type: "application/json" }
        )
      );

      fd.append("aadharPdf", docs.aadhaarProof);
      fd.append("panPdf", docs.panProof);
      fd.append("profilePic", docs.addressProof);

      const res = await fetch(`${BACKEND_URL}/api/auth/complete-signup`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      if (!res.ok) throw new Error(await res.text());

      localStorage.setItem("sb_access_token", token);
      navigate("/dashboard", { replace: true });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

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
              <PrimaryButton loading={loading}>Sign In</PrimaryButton>
            </form>
          )}

          {tab === "signup" && step === 1 && (
            <div className="space-y-6">
              <Field
                label="Full Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />
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
              <PrimaryButton loading={loading} onClick={sendMagicLink}>
                Continue
              </PrimaryButton>
            </div>
          )}

          {tab === "signup" && step === 2 && (
            <div className="text-center space-y-4">
              <div className="mx-auto h-10 w-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
              <p className="text-sm text-slate-600">
                Verify your email to continue
              </p>
              <p className="font-medium">{form.email}</p>
            </div>
          )}

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

              <div className="grid grid-cols-2 gap-4">
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

              <FileInput
                label="Aadhaar PDF"
                onSelect={(f) =>
                  setDocs({ ...docs, aadhaarProof: f })
                }
              />
              <FileInput
                label="PAN PDF"
                onSelect={(f) =>
                  setDocs({ ...docs, panProof: f })
                }
              />
              <FileInput
                label="Address Proof PDF"
                onSelect={(f) =>
                  setDocs({ ...docs, addressProof: f })
                }
              />

              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
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

/* ================= REUSABLE COMPONENTS ================= */

const Header = () => (
  <div className="px-10 pt-10 pb-6 text-center">
    <img src="/icon.svg" className="h-14 w-14 mx-auto mb-4" alt="Logo" />
    <h1 className="text-3xl font-bold">SecureBank AI</h1>
    <p className="text-sm text-slate-600 mt-2">
      Secure onboarding with KYC verification
    </p>
  </div>
);

const Tabs = ({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) => (
  <div className="px-8">
    <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1.5 text-sm">
      <TabButton active={tab === "signin"} onClick={() => setTab("signin")}>
        Sign In
      </TabButton>
      <TabButton active={tab === "signup"} onClick={() => setTab("signup")}>
        Sign Up
      </TabButton>
    </div>
  </div>
);

const TabButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-lg py-2.5 font-medium transition ${
      active ? "bg-white shadow" : "text-slate-600 hover:text-slate-900"
    }`}
  >
    {children}
  </button>
);

const Field = ({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) => (
  <div>
    <label className="block text-sm font-medium mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border px-4 py-3"
    />
  </div>
);

const Textarea = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <label className="block text-sm font-medium mb-2">{label}</label>
    <textarea
      rows={5}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border px-4 py-3 resize-none"
    />
  </div>
);

const FileInput = ({
  label,
  onSelect,
}: {
  label: string;
  onSelect: (f: File) => void;
}) => (
  <label className="flex items-center justify-between gap-4 rounded-lg border border-dashed px-4 py-2 cursor-pointer hover:border-blue-400 transition text-sm">
    <span className="text-slate-600">{label}</span>
    <span className="text-xs font-medium text-blue-600">Browse</span>
    <input
      type="file"
      accept="application/pdf"
      className="hidden"
      onChange={(e) => e.target.files && onSelect(e.target.files[0])}
    />
  </label>
);

const PrimaryButton = ({
  children,
  loading,
  onClick,
}: {
  children: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
}) => (
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

export default Auth;
