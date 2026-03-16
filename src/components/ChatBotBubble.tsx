"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface ChatBotBubbleProps {
  visible: boolean;
  onClick: () => void;
}

export default function ChatBotBubble({ visible, onClick }: ChatBotBubbleProps) {
  const [shouldPulse, setShouldPulse] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShouldPulse(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", damping: 15, stiffness: 200 }}
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-dark shadow-lg transition-transform hover:scale-110 ${
        shouldPulse ? "animate-pulse-glow" : "glow-cyan"
      }`}
      aria-label="Abrir chat"
    >
      <MessageCircle size={24} />
    </motion.button>
  );
}
