"use client";

import { useState, useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { Check, Crown } from "lucide-react";

interface PricingCard {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featured: boolean;
  whatsappMessage: string;
}

const plans: PricingCard[] = [
  {
    name: "Pontual",
    price: "Consulte",
    period: "",
    description: "Limpeza avulsa para necessidades pontuais.",
    features: [
      "Limpeza completa",
      "Produtos profissionais",
      "Equipa certificada",
      "Agendamento flexível",
      "Garantia de satisfação",
    ],
    featured: false,
    whatsappMessage:
      "Olá! Gostaria de saber o preço para uma limpeza pontual.",
  },
  {
    name: "Mensal",
    price: "150€",
    period: "/mês",
    description: "Plano regular para manter o seu espaço sempre impecável.",
    features: [
      "4 limpezas por mês",
      "Produtos eco-friendly",
      "Equipa dedicada",
      "Prioridade no agendamento",
      "Desconto em serviços extra",
      "Relatório mensal",
    ],
    featured: true,
    whatsappMessage:
      "Olá! Tenho interesse no plano mensal de limpeza a 150€/mês.",
  },
  {
    name: "Empresarial",
    price: "Sob Medida",
    period: "",
    description: "Soluções personalizadas para empresas e condomínios.",
    features: [
      "Plano 100% personalizado",
      "Equipa exclusiva",
      "Gestor de conta dedicado",
      "Horários adaptados",
      "Faturação empresarial",
      "SLA garantido",
    ],
    featured: false,
    whatsappMessage:
      "Olá! Gostaria de um orçamento empresarial personalizado.",
  },
];

function TiltCard({
  plan,
  index,
}: {
  plan: PricingCard;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!plan.featured || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform("");
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transform || undefined }}
      className={`relative rounded-3xl p-5 sm:p-8 border transition-all duration-300 ${
        plan.featured
          ? "bg-gradient-to-br from-[#0A1628] via-[#1E3A5F] to-[#1E56A0] text-white border-[#06D6A0]/40 shadow-2xl shadow-[#5B9BD5]/20 md:scale-105 z-10"
          : "bg-white text-[#0A1628] border-gray-200 hover:shadow-xl hover:-translate-y-1"
      }`}
    >
      {plan.featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-gradient-to-r from-[#5B9BD5] to-[#06D6A0] text-white text-xs font-semibold px-4 py-1.5 rounded-full">
          <Crown size={14} />
          Mais Popular
        </div>
      )}

      <div className="text-center mb-8">
        <h3
          className={`text-xl font-[family-name:var(--font-heading)] font-bold mb-2 ${
            plan.featured ? "text-white" : "text-[#0A1628]"
          }`}
        >
          {plan.name}
        </h3>
        <p
          className={`text-sm mb-4 ${
            plan.featured ? "text-white/60" : "text-gray-text"
          }`}
        >
          {plan.description}
        </p>
        <div className="flex items-baseline justify-center gap-1">
          <span
            className={`text-4xl sm:text-5xl font-[family-name:var(--font-heading)] font-bold ${
              plan.featured ? "text-white" : "gradient-text"
            }`}
          >
            {plan.price}
          </span>
          {plan.period && (
            <span
              className={`text-sm ${
                plan.featured ? "text-white/50" : "text-gray-text"
              }`}
            >
              {plan.period}
            </span>
          )}
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, fi) => (
          <li key={fi} className="flex items-center gap-3 text-sm">
            <Check
              size={18}
              className={
                plan.featured ? "text-[#06D6A0] shrink-0" : "text-[#06D6A0] shrink-0"
              }
            />
            <span className={plan.featured ? "text-white/80" : "text-[#0A1628]/80"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <a
        href={`https://wa.me/351910725044?text=${encodeURIComponent(plan.whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`block w-full text-center font-semibold py-3.5 rounded-xl transition-all duration-300 ${
          plan.featured
            ? "bg-[#06D6A0] hover:bg-[#05c090] text-[#0A1628]"
            : "border-2 border-[#5B9BD5] text-[#5B9BD5] hover:bg-[#5B9BD5] hover:text-white"
        }`}
      >
        {plan.featured ? "Começar Agora" : "Pedir Orçamento"}
      </a>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section id="precos" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-[#5B9BD5] text-sm font-semibold tracking-widest uppercase">
            Preços Transparentes
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold mt-3">
            Planos e <span className="gradient-text">Preços</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#5B9BD5] to-[#06D6A0] mx-auto mt-6 rounded-full" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <TiltCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
