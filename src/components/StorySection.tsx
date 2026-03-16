"use client";

import { useRef, useEffect, useCallback } from "react";
import { ShieldCheck, Sparkles, Leaf, Clock, Users, Award, ThumbsUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const storySteps = [
  {
    title: "O Nosso Empenho",
    text: "Estamos constantemente a melhorar os nossos já elevados padrões para que nos veja como a melhor empresa do sector.",
    highlights: [
      { icon: Clock, label: "Limpezas diárias, semanais ou mensais" },
      { icon: Users, label: "Equipa fixa e treinada" },
      { icon: Award, label: "Melhor relação qualidade-preço" },
    ],
  },
  {
    title: "Como Funcionamos",
    text: "A nossa especialidade é eliminar o stress de qualquer aspeto da limpeza. Reserve online em 60 segundos.",
    highlights: [
      { icon: Clock, label: "Agendamento em 60 segundos" },
      { icon: ThumbsUp, label: "Equipa verificada — 5 estrelas" },
      { icon: ShieldCheck, label: "Gerencie tudo online" },
    ],
  },
  {
    title: "Satisfação Garantida",
    text: "Estamos totalmente vinculados e segurados. Se ficar insatisfeito, limpamos de novo no dia seguinte sem custo.",
    highlights: [
      { icon: Sparkles, label: "Refazemos sem custo adicional" },
      { icon: ShieldCheck, label: "Vinculados e segurados" },
    ],
  },
  {
    title: "Produtos Eco-Friendly",
    text: "Produtos biodegradáveis que não prejudicam o ambiente, os animais de estimação ou os seres humanos.",
    highlights: [
      { icon: Leaf, label: "100% biodegradáveis e seguros" },
      { icon: Award, label: "Rede extensa em Lisboa e Margem Sul" },
    ],
  },
];

// Dust particle system that follows the broom
interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

function DustTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<DustParticle[]>([]);
  const broomPosRef = useRef({ x: 0, y: 0, angle: 0 });
  const frameRef = useRef(0);

  const spawnParticles = useCallback((x: number, y: number, angle: number) => {
    const count = 3;
    for (let i = 0; i < count; i++) {
      // Particles fly off in the direction the broom is sweeping
      const spread = (Math.random() - 0.5) * 1.2;
      const speed = Math.random() * 2 + 1;
      const dir = angle > 0 ? 1 : -1;
      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 30,
        y: y + (Math.random() - 0.5) * 20,
        vx: dir * speed + spread,
        vy: -(Math.random() * 1.5 + 0.5),
        size: Math.random() * 4 + 1.5,
        opacity: Math.random() * 0.5 + 0.3,
        life: 0,
        maxLife: Math.random() * 40 + 25,
      });
    }
    // Keep particle count in check
    if (particlesRef.current.length > 120) {
      particlesRef.current = particlesRef.current.slice(-80);
    }
  }, []);

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

    let lastSpawn = 0;
    const animate = () => {
      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      ctx.clearRect(0, 0, cw, ch);

      const now = Date.now();
      const pos = broomPosRef.current;

      // Spawn new particles periodically when broom is moving
      if (now - lastSpawn > 50 && pos.y > 0) {
        spawnParticles(pos.x, pos.y, pos.angle);
        lastSpawn = now;
      }

      // Update and draw
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        if (p.life > p.maxLife) return false;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.vx *= 0.98; // friction

        const progress = p.life / p.maxLife;
        const alpha = p.opacity * (1 - progress);

        // Draw dust speck
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#8B7355";
        ctx.beginPath();
        const sz = p.size * (1 - progress * 0.5);
        ctx.ellipse(p.x, p.y, sz, sz * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return true;
      });

      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [spawnParticles]);

  return {
    canvas: (
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-30 h-full w-full"
      />
    ),
    broomPosRef,
  };
}

export default function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const broomRef = useRef<HTMLDivElement>(null);
  const broomInnerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { canvas: dustCanvas, broomPosRef } = DustTrail();

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current || !broomRef.current || !timelineRef.current) return;

    const ctx = gsap.context(() => {
      // Line draws down
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 0.5,
          },
        }
      );

      // Broom follows line down
      gsap.fromTo(
        broomRef.current,
        { top: "0%" },
        {
          top: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 0.5,
            onUpdate: (self) => {
              if (!broomRef.current || !timelineRef.current) return;
              // Get broom position for dust particles
              const timelineRect = timelineRef.current.getBoundingClientRect();
              const broomRect = broomRef.current.getBoundingClientRect();
              const angle = Math.sin(self.progress * Math.PI * 8) * 25;
              broomPosRef.current = {
                x: broomRect.left - timelineRect.left + broomRect.width / 2,
                y: broomRect.top - timelineRect.top + broomRect.height / 2,
                angle,
              };
            },
          },
        }
      );

      // Broom sweeps side to side with rotation
      if (broomInnerRef.current) {
        gsap.to(broomInnerRef.current, {
          rotation: 25,
          x: 20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 0.3,
            onUpdate: (self) => {
              if (!broomInnerRef.current) return;
              // Oscillate: sin wave makes it sweep left-right
              const sweep = Math.sin(self.progress * Math.PI * 8) * 25;
              const tilt = Math.sin(self.progress * Math.PI * 8) * 15;
              gsap.set(broomInnerRef.current, {
                x: sweep,
                rotation: tilt,
              });
            },
          },
        });
      }

      // Cards slide in
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          { x: fromLeft ? -60 : 60, opacity: 0, rotate: fromLeft ? -3 : 3 },
          {
            x: 0, opacity: 1, rotate: 0,
            duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 82%", end: "top 55%", scrub: 0.3 },
          }
        );
      });

      // Dots pop in
      dotsRef.current.forEach((dot) => {
        if (!dot) return;
        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1, duration: 0.3, ease: "back.out(3)",
            scrollTrigger: { trigger: dot, start: "top 75%", toggleActions: "play none none none" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [broomPosRef]);

  return (
    <section ref={sectionRef} className="relative bg-neutral py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="font-heading text-3xl font-bold text-dark md:text-4xl">
            Conheça a Esplêndido
          </h2>
          <p className="mt-3 text-dark/50">
            A nossa história contada passo a passo
          </p>
        </div>

        {/* Timeline container */}
        <div ref={timelineRef} className="relative">
          {/* Dust particle canvas */}
          {dustCanvas}

          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-1/2">
            <div className="absolute inset-0 bg-dark/10" />
            <div
              ref={lineRef}
              className="absolute inset-x-0 top-0 bottom-0 origin-top bg-primary"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          {/* Broom */}
          <div
            ref={broomRef}
            className="pointer-events-none absolute left-6 z-20 md:left-1/2 md:-translate-x-1/2"
            style={{ top: "0%" }}
          >
            <div ref={broomInnerRef} className="relative -translate-x-1/2">
              {/* Motion blur trail */}
              <div className="absolute -inset-4 rounded-full bg-primary/10 blur-xl" />
              {/* Sweep arc indicator */}
              <div className="absolute -left-6 -right-6 top-1/2 h-px bg-primary/10" />
              {/* Main broom */}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-white shadow-[0_0_24px_rgba(0,218,255,0.35)]">
                <span className="text-xl">🧹</span>
              </div>
              {/* Dust puff indicators */}
              <div className="absolute -left-3 top-0 h-1.5 w-1.5 rounded-full bg-amber-700/20" />
              <div className="absolute -right-4 top-2 h-2 w-2 rounded-full bg-amber-700/15" />
              <div className="absolute -left-5 bottom-1 h-1 w-1 rounded-full bg-amber-700/25" />
              {/* Sparkle trail below */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-primary/50">✨</div>
              <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-[10px] text-primary/30">✨</div>
            </div>
          </div>

          {/* Cards */}
          <div className="relative space-y-16 md:space-y-24">
            {storySteps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={step.title}
                  className={`relative flex items-start gap-8 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    ref={(el) => { dotsRef.current[i] = el; }}
                    className="absolute left-6 z-10 -translate-x-1/2 md:left-1/2"
                    style={{ transform: "scale(0)" }}
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-white shadow-sm">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                  </div>

                  <div className="hidden w-1/2 md:block" />

                  {/* Card */}
                  <div
                    ref={(el) => { cardsRef.current[i] = el; }}
                    className="ml-14 flex-1 md:ml-0 md:w-1/2"
                    style={{ opacity: 0 }}
                  >
                    <div
                      className={`absolute top-2.5 hidden h-px w-8 bg-primary/30 md:block ${
                        isLeft ? "right-1/2 mr-2.5" : "left-1/2 ml-2.5"
                      }`}
                    />

                    <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg md:p-7">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 font-heading text-sm font-bold text-primary">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-heading text-lg font-bold text-dark md:text-xl">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-dark/55">
                        {step.text}
                      </p>
                      <div className="mt-4 space-y-2">
                        {step.highlights.map((h) => {
                          const Icon = h.icon;
                          return (
                            <div key={h.label} className="flex items-center gap-2.5">
                              <Icon size={14} className="shrink-0 text-primary" />
                              <span className="text-[13px] font-medium text-dark/60">{h.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* End sparkle */}
          <div className="mt-12 flex justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10">
              <Sparkles size={18} className="text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
