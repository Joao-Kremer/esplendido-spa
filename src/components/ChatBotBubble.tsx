"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface ChatBotBubbleProps {
  visible: boolean;
  onClick: () => void;
}

export default function ChatBotBubble({ visible, onClick }: ChatBotBubbleProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 180, delay: 0.3 }}
          className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6"
        >
          {/* Outer ping rings */}
          <span
            className="absolute inset-[-4px] rounded-full border-2 border-primary/30"
            style={{ animation: "bubble-ping 2.5s ease-out infinite" }}
          />
          <span
            className="absolute inset-[-4px] rounded-full border-2 border-primary/20"
            style={{ animation: "bubble-ping 2.5s ease-out infinite 1.25s" }}
          />

          {/* Glow backdrop */}
          <div className="absolute inset-[-8px] rounded-full bg-primary/15 blur-xl" />

          <button
            onClick={onClick}
            className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-primary text-dark shadow-[0_4px_24px_rgba(0,218,255,0.45),0_0_60px_rgba(0,218,255,0.15)] transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_32px_rgba(0,218,255,0.6),0_0_80px_rgba(0,218,255,0.25)] active:scale-95 sm:h-[64px] sm:w-[64px]"
            style={{ animation: "bounce-subtle 3s ease-in-out infinite" }}
            aria-label="Abrir chat"
          >
            <MessageCircle size={26} strokeWidth={2.2} />

            {/* Online dot */}
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center">
              <span className="absolute h-full w-full animate-ping rounded-full bg-green-400 opacity-40" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
