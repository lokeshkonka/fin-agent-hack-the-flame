import { Brain, Zap, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Agentic Intelligence",
    desc: "Multiple AI agents reason, validate, and collaborate before approving any transaction.",
  },
  {
    icon: Zap,
    title: "Real-Time Decisions",
    desc: "Transactions are evaluated and blocked in milliseconds, not after damage occurs.",
  },
  {
    icon: ShieldCheck,
    title: "Explainable Risk",
    desc: "Every decision includes confidence scores and transparent risk reasoning.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-slate-900">
          Why SecureBank AI?
        </h2>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
          Traditional rule-based systems fail. We replace them with
          autonomous intelligence.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f) => (
          <div
            key={f.title}
            className="
              rounded-3xl border border-blue-100 bg-white p-8
              shadow-[0_10px_30px_-15px_rgba(37,99,235,0.25)]
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl
            "
          >
            <f.icon className="text-blue-600 mb-4" size={28} />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {f.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
