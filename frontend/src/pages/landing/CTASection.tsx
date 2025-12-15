import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
          Experience AI-Driven Fraud Prevention
        </h2>

        {/* Subtext */}
        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600">
          See how autonomous intelligence evaluates risk in real time,
          prevents fraud before execution, and builds customer trust.
        </p>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/auth"
            className="
              group inline-flex items-center gap-3
              rounded-2xl
              border border-slate-300
              bg-slate-900
              px-10 py-4
              text-base font-medium text-white
              shadow-[0_20px_40px_-20px_rgba(0,0,0,0.4)]
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]
              active:scale-[0.98]
            "
          >
            Try Live Demo
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
