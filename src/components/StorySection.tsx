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

// Animated dust particles on a canvas
function DustCanvas({ opacity }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number; y: number; size: number; speedX: number; speedY: number; opacity: number; rotation: number; rotSpeed: number;
  }>>([]);
  const frameRef = useRef<number>(0);

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

    // Create particles
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    particlesRef.current = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 6 + 2,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.15 + 0.05,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
    }));

    const animate = () => {
      if (!ctx || !canvas) return;
      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      ctx.clearRect(0, 0, cw, ch);

      particlesRef.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.y > ch) { p.y = -10; p.x = Math.random() * cw; }
        if (p.x < -10) p.x = cw + 10;
        if (p.x > cw + 10) p.x = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = `rgba(120, 100, 70, ${p.opacity})`;
        // Draw irregular dust shape
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      style={{ opacity }}
    />
  );
}

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const squeegeeRef = useRef<HTMLDivElement>(null);
  const dirtyBgRef = useRef<HTMLDivElement>(null);
  const cleanBgRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sparklesRef = useRef<(HTMLDivElement | null)[]>([]);

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
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });

      // Squeegee sweeps across
      if (squeegeeRef.current) {
        tl.fromTo(
          squeegeeRef.current,
          { left: "-8%" },
          { left: "108%", ease: "none" },
          0
        );
      }

      // Clean background reveals via clip-path (follows squeegee)
      if (cleanBgRef.current) {
        tl.fromTo(
          cleanBgRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", ease: "none" },
          0
        );
      }

      // Dirty background fades
      if (dirtyBgRef.current) {
        tl.to(dirtyBgRef.current, { opacity: 0, ease: "power1.in", duration: 0.8 }, 0.3);
      }

      // Cards reveal with stagger — each reveals as squeegee passes
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const start = i * 0.2 + 0.05;
        tl.fromTo(
          card,
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.2, ease: "back.out(1.4)" },
          start
        );
      });

      // Sparkle bursts at card positions
      sparklesRef.current.forEach((spark, i) => {
        if (!spark) return;
        const start = i * 0.2 + 0.08;
        tl.fromTo(
          spark,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.1, ease: "back.out(3)" },
          start
        );
        tl.to(spark, { opacity: 0, scale: 1.5, duration: 0.15 }, start + 0.1);
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div ref={pinRef} className="relative min-h-screen overflow-hidden">
        {/* ── Dirty background (before cleaning) ── */}
        <div ref={dirtyBgRef} className="absolute inset-0 z-0">
          {/* Dark, stained look */}
          <div className="absolute inset-0 bg-dark" />
          {/* Stain textures */}
          <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <circle cx="200" cy="200" r="80" fill="#3d2b1a" opacity="0.3" />
            <circle cx="500" cy="400" r="120" fill="#2a1f12" opacity="0.2" />
            <circle cx="900" cy="250" r="70" fill="#3d2b1a" opacity="0.25" />
            <circle cx="700" cy="600" r="100" fill="#2a1f12" opacity="0.2" />
            <circle cx="150" cy="550" r="60" fill="#3d2b1a" opacity="0.15" />
            <circle cx="1050" cy="500" r="90" fill="#2a1f12" opacity="0.2" />
            <ellipse cx="400" cy="300" rx="200" ry="15" fill="#3d2b1a" opacity="0.1" transform="rotate(-3 400 300)" />
            <ellipse cx="800" cy="450" rx="150" ry="10" fill="#2a1f12" opacity="0.12" transform="rotate(5 800 450)" />
          </svg>
          {/* Dust canvas */}
          <DustCanvas opacity={1} />
          {/* Dirty text overlay */}
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            <p className="font-heading text-4xl font-bold text-white/10 md:text-6xl">
              Antes da Esplêndido...
            </p>
          </div>
        </div>

        {/* ── Clean background (after cleaning) ── */}
        <div
          ref={cleanBgRef}
          className="absolute inset-0 z-10 bg-neutral"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          {/* Subtle shine effect */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 30% 50%, rgba(0,218,255,0.04) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* ── Squeegee / Wiper ── */}
        <div
          ref={squeegeeRef}
          className="pointer-events-none absolute top-0 z-40 h-full"
          style={{ left: "-8%" }}
        >
          {/* Wide glow band */}
          <div className="absolute inset-y-0 -left-16 w-32 bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
          {/* Bright edge line */}
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary/60 via-primary to-primary/60 shadow-[0_0_20px_rgba(0,218,255,0.5)]" />
          {/* Water drip effect */}
          <div className="absolute left-0 top-[15%] h-16 w-px bg-gradient-to-b from-primary/40 to-transparent" />
          <div className="absolute left-0 top-[40%] h-24 w-px bg-gradient-to-b from-primary/30 to-transparent" />
          <div className="absolute left-0 top-[65%] h-12 w-px bg-gradient-to-b from-primary/50 to-transparent" />

          {/* Squeegee handle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Outer glow ring */}
            <div className="absolute -inset-4 rounded-full bg-primary/20 blur-xl" />
            {/* Main icon */}
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/40 bg-dark shadow-[0_0_40px_rgba(0,218,255,0.4),inset_0_0_20px_rgba(0,218,255,0.1)]">
              <span className="text-2xl">🧽</span>
            </div>
          </div>

          {/* Foam/bubble trail behind */}
          <div className="absolute -left-3 top-[20%] h-2 w-2 rounded-full bg-white/60" />
          <div className="absolute -left-5 top-[28%] h-3 w-3 rounded-full bg-white/40" />
          <div className="absolute -left-2 top-[35%] h-1.5 w-1.5 rounded-full bg-white/50" />
          <div className="absolute -left-6 top-[55%] h-2.5 w-2.5 rounded-full bg-white/30" />
          <div className="absolute -left-3 top-[62%] h-2 w-2 rounded-full bg-white/50" />
          <div className="absolute -left-4 top-[75%] h-3 w-3 rounded-full bg-white/35" />
          <div className="absolute -left-2 top-[82%] h-1.5 w-1.5 rounded-full bg-white/45" />
        </div>

        {/* ── Content cards (on clean layer) ── */}
        <div className="relative z-30 mx-auto flex min-h-screen max-w-6xl items-center px-6">
          <div className="grid w-full grid-cols-1 gap-6 py-20 md:grid-cols-2">
            {storySteps.map((step, i) => (
              <div key={step.phase} className="relative">
                {/* Sparkle burst */}
                <div
                  ref={(el) => { sparklesRef.current[i] = el; }}
                  className="pointer-events-none absolute -right-2 -top-2 z-50 text-2xl"
                  style={{ opacity: 0 }}
                >
                  ✨
                </div>

                {/* Card */}
                <div
                  ref={(el) => { cardsRef.current[i] = el; }}
                  className="rounded-2xl border border-primary/10 bg-white p-7 shadow-md"
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
              </div>
            ))}
          </div>
        </div>

        {/* ── Progress indicator ── */}
        <div className="absolute bottom-6 left-1/2 z-50 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-full bg-dark/80 px-5 py-2.5 backdrop-blur-sm">
            <span className="text-xs text-white/50">🧽</span>
            <div className="h-1 w-32 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-primary transition-all duration-100"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
            <span className="text-xs text-white/50">✨</span>
          </div>
        </div>

        {/* Scroll hint (only at start) */}
        {scrollProgress < 0.05 && (
          <div className="absolute bottom-20 left-1/2 z-50 -translate-x-1/2 animate-bounce text-center">
            <p className="text-xs font-medium text-white/40">Scroll para limpar</p>
            <span className="text-white/30">↓</span>
          </div>
        )}
      </div>
    </div>
  );
}
