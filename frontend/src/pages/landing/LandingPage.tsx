import NavbarSection from "./NavbarSection";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import ArchitectureSection from "./ArchitectureSection";
import CTASection from "./CTASection";
import Footer from "../dashboard/Footer";
import ProblemSection from "./ProblemSection";
import SolutionSection from "./SolutionSection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* NAVBAR */}
      <NavbarSection />

      {/* HERO */}
      <main>
        <HeroSection />

        {/* FEATURES */}
        <section className="relative">
          <FeaturesSection />
        </section>
        <section className="relative">
          <ProblemSection />
        </section>
        <section className="relative">
          <SolutionSection />
        </section>

        {/* ARCHITECTURE */}
        <section className="relative bg-slate-50 border-t border-slate-200">
          <ArchitectureSection />
        </section>

        {/* CTA */}
        <section className="relative border-t border-slate-200">
          <CTASection />
        </section>
        <section className="relative border-t border-slate-200">
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
