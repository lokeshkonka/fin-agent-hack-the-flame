import { useRef } from "react";

const ArchitectureSection = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = ((y - midY) / midY) * -6; // vertical tilt
    const rotateY = ((x - midX) / midX) * 6;  // horizontal tilt

    cardRef.current.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.02)
    `;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    cardRef.current.style.transform = `
      perspective(1200px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  };

  return (
    <section
      id="architecture"
      className="bg-slate-50 border-t border-blue-100"
    >
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-slate-900">
          Technical Architecture
        </h2>

        <p className="mt-4 max-w-3xl mx-auto text-slate-600">
          A real-time, event-driven pipeline combining feature extraction,
          AI inference, explainability, and enforcement layers.
        </p>

        {/* 3D CARD */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="
            mt-14
            rounded-3xl
            border border-blue-100
            bg-white
            p-6
            transition-transform
            duration-200
            ease-out
            shadow-[0_30px_60px_-25px_rgba(37,99,235,0.35)]
            will-change-transform
          "
        >
          <img
            src="/tech-diagram.png"
            alt="SecureBank AI Architecture"
            className="w-full rounded-2xl select-none pointer-events-none"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
