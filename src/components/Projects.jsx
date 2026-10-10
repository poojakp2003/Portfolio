import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section className="py-16 md:py-24 bg-surface-container-low" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-16 gap-4 sm:gap-6">
          <div>
            <Reveal>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-headline mb-3 sm:mb-4 text-on-surface">
                Testing <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-fixed to-secondary">Projects</span>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-base sm:text-lg text-on-surface-variant font-label">Frameworks and applications built to validate real user flows and keep software trustworthy.</p>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <a
              className="text-primary-fixed font-label text-xs sm:text-sm tracking-widest uppercase hover:underline flex items-center gap-1.5 group w-fit"
              style={{ textDecoration: "none" }}
              href="https://github.com/poojakp2003?tab=repositories"
              target="_blank"
              rel="noreferrer"
            >
              <span>View All Projects</span>
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Reveal delay={80}>
            <div className="glass-card p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl flex flex-col h-full hover-lift border border-purple-500/25 hover:border-purple-500/60 shadow-[0_15px_40px_rgba(0,0,0,0.9)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.3)] transition-all duration-300">
              <span className="material-symbols-outlined text-3xl sm:text-4xl text-primary mb-4 sm:mb-6 project-card-icon">shopping_cart</span>
              <h3 className="text-lg sm:text-xl font-bold font-headline mb-2 sm:mb-3 text-on-surface">Shop Cart — E-Commerce Web Application</h3>
              <p className="text-xs sm:text-sm text-primary-fixed font-label mb-3 sm:mb-4 leading-relaxed font-semibold">Java · Selenium WebDriver · TestNG · Hybrid Framework · Apache POI · POM</p>
              <ul className="text-sm sm:text-base text-on-surface-variant font-label space-y-2 list-disc list-inside mb-6 sm:mb-8">
                <li>Built a hybrid automation framework combining method-driven, modular-driven, and data-driven approaches.</li>
                <li>Automated Login, Product Search, Shopping Cart, Wishlist, and Checkout modules.</li>
                <li>Wrote test scenarios and cases directly from business requirements.</li>
                <li>Implemented data-driven testing using Apache POI.</li>
              </ul>
              <div className="mt-auto flex flex-wrap gap-1.5 sm:gap-2">
                <span className="px-2.5 sm:px-3 py-1 bg-purple-500/15 border border-purple-500/40 rounded-full text-primary-fixed text-xs font-label">Automation</span>
                <span className="px-2.5 sm:px-3 py-1 bg-surface-container-high/80 border border-purple-500/30 rounded-full text-on-surface-variant text-xs font-label">Selenium</span>
                <span className="px-2.5 sm:px-3 py-1 bg-surface-container-high/80 border border-purple-500/30 rounded-full text-on-surface-variant text-xs font-label">TestNG</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div className="glass-card p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl flex flex-col h-full hover-lift border border-purple-500/25 hover:border-purple-500/60 shadow-[0_15px_40px_rgba(0,0,0,0.9)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.3)] transition-all duration-300">
              <span className="material-symbols-outlined text-3xl sm:text-4xl text-secondary mb-4 sm:mb-6 project-card-icon">how_to_vote</span>
              <h3 className="text-lg sm:text-xl font-bold font-headline mb-2 sm:mb-3 text-on-surface">Online Voting System Using Face Recognition</h3>
              <p className="text-xs sm:text-sm text-secondary-fixed font-label mb-3 sm:mb-4 leading-relaxed font-semibold">Face Recognition · Secure Authentication</p>
              <ul className="text-sm sm:text-base text-on-surface-variant font-label space-y-2 list-disc list-inside mb-6 sm:mb-8">
                <li>Designed a secure online voting system using face recognition to prevent multiple voting.</li>
                <li>Addressed key drawbacks of manual voting systems through automated identity verification.</li>
              </ul>
              <div className="mt-auto flex flex-wrap gap-1.5 sm:gap-2">
                <span className="px-2.5 sm:px-3 py-1 bg-purple-500/15 border border-purple-500/40 rounded-full text-secondary-fixed text-xs font-label">Security</span>
                <span className="px-2.5 sm:px-3 py-1 bg-surface-container-high/80 border border-purple-500/30 rounded-full text-on-surface-variant text-xs font-label">Face Recognition</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
