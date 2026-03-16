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
  details: string[];
  includes: string[];
}

export const services: Service[] = [
  {
    name: "Limpeza Doméstica",
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
    name: "Limpeza Comercial",
    description: "Espaços comerciais e empresariais",
    icon: Building2,
    details: [
      "Garantimos um ambiente saudável e produtivo para funcionários e clientes, melhorando a imagem corporativa.",
      "Começamos com uma avaliação inicial onde visitamos o local para entender as necessidades específicas e criamos um plano customizado.",
    ],
    includes: [
      "Entradas e recepção: aspiração, limpeza de pisos, tapetes, portas e maçanetas",
      "Escritórios: limpeza de mesas, cadeiras, desinfetação de teclados, mouses e telefones",
      "Casas de banho: desinfetação completa de pisos, sanitários, pias e espelhos",
      "Salas de descanso: limpeza de móveis e desinfetação de áreas de alto contacto",
      "Esvaziamento de lixeiras e reposição de consumíveis",
    ],
  },
  {
    name: "Higienização Sofás",
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
    name: "Limpeza Pós-obra",
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
    name: "Vidros/Janelas/Estores",
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
    name: "Bolor e Humidade",
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
    name: "Higiene Colchões",
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
    name: "Higiene Tapetes",
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
    facebook: "https://www.facebook.com/esplendidoapp",
    instagram: "https://www.instagram.com/esplendido_app/",
    tiktok: "https://www.tiktok.com/@esplendido_app",
  },
};

export const frequencyOptions = ["Pontual", "Semanal", "Quinzenal", "Mensal"] as const;
export const zoneOptions = ["Lisboa Centro", "Margem Sul", "Outra"] as const;
