import {
  Home,
  SprayCan,
  Sofa,
  HardHat,
  PanelTop,
  Droplets,
  Bed,
  SquareStack,
  Layers,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  name: string;
  description: string;
  icon: LucideIcon;
  details: string[];
  includes: string[];
}

export const services: Service[] = [
  {
    name: "Limpeza Doméstica Manutenção",
    description: "Limpeza de pó, desinfetação e aspiração",
    icon: Home,
    details: [
      "A nossa equipa limpa minuciosamente todos os cantos de cada divisão, do teto ao chão!",
      "Utilizamos produtos específicos para cada superfície, garantindo uma limpeza profunda e segura.",
    ],
    includes: [
      "Limpeza de poeira em todas as divisões",
      "Desinfetação de superfícies com produtos específicos",
      "Aspiração profissional e limpeza com esfregona",
      "Limpeza e desinfetação de móveis (interior e exterior)",
      "Desinfetação completa de artigos sanitários",
      "Troca de roupa de cama e substituição de sacos de lixo",
      "Lavagem e secagem de louça",
      "Limpeza de vidros, janelas, azulejos, portas e rodapés",
    ],
  },
  {
    name: "Limpeza Profunda",
    description: "Limpeza intensiva de todos os espaços",
    icon: SprayCan,
    details: [
      "Serviço completo de limpeza profunda para quem quer um resultado intensivo e minucioso em todo o espaço.",
      "Ideal para limpezas pontuais, mudanças de estação ou quando o espaço precisa de uma renovação completa.",
    ],
    includes: [
      "Limpeza intensiva de todas as divisões",
      "Desinfetação profunda de superfícies e cantos",
      "Limpeza de rodapés, portas e interruptores",
      "Aspiração e limpeza profunda de pisos",
      "Limpeza detalhada de cozinha e casas de banho",
      "Limpeza interior de eletrodomésticos",
    ],
  },
  {
    name: "Limpeza Pós Obra",
    description: "Recolha de entulho e limpeza profunda",
    icon: HardHat,
    details: [
      "Serviço essencial para preparar um imóvel recém-construído ou renovado para uso.",
      "Eliminamos resíduos de construção, pó, manchas de tinta, cimento e outros materiais, higienizando todas as superfícies de forma profunda.",
    ],
    includes: [
      "Remoção de resíduos: restos de madeira, cimento e detritos",
      "Aspiração e higienização de pisos, paredes, tetos, portas e janelas",
      "Limpeza de vidros, rodapés, tomadas e interruptores",
      "Higienização completa de cozinhas e casas de banho",
      "Desinfetação de maçanetas, corrimãos e luminárias",
      "Inspeção final de qualidade antes da entrega",
    ],
  },
  {
    name: "Limpeza de Bolor e Humidade",
    description: "Remoção de fungos em paredes e tetos",
    icon: Droplets,
    details: [
      "Serviço que visa garantir a saúde e a integridade de ambientes internos através da remoção eficaz de fungos e mofo.",
      "Seguimos uma abordagem sistemática: avaliação, remoção, tratamento preventivo e secagem completa.",
    ],
    includes: [
      "Inspeção detalhada para identificar áreas afetadas e origem da humidade",
      "Remoção de bolor com produtos especializados",
      "Tratamento de superfícies variadas: paredes, tetos, pisos e móveis",
      "Aplicação de soluções antifúngicas preventivas",
      "Secagem completa das áreas tratadas",
    ],
  },
  {
    name: "Limpeza de Vidros, Janelas e Estores",
    description: "Limpeza interior e exterior com produtos específicos",
    icon: PanelTop,
    details: [
      "Serviço essencial para manter a luminosidade e a estética de qualquer espaço.",
      "Combinamos técnicas profissionais com produtos adequados para remover acumulações de poeira, manchas e sujidade.",
    ],
    includes: [
      "Vidros: remoção interna e externa de poeira, manchas e marcas digitais",
      "Janelas: limpeza de molduras, caixilhos e esquadrias",
      "Verificação e limpeza de trilhos e canais de drenagem",
      "Estores: remoção de poeira, teias de aranha e sujidade",
      "Verificação e lubrificação dos mecanismos de funcionamento",
    ],
  },
  {
    name: "Higienização de Sofá",
    description: "Pulverização, escovagem e lavagem",
    icon: Sofa,
    details: [
      "Serviço fundamental para manter um ambiente limpo e saudável, eliminando sujidade, ácaros, odores e manchas dos estofados.",
      "Utilizamos metodologias avançadas e produtos adaptados ao tipo de tecido do seu sofá.",
    ],
    includes: [
      "Inspeção inicial para identificar áreas de sujidade e manchas",
      "Aspiração profunda com aspiradores de alta potência",
      "Aplicação de produtos específicos que eliminam ácaros e bactérias",
      "Remoção de odores indesejados e desodorização completa",
      "Extração para secagem rápida",
    ],
  },
  {
    name: "Higienização de Colchão",
    description: "Pulverização, escovagem e lavagem",
    icon: Bed,
    details: [
      "Serviço essencial para manter um ambiente de sono saudável e livre de ácaros, bactérias e alérgenos.",
      "Especialmente importante para pessoas com sensibilidades alérgicas ou problemas respiratórios.",
    ],
    includes: [
      "Inspeção inicial para identificar áreas de sujidade e manchas",
      "Aspiração profunda com aspiradores de alta potência",
      "Aplicação de produtos de limpeza e desinfetantes específicos para o tecido",
      "Eliminação de ácaros, bactérias e microrganismos nocivos",
      "Remoção de manchas e odores indesejados",
    ],
  },
  {
    name: "Higienização de Tapetes",
    description: "Aspiração profunda e shampoo",
    icon: SquareStack,
    details: [
      "Processo completo de limpeza profunda para manter a limpeza e a durabilidade dos seus tapetes.",
      "Trabalhamos com produtos específicos e adequados ao tipo de fibra de cada tapete.",
    ],
    includes: [
      "Inspeção inicial para determinar tipo de tecido e identificar manchas",
      "Aspiração profunda com aspiradores de alta potência",
      "Lavagem especializada com produtos adequados ao tipo de fibra",
      "Remoção de manchas, odores e microrganismos",
      "Restauração da aparência original do tapete",
    ],
  },
  {
    name: "Higienização de Alcatifas",
    description: "Lavagem profunda e desodorização",
    icon: Layers,
    details: [
      "Processo especializado de limpeza profunda para alcatifas, removendo sujidade acumulada, ácaros e alérgenos.",
      "Utilizamos equipamentos profissionais e produtos adequados para restaurar a aparência e higiene da sua alcatifa.",
    ],
    includes: [
      "Inspeção inicial do estado e tipo de fibra",
      "Aspiração profunda com equipamento profissional",
      "Lavagem especializada com produtos adequados",
      "Remoção de manchas, odores e microrganismos",
      "Tratamento antialérgico e desodorização",
    ],
  },
  {
    name: "Limpeza Personalizada",
    description: "Serviço adaptado às suas necessidades",
    icon: Settings,
    details: [
      "Cada espaço é único e cada cliente tem necessidades específicas. O nosso serviço personalizado é feito à medida.",
      "Contacte-nos para discutir exatamente o que precisa e criamos um plano de limpeza exclusivo para si.",
    ],
    includes: [
      "Avaliação presencial do espaço",
      "Plano de limpeza personalizado",
      "Equipa dedicada ao seu projeto",
      "Flexibilidade de horários e frequência",
      "Acompanhamento por supervisor dedicado",
    ],
  },
];

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  { name: "Marta Pereira", text: "Já fazem a limpeza da minha casa há mais de 6 meses e estou encantada! A equipa é sempre a mesma, super simpática e cuidadosa. Recomendo a 100%!", rating: 5 },
  { name: "Manuel Oliveira", text: "Pedi uma limpeza de vidros e janelas para o meu apartamento e fiquei surpreendido com o resultado. Ficou tudo impecável, até os cantos mais difíceis!", rating: 5 },
  { name: "João Santos", text: "Contratei a Esplêndido para uma limpeza pós-obra e superaram todas as expectativas. A casa ficou como nova, sem vestígio de poeira. Equipa super profissional.", rating: 5 },
  { name: "Ana Silveira", text: "Uso o serviço de limpeza semanal e é a melhor decisão que tomei. O supervisor ligou-me para saber se estava tudo bem — esse tipo de atenção faz toda a diferença.", rating: 5 },
  { name: "Ricardo Mendes", text: "A higienização do sofá ficou espetacular! Já não tinha esperança de tirar aquelas manchas, mas a equipa fez milagres. Parece sofá novo. Muito obrigado!", rating: 5 },
];

export interface Step {
  number: string;
  title: string;
  description: string;
  iconColor: string;
}

export const steps: Step[] = [
  { number: "01", title: "Solicite o orçamento", description: "Solicite o vosso orçamento em apenas 1 minuto através do nosso chat ou WhatsApp.", iconColor: "text-accent" },
  { number: "02", title: "Contacto do especialista", description: "Um especialista entrará em contacto para entender a fundo a vossa necessidade e agendar o melhor dia para si.", iconColor: "text-primary" },
  { number: "03", title: "Receba a equipa", description: "A nossa equipa treinada chega na data marcada, pronta para transformar o seu espaço.", iconColor: "text-golden" },
];

export const stats = [
  { value: 1000, suffix: "+", label: "Clientes satisfeitos", color: "text-primary" },
  { value: 4.9, suffix: "★", label: "Avaliação média", color: "text-golden", decimals: 1 },
  { value: 20, suffix: "+", label: "Profissionais", color: "text-accent" },
];

export const contacts = {
  phone: "910 725 044",
  email: "contatocliente@esplendidoapp.com",
  whatsapp: "351910725044",
  hours: "Seg-Sáb 08:00-18:00",
  area: "Lisboa, Cascais, Almada e Seixal",
  social: {
    facebook: "https://www.facebook.com/esplendidoapp",
    instagram: "https://www.instagram.com/esplendido_app/",
    tiktok: "https://www.tiktok.com/@esplendido_app",
  },
};

export const frequencyOptions = ["Pontual", "Semanal", "Quinzenal", "Mensal"] as const;
export const zoneOptions = ["Lisboa Centro", "Margem Sul", "Outra"] as const;
