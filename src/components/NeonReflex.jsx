import { useEffect, useRef, useState } from "react";

export default function NeonReflex() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const arenaRef = useRef(null);

  const [gameState, setGameState] = useState("idle"); // "idle" | "playing" | "gameover"
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("neonReflexHighScore") || "0", 10);
  });
  const [timeLeft, setTimeLeft] = useState(30);
  const [lastReaction, setLastReaction] = useState(null);
  const [combo, setCombo] = useState(1);
  const [stats, setStats] = useState({ hits: 0, avgReaction: 0, fastestReaction: 9999 });

  const stateRef = useRef({
    gameState: "idle",
    score: 0,
    highScore: 0,
    timeLeft: 30,
    target: null,
    particles: [],
    floatingTexts: [],
    reactionTimes: [],
    combo: 1,
    lastFrame: 0,
  });

  stateRef.current.highScore = highScore;

  // Start a new game
  const startGame = () => {
    const freshHighScore = parseInt(localStorage.getItem("neonReflexHighScore") || "0", 10);
    setHighScore(freshHighScore);
    setScore(0);
    setTimeLeft(30);
    setLastReaction(null);
    setCombo(1);
    setStats({ hits: 0, avgReaction: 0, fastestReaction: 9999 });
    setGameState("playing");

    stateRef.current = {
      gameState: "playing",
      score: 0,
      highScore: freshHighScore,
      timeLeft: 30,
      target: null,
      particles: [],
      floatingTexts: [],
      reactionTimes: [],
      combo: 1,
      lastFrame: performance.now(),
    };

    spawnTarget();
  };

  const spawnTarget = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.clientWidth || 300;
    const h = canvas.clientHeight || 240;

    const margin = w < 340 ? 22 : w < 380 ? 28 : 42;
    const x = margin + Math.random() * Math.max(10, w - margin * 2);
    const y = margin + Math.random() * Math.max(10, h - margin * 2);

    // Difficulty scaling: as score increases, targets shrink slightly & expire faster
    const currentScore = stateRef.current.score;
    const maxR = w < 340 ? 20 : w < 380 ? 24 : 32;
    const minR = w < 340 ? 14 : w < 380 ? 16 : 20;
    const radius = Math.max(minR, maxR - Math.floor(currentScore / 600) * 2);
    const baseDuration = Math.max(750, 1600 - Math.floor(currentScore / 300) * 70);
    const isBonus = Math.random() < 0.18; // 18% chance of golden bonus target

    stateRef.current.target = {
      x,
      y,
      radius,
      spawnTime: performance.now(),
      duration: isBonus ? baseDuration * 0.85 : baseDuration,
      isBonus,
      phase: 0,
    };
  };

  // Handle hit on target
  const handleHit = (clientX, clientY) => {
    if (stateRef.current.gameState !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const target = stateRef.current.target;
    if (!target) return;

    const dx = x - target.x;
    const dy = y - target.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Hit registration (generous hit area for mobile touch devices)
    const touchPadding = typeof window !== "undefined" && "ontouchstart" in window ? 18 : 12;
    if (dist <= target.radius + touchPadding) {
      const now = performance.now();
      const reactionMs = Math.max(1, Math.round(now - target.spawnTime));

      // Haptic feedback on mobile if available
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(20);
      }

      // Calculate score based on reaction speed and combo
      let basePoints = 100;
      if (reactionMs < 250) basePoints = 350;
      else if (reactionMs < 350) basePoints = 250;
      else if (reactionMs < 500) basePoints = 180;

      if (target.isBonus) basePoints *= 2;

      const currentCombo = stateRef.current.combo;
      const pointsEarned = basePoints * currentCombo;
      const newScore = stateRef.current.score + pointsEarned;
      stateRef.current.score = newScore;
      setScore(newScore);

      // Update reaction times
      stateRef.current.reactionTimes.push(reactionMs);
      const avg = Math.round(
        stateRef.current.reactionTimes.reduce((a, b) => a + b, 0) / stateRef.current.reactionTimes.length
      );
      const fastest = Math.min(...stateRef.current.reactionTimes);

      setLastReaction(reactionMs);
      setStats({
        hits: stateRef.current.reactionTimes.length,
        avgReaction: avg,
        fastestReaction: fastest,
      });

      // Increase combo up to 5x
      const nextCombo = Math.min(5, currentCombo + 1);
      stateRef.current.combo = nextCombo;
      setCombo(nextCombo);

      // Check high score
      if (newScore > stateRef.current.highScore) {
        stateRef.current.highScore = newScore;
        setHighScore(newScore);
        localStorage.setItem("neonReflexHighScore", String(newScore));
      }

      // Trigger hit particles
      const count = target.isBonus ? 24 : 16;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const speed = 2.5 + Math.random() * 4.5;
        stateRef.current.particles.push({
          x: target.x,
          y: target.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 2 + Math.random() * 2.5,
          color: target.isBonus ? "#E879F9" : "#A855F7",
          alpha: 1,
          decay: 0.025 + Math.random() * 0.02,
        });
      }

      // Add floating text
      stateRef.current.floatingTexts.push({
        x: target.x,
        y: target.y - 12,
        text: `+${pointsEarned} (${reactionMs}ms)${nextCombo > 1 ? ` x${nextCombo}` : ""}`,
        color: target.isBonus ? "#E879F9" : "#A855F7",
        alpha: 1,
        vy: -1.2,
      });

      // Small time bonus for bonus target
      if (target.isBonus) {
        stateRef.current.timeLeft = Math.min(30, stateRef.current.timeLeft + 1.5);
      }

      // Spawn next target
      stateRef.current.target = null;
      setTimeout(() => {
        if (stateRef.current.gameState === "playing") {
          spawnTarget();
        }
      }, 60);
    }
  };

  // Main canvas animation and game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      const arena = arenaRef.current;
      const canvas = canvasRef.current;
      if (!arena || !canvas) return;

      const parentW = arena.parentElement ? arena.parentElement.clientWidth : window.innerWidth;
      const rect = arena.getBoundingClientRect();
      const rawW = rect.width > 0 ? rect.width : arena.clientWidth || parentW;
      const w = Math.max(220, Math.min(Math.floor(rawW), parentW, window.innerWidth - 32));
      if (w <= 0) return;

      const h = w < 360 ? 210 : w < 480 ? 240 : 270;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = "100%";
      canvas.style.maxWidth = "100%";
      canvas.style.height = `${h}px`;
      arena.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    let ro = null;
    if (typeof ResizeObserver !== "undefined" && arenaRef.current) {
      ro = new ResizeObserver(() => {
        resize();
      });
      ro.observe(arenaRef.current);
    }

    const render = (now) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // Cyber background grid
      ctx.strokeStyle = "rgba(168, 85, 247, 0.08)";
      ctx.lineWidth = 1;
      const gridSize = 28;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // If active play
      if (stateRef.current.gameState === "playing") {
        const deltaSec = (now - stateRef.current.lastFrame) / 1000;
        stateRef.current.lastFrame = now;

        // Countdown timer
        if (stateRef.current.timeLeft > 0) {
          stateRef.current.timeLeft -= deltaSec;
          setTimeLeft(Math.max(0, Math.ceil(stateRef.current.timeLeft)));
        } else {
          // Time over!
          stateRef.current.gameState = "gameover";
          setGameState("gameover");
          stateRef.current.target = null;
        }

        // Draw and update current target
        const target = stateRef.current.target;
        if (target) {
          const elapsed = now - target.spawnTime;
          const progress = elapsed / target.duration;

          if (progress >= 1) {
            // Target expired without hit
            stateRef.current.combo = 1;
            setCombo(1);

            // Dissipation particles
            for (let i = 0; i < 8; i++) {
              const a = (Math.PI * 2 * i) / 8;
              stateRef.current.particles.push({
                x: target.x,
                y: target.y,
                vx: Math.cos(a) * 1.5,
                vy: Math.sin(a) * 1.5,
                radius: 2,
                color: "#94A3B8",
                alpha: 0.6,
                decay: 0.04,
              });
            }

            stateRef.current.target = null;
            setTimeout(() => {
              if (stateRef.current.gameState === "playing") {
                spawnTarget();
              }
            }, 80);
          } else {
            // Target alive -> Render pulsating cyber target
            target.phase = (target.phase || 0) + 0.05;
            const pulse = Math.sin(target.phase) * 3;
            const currentR = target.radius + pulse;
            const targetColor = target.isBonus ? "#E879F9" : "#A855F7";
            const glowColor = target.isBonus ? "rgba(232, 121, 249, 0.45)" : "rgba(168, 85, 247, 0.45)";

            // Outer timer ring (shrinks down as time expires)
            const remainingRatio = Math.max(0, 1 - progress);
            ctx.beginPath();
            ctx.arc(target.x, target.y, currentR + 8, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * remainingRatio);
            ctx.strokeStyle = targetColor;
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Outer glowing aura
            ctx.beginPath();
            ctx.arc(target.x, target.y, currentR, 0, Math.PI * 2);
            ctx.fillStyle = glowColor;
            ctx.fill();

            // Concentric cyber ring
            ctx.beginPath();
            ctx.arc(target.x, target.y, currentR * 0.65, 0, Math.PI * 2);
            ctx.strokeStyle = "#F1F5F9";
            ctx.lineWidth = 1.8;
            ctx.stroke();

            // Center target core
            ctx.beginPath();
            ctx.arc(target.x, target.y, currentR * 0.28, 0, Math.PI * 2);
            ctx.fillStyle = targetColor;
            ctx.fill();

            // Crosshair micro-lines
            ctx.strokeStyle = "rgba(241, 245, 249, 0.8)";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(target.x - currentR - 3, target.y);
            ctx.lineTo(target.x + currentR + 3, target.y);
            ctx.moveTo(target.x, target.y - currentR - 3);
            ctx.lineTo(target.x, target.y + currentR + 3);
            ctx.stroke();
          }
        }

        // Draw and update particles
        for (let i = stateRef.current.particles.length - 1; i >= 0; i--) {
          const p = stateRef.current.particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.95;
          p.vy *= 0.95;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            stateRef.current.particles.splice(i, 1);
          } else {
            ctx.save();
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }

        // Draw floating score text
        for (let i = stateRef.current.floatingTexts.length - 1; i >= 0; i--) {
          const ft = stateRef.current.floatingTexts[i];
          ft.y += ft.vy;
          ft.alpha -= 0.025;

          if (ft.alpha <= 0) {
            stateRef.current.floatingTexts.splice(i, 1);
          } else {
            ctx.save();
            ctx.globalAlpha = Math.max(0, ft.alpha);
            ctx.fillStyle = ft.color;
            ctx.font = "bold 13px 'Space Grotesk', sans-serif";
            ctx.textAlign = "center";
            ctx.shadowColor = ft.color;
            ctx.shadowBlur = 6;
            ctx.fillText(ft.text, ft.x, ft.y);
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    stateRef.current.lastFrame = performance.now();
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="glass-card p-3 sm:p-5 md:p-8 rounded-2xl sm:rounded-3xl border border-purple-500/20 relative overflow-hidden flex flex-col justify-between select-none shadow-2xl w-full min-w-0 max-w-full"
    >
      {/* Header Info & Stats Bar */}
      <div className="flex items-center justify-between mb-2.5 sm:mb-4 border-b border-purple-500/20 pb-2.5 sm:pb-3 gap-2 w-full min-w-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-500/15 border border-purple-500/35 flex items-center justify-center text-primary game-icon-playful flex-shrink-0">
            <span className="material-symbols-outlined text-base sm:text-xl">speed</span>
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-base font-bold font-headline text-on-surface tracking-wide flex items-center gap-1.5 flex-nowrap">
              <span className="truncate">Neon Reflex</span>
              <span className="text-[9px] sm:text-[10px] uppercase font-label px-1.5 py-0.5 rounded-full bg-purple-500/15 text-primary border border-purple-500/35 whitespace-nowrap">
                Mini Game
              </span>
            </h3>
            <p className="text-[10px] sm:text-xs text-on-surface-variant font-label truncate max-w-[150px] sm:max-w-none">Tap targets at lightning speed</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <div className="text-right">
            <div className="text-[9px] sm:text-[10px] font-label uppercase tracking-widest text-outline">Score</div>
            <div className="text-xs sm:text-lg font-bold font-headline text-primary tabular-nums drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
              {score}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[9px] sm:text-[10px] font-label uppercase tracking-widest text-outline">High</div>
            <div className="text-xs sm:text-lg font-bold font-headline text-secondary tabular-nums drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]">
              {highScore}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic HUD in active play */}
      <div className="flex items-center justify-between px-1 mb-2 sm:mb-3 text-[11px] sm:text-xs font-label gap-1.5 w-full min-w-0">
        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
          <span className="text-outline">Time:</span>
          <span
            className={`font-bold tabular-nums text-xs sm:text-sm ${
              timeLeft <= 5 ? "text-red-400 animate-pulse" : "text-primary"
            }`}
          >
            {timeLeft}s
          </span>
        </div>

        {lastReaction && (
          <div className="flex items-center gap-1 text-on-surface flex-shrink-0">
            <span className="text-outline">Speed:</span>
            <span className="font-bold text-primary tabular-nums">{lastReaction}ms</span>
          </div>
        )}

        <div className="flex items-center gap-1 flex-shrink-0">
          <span className="text-outline">Streak:</span>
          <span
            className={`font-bold px-1.5 py-0.5 rounded-md text-[10px] sm:text-xs ${
              combo > 1 ? "bg-purple-500/20 text-primary border border-purple-500/40" : "text-outline"
            }`}
          >
            {combo}x
          </span>
        </div>
      </div>

      {/* Game Canvas Arena */}
      <div
        ref={arenaRef}
        className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-purple-500/25 bg-[#000000] shadow-inner flex items-center justify-center w-full min-w-0 max-w-full"
        style={{ minHeight: "210px" }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block cursor-crosshair max-w-full"
          style={{ touchAction: "none", width: "100%", maxWidth: "100%" }}
          onClick={(e) => handleHit(e.clientX, e.clientY)}
          onTouchStart={(e) => {
            if (e.touches.length > 0) {
              e.preventDefault();
              const t = e.touches[0];
              handleHit(t.clientX, t.clientY);
            }
          }}
        />

        {/* Start Screen Overlay */}
        {gameState === "idle" && (
          <div className="absolute inset-0 bg-[#000000]/92 backdrop-blur-sm flex flex-col items-center justify-center p-3 sm:p-5 text-center z-10 w-full max-w-full">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-purple-500/15 border border-purple-500/40 flex items-center justify-center text-primary mb-1.5 sm:mb-2.5 shadow-[0_0_18px_rgba(168,85,247,0.4)] flex-shrink-0">
              <span className="material-symbols-outlined text-lg sm:text-2xl">ads_click</span>
            </div>
            <h4 className="text-sm sm:text-lg font-bold font-headline text-on-surface mb-1 px-1">Neon Reflex Challenge</h4>
            <p className="text-[11px] sm:text-xs text-on-surface-variant font-label max-w-[270px] sm:max-w-xs mb-2.5 sm:mb-4 px-2 leading-snug">
              Tap glowing targets before they vanish. Test your reflex speed in milliseconds!
            </p>
            <button
              onClick={startGame}
              className="px-5 py-2 sm:px-7 sm:py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs sm:text-sm font-label shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Start Challenge
            </button>
          </div>
        )}

        {/* Game Over Screen Overlay */}
        {gameState === "gameover" && (
          <div className="absolute inset-0 bg-[#000000]/94 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-5 text-center z-10 w-full max-w-full">
            <span className="material-symbols-outlined text-2xl sm:text-3xl text-primary mb-0.5 drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]">
              military_tech
            </span>
            <h4 className="text-sm sm:text-lg font-bold font-headline text-on-surface mb-0.5">Time's Up!</h4>
            <p className="text-[10px] sm:text-xs text-on-surface-variant font-label mb-2 sm:mb-3">Great reflexes! Here is your breakdown:</p>

            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 w-full max-w-[280px] sm:max-w-xs mb-2.5 sm:mb-4">
              <div className="bg-[#080314] p-1.5 sm:p-2.5 rounded-xl border border-purple-500/20 text-center">
                <div className="text-[8px] sm:text-[10px] text-outline font-label uppercase">Score</div>
                <div className="text-xs sm:text-base font-bold text-primary font-headline">{score}</div>
              </div>
              <div className="bg-[#080314] p-1.5 sm:p-2.5 rounded-xl border border-purple-500/20 text-center">
                <div className="text-[8px] sm:text-[10px] text-outline font-label uppercase">Avg Speed</div>
                <div className="text-xs sm:text-base font-bold text-secondary font-headline">
                  {stats.avgReaction ? `${stats.avgReaction}ms` : "--"}
                </div>
              </div>
              <div className="bg-[#080314] p-1.5 sm:p-2.5 rounded-xl border border-purple-500/20 text-center">
                <div className="text-[8px] sm:text-[10px] text-outline font-label uppercase">Fastest</div>
                <div className="text-xs sm:text-base font-bold text-purple-300 font-headline">
                  {stats.fastestReaction < 9000 ? `${stats.fastestReaction}ms` : "--"}
                </div>
              </div>
            </div>

            <button
              onClick={startGame}
              className="px-5 py-2 sm:px-7 sm:py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs sm:text-sm font-label shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base sm:text-lg">replay</span>
              <span>Play Again</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer Instructions / Tip */}
      <div className="mt-2 sm:mt-3 text-center px-1">
        <p className="text-[10px] sm:text-[11px] text-outline font-label">
          Tip: Hit bonus violet targets for double points and combo boosts
        </p>
      </div>
    </div>
  );
}
