import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-slate-50">
      {/* ONLY divider under navbar */}
      <div className="h-px w-full bg-slate-300" />

      <div className="max-w-7xl mx-auto px-6 py-28 text-center">
        {/* Badge */}
        <p className="inline-block mb-8 text-sm font-medium text-slate-700 tracking-wide">
          Agentic AI · Real-Time Fraud Prevention
        </p>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-950 leading-tight">
          Autonomous AI for
          <br />
          Secure Digital Banking
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-700 leading-relaxed">
          SecureBank AI uses autonomous agents to analyze behavior,
          transaction velocity, and risk signals — preventing fraud
          instantly before money moves.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex justify-center gap-6">
          <Link
            to="/auth"
            className="
              flex items-center gap-2
              px-8 py-4
              rounded-xl
              bg-slate-900 text-white
              font-medium
              transition
              hover:bg-slate-800
              active:scale-[0.98]
            "
          >
            Launch Demo <ArrowRight size={18} />
          </Link>

          <a
            href="#architecture"
            className="
              px-8 py-4
              rounded-xl
              border border-slate-400
              text-slate-800
              font-medium
              transition
              hover:bg-slate-200
              active:scale-[0.98]
            "
          >
            View Architecture
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
