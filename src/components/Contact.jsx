import { useState } from "react";
import NeonReflex from "./NeonReflex";
import Reveal from "./Reveal";

function copyText(value, label) {
  navigator.clipboard?.writeText(value);
  window.dispatchEvent(new CustomEvent("portfolio-toast", { detail: `${label} copied` }));
}

export default function Contact() {
  const [copied, setCopied] = useState("");

  function copy(value, label) {
    copyText(value, label);
    setCopied(label);
    setTimeout(() => setCopied(""), 1600);
  }

  return (
    <section className="pt-16 pb-24 sm:pt-24 sm:pb-24 md:py-24 bg-surface-container-low relative overflow-hidden scroll-mt-20 sm:scroll-mt-24 w-full" id="contact">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] md:w-[600px] h-[280px] sm:h-[500px] md:h-[600px] bg-primary/10 rounded-full blur-[110px] pointer-events-none animate-pulse-slow max-w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 w-full min-w-0 max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 items-start md:items-center w-full min-w-0 max-w-full">
          <div className="w-full min-w-0 max-w-full">
            <Reveal className="w-full min-w-0">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-headline mb-2 sm:mb-4 text-on-surface">
                Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-fixed to-secondary">Connect</span>
              </h2>
            </Reveal>
            <Reveal delay={80} className="w-full min-w-0">
              <p className="text-sm sm:text-base md:text-lg text-on-surface-variant font-label break-words leading-relaxed max-w-xl">
                Open to Software Testing roles — my inbox is always open.
              </p>
            </Reveal>
            <div className="mt-5 sm:mt-8 space-y-3 sm:space-y-4 w-full min-w-0">
              <Reveal delay={140} className="w-full min-w-0">
                <div className="flex items-center gap-3 sm:gap-4 group w-full min-w-0 p-3 sm:p-3.5 rounded-xl bg-surface-container-lowest/60 sm:bg-transparent border border-purple-500/25 sm:border-none">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl glass-card flex items-center justify-center text-primary border border-purple-500/30 group-hover:border-purple-500/60 group-hover:shadow-[0_0_22px_rgba(168,85,247,0.5)] transition-all duration-300 flex-shrink-0">
                    <span className="material-symbols-outlined icon-bounce-hover text-lg sm:text-2xl">mail</span>
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden pr-1">
                    <p className="text-[10px] sm:text-xs font-label text-outline uppercase tracking-widest">Email</p>
                    <p className="text-xs sm:text-base text-on-surface-variant font-label truncate">
                      <a href="mailto:poojaprakasan00@gmail.com" className="hover:text-primary-fixed transition-colors">
                        poojaprakasan00@gmail.com
                      </a>
                    </p>
                  </div>
                  <button className="copy-btn flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10" onClick={() => copy("poojaprakasan00@gmail.com", "Email")} aria-label="Copy email">
                    <span className="material-symbols-outlined text-base sm:text-lg">{copied === "Email" ? "check" : "content_copy"}</span>
                  </button>
                </div>
              </Reveal>
              <Reveal delay={220} className="w-full min-w-0">
                <div className="flex items-center gap-3 sm:gap-4 group w-full min-w-0 p-3 sm:p-3.5 rounded-xl bg-surface-container-lowest/60 sm:bg-transparent border border-purple-500/25 sm:border-none">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl glass-card flex items-center justify-center text-secondary border border-purple-500/30 group-hover:border-purple-500/60 group-hover:shadow-[0_0_22px_rgba(139,92,246,0.5)] transition-all duration-300 flex-shrink-0">
                    <span className="material-symbols-outlined icon-bounce-hover text-secondary text-lg sm:text-2xl">call</span>
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden pr-1">
                    <p className="text-[10px] sm:text-xs font-label text-outline uppercase tracking-widest">Phone</p>
                    <p className="text-xs sm:text-base text-on-surface-variant font-label truncate">
                      <a href="tel:+919037238826" className="hover:text-secondary-fixed transition-colors">
                        +91 90372 38826
                      </a>
                    </p>
                  </div>
                  <button className="copy-btn flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10" onClick={() => copy("+919037238826", "Phone")} aria-label="Copy phone">
                    <span className="material-symbols-outlined text-base sm:text-lg">{copied === "Phone" ? "check" : "content_copy"}</span>
                  </button>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={160} className="w-full min-w-0 max-w-full">
            <NeonReflex />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
