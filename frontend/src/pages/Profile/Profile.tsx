/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, ArrowLeft } from "lucide-react";
import { supabase } from "../../integrations/supabase/client";

/* ================= CONFIG ================= */

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

/* ================= TYPES ================= */

interface ProfileForm {
  email: string;
  fullName: string;
  phone: string;
}

/* ================= MAIN ================= */

const Profile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSaving, setPasswordSaving] = useState(false);

  const [form, setForm] = useState<ProfileForm>({
    email: "",
    fullName: "",
    phone: "",
  });

  /* ================= FETCH PROFILE ================= */

  useEffect(() => {
    const token = localStorage.getItem("sb_access_token");

    fetch(`${BACKEND_URL}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data: ProfileForm) => {
        setForm({
          email: data.email,
          fullName: data.fullName ?? "",
          phone: data.phone ?? "",
        });
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("sb_access_token");
        navigate("/auth", { replace: true });
      });
  }, [navigate]);

  /* ================= UPDATE PROFILE ================= */

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const token = localStorage.getItem("sb_access_token");

    try {
      const res = await fetch(`${BACKEND_URL}/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.phone,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();
      setForm(updated);
    } catch (err) {
      setError("Profile update failed");
    } finally {
      setSaving(false);
    }
  };

  /* ================= CHANGE PASSWORD ================= */

  const handlePasswordUpdate = async () => {
    setPasswordError(null);

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordSaving(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setPasswordError(error.message);
    } else {
      setShowPasswordModal(false);
      setPassword("");
      setConfirmPassword("");
      alert("Password updated successfully");
    }

    setPasswordSaving(false);
  };

  /* ================= UI ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center px-6 py-12">
      <div className="w-full max-w-xl rounded-3xl bg-white border border-slate-200 shadow-lg p-10 space-y-8">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">
            Profile
          </h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1 text-sm font-medium text-blue-600
                       hover:text-blue-700 transition"
          >
            <ArrowLeft size={16} />
            Home
          </button>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <Field label="Email" value={form.email} disabled />

          <Field
            label="Full Name"
            value={form.fullName}
            onChange={(v) =>
              setForm({ ...form, fullName: v })
            }
          />

          <Field
            label="Phone"
            value={form.phone}
            onChange={(v) =>
              setForm({ ...form, phone: v })
            }
          />

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-blue-600 py-3 text-white font-medium
                       transition-all hover:bg-blue-700 active:scale-[0.98]
                       disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <div className="border-t pt-6">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Change password
          </button>
        </div>
      </div>

      {/* ================= PASSWORD MODAL ================= */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-8
                          shadow-2xl animate-[fadeScale_0.25s_ease-out]">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute right-4 top-4 rounded-full p-2
                         text-slate-500 hover:bg-slate-100"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-semibold mb-6">
              Change Password
            </h3>

            {passwordError && (
              <div className="mb-4 text-sm text-red-600">
                {passwordError}
              </div>
            )}

            <div className="space-y-4">
              <Field
                label="New Password"
                value={password}
                onChange={setPassword}
              />

              <Field
                label="Confirm Password"
                value={confirmPassword}
                onChange={setConfirmPassword}
              />
            </div>

            <button
              onClick={handlePasswordUpdate}
              disabled={passwordSaving}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-white
                         font-medium transition-all hover:bg-blue-700
                         active:scale-[0.98] disabled:opacity-60"
            >
              {passwordSaving ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= FIELD ================= */

const Field = ({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
}) => (
  <div>
    <label className="block text-sm font-medium mb-2 text-slate-700">
      {label}
    </label>
    <input
      value={value}
      disabled={disabled}
      type={label.toLowerCase().includes("password") ? "password" : "text"}
      onChange={(e) => onChange?.(e.target.value)}
      className="
        w-full rounded-xl border border-slate-300 px-4 py-3
        transition-all outline-none
        focus:border-blue-500 focus:ring-4 focus:ring-blue-100
        disabled:bg-slate-100
      "
    />
  </div>
);

export default Profile;
