import { Brain, Zap, ShieldCheck } from "lucide-react";

const SolutionSection = () => {
  return (
    <section
      id="solution"
      className="bg-white py-28 border-t border-slate-200"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            The SecureBank AI Solution
          </h2>

          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            An <span className="font-medium text-slate-900">agentic intelligence layer</span>{" "}
            that evaluates risk, explains decisions, and enforces fraud prevention{" "}
            <span className="font-medium text-slate-900">
              before execution
            </span>.
          </p>
        </div>

        {/* ================= SOLUTION CARDS ================= */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Brain,
              title: "Agentic AI Decisioning",
              desc: "Autonomous agents reason over behavior, device signals, transaction context, and velocity to detect fraud patterns.",
              tag: "AGENT_REASONING",
            },
            {
              icon: Zap,
              title: "Real-Time Enforcement",
              desc: "Transactions are approved, flagged, or frozen instantly — before funds leave the banking system.",
              tag: "SUB_100MS",
            },
            {
              icon: ShieldCheck,
              title: "Explainable Risk Scoring",
              desc: "Every decision includes confidence scores and contributing risk factors for audits and transparency.",
              tag: "XAI_READY",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  group relative rounded-3xl border border-slate-200
                  bg-white p-8
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.35)]
                "
              >
                {/* index + tag */}
                <div className="absolute -top-4 left-6 flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400">
                    0{index + 1}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    [{item.tag}]
                  </span>
                </div>

                {/* icon */}
                <div
                  className="
                    mb-6 inline-flex h-12 w-12 items-center justify-center
                    rounded-2xl border border-slate-200
                    text-slate-900
                    transition-all duration-300
                    group-hover:scale-105
                    group-hover:border-slate-300
                  "
                >
                  <Icon size={22} />
                </div>

                {/* content */}
                <h3 className="text-lg font-medium text-slate-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-slate-600">
                  {item.desc}
                </p>

                {/* hover accent */}
                <div className="mt-7 h-px w-0 bg-slate-900 transition-all duration-300 group-hover:w-12" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
