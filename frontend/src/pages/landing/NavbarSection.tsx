import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const NavbarSection = () => {
  return (
    <header className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img src="/icon.svg" alt="SecureBank AI" className="h-7 w-7" />
          <span className="text-lg font-semibold text-slate-950">
            
                      <a
            href="/"
            className="hover:text-slate-900 transition"
          >
            SecureBank AI
          </a>
          </span>
        </div>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-10 text-sm text-slate-700">
          <a
            href="/#problem"
            className="hover:text-slate-900 transition"
          >
            Problem
          </a>

          <a
            href="/#solution"
            className="hover:text-slate-900 transition"
          >
            Solution
          </a>

          <a
            href="/#architecture"
            className="hover:text-slate-900 transition"
          >
            Architecture
          </a>
        </nav>

        {/* DOCS */}
        <Link
          to="/docs"
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-lg
            border border-slate-400
            text-sm font-medium
            text-slate-800
            transition
            hover:bg-slate-200
          "
        >
          <BookOpen size={16} />
          View Docs
        </Link>
      </div>

      {/* divider */}
      <div className="h-px w-full bg-slate-300" />
    </header>
  );
};

export default NavbarSection;
