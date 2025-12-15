const Footer = () => {
  return (
    <footer className="mt-14 border-t border-blue-100 bg-blue-50/40">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          {/* LEFT */}
          <div className="text-slate-600">
            <span className="font-medium text-slate-900">
              SecureBank AI
            </span>{" "}
            © 2025. All rights reserved.
          </div>

          {/* CENTER */}
          <div className="flex items-center gap-6 text-slate-500">
            <span className="hover:text-slate-700 transition cursor-default">
              SaaS Banking Platform
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hover:text-slate-700 transition cursor-default">
              AI-Driven Fraud Prevention
            </span>
          </div>

          {/* RIGHT */}
          <div className="text-slate-600">
            Contact{" "}
            <a
              href="mailto:admin@securebank.ai"
              className="font-medium text-blue-600 hover:underline"
            >
              admin@securebank.ai
            </a>
          </div>
        </div>

        {/* SUB FOOTER */}
        <div className="mt-6 text-xs text-slate-400 text-center">
           • Designed for production • Secure by design
        </div>
      </div>
    </footer>
  );
};

export default Footer;
