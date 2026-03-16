"use client";

import { useRef, useEffect } from "react";
import { ShieldCheck, Sparkles, Leaf, Clock, Users, Award, ThumbsUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const storySteps = [
  {
    phase: "about",
    title: "Sobre a Esplêndido",
    text: "Estamos constantemente a tentar melhorar os nossos já elevados padrões para que nos veja como a melhor empresa do sector.",
    highlights: [
      { icon: Clock, label: "Limpezas diárias, semanais ou mensais" },
      { icon: Users, label: "Equipa fixa e treinada" },
      { icon: Award, label: "Melhor relação qualidade-preço" },
    ],
  },
  {
    phase: "quality",
    title: "Qualidade Superior",
    text: "Utilizamos ferramentas e equipamentos da mais alta qualidade para retirar todo o pó e sujidade das suas instalações.",
    highlights: [
      { icon: ThumbsUp, label: "Formação profissional contínua" },
      { icon: ShieldCheck, label: "Totalmente vinculados e segurados" },
    ],
  },
  {
    phase: "guarantee",
    title: "Garantia de Satisfação",
    text: "Se o serviço não for aprovado, este será refeito sem custo adicional. A sua satisfação é a nossa prioridade absoluta.",
    highlights: [
      { icon: Sparkles, label: "Refazemos sem custo adicional" },
    ],
  },
  {
    phase: "eco",
    title: "Produtos Eco-Friendly",
    text: "Utilizamos produtos biodegradáveis que não prejudicam o ambiente, os animais de estimação ou os seres humanos.",
    highlights: [
      { icon: Leaf, label: "100% biodegradáveis e seguros" },
    ],
  },
];

// Dust particles SVG pattern
function DustOverlay({ progress }: { progress: number }) {
  const opacity = Math.max(0, 1 - progress * 1.5);
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-100"
      style={{ opacity }}
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          opacity: 0.08,
          mixBlendMode: "multiply" as const,
        }}
      />
      {/* Dirty spots */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <circle cx="150" cy="200" r="40" fill="#8B7355" opacity="0.06" />
        <circle cx="400" cy="150" r="25" fill="#6B5B45" opacity="0.05" />
        <circle cx="700" cy="300" r="55" fill="#8B7355" opacity="0.04" />
        <circle cx="900" cy="180" r="30" fill="#6B5B45" opacity="0.06" />
        <circle cx="300" cy="500" r="35" fill="#8B7355" opacity="0.05" />
        <circle cx="1000" cy="450" r="45" fill="#6B5B45" opacity="0.04" />
        <circle cx="550" cy="600" r="28" fill="#8B7355" opacity="0.05" />
        <circle cx="200" cy="700" r="50" fill="#6B5B45" opacity="0.03" />
        <circle cx="850" cy="650" r="38" fill="#8B7355" opacity="0.05" />
        {/* Smudge streaks */}
        <ellipse cx="600" cy="400" rx="120" ry="8" fill="#8B7355" opacity="0.03" transform="rotate(-5 600 400)" />
        <ellipse cx="350" cy="350" rx="80" ry="5" fill="#6B5B45" opacity="0.04" transform="rotate(8 350 350)" />
      </svg>
      {/* Warm dirty tint */}
      <div className="absolute inset-0 bg-amber-900/[0.03]" />
    </div>
  );
}

// Broom/Squeegee element
function Squeegee({ x }: { x: number }) {
  return (
    <div
      className="pointer-events-none absolute top-0 z-30 h-full w-1"
      style={{ left: `${x}%`, transform: "translateX(-50%)" }}
    >
      {/* Wipe line glow */}
      <div className="absolute inset-y-0 -left-4 w-8 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      {/* Main line */}
      <div className="absolute inset-y-0 w-0.5 bg-primary/50" />
      {/* Squeegee handle */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-[0_0_30px_rgba(0,218,255,0.4)]">
          <span className="text-2xl">🧹</span>
        </div>
      </div>
      {/* Clean sparkles trail */}
      <div className="absolute -left-8 top-[30%] text-primary/60">✨</div>
      <div className="absolute -left-12 top-[50%] text-primary/40">✨</div>
      <div className="absolute -left-6 top-[70%] text-primary/50">✨</div>
    </div>
  );
}

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const squeegeeRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      // Main scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: pinRef.current,
          scrub: 0.8,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
        },
      });

      // Squeegee moves from left to right
      if (squeegeeRef.current) {
        tl.fromTo(
          squeegeeRef.current,
          { left: "-5%" },
          { left: "105%", ease: "none" },
          0
        );
      }

      // Dust fades out as squeegee passes
      if (dustRef.current) {
        tl.to(
          dustRef.current,
          { opacity: 0, ease: "power1.out" },
          0
        );
      }

      // Cards reveal sequentially with clip-path
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const start = i * 0.22;
        tl.fromTo(
          card,
          {
            clipPath: "inset(0 100% 0 0)",
            opacity: 0.3,
          },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 0.25,
            ease: "power2.out",
          },
          start
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div ref={pinRef} className="relative min-h-screen overflow-hidden bg-neutral">
        {/* Dust overlay */}
        <div ref={dustRef}>
          <DustOverlay progress={0} />
        </div>

        {/* Squeegee */}
        <div
          ref={squeegeeRef}
          className="pointer-events-none absolute top-0 z-30 h-full"
          style={{ left: "-5%" }}
        >
          <div className="relative h-full">
            {/* Wipe line glow */}
            <div className="absolute inset-y-0 -left-6 w-12 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            {/* Main line */}
            <div className="absolute inset-y-0 left-0 w-px bg-primary/40" />
            {/* Squeegee icon */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 shadow-[0_0_40px_rgba(0,218,255,0.5)]">
                <span className="text-xl">🧹</span>
              </div>
            </div>
            {/* Sparkle trail */}
            <div className="absolute -left-4 top-[25%] text-lg text-primary/50">✦</div>
            <div className="absolute -left-8 top-[45%] text-sm text-primary/30">✦</div>
            <div className="absolute -left-3 top-[65%] text-lg text-primary/40">✦</div>
            <div className="absolute -left-6 top-[80%] text-sm text-primary/25">✦</div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6">
          <div className="grid w-full grid-cols-1 gap-8 py-20 md:grid-cols-2">
            {storySteps.map((step, i) => (
              <div
                key={step.phase}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="rounded-2xl bg-white p-8 shadow-sm"
                style={{ clipPath: "inset(0 100% 0 0)" }}
              >
                <h3 className="font-heading text-2xl font-bold text-dark">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-dark/55">
                  {step.text}
                </p>
                <div className="mt-5 space-y-3">
                  {step.highlights.map((h) => {
                    const Icon = h.icon;
                    return (
                      <div key={h.label} className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Icon size={16} className="text-primary" />
                        </div>
                        <span className="text-sm font-medium text-dark/65">{h.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Before/After labels */}
        <div className="pointer-events-none absolute bottom-8 left-0 right-0 z-40 flex justify-between px-12">
          <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            ✨ Limpo
          </span>
          <span className="rounded-full bg-dark/5 px-4 py-1.5 text-xs font-semibold text-dark/30">
            Antes 🧽
          </span>
        </div>
      </div>
    </div>
  );
}
