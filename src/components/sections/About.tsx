"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/351910725044?text=Olá! Gostaria de saber mais sobre os serviços de limpeza.";

const features = [
  "Equipa profissional certificada",
  "Produtos 100% ecológicos",
  "Garantia de satisfação total",
  "Horários flexíveis",
  "Orçamento sem compromisso",
  "Atendimento personalizado",
];

export default function About() {
  return (
    <section id="sobre" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#3B82F6] text-sm font-semibold tracking-widest uppercase">
              Quem Somos
            </span>
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold mt-3 mb-6">
              Porque Somos{" "}
              <span className="gradient-text">Diferentes</span>
            </h2>
            <p className="text-gray-text leading-relaxed mb-8">
              Somos uma empresa portuguesa dedicada à excelência em serviços de
              limpeza. Com mais de 8 anos de experiência, combinamos técnicas
              profissionais com produtos ecológicos para oferecer resultados
              impecáveis. A nossa missão é transformar cada espaço num ambiente
              saudável, fresco e verdadeiramente esplêndido.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 size={20} className="text-[#06D6A0] shrink-0" />
                  <span className="text-sm text-[#0A1628]">{feature}</span>
                </motion.div>
              ))}
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#06D6A0] text-white font-semibold px-8 py-3.5 rounded-full hover:shadow-lg hover:shadow-[#3B82F6]/25 transition-all duration-300 hover:scale-105"
            >
              Fale Connosco
            </a>
          </motion.div>

          {/* Right Decorative */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Main gradient card */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1E56A0] to-[#3B82F6] overflow-hidden">
                {/* Sparkles icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles size={120} className="text-white/20" />
                </div>

                {/* Floating circles */}
                <div className="absolute top-8 right-8 w-20 h-20 rounded-full bg-white/10 animate-float" />
                <div
                  className="absolute bottom-16 left-8 w-14 h-14 rounded-full bg-[#06D6A0]/20 animate-float"
                  style={{ animationDelay: "-3s" }}
                />
                <div
                  className="absolute top-1/2 right-12 w-8 h-8 rounded-full bg-white/15 animate-float"
                  style={{ animationDelay: "-1.5s" }}
                />
              </div>

              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-gray-100"
              >
                <div className="text-3xl font-[family-name:var(--font-heading)] font-bold gradient-text">
                  8+
                </div>
                <div className="text-sm text-gray-text mt-1">
                  Anos de
                  <br />
                  Experiência
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
