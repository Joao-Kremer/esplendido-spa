"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";
import { services } from "@/lib/data";
import { useTranslations } from "next-intl";

interface ServicesProps {
  onOpenWizard: (preselectedService?: string) => void;
}

export default function Services({ onOpenWizard }: ServicesProps) {
  const t = useTranslations("services");
  const serviceItems = t.raw("items") as Array<{name: string; description: string; details: string[]; includes: string[]}>;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedService = selectedIndex !== null ? { ...serviceItems[selectedIndex], icon: services[selectedIndex].icon } : null;

  return (
    <section id="servicos" className="bg-neutral py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-bold text-dark md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-dark/50">
            {t("subtitle")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceItems.map((item, i) => {
            const Icon = services[i].icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex flex-col rounded-xl border border-transparent bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
              >
                <Icon size={32} className="mb-4 text-primary" />
                <h3 className="font-heading text-lg font-bold text-dark">
                  {item.name}
                </h3>
                <p className="mt-1 flex-1 text-sm text-dark/50">
                  {item.description}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setSelectedIndex(i)}
                    className="text-xs font-medium text-primary transition-colors hover:text-cta"
                  >
                    {t("viewMore")}
                  </button>
                  <span className="text-dark/15">|</span>
                  <button
                    onClick={() => onOpenWizard(item.name)}
                    className="flex items-center gap-1 text-xs font-medium text-dark/40 transition-colors hover:text-dark"
                  >
                    {t("book")}
                    <ArrowRight size={10} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndex(null)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed inset-0 z-50 m-auto flex max-h-full flex-col overflow-hidden shadow-2xl sm:inset-4 sm:max-h-[85vh] sm:max-w-lg sm:rounded-2xl"
              style={{ background: "linear-gradient(180deg, #0d1e36 0%, #0A1628 100%)" }}
            >
              {/* Modal Header */}
              <div className="relative flex items-center gap-3 px-4 pt-5 pb-3 sm:gap-4 sm:px-6 sm:pt-6 sm:pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                  <selectedService.icon size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-bold text-white">
                    {selectedService.name}
                  </h3>
                  <p className="text-sm text-white/40">{selectedService.description}</p>
                </div>
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white/30 transition-all hover:bg-white/[0.06] hover:text-white/60"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Divider */}
              <div className="mx-4 h-px bg-white/[0.06] sm:mx-6" />

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5" style={{ scrollbarWidth: "none" }}>
                {/* Details */}
                <div className="space-y-3">
                  {selectedService.details.map((detail, i) => (
                    <p key={i} className="text-sm leading-relaxed text-white/70">
                      {detail}
                    </p>
                  ))}
                </div>

                {/* Includes */}
                <div className="mt-6">
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-primary/70">
                    {t("includes")}
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedService.includes.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="flex items-start gap-2.5"
                      >
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-primary/60" />
                        <span className="text-sm leading-relaxed text-white/60">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-white/[0.06] px-4 py-3 sm:px-6 sm:py-4">
                <button
                  onClick={() => {
                    setSelectedIndex(null);
                    onOpenWizard(selectedService.name);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-dark transition-all hover:shadow-[0_0_24px_rgba(0,218,255,0.3)]"
                >
                  {t("bookService", { serviceName: selectedService.name })}
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
