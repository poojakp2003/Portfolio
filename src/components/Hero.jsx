import { useEffect, useRef } from "react";

const PHRASES = ["Software Tester", "QA Engineer", "SDET"];

export default function Hero() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const typingRef = useRef(null);

  // Light-cycling mesh canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    const ctx = canvas.getContext("2d");
    let rafId;

    function resizeCanvas() {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const colors = [
      [168, 85, 247],
      [139, 92, 246],
      [192, 132, 252],
      [124, 58, 237],
      [217, 70, 239],
    ];

    const orbs = [
      { xf: 0.18, yf: 0.22, size: 0.55 },
      { xf: 0.82, yf: 0.18, size: 0.45 },
      { xf: 0.75, yf: 0.8, size: 0.5 },
      { xf: 0.22, yf: 0.78, size: 0.4 },
      { xf: 0.5, yf: 0.5, size: 0.32 },
    ];

    const particles = Array.from({ length: 42 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00035,
      vy: (Math.random() - 0.5) * 0.00035,
      r: 0.8 + Math.random() * 1.6,
    }));

    let t = 0;
    function lv(a, b, f) {
      return a + (b - a) * f;
    }

    function drawCanvas() {
      const W = canvas.width,
        H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      t += 0.003;
      const cycleLen = Math.PI * 2;
      const phase = (t % (cycleLen * colors.length)) / cycleLen;
      const fromIdx = Math.floor(phase) % colors.length;
      const toIdx = (fromIdx + 1) % colors.length;
      const raw = phase - Math.floor(phase);
      const smooth = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
      const col = colors[fromIdx].map((v, i) => Math.round(lv(v, colors[toIdx][i], smooth)));

      orbs.forEach((orb, i) => {
        const ox = orb.xf * W + Math.sin(t * 0.38 + i * 1.3) * W * 0.055;
        const oy = orb.yf * H + Math.cos(t * 0.32 + i * 1.1) * H * 0.055;
        const r = Math.min(W, H) * orb.size;
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, r);
        g.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},0.10)`);
        g.addColorStop(0.4, `rgba(${col[0]},${col[1]},${col[2]},0.04)`);
        g.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(ox, oy, r, 0, Math.PI * 2);
        ctx.fill();
      });

      particles.forEach((p) => {
        p.x += p.vx + Math.sin(t + p.y * 8) * 0.00008;
        p.y += p.vy + Math.cos(t + p.x * 8) * 0.00008;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;
      });

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const ax = a.x * W;
        const ay = a.y * H;
        ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},0.45)`;
        ctx.beginPath();
        ctx.arc(ax, ay, a.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = ax - b.x * W;
          const dy = ay - b.y * H;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${0.18 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(b.x * W, b.y * H);
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(drawCanvas);
    }
    drawCanvas();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Typing effect
  useEffect(() => {
    const el = typingRef.current;
    let phraseIndex = 0,
      charIndex = 0,
      isDeleting = false,
      typeSpeed = 100;
    let timer;

    function type() {
      const cur = PHRASES[phraseIndex];
      if (isDeleting) {
        el.textContent = cur.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        el.textContent = cur.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
      }
      if (!isDeleting && charIndex === cur.length) {
        isDeleting = true;
        typeSpeed = 2000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % PHRASES.length;
        typeSpeed = 500;
      }
      timer = setTimeout(type, typeSpeed);
    }
    type();

    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center py-16 sm:py-20 overflow-hidden" id="home">
      <canvas id="hero-canvas" ref={canvasRef} />

      <div className="absolute inset-0 mesh-gradient opacity-35" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-dim rounded-full blur-[170px] opacity-25 animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-tertiary-dim rounded-full blur-[170px] opacity-20 animate-pulse-slow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full relative z-10 text-center">
        <h1
          className="hero-name text-on-surface mb-4 sm:mb-6 leading-none drop-shadow-2xl"
          style={{ fontSize: "clamp(2.2rem, 8.5vw, 8.5rem)" }}
        >
          POOJA
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-fixed to-secondary inline-block filter drop-shadow-[0_0_40px_rgba(168,85,247,0.7)]">
            &nbsp;K&nbsp;P
          </span>
        </h1>

        <div className="hero-enter hero-enter-delay text-xl sm:text-2xl md:text-4xl text-on-surface-variant mb-8 sm:mb-12 min-h-[2.5rem] sm:h-12 flex items-center justify-center">
          <span className="typing-container font-mono text-primary-fixed font-semibold tracking-tight md:tracking-normal drop-shadow-[0_0_15px_rgba(192,132,252,0.6)]" ref={typingRef} id="typing-text">
            Software Tester
          </span>
        </div>

        {/* Action Buttons: Exact Pill Glow style from Mockup 1 & 3 */}
        <div className="hero-enter hero-enter-cta flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 w-full max-w-sm sm:max-w-none mx-auto">
          <a
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-primary via-primary-dim to-secondary text-white font-bold text-sm sm:text-base shadow-[0_0_28px_rgba(168,85,247,0.65)] hover:shadow-[0_0_42px_rgba(168,85,247,0.95)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer btn-shine"
            href="#contact"
          >
            <span>Connect</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </a>
          <a
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#080314]/85 hover:bg-[#0f0522] border border-primary/50 hover:border-primary text-purple-200 hover:text-white font-bold text-sm sm:text-base backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.22)] hover:shadow-[0_0_32px_rgba(168,85,247,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            href="/Pooja_KP_Resume.pdf"
            download="Pooja_KP_Resume.pdf"
          >
            <span className="material-symbols-outlined text-lg">download</span>
            <span>Resume</span>
          </a>
        </div>
      </div>
    </section>
  );
}
