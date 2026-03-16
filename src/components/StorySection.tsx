"use client";

import { useRef, useEffect } from "react";
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

export default function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const broomRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current || !broomRef.current) return;

    const ctx = gsap.context(() => {
      // Timeline line draws down as user scrolls through the section
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

      // Broom follows the line as it draws
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
          },
        }
      );

      // Each card slides in from alternating sides, triggered by scroll
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          {
            x: fromLeft ? -60 : 60,
            opacity: 0,
            rotate: fromLeft ? -3 : 3,
          },
          {
            x: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 50%",
              scrub: 0.3,
            },
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
            scale: 1,
            duration: 0.3,
            ease: "back.out(3)",
            scrollTrigger: {
              trigger: dot,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
        <div className="relative">
          {/* ── Vertical timeline line ── */}
          <div className="absolute left-6 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-1/2">
            {/* Background track */}
            <div className="absolute inset-0 bg-dark/10" />
            {/* Animated fill */}
            <div
              ref={lineRef}
              className="absolute inset-x-0 top-0 bottom-0 origin-top bg-primary"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          {/* ── Broom that rides the line ── */}
          <div
            ref={broomRef}
            className="pointer-events-none absolute left-6 z-20 md:left-1/2 md:-translate-x-1/2"
            style={{ top: "0%" }}
          >
            <div className="relative -translate-x-1/2">
              {/* Glow */}
              <div className="absolute -inset-3 rounded-full bg-primary/20 blur-lg" />
              {/* Icon */}
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-white shadow-[0_0_20px_rgba(0,218,255,0.3)]">
                <span className="text-lg">🧹</span>
              </div>
              {/* Sparkle trail below */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-primary/60">✨</div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] text-primary/40">✨</div>
            </div>
          </div>

          {/* ── Cards ── */}
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

                  {/* Spacer for timeline (mobile: left gutter, desktop: half width) */}
                  <div className="hidden w-1/2 md:block" />

                  {/* Card */}
                  <div
                    ref={(el) => { cardsRef.current[i] = el; }}
                    className="ml-14 flex-1 md:ml-0 md:w-1/2"
                    style={{ opacity: 0 }}
                  >
                    {/* Connector line from dot to card */}
                    <div
                      className={`absolute top-2.5 hidden h-px w-8 bg-primary/30 md:block ${
                        isLeft ? "right-1/2 mr-2.5" : "left-1/2 ml-2.5"
                      }`}
                    />

                    <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg md:p-7">
                      {/* Step number */}
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
