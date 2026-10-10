import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const STATS = [
  { icon: "verified", text: "SDET", label: "Certification", color: "text-primary" },
  { icon: "auto_awesome", value: 3, suffix: "+", label: "Projects", color: "text-secondary" },
  { icon: "school", value: 7.1, suffix: "", label: "CGPA", color: "text-secondary", decimals: 1 },
  { icon: "bug_report", value: 90, suffix: "%", label: "HSE Score", color: "text-primary-dim" },
];

function StatCard({ s, delay }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(s.text ? s.text : s.decimals ? "0.0" : "0");

  useEffect(() => {
    const el = ref.current;
    if (!el || s.text) return;
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1100;
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          const current = s.value * eased;
          setDisplay(s.decimals ? current.toFixed(s.decimals) : String(Math.round(current)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [s.value, s.decimals, s.text]);

  return (
    <Reveal delay={delay}>
      <div
        ref={ref}
        className="stat-card glass-card p-4 sm:p-6 rounded-2xl flex flex-col items-center justify-center text-center hover-lift group border border-purple-500/25 hover:border-purple-500/60 shadow-[0_10px_30px_rgba(0,0,0,0.85)] hover:shadow-[0_15px_35px_rgba(168,85,247,0.3)] transition-all duration-300"
        style={{ animationDelay: `${delay}ms` }}
      >
        <span className={`material-symbols-outlined icon-interactive ${s.color} text-3xl sm:text-4xl mb-1.5 sm:mb-2 group-hover:scale-125 transition-transform duration-300`}>
          {s.icon}
        </span>
        <span className="text-xl sm:text-2xl font-bold font-headline text-on-surface">
          {display}
          {s.suffix}
        </span>
        <span className="text-[11px] sm:text-xs font-label uppercase text-outline">{s.label}</span>
      </div>
    </Reveal>
  );
}

export default function About() {
  return (
    <section className="py-16 md:py-24 bg-surface-container-low" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-end">
          <div className="md:col-span-3">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-headline mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
                <span className="w-8 sm:w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
                Testing With <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-fixed to-secondary">Precision</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="glass-card p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl relative overflow-hidden hover-lift border border-purple-500/25 hover:border-purple-500/60 shadow-[0_15px_40px_rgba(0,0,0,0.9)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.25)]">
                <p className="text-base sm:text-xl text-on-surface-variant font-label leading-relaxed">
                  I'm an aspiring <span className="text-on-surface font-semibold">Software Tester</span> focused on delivering reliable software through disciplined{" "}
                  <span className="text-primary-fixed font-semibold">manual</span> and{" "}
                  <span className="text-primary font-semibold">automation testing</span>. My work spans{" "}
                  <span className="text-primary-fixed font-semibold">test case design</span>,{" "}
                  <span className="text-primary font-semibold">API validation</span>, and building automation frameworks that catch issues before users ever see them.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="now-grid">
                <div className="now-cell">
                  <span className="now-k">Now</span>
                  SDET Training · QSpiders, BTM
                </div>
                <div className="now-cell">
                  <span className="now-k">Based</span>
                  Bengaluru, Karnataka
                </div>
                <div className="now-cell">
                  <span className="now-k">Focus</span>
                  Selenium · Postman · SQL
                </div>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-3 sm:gap-4">
            {STATS.map((s, i) => (
              <StatCard key={s.label} s={s} delay={i * 90} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
