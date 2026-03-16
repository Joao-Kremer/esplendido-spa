"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Star, Shield, MessageCircle } from "lucide-react";
import Image from "next/image";

const BubbleScene = dynamic(() => import("./BubbleScene"), { ssr: false });

interface HeroProps {
  onOpenWizard: () => void;
}

export default function Hero({ onOpenWizard }: HeroProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-cta">
      {/* Ambient glow — primary color presence */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top-right large glow */}
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/[0.07] blur-[120px]" />
        {/* Bottom-left glow */}
        <div className="absolute -bottom-20 -left-20 h-[350px] w-[350px] rounded-full bg-cta/[0.08] blur-[100px]" />
        {/* Center subtle glow */}
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.03] blur-[150px]" />
      </div>

      {/* Gradient overlay on top of dark bg */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-dark/50" />

      {/* Three.js background */}
      <BubbleScene />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center px-6 pt-24 md:flex-row md:gap-12 md:pt-0">
        {/* Left content */}
        <div className="flex flex-1 flex-col justify-center py-12 md:py-0">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 shadow-[0_0_20px_rgba(0,218,255,0.1)]"
          >
            <span className="h-2 w-2 animate-pulse-glow rounded-full bg-primary" />
            <span className="text-xs font-medium tracking-widest text-primary uppercase">
              Disponível hoje
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          >
            Sua casa merece
            <br />
            ser <span className="gradient-text">esplêndida</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-md text-base leading-relaxed text-white/60 md:text-lg"
          >
            Equipa fixa e treinada ao seu serviço.
            <br />
            Lisboa & Margem Sul.
          </motion.p>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={onOpenWizard}
            className="mt-8 flex w-fit items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-dark shadow-[0_0_30px_rgba(0,218,255,0.3),0_4px_12px_rgba(0,0,0,0.2)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,218,255,0.45),0_4px_16px_rgba(0,0,0,0.3)]"
          >
            <MessageCircle size={18} />
            Agendar pelo WhatsApp
          </motion.button>

          {/* Proof bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex items-center gap-4 text-sm"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-golden text-golden" />
                ))}
              </div>
              <span className="text-white/50">300+ clientes</span>
            </div>
            <span className="text-primary/30">|</span>
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-primary" />
              <span className="text-white/50">100% garantia</span>
            </div>
          </motion.div>
        </div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative order-first flex-1 md:order-last"
        >
          <div className="relative h-[300px] w-full md:h-[500px]">
            {/* Image glow behind */}
            <div className="absolute -inset-4 rounded-3xl bg-primary/[0.06] blur-2xl" />

            <Image
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=1000&fit=crop"
              alt="Serviço de limpeza profissional"
              fill
              className="relative rounded-2xl object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Fade gradient left */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cta via-cta/40 to-transparent" />
            {/* Fade gradient bottom */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-cta via-transparent to-transparent" />
            {/* Primary tint overlay */}
            <div className="absolute inset-0 rounded-2xl bg-primary/[0.05]" />

            {/* Floating card */}
            <div className="absolute bottom-6 right-6 animate-float rounded-xl border border-white/15 bg-cta/80 px-4 py-3 backdrop-blur-xl shadow-[0_0_20px_rgba(0,218,255,0.15)]">
              <p className="text-xs font-semibold text-primary">PRÓXIMO HORÁRIO</p>
              <p className="text-lg font-bold text-white">Amanhã, 9h</p>
            </div>

            {/* Decorative ring */}
            <div className="absolute -bottom-3 -left-3 h-20 w-20 rounded-full border border-primary/20 md:-bottom-6 md:-left-6 md:h-28 md:w-28" />
            <div className="absolute -right-2 -top-2 h-12 w-12 rounded-full border border-primary/10 md:-right-4 md:-top-4 md:h-16 md:w-16" />
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade to next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral to-transparent" />
    </section>
  );
}
