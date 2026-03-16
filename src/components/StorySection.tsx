"use client";

import { useRef, useEffect, useState } from "react";
import { ShieldCheck, Sparkles, Leaf, Clock, Users, Award, ThumbsUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const storySteps = [
  {
    phase: "about",
    title: "O Nosso Empenho",
    text: "A limpeza pode ser uma tarefa árdua e sabemos que tem muitas opções quando pensa em contratar um serviço de limpeza. Por isso, estamos constantemente a tentar melhorar os nossos já elevados padrões para que nos veja como a melhor empresa do sector.",
    highlights: [
      { icon: Clock, label: "Limpezas diárias, semanais ou mensais" },
      { icon: Users, label: "Equipa fixa e treinada" },
      { icon: Award, label: "Melhor relação qualidade-preço" },
    ],
  },
  {
    phase: "howwework",
    title: "Como Funcionamos",
    text: "Quando o fim de semana finalmente chega, é preferível pôr os pés no chão enquanto um serviço de limpeza faz o trabalho. A nossa especialidade é eliminar o stress de qualquer aspeto da limpeza.",
    highlights: [
      { icon: Clock, label: "Agendamento em 60 segundos — reserve online" },
      { icon: ThumbsUp, label: "Equipa exemplar — verificada e classificada 5 estrelas" },
      { icon: ShieldCheck, label: "Agende tudo online — visitas, notas e serviços extra" },
    ],
  },
  {
    phase: "withus",
    title: "Satisfação Garantida",
    text: "Na Esplêndido, estamos totalmente vinculados e segurados, o que significa que pode ter paz de espírito quando entramos em sua casa. A nossa equipa tem formação profissional e, se ficar insatisfeito, limpamos de novo no dia seguinte.",
    highlights: [
      { icon: Sparkles, label: "Refazemos sem custo adicional" },
      { icon: ShieldCheck, label: "Totalmente vinculados e segurados" },
    ],
  },
  {
    phase: "experience",
    title: "A Nossa Experiência",
    text: "Estamos a dominar a indústria em termos de escala e âmbito, com uma rede extensa e adaptável que oferece resultados excepcionais de forma consistente. Produtos eco-friendly, biodegradáveis e seguros para todos.",
    highlights: [
      { icon: Leaf, label: "Produtos 100% biodegradáveis e seguros" },
      { icon: Award, label: "Rede extensa em Lisboa e Margem Sul" },
    ],
  },
];

// Canvas dust particles
function DustCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const particlesRef = useRef<Array<{
    x: number; y: number; size: number; sx: number; sy: number; o: number; r: number; rs: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    particlesRef.current = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      size: Math.random() * 5 + 2, sx: (Math.random() - 0.5) * 0.3,
      sy: Math.random() * 0.25 + 0.08, o: Math.random() * 0.12 + 0.04,
      r: Math.random() * Math.PI * 2, rs: (Math.random() - 0.5) * 0.015,
    }));

    const animate = () => {
      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      ctx.clearRect(0, 0, cw, ch);
      particlesRef.current.forEach((p) => {
        p.x += p.sx; p.y += p.sy; p.r += p.rs;
        if (p.y > ch) { p.y = -8; p.x = Math.random() * cw; }
        if (p.x < -8) p.x = cw + 8;
        if (p.x > cw + 8) p.x = -8;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = `rgba(139, 115, 85, ${p.o})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(frameRef.current); };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />;
}

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const wipeRef = useRef<HTMLDivElement>(null);
  const squeegeeRef = useRef<HTMLDivElement>(null);
  const dirtyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=350%",
          pin: pinRef.current,
          scrub: 1,
          onUpdate: (self) => setProgress(self.progress),
        },
      });

      // The wipe mask expands from left to right
      if (wipeRef.current) {
        tl.fromTo(wipeRef.current, { width: "0%" }, { width: "100%", ease: "none" }, 0);
      }

      // Squeegee follows the wipe edge
      if (squeegeeRef.current) {
        tl.fromTo(squeegeeRef.current, { left: "0%" }, { left: "100%", ease: "none" }, 0);
      }

      // Dirty layer fades out
      if (dirtyRef.current) {
        tl.to(dirtyRef.current, { opacity: 0, duration: 0.6 }, 0.5);
      }

      // Cards appear sequentially
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        tl.fromTo(
          card,
          { y: 30, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.18, ease: "back.out(1.4)" },
          i * 0.2 + 0.05
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <div ref={pinRef} className="relative min-h-screen overflow-hidden bg-neutral">

        {/* ═══ DIRTY LAYER — behind everything ═══ */}
        <div ref={dirtyRef} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-dark" />
          {/* Stain blobs */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <circle cx="200" cy="200" r="80" fill="#3d2b1a" opacity="0.3" />
            <circle cx="500" cy="400" r="120" fill="#2a1f12" opacity="0.2" />
            <circle cx="900" cy="250" r="70" fill="#3d2b1a" opacity="0.25" />
            <circle cx="700" cy="600" r="100" fill="#2a1f12" opacity="0.2" />
            <circle cx="1050" cy="500" r="90" fill="#2a1f12" opacity="0.15" />
            <ellipse cx="400" cy="300" rx="200" ry="15" fill="#3d2b1a" opacity="0.1" transform="rotate(-3 400 300)" />
          </svg>
          <DustCanvas />
          {/* Ghost text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-heading text-3xl font-bold text-white/8 md:text-5xl lg:text-6xl">
              Antes da Esplêndido...
            </p>
          </div>
        </div>

        {/* ═══ CLEAN LAYER — clipped, grows from left ═══ */}
        <div
          ref={wipeRef}
          className="absolute inset-y-0 left-0 z-10 overflow-hidden"
          style={{ width: "0%" }}
        >
          {/* Clean bg fills the full viewport width (not clipped width) */}
          <div className="h-full bg-neutral" style={{ width: "100vw" }}>
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at 40% 50%, rgba(0,218,255,0.03) 0%, transparent 60%)",
              }}
            />
          </div>
        </div>

        {/* ═══ SQUEEGEE — follows the wipe edge ═══ */}
        <div
          ref={squeegeeRef}
          className="pointer-events-none absolute inset-y-0 z-30"
          style={{ left: "0%" }}
        >
          {/* Glow band */}
          <div className="absolute inset-y-0 -left-12 w-24 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          {/* Bright edge */}
          <div className="absolute inset-y-0 left-0 w-0.5 bg-primary shadow-[0_0_12px_rgba(0,218,255,0.6),0_0_30px_rgba(0,218,255,0.3)]" />
          {/* Water drips */}
          <div className="absolute left-0 top-[12%] h-20 w-px bg-gradient-to-b from-primary/30 to-transparent" />
          <div className="absolute left-0 top-[38%] h-28 w-px bg-gradient-to-b from-primary/25 to-transparent" />
          <div className="absolute left-0 top-[60%] h-16 w-px bg-gradient-to-b from-primary/35 to-transparent" />
          <div className="absolute left-0 top-[80%] h-24 w-px bg-gradient-to-b from-primary/20 to-transparent" />

          {/* Squeegee icon */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute -inset-5 rounded-full bg-primary/15 blur-xl" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary/40 bg-dark shadow-[0_0_30px_rgba(0,218,255,0.4)]">
              <span className="text-xl">🧽</span>
            </div>
          </div>

          {/* Foam bubbles trail */}
          <div className="absolute -left-3 top-[18%] h-2 w-2 rounded-full bg-white/50" />
          <div className="absolute -left-5 top-[25%] h-3 w-3 rounded-full bg-white/35" />
          <div className="absolute -left-2 top-[33%] h-1.5 w-1.5 rounded-full bg-white/45" />
          <div className="absolute -left-6 top-[50%] h-2.5 w-2.5 rounded-full bg-white/25" />
          <div className="absolute -left-3 top-[58%] h-2 w-2 rounded-full bg-white/40" />
          <div className="absolute -left-4 top-[72%] h-3 w-3 rounded-full bg-white/30" />
          <div className="absolute -left-2 top-[85%] h-1.5 w-1.5 rounded-full bg-white/45" />
        </div>

        {/* ═══ CONTENT CARDS — on top of everything ═══ */}
        <div className="relative z-20 mx-auto flex min-h-screen max-w-6xl items-center px-6">
          <div className="grid w-full grid-cols-1 gap-6 py-20 md:grid-cols-2">
            {storySteps.map((step, i) => (
              <div
                key={step.phase}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="rounded-2xl border border-primary/10 bg-white/95 p-7 shadow-lg backdrop-blur-sm"
                style={{ opacity: 0 }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Sparkles size={20} className="text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-dark">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-dark/55">
                  {step.text}
                </p>
                <div className="mt-5 space-y-2.5">
                  {step.highlights.map((h) => {
                    const Icon = h.icon;
                    return (
                      <div key={h.label} className="flex items-center gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/5">
                          <Icon size={14} className="text-primary" />
                        </div>
                        <span className="text-[13px] font-medium text-dark/60">{h.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ PROGRESS BAR ═══ */}
        <div className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-full bg-dark/80 px-5 py-2.5 backdrop-blur-sm">
            <span className="text-xs">🧽</span>
            <div className="h-1 w-28 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-primary transition-all duration-75"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span className="text-xs">✨</span>
          </div>
        </div>

        {/* Scroll hint */}
        {progress < 0.03 && (
          <div className="absolute bottom-20 left-1/2 z-40 -translate-x-1/2 animate-bounce text-center">
            <p className="text-xs font-medium text-white/40">Scroll para limpar</p>
            <span className="text-white/30">↓</span>
          </div>
        )}
      </div>
    </div>
  );
}
