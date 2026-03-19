"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, Shield, MessageCircle } from "lucide-react";
import Image from "next/image";

const BubbleScene = dynamic(() => import("./BubbleScene"), { ssr: false });

interface HeroProps {
  onOpenWizard: () => void;
}

export default function Hero({ onOpenWizard }: HeroProps) {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      {/* Three.js background */}
      <BubbleScene />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 sm:px-6 md:flex-row md:gap-12">
        {/* Left content */}
        <div className="flex flex-1 flex-col justify-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl font-bold leading-tight text-dark sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {t("headlineTop")}
            <br />
            {t("headlineBottom")}{t("headlineBottom") ? " " : ""}<span className="gradient-text">{t("headlineHighlight")}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-md text-base leading-relaxed text-dark/60 md:text-lg"
          >
            {t("subtitle1")}
            <br />
            {t("subtitle2")}
          </motion.p>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={onOpenWizard}
            className="mt-6 flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-3 text-xs font-bold text-dark glow-cyan transition-transform hover:scale-105 sm:mt-8 sm:px-6 sm:text-sm"
          >
            <MessageCircle size={18} />
            {t("cta")}
          </motion.button>

          {/* Proof bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 flex flex-wrap items-center gap-3 text-xs sm:mt-8 sm:gap-4 sm:text-sm"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-golden text-golden" />
                ))}
              </div>
              <span className="text-dark/50">{t("clients")}</span>
            </div>
            <span className="text-dark/20">|</span>
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-primary" />
              <span className="text-dark/50">{t("guarantee")}</span>
            </div>
          </motion.div>
        </div>

        {/* Right image — hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative hidden flex-1 md:block"
        >
          <div className="relative h-[500px] w-full">
            <Image
              src="/images/hero/hero_woman.png"
              alt={t("imageAlt")}
              fill
              className="rounded-2xl object-cover opacity-85"
              sizes="50vw"
            />
            {/* Fade gradient left */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
            {/* Fade gradient bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
