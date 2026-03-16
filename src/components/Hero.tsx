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
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&h=1080&fit=crop"
        alt=""
        fill
        className="object-cover opacity-20"
        priority
        sizes="100vw"
      />
      {/* Overlay to blend image with brand blue */}
      <div className="absolute inset-0 bg-gradient-to-r from-cta via-cta/80 to-cta/40" />

      {/* Three.js bubbles */}
      <BubbleScene />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-24 md:pt-0">
        {/* Content */}
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-white/10 px-4 py-1.5"
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
            ser <span className="text-primary">esplêndida</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-md text-base leading-relaxed text-white/70 md:text-lg"
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
            className="mt-8 flex w-fit items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-dark shadow-[0_4px_20px_rgba(0,218,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_4px_30px_rgba(0,218,255,0.5)]"
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
              <span className="text-white/60">300+ clientes</span>
            </div>
            <span className="text-white/30">|</span>
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-primary" />
              <span className="text-white/60">100% garantia</span>
            </div>
          </motion.div>
        </div>

        {/* Floating card — bottom right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute bottom-32 right-8 hidden animate-float rounded-xl border border-white/15 bg-white/10 px-5 py-3.5 backdrop-blur-md md:block"
        >
          <p className="text-xs font-semibold text-primary">PRÓXIMO HORÁRIO</p>
          <p className="text-lg font-bold text-white">Amanhã, 9h</p>
        </motion.div>
      </div>

      {/* Bottom fade to neutral */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral to-transparent" />
    </section>
  );
}
