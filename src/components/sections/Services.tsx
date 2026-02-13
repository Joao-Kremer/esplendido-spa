"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Building2,
  Sofa,
  Building,
  HardHat,
  PanelTop,
  Droplets,
  Bed,
  Layers,
  CheckCircle2,
  ArrowRight,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { services } from "@/lib/services-data";
import type { Service } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  Home,
  Building2,
  Sofa,
  Building,
  HardHat,
  PanelTop,
  Droplets,
  Bed,
  Layers,
};

const WHATSAPP_URL =
  "https://wa.me/351910725044?text=Olá! Gostaria de saber mais sobre os serviços de limpeza.";

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="servicos" className="py-24 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#3B82F6] text-sm font-semibold tracking-widest uppercase">
            Soluções Completas
          </span>
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold mt-3">
            Os Nossos <span className="gradient-text">Serviços</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#3B82F6] to-[#06D6A0] mx-auto mt-6 rounded-full" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Home;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:border-[#06D6A0]/30 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3B82F6]/10 to-[#06D6A0]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon size={28} className="text-[#3B82F6]" />
                </div>

                <h3 className="text-xl font-[family-name:var(--font-heading)] font-bold text-[#0A1628] mb-3">
                  {service.name}
                </h3>

                <p className="text-gray-text text-sm leading-relaxed mb-5">
                  {service.shortDescription}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-sm text-[#0A1628]/80">
                      <CheckCircle2 size={16} className="text-[#06D6A0] shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <span className="inline-flex items-center gap-1 text-[#3B82F6] text-sm font-semibold group-hover:gap-2 transition-all">
                  Saiba Mais <ArrowRight size={16} />
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-3xl max-w-lg w-full p-8 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={20} />
              </button>

              {(() => {
                const Icon = iconMap[selectedService.icon] || Home;
                return (
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3B82F6]/10 to-[#06D6A0]/10 flex items-center justify-center mb-6">
                    <Icon size={32} className="text-[#3B82F6]" />
                  </div>
                );
              })()}

              <h3 className="text-2xl font-[family-name:var(--font-heading)] font-bold text-[#0A1628] mb-3">
                {selectedService.name}
              </h3>

              <p className="text-gray-text leading-relaxed mb-6">
                {selectedService.fullDescription}
              </p>

              <h4 className="text-sm font-semibold text-[#0A1628] uppercase tracking-wider mb-3">
                O que inclui:
              </h4>
              <ul className="space-y-2 mb-8">
                {selectedService.features.map((feature, fi) => (
                  <li key={fi} className="flex items-center gap-2 text-sm text-[#0A1628]/80">
                    <CheckCircle2 size={16} className="text-[#06D6A0] shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/351910725044?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre o serviço de ${selectedService.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#06D6A0] hover:bg-[#05c090] text-[#0A1628] font-semibold py-3.5 rounded-xl transition-colors"
              >
                Pedir Orçamento Grátis
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
