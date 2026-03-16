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
    <section className="relative min-h-screen overflow-hidden bg-primary">
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
            className="mb-6 flex w-fit items-center gap-2 rounded-full border border-dark/15 bg-dark/10 px-4 py-1.5"
          >
            <span className="h-2 w-2 rounded-full bg-cta animate-pulse" />
            <span className="text-xs font-medium tracking-widest text-dark/80 uppercase">
              Disponível hoje
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl font-bold leading-tight text-dark md:text-5xl lg:text-6xl"
          >
            Sua casa merece
            <br />
            ser <span className="text-white">esplêndida</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-md text-base leading-relaxed text-dark/60 md:text-lg"
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
            className="mt-8 flex w-fit items-center gap-2 rounded-lg bg-cta px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
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
              <span className="text-dark/50">300+ clientes</span>
            </div>
            <span className="text-dark/20">|</span>
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-cta" />
              <span className="text-dark/50">100% garantia</span>
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
            <Image
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=1000&fit=crop"
              alt="Serviço de limpeza profissional"
              fill
              className="rounded-2xl object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Fade gradient left */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-transparent to-transparent" />
            {/* Fade gradient bottom */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary via-transparent to-transparent" />

            {/* Floating card */}
            <div className="absolute bottom-6 right-6 animate-float rounded-xl border border-dark/10 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm">
              <p className="text-xs font-semibold text-cta">PRÓXIMO HORÁRIO</p>
              <p className="text-lg font-bold text-dark">Amanhã, 9h</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade to neutral */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral to-transparent" />
    </section>
  );
}
