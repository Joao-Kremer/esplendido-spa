"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/lib/faq-data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#F7F9FC]">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-[#5B9BD5] text-sm font-semibold tracking-widest uppercase">
            Dúvidas Frequentes
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold mt-3">
            Perguntas <span className="gradient-text">Frequentes</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#5B9BD5] to-[#06D6A0] mx-auto mt-6 rounded-full" />
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`bg-white rounded-2xl border transition-colors duration-300 ${
                  isOpen
                    ? "border-[#5B9BD5]/30 shadow-lg"
                    : "border-gray-100"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left gap-4"
                >
                  <span className="text-[#0A1628] font-[family-name:var(--font-heading)] font-semibold text-base">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-[#5B9BD5] text-white rotate-180"
                        : "bg-gray-100 text-gray-text"
                    }`}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                        <div className="h-px bg-gray-100 mb-4" />
                        <p className="text-gray-text text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
