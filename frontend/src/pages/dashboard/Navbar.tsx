import { LogOut, User } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../integrations/supabase/client";

interface NavbarProps {
  isAdmin: boolean;
}

interface NavItemProps {
  to: string;
  label: string;
}

const Navbar = ({ isAdmin }: NavbarProps) => {
  const navigate = useNavigate();

  const handleSignOut = async (): Promise<void> => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-blue-100 bg-linear-to-b from-blue-50/80 to-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-5 grid grid-cols-3 items-center">
        {/* LEFT */}
        <Link
          to="/"
          className="flex items-center gap-3 group justify-self-start"
        >
          <img
            src="/icon.svg"
            alt="SecureBank AI logo"
            className="h-10 w-10 transition-transform group-hover:scale-105"
          />
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            SecureBank AI
          </span>
        </Link>

        {/* CENTER */}
        <nav
          className="flex items-center justify-center gap-10"
          aria-label="Primary navigation"
        >
          <NavItem to="/" label="Home" />
          <NavItem to="/docs" label="Docs" />
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-4 justify-self-end">
          {isAdmin && (
            <Link
              to="/admin"
              className="rounded-xl border border-blue-200 bg-white px-5 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-50 hover:shadow-sm active:scale-[0.97]"
            >
              Admin
            </Link>
          )}

          <Link
            to="/profile"
            aria-label="Profile"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-200 bg-white text-slate-600 transition hover:bg-blue-50 hover:text-slate-900 active:scale-[0.96]"
          >
            <User size={19} />
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm active:scale-[0.96]"
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
    className={({ isActive }: { isActive: boolean }) =>
      `relative text-base font-medium transition ${
        isActive
          ? "text-blue-700"
          : "text-slate-600 hover:text-slate-900"
      }`
    }
  >
    {label}
    <span
      className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-blue-600 opacity-0 transition-opacity"
      aria-hidden="true"
    />
  </NavLink>
);

export default Navbar;
