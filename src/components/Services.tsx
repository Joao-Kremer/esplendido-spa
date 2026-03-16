"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";

interface ServicesProps {
  onOpenWizard: (preselectedService?: string) => void;
}

export default function Services({ onOpenWizard }: ServicesProps) {
  return (
    <section id="servicos" className="bg-neutral py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-bold text-dark md:text-4xl">
            Nossos Serviços
          </h2>
          <p className="mt-3 text-dark/50">
            Soluções de limpeza para cada necessidade
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.button
                key={service.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => onOpenWizard(service.name)}
                className="group cursor-pointer rounded-xl border border-transparent bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
              >
                <Icon size={32} className="mb-4 text-primary" />
                <h3 className="font-heading text-lg font-bold text-dark">
                  {service.name}
                </h3>
                <p className="mt-1 text-sm text-dark/50">
                  {service.description}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
