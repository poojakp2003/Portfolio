import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";

const BARS = [
  { label: "Manual Testing", pct: 90, pctColor: "text-primary", barColor: "from-primary to-primary-dim" },
  { label: "Automation Testing (Selenium)", pct: 85, pctColor: "text-secondary", barColor: "from-secondary to-secondary-dim" },
  { label: "API Testing (Postman)", pct: 80, pctColor: "text-primary", barColor: "from-primary to-secondary" },
  { label: "SQL", pct: 75, pctColor: "text-secondary", barColor: "from-secondary to-secondary-dim" },
  { label: "Core Java", pct: 75, pctColor: "text-primary", barColor: "from-primary to-primary-dim" },
];

const CARDS = [
  { icon: "terminal", title: "Eclipse IDE", desc: "Java automation workflows", color: "text-primary" },
  { icon: "code", title: "VS Code", desc: "Scripts and test assets", color: "text-secondary" },
  { icon: "send", title: "Postman", desc: "API validation & collections", color: "text-primary" },
  { icon: "task_alt", title: "Jira", desc: "Defect tracking & reporting", color: "text-secondary" },
  { icon: "speed", title: "JMeter", desc: "Performance testing basics", color: "text-primary" },
  { icon: "travel_explore", title: "Selenium WebDriver", desc: "Automated browser testing", color: "text-secondary" },
];

function SkillBar({ b, delay }) {
  const ref = useRef(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFilled(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      <div className="flex justify-between mb-2">
        <span className="font-label text-on-surface">{b.label}</span>
        <span className={`${b.pctColor} font-bold font-label`}>{b.pct}%</span>
      </div>
      <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
        <div
          className={`skill-bar-fill h-full bg-gradient-to-r ${b.barColor} ${filled ? "is-filled" : ""}`}
          style={{ "--pct": `${b.pct}%`, transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="py-16 md:py-24 bg-surface" id="skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <Reveal>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-headline mb-4 sm:mb-8">
                Testing <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-fixed to-secondary">Toolkit</span>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-base sm:text-lg text-on-surface-variant font-label">Combining manual rigor with automation frameworks to catch defects early and ship reliable software.</p>
            </Reveal>
            <div className="mt-6 sm:mt-8 space-y-5 sm:space-y-6">
              {BARS.map((b, i) => (
                <SkillBar key={b.label} b={b} delay={i * 120} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6 mt-8 md:mt-0">
            {CARDS.map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <SpotlightCard className="glass-card p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl group transition-all duration-300 border border-purple-500/25 hover:border-purple-500/60 shadow-[0_12px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_18px_40px_rgba(168,85,247,0.3)] hover-lift">
                  <span className={`material-symbols-outlined ${c.color} text-4xl sm:text-5xl mb-3 sm:mb-4 skill-card-icon`}>{c.icon}</span>
                  <h4 className="font-headline font-bold text-lg sm:text-xl mb-1.5 sm:mb-2 text-on-surface">{c.title}</h4>
                  <p className="text-xs text-on-surface-variant font-label">{c.desc}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
