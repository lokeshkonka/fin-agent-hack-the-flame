/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { supabase } from "../../integrations/supabase/client";

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

  const [form, setForm] = useState<ProfileForm>({
    email: "",
    fullName: "",
    phone: "",
  });

  /* ================= TEMP AUTH + FETCH ================= */
  /* ===== REAL IMPLEMENTATION COMMENTED ===== */
  /*
  useEffect(() => {
    const init = async () => {
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/auth", { replace: true });
        return;
      }

      setForm((prev) => ({
        ...prev,
        email: user.email ?? "",
      }));

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, phone")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setForm((prev) => ({
          ...prev,
          fullName: data.full_name ?? "",
          phone: data.phone ?? "",
        }));
      }

      setLoading(false);
    };

    init();
  }, [navigate]);
  */

  /* ================= TEMP DUMMY DATA ================= */

  useEffect(() => {
    // 🔧 TEMP: simulate API delay
    setTimeout(() => {
      setForm({
        email: "lokesh@securebank.ai",
        fullName: "Lokesh Sharma",
        phone: "+91 98765 43210",
      });
      setLoading(false);
    }, 500);
  }, []);

  /* ================= UPDATE PROFILE ================= */
  /* ===== REAL IMPLEMENTATION COMMENTED ===== */
  /*
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("Session expired");
      }

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: form.fullName,
        phone: form.phone,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  };
  */

  /* ================= TEMP SAVE ================= */

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    // 🔧 TEMP: fake save delay
    setTimeout(() => {
      setSaving(false);
      alert("Profile updated (dummy)");
    }, 800);
  };

  /* ================= CHANGE PASSWORD ================= */
  /* ===== REAL IMPLEMENTATION COMMENTED ===== */
  /*
  const handlePasswordReset = async () => {
    try {
      await supabase.auth.resetPasswordForEmail(form.email);
      alert("Password reset email sent");
    } catch {
      alert("Failed to send reset email");
    }
  };
  */

  const handlePasswordReset = () => {
    alert("Password reset email sent (dummy)");
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
        <h1 className="text-2xl font-semibold text-slate-900">
          Profile
        </h1>

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
            className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <div className="border-t pt-6">
          <button
            onClick={handlePasswordReset}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Change password
          </button>
        </div>
      </div>
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
    <label className="block text-sm font-medium mb-2">
      {label}
    </label>
    <input
      value={value}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full rounded-lg border px-4 py-3 disabled:bg-slate-100"
    />
  </div>
);

export default Profile;
