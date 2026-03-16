import { services } from "./data";
import { contacts } from "./data";

// --- Types ---

export type ChatAction =
  | { type: "goto"; flow: string; step: string }
  | { type: "goto_menu" }
  | { type: "whatsapp"; message: string }
  | { type: "phone" }
  | { type: "set_field"; field: string; value: string | number; nextStep: string }
  | { type: "show_area_input"; nextStep: string }
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
}

export interface ChatFlow {
  id: string;
  nodes: ChatNode[];
}

// --- Helpers ---

function getNode(flow: ChatFlow, stepId: string): ChatNode | undefined {
  return flow.nodes.find((n) => n.id === stepId);
}

// --- Flows ---

const menuFlow: ChatFlow = {
  id: "menu",
  nodes: [
    {
      id: "main",
      messages: ["Olá! Sou o assistente da Esplêndido. Como posso ajudar?"],
      buttons: [
        { label: "📋 Agendar Serviço", action: { type: "goto", flow: "booking", step: "service" } },
        { label: "🔍 Conhecer Serviços", action: { type: "goto", flow: "services_info", step: "menu" } },
        { label: "💬 Falar com Suporte", action: { type: "goto", flow: "support", step: "main" } },
        { label: "🏢 Sobre a Esplêndido", action: { type: "goto", flow: "about", step: "main" } },
        { label: "📍 Locais de Atendimento", action: { type: "goto", flow: "locations", step: "main" } },
        { label: "🧴 Produtos Utilizados", action: { type: "goto", flow: "products", step: "main" } },
        { label: "❓ Perguntas Frequentes", action: { type: "goto", flow: "faq", step: "menu" } },
      ],
    },
  ],
};

const bookingFlow: ChatFlow = {
  id: "booking",
  nodes: [
    {
      id: "service",
      messages: ["Qual serviço precisa?"],
      buttons: services.map((s) => ({
        label: s.name,
        action: { type: "set_field" as const, field: "service", value: s.name, nextStep: "frequency" },
      })),
    },
    {
      id: "frequency",
      messages: ["Com que frequência?"],
      buttons: [
        { label: "Pontual", action: { type: "set_field", field: "frequency", value: "Pontual", nextStep: "area" } },
        { label: "Semanal", action: { type: "set_field", field: "frequency", value: "Semanal", nextStep: "area" } },
        { label: "Quinzenal", action: { type: "set_field", field: "frequency", value: "Quinzenal", nextStep: "area" } },
        { label: "Mensal", action: { type: "set_field", field: "frequency", value: "Mensal", nextStep: "area" } },
        { label: "Pular", action: { type: "set_field", field: "frequency", value: "", nextStep: "area" } },
      ],
    },
    {
      id: "area",
      messages: ["Qual a área do espaço em m²?"],
      buttons: [
        { label: "Inserir área", action: { type: "show_area_input", nextStep: "zone" } },
      ],
    },
    {
      id: "zone",
      messages: ["Qual a zona?"],
      buttons: [
        { label: "Lisboa Centro", action: { type: "set_field", field: "zone", value: "Lisboa Centro", nextStep: "notes" } },
        { label: "Margem Sul", action: { type: "set_field", field: "zone", value: "Margem Sul", nextStep: "notes" } },
        { label: "Outra", action: { type: "set_field", field: "zone", value: "Outra", nextStep: "notes" } },
      ],
    },
    {
      id: "notes",
      messages: ["Tem alguma observação?"],
      buttons: [
        { label: "Sim, quero escrever", action: { type: "show_notes_input", nextStep: "summary" } },
        { label: "Não, enviar agora", action: { type: "goto", flow: "booking", step: "summary" } },
      ],
    },
    {
      id: "summary",
      messages: [], // summary is dynamically generated in ChatBot.tsx
      buttons: [
        { label: "📧 Enviar pedido", action: { type: "submit_booking" } },
        { label: "🔄 Recomeçar", action: { type: "restart" } },
      ],
    },
  ],
};

const supportFlow: ChatFlow = {
  id: "support",
  nodes: [
    {
      id: "main",
      messages: ["Como prefere entrar em contacto com o nosso suporte?"],
      buttons: [
        { label: "💬 WhatsApp", action: { type: "whatsapp", message: "Olá, preciso de suporte." } },
        { label: "📞 Ligar agora", action: { type: "phone" } },
        { label: "Voltar ao menu", action: { type: "goto_menu" } },
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
        "A Esplêndido é uma empresa de serviços de limpeza profissional em Lisboa e Margem Sul.",
        "Com mais de 300 clientes satisfeitos, oferecemos equipa fixa e treinada, produtos eco-friendly e 100% garantia de satisfação.",
        "A nossa missão é transformar espaços com qualidade, confiança e um atendimento esplêndido.",
      ],
      buttons: [
        { label: "Voltar ao menu", action: { type: "goto_menu" } },
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
        "Atualmente atendemos nas seguintes zonas:",
        "📍 Lisboa Centro — Baixa, Chiado, Avenida, Saldanha, Marquês, Parque das Nações, Benfica, Lumiar, Telheiras, Campo de Ourique",
        "📍 Margem Sul — Almada, Seixal, Barreiro, Montijo, Setúbal",
        "Quer agendar um serviço na sua zona?",
      ],
      buttons: [
        { label: "Agendar Serviço", action: { type: "goto", flow: "booking", step: "service" } },
        { label: "Voltar ao menu", action: { type: "goto_menu" } },
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
        "Utilizamos apenas produtos profissionais eco-friendly e biodegradáveis, seguros para crianças e animais de estimação.",
        "🧴 Limpeza geral: Produtos multi-superfície certificados",
        "🌿 Desinfetação: Soluções hospitalares de baixa toxicidade",
        "🛋️ Estofados: Shampoos neutros específicos para tecidos",
        "Todos os nossos produtos são aprovados e seguem normas europeias de segurança.",
      ],
      buttons: [
        { label: "Voltar ao menu", action: { type: "goto_menu" } },
      ],
    },
  ],
};

const faqFlow: ChatFlow = {
  id: "faq",
  nodes: [
    {
      id: "menu",
      messages: ["Sobre o que gostaria de saber?"],
      buttons: [
        { label: "Qual a garantia?", action: { type: "goto", flow: "faq", step: "guarantee" } },
        { label: "Como funciona o pagamento?", action: { type: "goto", flow: "faq", step: "payment" } },
        { label: "A equipa é fixa?", action: { type: "goto", flow: "faq", step: "team" } },
        { label: "Preciso estar em casa?", action: { type: "goto", flow: "faq", step: "presence" } },
        { label: "Quero saber o preço", action: { type: "goto", flow: "faq", step: "price" } },
        { label: "Voltar ao menu", action: { type: "goto_menu" } },
      ],
    },
    {
      id: "guarantee",
      messages: ["Oferecemos 100% garantia de satisfação. A nossa equipa é treinada para entregar sempre o melhor resultado, com total compromisso e profissionalismo."],
      buttons: [
        { label: "Outra pergunta", action: { type: "goto", flow: "faq", step: "menu" } },
        { label: "Voltar ao menu", action: { type: "goto_menu" } },
      ],
    },
    {
      id: "payment",
      messages: ["O pagamento é feito após a realização do serviço. Aceitamos transferência bancária e MBWay. Para planos mensais, o pagamento é feito ao final do primeiro mês."],
      buttons: [
        { label: "Outra pergunta", action: { type: "goto", flow: "faq", step: "menu" } },
        { label: "Voltar ao menu", action: { type: "goto_menu" } },
      ],
    },
    {
      id: "team",
      messages: ["Sim! Mantemos a mesma equipa para cada cliente, para que conheçam o seu espaço e as suas preferências."],
      buttons: [
        { label: "Outra pergunta", action: { type: "goto", flow: "faq", step: "menu" } },
        { label: "Voltar ao menu", action: { type: "goto_menu" } },
      ],
    },
    {
      id: "presence",
      messages: ["Não é obrigatório. Muitos clientes entregam a chave à nossa equipa de confiança. Todos os profissionais são verificados e segurados."],
      buttons: [
        { label: "Outra pergunta", action: { type: "goto", flow: "faq", step: "menu" } },
        { label: "Voltar ao menu", action: { type: "goto_menu" } },
      ],
    },
    {
      id: "price",
      messages: ["Para um orçamento personalizado, entre em contacto pelo WhatsApp!"],
      buttons: [
        { label: "Abrir WhatsApp", action: { type: "whatsapp", message: "Olá, gostaria de saber o preço dos serviços." } },
        { label: "Outra pergunta", action: { type: "goto", flow: "faq", step: "menu" } },
        { label: "Voltar ao menu", action: { type: "goto_menu" } },
      ],
    },
  ],
};

const servicesInfoFlow: ChatFlow = {
  id: "services_info",
  nodes: [
    {
      id: "menu",
      messages: ["Sobre qual serviço gostaria de saber mais?"],
      buttons: services.map((s) => ({
        label: s.name,
        action: { type: "goto" as const, flow: "services_info", step: s.name.toLowerCase().replace(/[\s\/]/g, "-") },
      })),
    },
    ...services.map((s): ChatNode => ({
      id: s.name.toLowerCase().replace(/[\s\/]/g, "-"),
      messages: [
        `✨ ${s.name}`,
        ...s.details,
        `O que inclui:\n${s.includes.map((item) => `• ${item}`).join("\n")}`,
      ],
      buttons: [
        { label: "📋 Agendar este serviço", action: { type: "set_field", field: "service", value: s.name, nextStep: "frequency" } },
        { label: "Outro serviço", action: { type: "goto", flow: "services_info", step: "menu" } },
        { label: "Voltar ao menu", action: { type: "goto_menu" } },
      ],
    })),
  ],
};

// --- Exports ---

export const flows: Record<string, ChatFlow> = {
  menu: menuFlow,
  booking: bookingFlow,
  services_info: servicesInfoFlow,
  support: supportFlow,
  about: aboutFlow,
  locations: locationsFlow,
  products: productsFlow,
  faq: faqFlow,
};

export function getFlowNode(flowId: string, stepId: string): ChatNode | undefined {
  const flow = flows[flowId];
  if (!flow) return undefined;
  return getNode(flow, stepId);
}

export const WHATSAPP_BASE = `https://wa.me/${contacts.whatsapp}`;
