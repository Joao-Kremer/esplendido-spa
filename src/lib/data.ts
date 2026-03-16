import {
  Home,
  Building2,
  Sofa,
  HardHat,
  PanelTop,
  Droplets,
  Bed,
  SquareStack,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  name: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  { name: "Limpeza Doméstica", description: "Limpeza de pó, desinfetação e aspiração", icon: Home },
  { name: "Limpeza Comercial", description: "Espaços comerciais e empresariais", icon: Building2 },
  { name: "Higienização Sofás", description: "Pulverização, escovagem e lavagem", icon: Sofa },
  { name: "Limpeza Pós-obra", description: "Recolha de entulho e limpeza profunda", icon: HardHat },
  { name: "Vidros/Janelas/Estores", description: "Limpeza interior e exterior com produtos específicos", icon: PanelTop },
  { name: "Bolor e Humidade", description: "Remoção de fungos em paredes e tetos", icon: Droplets },
  { name: "Higiene Colchões", description: "Pulverização, escovagem e lavagem", icon: Bed },
  { name: "Higiene Tapetes", description: "Aspiração profunda e shampoo", icon: SquareStack },
];

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  { name: "Marta Pereira", text: "Minha casa parece nova depois da limpeza. Equipa muito simpática.", rating: 5 },
  { name: "Manuel Oliveira", text: "Serviço de limpeza de janelas impecável.", rating: 5 },
  { name: "João Santos", text: "Atendimento de primeira, serviço de alta qualidade.", rating: 5 },
  { name: "Ana Silveira", text: "Limpeza pós-obra incrível.", rating: 5 },
];

export interface Step {
  number: string;
  title: string;
  description: string;
  iconColor: string;
}

export const steps: Step[] = [
  { number: "01", title: "Escolha o serviço", description: "Selecione o tipo de limpeza que precisa no nosso menu de serviços.", iconColor: "text-accent" },
  { number: "02", title: "Agende pelo WhatsApp", description: "Preencha os detalhes e envie diretamente para o nosso WhatsApp.", iconColor: "text-primary" },
  { number: "03", title: "Receba a equipa", description: "A nossa equipa treinada chega na data marcada, pronta para transformar o seu espaço.", iconColor: "text-golden" },
];

export const stats = [
  { value: 300, suffix: "+", label: "Clientes felizes", color: "text-primary" },
  { value: 4.9, suffix: "★", label: "Avaliação média", color: "text-golden", decimals: 1 },
  { value: 20, suffix: "+", label: "Profissionais", color: "text-accent" },
];

export const contacts = {
  phone: "910 725 044",
  email: "contatocliente@esplendidoapp.com",
  whatsapp: "351910725044",
  hours: "Seg-Sex 08:00-17:00",
  area: "Lisboa & Margem Sul",
  social: {
    facebook: "https://facebook.com/esplendido",
    instagram: "https://instagram.com/esplendido",
    tiktok: "https://tiktok.com/@esplendido",
  },
};

export const frequencyOptions = ["Pontual", "Semanal", "Quinzenal", "Mensal"] as const;
export const zoneOptions = ["Lisboa Centro", "Margem Sul", "Outra"] as const;
