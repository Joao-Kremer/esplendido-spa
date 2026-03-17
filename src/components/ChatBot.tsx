"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, MessageSquare, Send, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { buildFlows, getFlowNode, WHATSAPP_BASE, type ChatButton as FlowButton } from "@/lib/chatbot-flows";
import { type WizardFormData } from "@/lib/wizard-schema";
import { contacts } from "@/lib/data";

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

export default function ChatBot({
  open,
  onClose,
  initialFlow,
  initialStep,
  preselectedService,
}: ChatBotProps) {
  const t = useTranslations("chatbot");
  const tServices = useTranslations("services");
  const serviceItems = tServices.raw("items") as Array<{name: string; details: string[]; includes: string[]}>;
  const serviceNames = useMemo(() => serviceItems.map((s) => s.name), [serviceItems]);
  const chatFlows = useMemo(
    () => buildFlows((key: string) => t(key as never), serviceNames, serviceItems),
    [t, serviceNames, serviceItems]
  );

  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [activeButtons, setActiveButtons] = useState<FlowButton[]>([]);
  const [showNotes, setShowNotes] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInputField, setTextInputField] = useState("");
  const [textInputValue, setTextInputValue] = useState("");
  const [textInputNextStep, setTextInputNextStep] = useState("");
  const [notesValue, setNotesValue] = useState("");
  const [notesNextStep, setNotesNextStep] = useState("");
  const [formData, setFormData] = useState<Partial<WizardFormData>>({});
  const [isTyping, setIsTyping] = useState(false);
  const msgIdRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);
  const processingRef = useRef(false);

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
      const node = getFlowNode(flowId, stepId, chatFlows);
      if (!node) return;

      if (flowId === "booking" && stepId === "summary") {
        const lines = [t("summaryIntro")];
        if (formData.service) lines.push(t("summaryService", { value: formData.service }));
        if (formData.name) lines.push(t("summaryName", { value: formData.name }));
        if (formData.postalCode) lines.push(t("summaryPostalCode", { value: formData.postalCode }));
        if (formData.contact) lines.push(t("summaryContact", { value: formData.contact }));
        if (formData.message) lines.push(t("summaryMessage", { value: formData.message }));
        await addBotMessages(lines, node.buttons ?? []);
        return;
      }

      await addBotMessages(node.messages, node.buttons ?? []);
    },
    [addBotMessages, formData, chatFlows, t]
  );

  useEffect(() => {
    if (!open) {
      hasInitialized.current = false;
      return;
    }
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    setMessages([]);
    setActiveButtons([]);
    setFormData({});
    setShowNotes(false);
    setShowTextInput(false);
    setNotesValue("");
    setTextInputValue("");
    msgIdRef.current = 0;

    if (preselectedService) {
      const welcomeNode = getFlowNode("menu", "main", chatFlows);
      if (welcomeNode) {
        addBotMessages(welcomeNode.messages, []).then(() => {
          addMessage("user", t("menu.bookService"));
          setTimeout(() => {
            addMessage("bot", t("booking.whichService"));
            setTimeout(() => {
              addMessage("user", preselectedService);
              setFormData((prev) => ({ ...prev, service: preselectedService }));
              setTimeout(() => navigateToNode("booking", "name"), 400);
            }, 300);
          }, 400);
        });
      }
    } else if (initialFlow && initialStep) {
      const welcomeNode = getFlowNode("menu", "main", chatFlows);
      if (welcomeNode && initialFlow === "booking") {
        addBotMessages(welcomeNode.messages, []).then(() => {
          addMessage("user", t("menu.bookService"));
          setTimeout(() => navigateToNode(initialFlow, initialStep), 400);
        });
      } else {
        navigateToNode(initialFlow, initialStep);
      }
    } else {
      navigateToNode("menu", "main");
    }
  }, [open, preselectedService, initialFlow, initialStep, addBotMessages, addMessage, navigateToNode, chatFlows, t]);

  const handleButtonClick = useCallback(
    (button: FlowButton) => {
      if (processingRef.current) return;
      processingRef.current = true;

      addMessage("user", button.label);
      setActiveButtons([]);

      const action = button.action;

      setTimeout(async () => {
        switch (action.type) {
          case "goto":
            await navigateToNode(action.flow, action.step);
            break;

          case "goto_menu":
          case "restart":
            setFormData({});
            setShowNotes(false);
            setShowTextInput(false);
            await navigateToNode("menu", "main");
            break;

          case "whatsapp": {
            const url = `${WHATSAPP_BASE}?text=${encodeURIComponent(action.message)}`;
            window.open(url, "_blank");
            break;
          }

          case "phone":
            window.open(`tel:${contacts.phone.replace(/\s/g, "")}`, "_self");
            break;

          case "set_field":
            setFormData((prev) => ({ ...prev, [action.field]: action.value }));
            await navigateToNode("booking", action.nextStep);
            break;

          case "show_text_input":
            setShowTextInput(true);
            setTextInputField(action.field);
            setTextInputNextStep(action.nextStep);
            setTextInputValue("");
            scrollToBottom();
            break;

          case "show_notes_input":
            setShowNotes(true);
            setNotesNextStep(action.nextStep);
            scrollToBottom();
            break;

          case "submit_booking": {
            const data = {
              service: formData.service ?? "",
              name: formData.name ?? "",
              postalCode: formData.postalCode ?? "",
              contact: formData.contact ?? "",
              message: formData.message ?? "",
            };

            addMessage("bot", t("sendingRequest"));
            scrollToBottom();

            try {
              const res = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });

              if (res.ok) {
                await addBotMessages(
                  [
                    t("requestSuccess"),
                    t("requestSuccessFollowup"),
                    t("requestSuccessContact"),
                  ],
                  [
                    { label: t("whatsappButton"), action: { type: "whatsapp", message: `${t("support.whatsappMessage")} ${data.service}.` } },
                    { label: t("phoneButton"), action: { type: "phone" } },
                    { label: t("backToMenu"), action: { type: "goto_menu" } },
                  ]
                );
              } else {
                await addBotMessages(
                  [t("requestError")],
                  [
                    { label: t("retryButton"), action: { type: "submit_booking" } },
                    { label: t("whatsappButton"), action: { type: "whatsapp", message: `${t("support.whatsappMessage")} ${data.service}.` } },
                    { label: t("phoneButton"), action: { type: "phone" } },
                  ]
                );
              }
            } catch {
              await addBotMessages(
                [t("connectionError")],
                [
                  { label: t("whatsappButton"), action: { type: "whatsapp", message: `${t("support.whatsappMessage")} ${data.service}.` } },
                  { label: t("phoneButton"), action: { type: "phone" } },
                  { label: t("backToMenu"), action: { type: "goto_menu" } },
                ]
              );
            }
            break;
          }
        }
        processingRef.current = false;
      }, 300);
    },
    [addMessage, navigateToNode, formData, scrollToBottom, addBotMessages, t]
  );

  const handleTextInputConfirm = useCallback(() => {
    const val = textInputValue.trim();
    if (!val) return;
    setFormData((prev) => ({ ...prev, [textInputField]: val }));
    setShowTextInput(false);
    addMessage("user", val);
    setTimeout(() => navigateToNode("booking", textInputNextStep), 400);
  }, [textInputValue, textInputField, textInputNextStep, addMessage, navigateToNode]);

  const handleNotesConfirm = useCallback(() => {
    setFormData((prev) => ({ ...prev, message: notesValue }));
    setShowNotes(false);
    addMessage("user", notesValue.trim() || t("noMessage"));
    setTimeout(() => navigateToNode("booking", notesNextStep), 400);
  }, [notesValue, notesNextStep, addMessage, navigateToNode, t]);

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
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%", opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.8 }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed inset-0 z-50 flex w-full flex-col overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] sm:inset-y-4 sm:left-auto sm:right-4 sm:w-[400px] sm:rounded-2xl"
            style={{ background: "linear-gradient(180deg, #0d1e36 0%, #0A1628 40%, #080f1e 100%)" }}
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 px-5 py-4">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.07] ring-1 ring-white/[0.08]">
                <MessageSquare size={18} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-[15px] font-bold text-white">
                  {t("assistantLabel")}
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                  </span>
                  <span className="text-[11px] font-medium text-green-400/80">{t("online")}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/30 transition-all hover:bg-white/[0.06] hover:text-white/60"
              >
                <X size={16} />
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.06]" />

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-5"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="flex flex-col gap-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] whitespace-pre-line text-[13.5px] leading-[1.6] ${
                        msg.sender === "user"
                          ? "rounded-2xl rounded-br-md bg-primary px-4 py-2.5 font-medium text-dark"
                          : "rounded-2xl rounded-bl-md border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-white/80"
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
                    <div className="rounded-2xl rounded-bl-md border border-white/[0.06] bg-white/[0.04] px-5 py-3.5">
                      <span className="inline-flex items-center gap-1">
                        <span className="h-[6px] w-[6px] animate-bounce rounded-full bg-primary/60" style={{ animationDelay: "0ms" }} />
                        <span className="h-[6px] w-[6px] animate-bounce rounded-full bg-primary/60" style={{ animationDelay: "150ms" }} />
                        <span className="h-[6px] w-[6px] animate-bounce rounded-full bg-primary/60" style={{ animationDelay: "300ms" }} />
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Action buttons */}
                {activeButtons.length > 0 && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex flex-wrap gap-2"
                  >
                    {activeButtons.map((btn, idx) => (
                      <motion.button
                        key={btn.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: idx * 0.04 }}
                        onClick={() => handleButtonClick(btn)}
                        className="group relative overflow-hidden rounded-full border border-primary/20 bg-primary/[0.06] px-3.5 py-2.5 text-[13px] font-medium text-primary transition-all duration-200 hover:border-primary/40 hover:bg-primary/[0.12] active:scale-[0.97] sm:px-4"
                      >
                        <span className="relative z-10 flex items-center gap-1.5">
                          {btn.label}
                          <ArrowRight size={12} className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-60" />
                        </span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {/* Text input (name, postal code, contact) */}
                {showTextInput && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      placeholder={t("textInputPlaceholder")}
                      value={textInputValue}
                      onChange={(e) => setTextInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleTextInputConfirm()}
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-primary/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-primary/20"
                      autoFocus
                    />
                    <button
                      onClick={handleTextInputConfirm}
                      disabled={!textInputValue.trim()}
                      className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl bg-primary text-dark transition-all hover:shadow-[0_0_16px_rgba(0,218,255,0.3)] disabled:opacity-20 disabled:hover:shadow-none"
                    >
                      <Send size={16} />
                    </button>
                  </motion.div>
                )}

                {/* Message textarea */}
                {showNotes && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-2"
                  >
                    <textarea
                      value={notesValue}
                      onChange={(e) => setNotesValue(e.target.value)}
                      placeholder={t("messagePlaceholder")}
                      rows={3}
                      className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-primary/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-primary/20"
                      autoFocus
                    />
                    <button
                      onClick={handleNotesConfirm}
                      className="flex items-center gap-2 self-end rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-dark transition-all hover:shadow-[0_0_16px_rgba(0,218,255,0.3)]"
                    >
                      <Send size={14} />
                      {t("confirm")}
                    </button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="relative px-5 py-3">
              <div className="absolute inset-x-0 top-0 h-px bg-white/[0.04]" />
              <p className="text-center text-[10px] tracking-wide text-white/15">
                {t("assistantLabel")}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
