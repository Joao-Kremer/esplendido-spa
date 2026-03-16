"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronRight, ChevronLeft, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { services, frequencyOptions, zoneOptions } from "@/lib/data";
import { wizardSchema, type WizardFormData, buildWhatsAppUrl } from "@/lib/wizard-schema";

interface WizardDrawerProps {
  open: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const TOTAL_STEPS = 5;

export default function WizardDrawer({ open, onClose, preselectedService }: WizardDrawerProps) {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<WizardFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(wizardSchema) as any,
    defaultValues: {
      service: preselectedService ?? "",
      frequency: "",
      area: undefined,
      zone: "",
      notes: "",
    },
  });

  const selectedService = watch("service");
  const selectedFrequency = watch("frequency");
  const selectedZone = watch("zone");

  useEffect(() => {
    if (preselectedService) {
      setValue("service", preselectedService);
    }
  }, [preselectedService, setValue]);

  function onSubmit(data: WizardFormData) {
    const url = buildWhatsAppUrl(data);
    window.open(url, "_blank");
    handleClose();
  }

  function handleClose() {
    setStep(1);
    reset();
    onClose();
  }

  function nextStep() {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 1));
  }

  const canAdvance = () => {
    if (step === 1) return !!selectedService;
    if (step === 3) {
      const area = watch("area");
      return area !== undefined && area > 0;
    }
    return true;
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-dark/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl md:rounded-l-2xl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-neutral px-6 py-4">
                <h3 className="font-heading text-lg font-bold text-dark">
                  Agendar serviço
                </h3>
                <button onClick={handleClose} className="text-dark/40 hover:text-dark">
                  <X size={20} />
                </button>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-neutral">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <form id="wizard-form" onSubmit={handleSubmit(onSubmit)}>
                  {/* Step 1: Service */}
                  {step === 1 && (
                    <div>
                      <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-dark/50">
                        Qual serviço precisa?
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {services.map((s) => {
                          const Icon = s.icon;
                          const isSelected = selectedService === s.name;
                          return (
                            <button
                              key={s.name}
                              type="button"
                              onClick={() => setValue("service", s.name)}
                              className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all ${
                                isSelected
                                  ? "border-primary bg-primary/5"
                                  : "border-neutral hover:border-primary/30"
                              }`}
                            >
                              <Icon size={24} className={isSelected ? "text-primary" : "text-dark/40"} />
                              <span className="text-xs font-medium text-dark">{s.name}</span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.service && (
                        <p className="mt-2 text-xs text-accent">{errors.service.message}</p>
                      )}
                    </div>
                  )}

                  {/* Step 2: Frequency */}
                  {step === 2 && (
                    <div>
                      <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-dark/50">
                        Com que frequência?
                      </h4>
                      <div className="flex flex-col gap-3">
                        {frequencyOptions.map((f) => (
                          <button
                            key={f}
                            type="button"
                            onClick={() => setValue("frequency", f)}
                            className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all ${
                              selectedFrequency === f
                                ? "border-primary bg-primary/5 text-dark"
                                : "border-neutral text-dark/60 hover:border-primary/30"
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Area */}
                  {step === 3 && (
                    <div>
                      <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-dark/50">
                        Qual a área do espaço?
                      </h4>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="Ex: 80"
                          {...register("area")}
                          className="w-full rounded-xl border-2 border-neutral px-4 py-3 pr-12 text-dark outline-none transition-colors focus:border-primary"
                        />
                        <span className="absolute top-1/2 right-4 -translate-y-1/2 text-sm text-dark/40">
                          m²
                        </span>
                      </div>
                      {errors.area && (
                        <p className="mt-2 text-xs text-accent">{errors.area.message}</p>
                      )}
                    </div>
                  )}

                  {/* Step 4: Zone */}
                  {step === 4 && (
                    <div>
                      <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-dark/50">
                        Qual a zona?
                      </h4>
                      <div className="flex flex-col gap-3">
                        {zoneOptions.map((z) => (
                          <button
                            key={z}
                            type="button"
                            onClick={() => setValue("zone", z)}
                            className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all ${
                              selectedZone === z
                                ? "border-primary bg-primary/5 text-dark"
                                : "border-neutral text-dark/60 hover:border-primary/30"
                            }`}
                          >
                            {z}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 5: Notes */}
                  {step === 5 && (
                    <div>
                      <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-dark/50">
                        Observações (opcional)
                      </h4>
                      <textarea
                        placeholder="Algo que devemos saber? Detalhes especiais, horário preferido..."
                        {...register("notes")}
                        rows={4}
                        className="w-full resize-none rounded-xl border-2 border-neutral px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-primary"
                      />
                    </div>
                  )}
                </form>
              </div>

              {/* Footer navigation */}
              <div className="flex items-center justify-between border-t border-neutral px-6 py-4">
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className="flex items-center gap-1 text-sm text-dark/40 transition-colors hover:text-dark disabled:invisible"
                >
                  <ChevronLeft size={16} />
                  Voltar
                </button>

                {step < TOTAL_STEPS ? (
                  <button
                    onClick={nextStep}
                    disabled={!canAdvance()}
                    className="flex items-center gap-1 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-dark transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                  >
                    Próximo
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="wizard-form"
                    className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-dark transition-all hover:scale-105"
                  >
                    <MessageCircle size={16} />
                    Enviar pelo WhatsApp
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
