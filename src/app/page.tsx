"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import SocialProof from "@/components/SocialProof";
import CoverageMap from "@/components/CoverageMap";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import ChatBotBubble from "@/components/ChatBotBubble";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
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

  return (
    <>
      <Navbar onOpenWizard={() => openChat()} />
      <main>
        <Hero onOpenWizard={() => openChat()} />
        <About />
        <Services onOpenWizard={openChat} />
        <WhyChooseUs />
        <HowItWorks onOpenWizard={() => openChat()} />
        <SocialProof />
        <CoverageMap />
        <FinalCTA onOpenWizard={() => openChat()} />
        <Footer onOpenWizard={() => openChat()} />
      </main>
      <ChatBotBubble visible={!chatOpen} onClick={openChatMenu} />
      <ChatBot
        open={chatOpen}
        onClose={closeChat}
        initialFlow={initialFlow}
        initialStep={initialStep}
        preselectedService={preselectedService}
      />
    </>
  );
}
