import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section className="py-16 md:py-24 bg-surface" id="experience">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-headline mb-10 sm:mb-16 text-center text-on-surface">
            Milestones &<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-fixed to-secondary"> Training</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">
          <div className="space-y-8 sm:space-y-12">
            <Reveal>
              <h3 className="text-xl sm:text-2xl font-bold font-headline text-primary-fixed mb-6 sm:mb-8 flex items-center gap-2.5 sm:gap-3">
                <span className="material-symbols-outlined icon-interactive">workspace_premium</span>
                Certification & Training
              </h3>
            </Reveal>
            <div className="relative pl-6 sm:pl-8 border-l-2 border-primary/30">
              <div className="timeline-dot absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_rgba(168,85,247,0.9)]" />
              <Reveal delay={120}>
                <div className="glass-card p-4 sm:p-6 rounded-2xl mb-6 border border-purple-500/25 hover:border-purple-500/60 shadow-[0_12px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_18px_40px_rgba(168,85,247,0.3)] hover-lift transition-all duration-300">
                  <span className="inline-block px-2.5 sm:px-3 py-1 rounded bg-purple-500/15 border border-purple-500/40 text-primary-fixed font-label text-xs mb-3 font-semibold">SDET PROGRAM</span>
                  <h4 className="text-base sm:text-lg font-bold font-headline mb-1 text-on-surface">SDET — Software Development Engineer in Testing</h4>
                  <p className="text-xs sm:text-sm text-primary font-medium mb-3">QSpiders, BTM</p>
                  <p className="text-sm sm:text-base text-on-surface-variant font-label">
                    Hands-on training across manual testing, API testing with Postman, and Selenium-based automation frameworks.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="space-y-8 sm:space-y-12">
            <Reveal delay={80}>
              <h3 className="text-xl sm:text-2xl font-bold font-headline text-secondary-fixed mb-6 sm:mb-8 flex items-center gap-2.5 sm:gap-3">
                <span className="material-symbols-outlined icon-interactive">history_edu</span>
                Education History
              </h3>
            </Reveal>
            <div className="relative pl-6 sm:pl-8 border-l-2 border-secondary/30 space-y-6 sm:space-y-10">
              <div className="relative">
                <div className="timeline-dot tertiary absolute -left-[33px] sm:-left-[41px] top-0 w-4 h-4 bg-secondary rounded-full shadow-[0_0_20px_rgba(139,92,246,0.9)]" />
                <Reveal delay={160}>
                  <div className="glass-card p-4 sm:p-6 rounded-2xl border border-purple-500/25 hover:border-purple-500/60 shadow-[0_12px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_18px_40px_rgba(168,85,247,0.3)] hover-lift transition-all duration-300">
                    <span className="inline-block px-2.5 sm:px-3 py-1 rounded bg-purple-500/15 border border-purple-500/40 text-secondary-fixed font-label text-xs mb-3 font-semibold">2021 - 2025</span>
                    <h4 className="text-base sm:text-xl font-bold font-headline mb-1 text-on-surface">Bachelor of Technology, Computer Science & Engineering</h4>
                    <p className="text-xs sm:text-sm text-secondary-fixed font-medium mb-3">Universal Engineering College, Thrissur</p>
                    <div className="text-sm sm:text-base text-on-surface-variant font-label">
                      Graduated with a CGPA of <span className="text-on-surface font-semibold">7.1</span>
                    </div>
                  </div>
                </Reveal>
              </div>
              <div className="relative">
                <div className="timeline-dot secondary absolute -left-[33px] sm:-left-[41px] top-0 w-4 h-4 bg-secondary rounded-full shadow-[0_0_20px_rgba(139,92,246,0.9)]" />
                <Reveal delay={240}>
                  <div className="glass-card p-4 sm:p-6 rounded-2xl border border-purple-500/25 hover:border-purple-500/60 shadow-[0_12px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_18px_40px_rgba(168,85,247,0.3)] hover-lift transition-all duration-300">
                    <span className="inline-block px-2.5 sm:px-3 py-1 rounded bg-purple-500/15 border border-purple-500/40 text-secondary-fixed font-label text-xs mb-3 font-semibold">2019 - 2021</span>
                    <h4 className="text-base sm:text-xl font-bold font-headline mb-1 text-on-surface">Higher Secondary Education</h4>
                    <p className="text-xs sm:text-sm text-secondary-fixed font-medium mb-3">GFVHSS Kaipamangalam, Thrissur</p>
                    <p className="text-sm sm:text-base text-on-surface-variant font-label">
                      Secured <span className="text-on-surface font-semibold">90%</span>.
                    </p>
                  </div>
                </Reveal>
              </div>
              <div className="relative">
                <div className="timeline-dot absolute -left-[33px] sm:-left-[41px] top-0 w-4 h-4 bg-primary-dim rounded-full shadow-[0_0_20px_rgba(168,85,247,0.9)]" />
                <Reveal delay={320}>
                  <div className="glass-card p-4 sm:p-6 rounded-2xl border border-purple-500/25 hover:border-purple-500/60 shadow-[0_12px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_18px_40px_rgba(168,85,247,0.3)] hover-lift transition-all duration-300">
                    <span className="inline-block px-2.5 sm:px-3 py-1 rounded bg-purple-500/15 border border-purple-500/40 text-primary-fixed font-label text-xs mb-3 font-semibold">2019</span>
                    <h4 className="text-base sm:text-xl font-bold font-headline mb-1 text-on-surface">Secondary Education</h4>
                    <p className="text-xs sm:text-sm text-primary font-medium mb-3">OLFGHS Mathilakam, Thrissur</p>
                    <p className="text-sm sm:text-base text-on-surface-variant font-label">
                      Secured <span className="text-on-surface font-semibold">88%</span>.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
