"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";

interface FinalCTAProps {
  onOpenWizard: () => void;
}

export default function FinalCTA({ onOpenWizard }: FinalCTAProps) {
  const t = useTranslations("finalCta");

  return (
    <section className="relative overflow-x-clip bg-dark py-20 md:py-28">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-cta/15 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">{t("badge")}</span>
          </div>

          <h2 className="font-heading text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            {t("headlineTop")}
            <br />
            {t("headlineBottom")} <span className="gradient-text">{t("headlineHighlight")}</span>?
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/50 md:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={onOpenWizard}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-bold text-dark shadow-[0_0_24px_rgba(0,218,255,0.25)] transition-all hover:scale-105 hover:shadow-[0_0_32px_rgba(0,218,255,0.4)] sm:w-auto"
            >
              <MessageCircle size={18} />
              {t("cta")}
            </button>
            <a
              href="tel:910725044"
              className="text-sm font-medium text-white/40 underline decoration-white/15 underline-offset-4 transition-colors hover:text-white/70"
            >
              {t("phone")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
