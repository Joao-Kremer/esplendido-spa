"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, MessageCircle, Mail, MessageSquare, Facebook, Instagram } from "lucide-react";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StorySection from "@/components/StorySection";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import SocialProof from "@/components/SocialProof";
import CoverageMap from "@/components/CoverageMap";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import ChatBotBubble from "@/components/ChatBotBubble";
import { contacts } from "@/lib/data";

function AboutUs() {
  const t = useTranslations("aboutUs");
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-heading text-3xl font-bold text-dark md:text-4xl">{t("title")}</h2>
        <p className="mt-2 font-medium text-primary">{t("subtitle")}</p>
        <p className="mt-6 text-base leading-relaxed text-dark/60 md:text-lg">{t("description")}</p>
      </div>
    </section>
  );
}

function PricingBanner() {
  const t = useTranslations("pricing");
  return (
    <section className="bg-dark py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8 md:gap-12">
          <div className="flex items-center gap-2 text-center">
            <span className="text-sm text-white/60">{t("domestic")}</span>
            <span className="font-heading text-lg font-bold text-primary">{t("domesticPrice")}</span>
          </div>
          <div className="hidden h-6 w-px bg-white/15 sm:block" />
          <div className="flex items-center gap-2 text-center">
            <span className="text-sm text-white/60">{t("deep")}</span>
            <span className="font-heading text-lg font-bold text-primary">{t("deepPrice")}</span>
          </div>
          <div className="hidden h-6 w-px bg-white/15 sm:block" />
          <div className="flex items-center gap-2 text-center">
            <span className="text-sm text-white/60">{t("recurring")}</span>
            <span className="font-heading text-lg font-bold text-primary">{t("recurringPrice")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialBar() {
  return (
    <div className="fixed left-3 bottom-4 z-40 flex flex-col gap-2 sm:left-4 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 sm:gap-3">
      <a
        href={contacts.social.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-dark/80 text-white/70 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-primary hover:text-dark"
      >
        <Facebook size={18} />
      </a>
      <a
        href={contacts.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-dark/80 text-white/70 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-primary hover:text-dark"
      >
        <Instagram size={18} />
      </a>
      <a
        href={contacts.social.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-dark/80 text-white/70 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-primary hover:text-dark"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
      </a>
    </div>
  );
}

function QuoteOptionsModal({
  open,
  onClose,
  onChat,
}: {
  open: boolean;
  onClose: () => void;
  onChat: () => void;
}) {
  const t = useTranslations("quoteOptions");
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/[0.08] bg-dark px-5 py-5 shadow-2xl"
          >
            <h3 className="mb-4 text-center font-heading text-sm font-bold text-white/80">
              {t("title")}
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: t("chat"), icon: <MessageCircle size={22} />, onClick: () => { onClose(); onChat(); } },
                { label: t("phone"), icon: <Phone size={22} />, href: `tel:${contacts.phone.replace(/\s/g, "")}` },
                { label: t("email"), icon: <Mail size={22} />, href: `mailto:${contacts.email}` },
                { label: t("whatsapp"), icon: <MessageSquare size={22} />, href: `https://wa.me/${contacts.whatsapp}`, target: "_blank" },
              ].map((item) => {
                const cls = "flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] py-4 text-white/70 transition-all active:scale-95 hover:border-primary/30 hover:bg-primary/[0.08] hover:text-primary";
                return item.href ? (
                  <a key={item.label} href={item.href} target={item.target} rel={item.target ? "noopener noreferrer" : undefined} className={cls}>
                    {item.icon}
                    <span className="text-[11px] font-medium">{item.label}</span>
                  </a>
                ) : (
                  <button key={item.label} onClick={item.onClick} className={cls}>
                    {item.icon}
                    <span className="text-[11px] font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>();
  const [initialFlow, setInitialFlow] = useState<string | undefined>();
  const [initialStep, setInitialStep] = useState<string | undefined>();

  const openChat = useCallback((service?: string) => {
    setPreselectedService(service);
    setInitialFlow("booking");
    setInitialStep("service");
    setChatOpen(true);
  }, []);

  const openChatMenu = useCallback(() => {
    setPreselectedService(undefined);
    setInitialFlow(undefined);
    setInitialStep(undefined);
    setChatOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setChatOpen(false);
    setPreselectedService(undefined);
    setInitialFlow(undefined);
    setInitialStep(undefined);
  }, []);

  const openQuoteModal = useCallback(() => {
    setQuoteModalOpen(true);
  }, []);

  return (
    <>
      <Navbar onOpenWizard={openQuoteModal} />
      <main>
        <Hero onOpenWizard={openQuoteModal} />
        <PricingBanner />
        <AboutUs />
        <StorySection />
        <Services onOpenWizard={openChat} />
        <HowItWorks onOpenWizard={openQuoteModal} />
        <SocialProof />
        <CoverageMap />
        <FinalCTA onOpenWizard={openQuoteModal} />
        <Footer onOpenWizard={openQuoteModal} />
      </main>
      <SocialBar />
      <ChatBotBubble visible={!chatOpen} onClick={openChatMenu} />
      <ChatBot
        open={chatOpen}
        onClose={closeChat}
        initialFlow={initialFlow}
        initialStep={initialStep}
        preselectedService={preselectedService}
      />
      <QuoteOptionsModal
        open={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        onChat={() => openChat()}
      />
    </>
  );
}
