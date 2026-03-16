"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ClipboardList, MessageCircle, Users } from "lucide-react";
import { steps } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stepIcons = [ClipboardList, MessageCircle, Users];

interface HowItWorksProps {
  onOpenWizard: () => void;
}

export default function HowItWorks({ onOpenWizard }: HowItWorksProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const scaleAxis = isMobile ? "scaleY" : "scaleX";

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { [scaleAxis]: 0 },
        {
          [scaleAxis]: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="como-funciona" className="bg-cta py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Como funciona
          </h2>
        </div>

        {/* Steps */}
        <div className="relative flex flex-col items-center gap-12 md:flex-row md:justify-between md:gap-0">
          {/* Connecting line (desktop: horizontal, mobile: vertical) */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-[10%] bottom-[10%] w-px origin-top border-l-2 border-dashed border-primary/20 md:left-[15%] md:right-[15%] md:top-1/2 md:bottom-auto md:h-px md:w-auto md:origin-left md:border-l-0 md:border-t-2"
          />

          {steps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center md:flex-1"
              >
                <span className="font-heading text-4xl font-extrabold text-golden">
                  {step.number}
                </span>
                <div className={`mt-4 rounded-xl bg-white/5 p-4 ${step.iconColor}`}>
                  <Icon size={28} />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[240px] text-sm text-white/50">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenWizard}
            className="rounded-lg bg-gradient-to-r from-primary to-cta px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105"
          >
            Agendar agora
          </button>
        </div>
      </div>
    </section>
  );
}
