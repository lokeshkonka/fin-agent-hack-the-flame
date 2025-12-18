import { LogOut, User } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../integrations/supabase/client";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("sb_access_token");
    navigate("/auth", { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-blue-100 bg-linear-to-b from-blue-50/80 to-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-5 grid grid-cols-3 items-center">
        <Link to="/" className="flex items-center gap-3">
          <img src="/icon.svg" alt="SecureBank AI logo" className="h-10 w-10" />
          <span className="text-xl font-semibold text-slate-900">
            SecureBank AI
          </span>
        </Link>

        <nav className="flex items-center justify-center gap-10">
          <NavItem to="/" label="Home" />
          <NavItem to="/docs" label="Docs" />
        </nav>

        <div className="flex items-center gap-4 justify-self-end">
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

const NavItem = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive
        ? "text-blue-700 font-medium"
        : "text-slate-600 hover:text-slate-900"
    }
  >
    {label}
  </NavLink>
);

export default Navbar;
