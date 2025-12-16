import { LogOut, User } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../integrations/supabase/client";
import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

interface NavItemProps {
  to: string;
  label: string;
}

const Navbar = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  /* ================= FETCH ROLE ================= */

  useEffect(() => {
    const token = localStorage.getItem("sb_access_token");
    if (!token) return;

    const controller = new AbortController();

    fetch(`${BACKEND_URL}/admin/approve`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setIsAdmin(Boolean(data.isAdmin));
      })
      .catch(async (err) => {
        if (err.name === "AbortError") return;

        // Token invalid / expired
        localStorage.removeItem("sb_access_token");
        await supabase.auth.signOut();
        navigate("/auth", { replace: true });
      });

    return () => controller.abort();
  }, [navigate]);

  /* ================= SIGN OUT ================= */

  const handleSignOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
    } finally {
      localStorage.removeItem("sb_access_token");
      navigate("/auth", { replace: true });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-blue-100 bg-linear-to-b from-blue-50/80 to-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-5 grid grid-cols-3 items-center">

        {/* LEFT */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/icon.svg" alt="SecureBank AI logo" className="h-10 w-10" />
          <span className="text-xl font-semibold text-slate-900">
            SecureBank AI
          </span>
        </Link>

        {/* CENTER */}
        <nav className="flex items-center justify-center gap-10">
          <NavItem to="/" label="Home" />
          <NavItem to="/docs" label="Docs" />
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-4 justify-self-end">
          {isAdmin && (
            <Link
              to="/admin/approve"
              className="rounded-xl border border-blue-200 bg-white px-5 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50"
            >
              Admin
            </Link>
          )}

          <Link
            to="/profile"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-200 bg-white"
          >
            <User size={19} />
          </Link>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium"
          >
            <LogOut size={17} />
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
};

/* ================= NAV ITEM ================= */

const NavItem = ({ to, label }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `text-base font-medium transition ${
        isActive
          ? "text-blue-700"
          : "text-slate-600 hover:text-slate-900"
      }`
    }
  >
    {label}
  </NavLink>
);

export default Navbar;
