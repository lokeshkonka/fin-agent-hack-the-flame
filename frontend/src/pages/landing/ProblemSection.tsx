import { AlertTriangle, Clock, Layers } from "lucide-react";

const ProblemSection = () => {
  return (
    <section
      id="problem"
      className="bg-white py-28 border-t border-slate-200"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            The Core Problem
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Banking fraud systems are still built on{" "}
            <span className="relative inline-block font-medium text-slate-900">
              <span className="relative z-10">static rules</span>
              <span className="absolute inset-x-0 bottom-1 h-2 bg-slate-200 rounded-sm -z-10" />
            </span>{" "}
            and{" "}
            <span className="relative inline-block font-medium text-slate-900">
              <span className="relative z-10">delayed reviews</span>
              <span className="absolute inset-x-0 bottom-1 h-2 bg-slate-200 rounded-sm -z-10" />
            </span>
            , making them ineffective against modern fraud.
          </p>
        </div>

        {/* ================= PROBLEM CARDS ================= */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Layers,
              title: "Static Rule Engines",
              desc: "Hard-coded rules fail to adapt to evolving fraud patterns and AI-driven attack vectors.",
              tag: "RULE_BASED",
            },
            {
              icon: Clock,
              title: "Late Fraud Detection",
              desc: "Fraud is detected after transactions settle — when financial damage is already irreversible.",
              tag: "POST_TXN",
            },
            {
              icon: AlertTriangle,
              title: "Operational Overload",
              desc: "High false positives overwhelm compliance teams and erode customer trust.",
              tag: "FALSE_POSITIVE++",
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

                <h3 className="text-lg font-medium text-slate-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-slate-600">
                  {item.desc}
                </p>

                {/* hover underline */}
                <div className="mt-7 h-px w-0 bg-slate-900 transition-all duration-300 group-hover:w-12" />
              </div>
            );
          })}
        </div>

        {/* ================= PUNCHLINE ================= */}
        <div className="mt-20 text-center">
          <p className="text-lg text-slate-700">
            The result is a system that is{" "}
            <span className="relative inline-block font-medium text-slate-900">
              <span className="relative z-10">
                slow, reactive, and fragile
              </span>
              <span className="absolute inset-x-0 bottom-1 h-2 bg-slate-200 rounded-sm -z-10" />
            </span>{" "}
            in a world that demands{" "}
            <span className="font-medium text-slate-900">
              real-time intelligence
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
