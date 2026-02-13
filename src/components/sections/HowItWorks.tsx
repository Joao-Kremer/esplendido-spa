"use client";

import { motion } from "framer-motion";
import { Phone, FileText, CalendarDays, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    icon: Phone,
    title: "Contacte-nos",
    description:
      "Envie-nos uma mensagem por WhatsApp ou preencha o formulário de contacto.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Orçamento Grátis",
    description:
      "Receba um orçamento detalhado e personalizado sem qualquer compromisso.",
  },
  {
    number: "03",
    icon: CalendarDays,
    title: "Agendamento",
    description:
      "Escolha o dia e horário que mais lhe convém. Nós adaptamo-nos à sua agenda.",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Limpeza Perfeita",
    description:
      "A nossa equipa transforma o seu espaço com resultados impecáveis.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#3B82F6] text-sm font-semibold tracking-widest uppercase">
            Processo Simples
          </span>
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold mt-3">
            Como <span className="gradient-text">Funciona</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#3B82F6] to-[#06D6A0] mx-auto mt-6 rounded-full" />
        </div>

        {/* Desktop Horizontal Layout */}
        <div className="hidden lg:flex items-start justify-between relative">
          {/* Connecting Line */}
          <div className="absolute top-8 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-[#3B82F6] to-[#06D6A0] opacity-30" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col items-center text-center relative z-10 w-1/4 px-4"
              >
                <span className="text-5xl font-[family-name:var(--font-heading)] font-bold text-[#0A1628]/10 mb-2">
                  {step.number}
                </span>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#06D6A0] flex items-center justify-center mb-5 shadow-lg shadow-[#3B82F6]/20">
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-[family-name:var(--font-heading)] font-bold text-[#0A1628] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-text leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Vertical Layout */}
        <div className="lg:hidden relative pl-12">
          {/* Vertical Line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3B82F6] to-[#06D6A0] opacity-30" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative mb-12 last:mb-0"
              >
                <div className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#06D6A0] flex items-center justify-center shadow-md">
                  <Icon size={18} className="text-white" />
                </div>
                <span className="text-5xl font-[family-name:var(--font-heading)] font-bold text-[#0A1628]/10 absolute -left-2 -top-6">
                  {step.number}
                </span>
                <h3 className="text-lg font-[family-name:var(--font-heading)] font-bold text-[#0A1628] mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-text leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
