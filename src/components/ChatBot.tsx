"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Bot } from "lucide-react";
import { getFlowNode, WHATSAPP_BASE, type ChatButton as FlowButton } from "@/lib/chatbot-flows";
import { buildWhatsAppUrl, type WizardFormData } from "@/lib/wizard-schema";
import { contacts } from "@/lib/data";

// --- Types ---

interface DisplayMessage {
  id: number;
  sender: "bot" | "user";
  text: string;
}

interface ChatBotProps {
  open: boolean;
  onClose: () => void;
  initialFlow?: string;
  initialStep?: string;
  preselectedService?: string;
}

// --- Component ---

export default function ChatBot({
  open,
  onClose,
  initialFlow,
  initialStep,
  preselectedService,
}: ChatBotProps) {
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [activeButtons, setActiveButtons] = useState<FlowButton[]>([]);
  const [showNotes, setShowNotes] = useState(false);
  const [notesValue, setNotesValue] = useState("");
  const [notesNextStep, setNotesNextStep] = useState("");
  const [formData, setFormData] = useState<Partial<WizardFormData>>({});
  const [isTyping, setIsTyping] = useState(false);
  const msgIdRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);
  const processingRef = useRef(false);

  // --- Helpers ---

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
  }, []);

  const addMessage = useCallback(
    (sender: "bot" | "user", text: string) => {
      const id = ++msgIdRef.current;
      setMessages((prev) => [...prev, { id, sender, text }]);
      scrollToBottom();
    },
    [scrollToBottom]
  );

  const addBotMessages = useCallback(
    async (texts: string[], buttons: FlowButton[]) => {
      setActiveButtons([]);
      setIsTyping(true);

      for (let i = 0; i < texts.length; i++) {
        if (i > 0) await new Promise((r) => setTimeout(r, 400));
        addMessage("bot", texts[i]);
      }

      setIsTyping(false);
      setActiveButtons(buttons);
      scrollToBottom();
    },
    [addMessage, scrollToBottom]
  );

  const navigateToNode = useCallback(
    async (flowId: string, stepId: string) => {
      const node = getFlowNode(flowId, stepId);
      if (!node) return;

      // Special case: booking summary — generate dynamic messages
      if (flowId === "booking" && stepId === "summary") {
        const lines = ["Perfeito! Aqui está o resumo:"];
        if (formData.service) lines.push(`📋 Serviço: ${formData.service}`);
        if (formData.frequency) lines.push(`🔄 Frequência: ${formData.frequency}`);
        if (formData.area) lines.push(`📐 Área: ${formData.area} m²`);
        if (formData.zone) lines.push(`📍 Zona: ${formData.zone}`);
        if (formData.notes) lines.push(`📝 Observações: ${formData.notes}`);
        await addBotMessages(lines, node.buttons ?? []);
        return;
      }

      await addBotMessages(node.messages, node.buttons ?? []);
    },
    [addBotMessages, formData]
  );

  // --- Initialize on open ---

  useEffect(() => {
    if (!open) {
      hasInitialized.current = false;
      return;
    }
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Reset state
    setMessages([]);
    setActiveButtons([]);
    setFormData({});
    setShowNotes(false);
    setNotesValue("");
    msgIdRef.current = 0;

    if (preselectedService) {
      // Pre-select service: show as user response, jump to frequency
      const welcomeNode = getFlowNode("menu", "main");
      if (welcomeNode) {
        addBotMessages(welcomeNode.messages, []).then(() => {
          addMessage("user", "📋 Agendar Serviço");
          setTimeout(() => {
            addMessage("bot", "Qual serviço precisa?");
            setTimeout(() => {
              addMessage("user", preselectedService);
              setFormData((prev) => ({ ...prev, service: preselectedService }));
              setTimeout(() => navigateToNode("booking", "frequency"), 400);
            }, 300);
          }, 400);
        });
      }
    } else if (initialFlow && initialStep) {
      // Direct navigation (e.g., CTA without service)
      const welcomeNode = getFlowNode("menu", "main");
      if (welcomeNode && initialFlow === "booking") {
        addBotMessages(welcomeNode.messages, []).then(() => {
          addMessage("user", "📋 Agendar Serviço");
          setTimeout(() => navigateToNode(initialFlow, initialStep), 400);
        });
      } else {
        navigateToNode(initialFlow, initialStep);
      }
    } else {
      // Menu principal
      navigateToNode("menu", "main");
    }
  }, [open, preselectedService, initialFlow, initialStep, addBotMessages, addMessage, navigateToNode]);

  // --- Button handler ---

  const handleButtonClick = useCallback(
    (button: FlowButton) => {
      if (processingRef.current) return;
      processingRef.current = true;

      // Show user response
      addMessage("user", button.label);
      setActiveButtons([]);

      const action = button.action;

      setTimeout(async () => {
        switch (action.type) {
          case "goto":
            await navigateToNode(action.flow, action.step);
            break;

          case "goto_menu":
            setFormData({});
            setShowNotes(false);
            await navigateToNode("menu", "main");
            break;

          case "restart":
            setFormData({});
            setShowNotes(false);
            await navigateToNode("menu", "main");
            break;

          case "whatsapp": {
            const url = `${WHATSAPP_BASE}?text=${encodeURIComponent(action.message)}`;
            window.open(url, "_blank");
            break;
          }

          case "set_field":
            setFormData((prev) => ({ ...prev, [action.field]: action.value }));
            await navigateToNode("booking", action.nextStep);
            break;

          case "show_notes_input":
            setShowNotes(true);
            setNotesNextStep(action.nextStep);
            scrollToBottom();
            break;

          case "submit_booking": {
            const data: WizardFormData = {
              service: formData.service ?? "",
              frequency: formData.frequency,
              area: formData.area ?? 0,
              zone: formData.zone,
              notes: formData.notes,
            };
            const url = buildWhatsAppUrl(data);
            window.open(url, "_blank");
            break;
          }
        }
        processingRef.current = false;
      }, 300);
    },
    [addMessage, navigateToNode, formData, scrollToBottom]
  );

  const handleNotesConfirm = useCallback(() => {
    setFormData((prev) => ({ ...prev, notes: notesValue }));
    setShowNotes(false);
    if (notesValue.trim()) {
      addMessage("user", notesValue);
    } else {
      addMessage("user", "(sem observações)");
    }
    setTimeout(() => navigateToNode("booking", notesNextStep), 400);
  }, [notesValue, notesNextStep, addMessage, navigateToNode]);

  // --- Render ---

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-dark/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl md:rounded-l-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-neutral px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                <Bot size={18} className="text-dark" />
              </div>
              <h3 className="flex-1 font-heading text-base font-bold text-dark">
                Esplêndido
              </h3>
              <button onClick={onClose} className="text-dark/40 hover:text-dark">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 font-body">
              <div className="flex flex-col gap-3">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "rounded-2xl rounded-tr-md bg-primary text-dark"
                          : "rounded-2xl rounded-tl-md bg-neutral text-dark"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="rounded-2xl rounded-tl-md bg-neutral px-4 py-3 text-dark/40">
                      <span className="inline-flex gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-dark/30" style={{ animationDelay: "0ms" }} />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-dark/30" style={{ animationDelay: "150ms" }} />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-dark/30" style={{ animationDelay: "300ms" }} />
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Action buttons */}
                {activeButtons.length > 0 && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-wrap gap-2 pt-1"
                  >
                    {activeButtons.map((btn) => (
                      <button
                        key={btn.label}
                        onClick={() => handleButtonClick(btn)}
                        className="rounded-xl border border-primary/30 px-4 py-2 text-sm text-dark transition-colors hover:bg-primary/10"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* Notes textarea */}
                {showNotes && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-2 pt-1"
                  >
                    <textarea
                      value={notesValue}
                      onChange={(e) => setNotesValue(e.target.value)}
                      placeholder="Escreva aqui as suas observações..."
                      rows={3}
                      className="w-full resize-none rounded-xl border-2 border-neutral px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-primary"
                      autoFocus
                    />
                    <button
                      onClick={handleNotesConfirm}
                      className="self-end rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-dark transition-transform hover:scale-105"
                    >
                      Confirmar
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
