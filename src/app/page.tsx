"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";
import WizardDrawer from "@/components/WizardDrawer";

export default function Home() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>();

  const openWizard = useCallback((service?: string) => {
    setPreselectedService(service);
    setWizardOpen(true);
  }, []);

  const closeWizard = useCallback(() => {
    setWizardOpen(false);
    setPreselectedService(undefined);
  }, []);

  return (
    <>
      <Navbar onOpenWizard={() => openWizard()} />
      <main>
        <Hero onOpenWizard={() => openWizard()} />
        <Services onOpenWizard={openWizard} />
        <HowItWorks onOpenWizard={() => openWizard()} />
        <SocialProof />
        <Footer onOpenWizard={() => openWizard()} />
      </main>
      <WizardDrawer
        open={wizardOpen}
        onClose={closeWizard}
        preselectedService={preselectedService}
      />
    </>
  );
}
