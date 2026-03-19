import { contacts } from "./data";

// --- Types ---

export type ChatAction =
  | { type: "goto"; flow: string; step: string }
  | { type: "goto_menu" }
  | { type: "whatsapp"; message: string }
  | { type: "phone" }
  | { type: "set_field"; field: string; value: string | number; nextStep: string }
  | { type: "show_text_input"; field: string; nextStep: string }
  | { type: "show_notes_input"; nextStep: string }
  | { type: "submit_booking" }
  | { type: "restart" };

export interface ChatButton {
  label: string;
  action: ChatAction;
}

export interface ChatNode {
  id: string;
  messages: string[];
  buttons?: ChatButton[];
  autoInput?: { field: string; nextStep: string; backStep?: { flow: string; step: string } };
}

export interface ChatFlow {
  id: string;
  nodes: ChatNode[];
}

// --- Helpers ---

function getNode(flow: ChatFlow, stepId: string): ChatNode | undefined {
  return flow.nodes.find((n) => n.id === stepId);
}

// --- Service info item shape (from translations) ---

interface ServiceItem {
  name: string;
  description?: string;
  details: string[];
  includes: string[];
}

// --- Build flows from translations ---

export function buildFlows(
  t: (key: string) => string,
  serviceNames: string[],
  serviceItems?: ServiceItem[]
): Record<string, ChatFlow> {
  const menuFlow: ChatFlow = {
    id: "menu",
    nodes: [
      {
        id: "main",
        messages: [t("menu.greeting")],
        buttons: [
          { label: t("menu.bookService"), action: { type: "goto", flow: "booking", step: "service" } },
          { label: t("menu.knowServices"), action: { type: "goto", flow: "services_info", step: "menu" } },
          { label: t("menu.talkSupport"), action: { type: "goto", flow: "support", step: "main" } },
          { label: t("menu.aboutCompany"), action: { type: "goto", flow: "about", step: "main" } },
          { label: t("menu.locations"), action: { type: "goto", flow: "locations", step: "main" } },
          { label: t("menu.products"), action: { type: "goto", flow: "products", step: "main" } },
          { label: t("menu.faq"), action: { type: "goto", flow: "faq", step: "menu" } },
        ],
      },
    ],
  };

  const bookingFlow: ChatFlow = {
    id: "booking",
    nodes: [
      {
        id: "service",
        messages: [t("booking.whichService")],
        buttons: serviceNames.map((name) => ({
          label: name,
          action: { type: "set_field" as const, field: "service", value: name, nextStep: "name" },
        })),
      },
      {
        id: "name",
        messages: [t("booking.askName")],
        autoInput: { field: "name", nextStep: "postalCode" },
      },
      {
        id: "postalCode",
        messages: [t("booking.askPostalCode")],
        autoInput: { field: "postalCode", nextStep: "contact", backStep: { flow: "booking", step: "name" } },
      },
      {
        id: "contact",
        messages: [t("booking.askContact")],
        autoInput: { field: "contact", nextStep: "message", backStep: { flow: "booking", step: "postalCode" } },
      },
      {
        id: "message",
        messages: [t("booking.askMessage")],
        buttons: [
          { label: t("booking.yesWrite"), action: { type: "show_notes_input", nextStep: "summary" } },
          { label: t("booking.noSendNow"), action: { type: "goto", flow: "booking", step: "summary" } },
          { label: t("booking.back"), action: { type: "goto", flow: "booking", step: "contact" } },
        ],
      },
      {
        id: "summary",
        messages: [], // summary is dynamically generated in ChatBot.tsx
        buttons: [
          { label: t("booking.submitBooking"), action: { type: "submit_booking" } },
          { label: t("booking.restart"), action: { type: "restart" } },
          { label: t("booking.back"), action: { type: "goto", flow: "booking", step: "message" } },
        ],
      },
    ],
  };

  const supportFlow: ChatFlow = {
    id: "support",
    nodes: [
      {
        id: "main",
        messages: [t("support.message")],
        buttons: [
          { label: t("support.whatsapp"), action: { type: "whatsapp", message: t("support.whatsappMessage") } },
          { label: t("support.call"), action: { type: "phone" } },
          { label: t("support.backToMenu"), action: { type: "goto_menu" } },
        ],
      },
    ],
  };

  const aboutFlow: ChatFlow = {
    id: "about",
    nodes: [
      {
        id: "main",
        messages: [
          t("about.message1"),
          t("about.message2"),
          t("about.message3"),
        ],
        buttons: [
          { label: t("about.backToMenu"), action: { type: "goto_menu" } },
        ],
      },
    ],
  };

  const locationsFlow: ChatFlow = {
    id: "locations",
    nodes: [
      {
        id: "main",
        messages: [
          t("locations.message1"),
          t("locations.message2"),
          t("locations.message3"),
          t("locations.message4"),
        ],
        buttons: [
          { label: t("locations.bookService"), action: { type: "goto", flow: "booking", step: "service" } },
          { label: t("locations.backToMenu"), action: { type: "goto_menu" } },
        ],
      },
    ],
  };

  const productsFlow: ChatFlow = {
    id: "products",
    nodes: [
      {
        id: "main",
        messages: [
          t("products.message1"),
          t("products.message2"),
          t("products.message3"),
          t("products.message4"),
          t("products.message5"),
        ],
        buttons: [
          { label: t("products.backToMenu"), action: { type: "goto_menu" } },
        ],
      },
    ],
  };

  const faqFlow: ChatFlow = {
    id: "faq",
    nodes: [
      {
        id: "menu",
        messages: [t("faq.menuQuestion")],
        buttons: [
          { label: t("faq.guaranteeQuestion"), action: { type: "goto", flow: "faq", step: "guarantee" } },
          { label: t("faq.paymentQuestion"), action: { type: "goto", flow: "faq", step: "payment" } },
          { label: t("faq.teamQuestion"), action: { type: "goto", flow: "faq", step: "team" } },
          { label: t("faq.presenceQuestion"), action: { type: "goto", flow: "faq", step: "presence" } },
          { label: t("faq.priceQuestion"), action: { type: "goto", flow: "faq", step: "price" } },
          { label: t("faq.backToMenu"), action: { type: "goto_menu" } },
        ],
      },
      {
        id: "guarantee",
        messages: [t("faq.guaranteeAnswer")],
        buttons: [
          { label: t("faq.anotherQuestion"), action: { type: "goto", flow: "faq", step: "menu" } },
          { label: t("faq.backToMenu"), action: { type: "goto_menu" } },
        ],
      },
      {
        id: "payment",
        messages: [t("faq.paymentAnswer")],
        buttons: [
          { label: t("faq.anotherQuestion"), action: { type: "goto", flow: "faq", step: "menu" } },
          { label: t("faq.backToMenu"), action: { type: "goto_menu" } },
        ],
      },
      {
        id: "team",
        messages: [t("faq.teamAnswer")],
        buttons: [
          { label: t("faq.anotherQuestion"), action: { type: "goto", flow: "faq", step: "menu" } },
          { label: t("faq.backToMenu"), action: { type: "goto_menu" } },
        ],
      },
      {
        id: "presence",
        messages: [t("faq.presenceAnswer")],
        buttons: [
          { label: t("faq.anotherQuestion"), action: { type: "goto", flow: "faq", step: "menu" } },
          { label: t("faq.backToMenu"), action: { type: "goto_menu" } },
        ],
      },
      {
        id: "price",
        messages: [t("faq.priceAnswer")],
        buttons: [
          { label: t("faq.openWhatsapp"), action: { type: "whatsapp", message: t("faq.whatsappMessage") } },
          { label: t("faq.anotherQuestion"), action: { type: "goto", flow: "faq", step: "menu" } },
          { label: t("faq.backToMenu"), action: { type: "goto_menu" } },
        ],
      },
    ],
  };

  const servicesInfoFlow: ChatFlow = {
    id: "services_info",
    nodes: [
      {
        id: "menu",
        messages: [t("servicesInfo.menuQuestion")],
        buttons: serviceNames.map((name) => ({
          label: name,
          action: { type: "goto" as const, flow: "services_info", step: name.toLowerCase().replace(/[\s\/]/g, "-") },
        })),
      },
      ...(serviceItems ?? []).map((s): ChatNode => ({
        id: s.name.toLowerCase().replace(/[\s\/]/g, "-"),
        messages: [
          `✨ ${s.name}`,
          ...s.details,
          `${t("servicesInfo.includesLabel")}\n${s.includes.map((item) => `• ${item}`).join("\n")}`,
        ],
        buttons: [
          { label: t("servicesInfo.bookThisService"), action: { type: "set_field", field: "service", value: s.name, nextStep: "name" } },
          { label: t("servicesInfo.anotherService"), action: { type: "goto", flow: "services_info", step: "menu" } },
          { label: t("servicesInfo.backToMenu"), action: { type: "goto_menu" } },
        ],
      })),
    ],
  };

  return {
    menu: menuFlow,
    booking: bookingFlow,
    services_info: servicesInfoFlow,
    support: supportFlow,
    about: aboutFlow,
    locations: locationsFlow,
    products: productsFlow,
    faq: faqFlow,
  };
}

// --- Exports ---

export function getFlowNode(
  flowId: string,
  stepId: string,
  builtFlows: Record<string, ChatFlow>
): ChatNode | undefined {
  const flow = builtFlows[flowId];
  if (!flow) return undefined;
  return getNode(flow, stepId);
}

export const WHATSAPP_BASE = `https://wa.me/${contacts.whatsapp}`;
