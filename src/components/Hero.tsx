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
    <section className="relative min-h-screen overflow-hidden bg-dark">
      {/* Three.js background */}
      <BubbleScene />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center px-6 pt-24 md:flex-row md:gap-12 md:pt-0">
        {/* Left content */}
        <div className="flex flex-1 flex-col justify-center py-12 md:py-0">
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
            className="mt-4 max-w-md text-base leading-relaxed text-white/50 md:text-lg"
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
            className="mt-8 flex w-fit items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-dark glow-cyan transition-transform hover:scale-105"
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
              <span className="text-white/40">300+ clientes</span>
            </div>
            <span className="text-white/15">|</span>
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-primary" />
              <span className="text-white/40">100% garantia</span>
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
              className="rounded-2xl object-cover opacity-85"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Fade gradient left */}
            <div className="absolute inset-0 bg-gradient-to-r from-dark via-transparent to-transparent" />
            {/* Fade gradient bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />

          </div>
        </motion.div>
      </div>
    </section>
  );
}
