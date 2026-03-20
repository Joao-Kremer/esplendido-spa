"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Leaf } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Garantia de Satisfação",
    description:
      "A nossa equipa é treinada para entregar sempre o melhor resultado, com total compromisso e profissionalismo. A sua satisfação é a nossa prioridade.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Sparkles,
    title: "Qualidade Superior",
    description:
      "Utilizamos ferramentas e equipamentos da mais alta qualidade para retirar todo o pó e sujidade das suas instalações.",
    color: "text-golden",
    bgColor: "bg-golden/10",
  },
  {
    icon: Leaf,
    title: "Produtos Sustentáveis",
    description:
      "Utilizamos produtos biodegradáveis que não prejudicam de forma alguma o ambiente, os animais de estimação ou os seres humanos.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-neutral py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-bold text-dark md:text-4xl">
            Razões para nos escolher
          </h2>
          <p className="mt-3 text-dark/50">
            O que nos distingue da concorrência
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${reason.bgColor}`}>
                  <Icon size={28} className={reason.color} />
                </div>
                <h3 className="font-heading text-xl font-bold text-dark">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-dark/50">
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
