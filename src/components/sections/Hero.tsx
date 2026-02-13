"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Clock, Sparkles } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

const trustBadges = [
  { icon: ShieldCheck, label: "100% Garantia de Satisfação" },
  { icon: Clock, label: "Atendimento Rápido" },
  { icon: Sparkles, label: "Equipa Certificada" },
];

export default function Hero() {
  const scrollToServices = () => {
    document.querySelector("#servicos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&auto=format')",
        }}
      />


      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full pt-28 sm:pt-32 pb-20 sm:pb-24">
        <div className="max-w-2xl">
          {/* Badge - glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white mb-6 sm:mb-8"
          >
            <Sparkles size={14} className="text-[#5BA8D9]" />
            Serviços Profissionais de Limpeza
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[3.5rem] font-[family-name:var(--font-heading)] font-bold leading-[1.1] text-white"
          >
            Limpeza Comercial e Doméstica{" "}
            <br />
            <span className="text-[#4A9FD9]">Impecável</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-white mt-5 sm:mt-6 max-w-xl leading-relaxed drop-shadow-md"
          >
            Equipa fixa e treinada. Higienização diversa com equipamentos de
            última geração. A sua confiança é a nossa prioridade.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#60A5FA] hover:bg-[#3B82F6] text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg text-sm sm:text-base transition-all duration-200"
            >
              Pedir Orçamento
              <ArrowRight size={18} />
            </a>
            <button
              onClick={scrollToServices}
              className="inline-flex items-center justify-center gap-2 bg-[#475569]/70 backdrop-blur-sm border border-white/20 text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg text-sm sm:text-base transition-all duration-200 hover:bg-[#475569]/85"
            >
              Conhecer Serviços
            </button>
          </motion.div>

          {/* Trust Badges - glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-8 sm:mt-12"
          >
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 sm:px-5 py-3 sm:py-3.5"
                >
                  <Icon size={18} className="text-white/60 shrink-0" />
                  <span className="text-white/90 text-sm font-medium">
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
