"use client";

import { motion } from "framer-motion";
import { ChevronDown, Users, ShieldCheck, Leaf } from "lucide-react";
import dynamic from "next/dynamic";

const BubbleScene = dynamic(() => import("@/components/three/BubbleScene"), {
  ssr: false,
});

const WHATSAPP_URL =
  "https://wa.me/351910725044?text=Olá! Gostaria de saber mais sobre os serviços de limpeza.";

const floatingBubbles = [
  { size: 200, top: "10%", left: "5%", duration: 14 },
  { size: 120, top: "60%", left: "80%", duration: 18 },
  { size: 80, top: "30%", left: "70%", duration: 12 },
  { size: 150, top: "75%", left: "15%", duration: 16 },
  { size: 60, top: "20%", left: "50%", duration: 20 },
  { size: 100, top: "50%", left: "35%", duration: 15 },
];

export default function Hero() {
  const scrollToServices = () => {
    document.querySelector("#servicos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="min-h-screen relative overflow-hidden flex items-center bg-gradient-to-br from-[#0A1628] via-[#1E3A5F] to-[#1E56A0]"
    >
      {/* CSS Fallback Bubbles */}
      {floatingBubbles.map((bubble, i) => (
        <div
          key={i}
          className="rounded-full bg-white/5 absolute"
          style={{
            width: bubble.size,
            height: bubble.size,
            top: bubble.top,
            left: bubble.left,
            animation: `bubble-float ${bubble.duration}s ease-in-out infinite`,
            animationDelay: `${i * -2}s`,
          }}
        />
      ))}

      {/* Three.js Bubbles */}
      <div className="absolute inset-0 z-0">
        <BubbleScene />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32">
        <div className="text-center text-white">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center border border-white/20 rounded-full px-4 py-1.5 text-xs bg-white/5 backdrop-blur mb-8"
          >
            <span className="text-[#06D6A0] mr-2">&#10022;</span>
            Serviço de Limpeza Premium
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl font-[family-name:var(--font-heading)] font-bold leading-tight"
          >
            Transformamos Espaços.
            <br />
            <span className="gradient-text">Elevamos Padrões.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mt-6"
          >
            Limpeza profissional com produtos ecológicos, equipa certificada e
            100% garantia de satisfação. O seu espaço merece o melhor.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#06D6A0] hover:bg-[#05c090] text-[#0A1628] font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#06D6A0]/30"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Fale Connosco
            </a>
            <button
              onClick={scrollToServices}
              className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:bg-white/10"
            >
              Conhecer Serviços
            </button>
          </motion.div>
        </div>

        {/* Floating Badges - Desktop Only */}
        <div className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute left-8 top-1/3 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/10 animate-float"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#3B82F6]/20 flex items-center justify-center">
                <Users size={18} className="text-[#3B82F6]" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">+500</div>
                <div className="text-white/60 text-xs">Clientes</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute right-8 top-1/4 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/10 animate-float"
            style={{ animationDelay: "-2s" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#06D6A0]/20 flex items-center justify-center">
                <ShieldCheck size={18} className="text-[#06D6A0]" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">100%</div>
                <div className="text-white/60 text-xs">Garantia</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute right-20 bottom-32 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/10 animate-float"
            style={{ animationDelay: "-4s" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Leaf size={18} className="text-emerald-400" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">Eco</div>
                <div className="text-white/60 text-xs">Friendly</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-white/50 text-xs tracking-widest uppercase">
          Descubra Mais
        </span>
        <ChevronDown size={24} className="text-white/50 animate-bounce" />
      </div>
    </section>
  );
}
