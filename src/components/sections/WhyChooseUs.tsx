"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Leaf } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Reason {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const reasons: Reason[] = [
  {
    icon: ShieldCheck,
    title: "Garantia Total",
    description:
      "Se não ficar 100% satisfeito, refazemos o serviço sem custos adicionais. A sua satisfação é a nossa prioridade.",
    color: "text-[#3B82F6]",
    bgColor: "bg-[#3B82F6]/10",
  },
  {
    icon: Award,
    title: "Qualidade Premium",
    description:
      "Equipa certificada e treinada continuamente. Utilizamos equipamentos profissionais e técnicas de ponta.",
    color: "text-[#06D6A0]",
    bgColor: "bg-[#06D6A0]/10",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description:
      "Produtos 100% biodegradáveis e seguros para crianças, animais e alérgicos. Cuidamos do seu espaço e do planeta.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="razoes" className="py-24 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#3B82F6] text-sm font-semibold tracking-widest uppercase">
            Porquê Nós
          </span>
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold mt-3">
            Razões para <span className="gradient-text">Escolher-nos</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#3B82F6] to-[#06D6A0] mx-auto mt-6 rounded-full" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white rounded-3xl p-10 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${reason.bgColor} ${reason.color} flex items-center justify-center mx-auto mb-6`}
                >
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-[family-name:var(--font-heading)] font-bold text-[#0A1628] mb-4">
                  {reason.title}
                </h3>
                <p className="text-gray-text text-sm leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
