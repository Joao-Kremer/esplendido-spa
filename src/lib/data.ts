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
  Building2,
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
    description: "Equipa fixa, produtos profissionais e seguro incluído",
    icon: Home,
    details: [
      "Inclui 1 intervenção de limpeza de manutenção com equipa fixa e rigorosamente treinada, produtos de limpeza profissionais e específicos para cada superfície, aspiradores de alta potência e seguro contra acidentes (até 50.000€).",
      "Utilizamos produtos que hidratam e devolvem brilho às superfícies, garantindo uma limpeza profunda e segura.",
    ],
    includes: [
      "Limpeza de pó dos móveis e desinfecção com produtos que hidratam e trazem brilho (exterior)",
      "Limpeza de quadros e objetos na parede",
      "Limpeza de espelhos",
      "Aspiração de sofás, tapetes e colchões",
      "Limpeza do frigorífico, forno, exaustor e micro-ondas (exterior)",
      "Limpeza e desinfecção completa de casas de banho",
      "Aspiração e lavagem de pavimentos com produtos adequados",
      "Substituição de sacos de lixo",
      "Ambientação final com perfume neutro e agradável",
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
      "Aspiração de tetos e paredes",
      "Limpeza de quadros e objetos decorativos",
      "Limpeza de azulejos, portas, ombreiras, rodapés, interruptores e tomadas",
      "Limpeza de caixilhos, janelas, vidros e estores",
      "Limpeza do pó de móveis (interior e exterior) e desinfecção com produtos que hidratam e devolvem brilho",
      "Aspiração de sofás, tapetes e colchões",
      "Limpeza de frigorífico, forno, micro-ondas e exaustor (interior e exterior)",
      "Limpeza e desinfecção completa de casas de banho",
      "Aspiração do chão e aplicação de lava e encera",
      "Limpeza de varandas, quintais e marquises",
      "Substituição de sacos de lixo",
      "Ambientação com perfume neutro e agradável",
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
      "Serviço de limpeza e tratamento de bolor e humidade para garantir a saúde e a integridade dos seus espaços.",
      "Seguimos uma abordagem sistemática com produtos específicos anti-bolor e conselhos de manutenção preventiva.",
    ],
    includes: [
      "Limpeza de superfícies com produtos específicos anti-bolor (paredes, tetos, rodapés, móveis afetados)",
      "Limpeza de rejuntes e azulejos em casas de banho e cozinhas, se necessário",
      "Remoção de odores causados por bolor e humidade",
      "Conselhos de manutenção para prevenir futuras ocorrências de bolor e humidade",
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
      "Limpeza de vidros",
      "Limpeza da caixilharia (madeira, alumínio ou PVC)",
      "Limpeza de estores, garantindo remoção de pó e sujidade acumulada",
    ],
  },
  {
    name: "Higienização de Sofá",
    description: "Aspiração, shampoo, escovagem e extração",
    icon: Sofa,
    details: [
      "Serviço fundamental para manter um ambiente limpo e saudável, eliminando sujidade, ácaros, odores e manchas dos estofados.",
      "Utilizamos shampoo profissional adequado para cada tipo de tecido e máquina de extração para um resultado impecável.",
    ],
    includes: [
      "Aspiração profunda: remoção de poeira, pelos e partículas superficiais",
      "Aplicação de shampoo profissional adequado para cada tipo de tecido, que limpa sem danificar as fibras",
      "Escovagem cuidadosa manual ou mecânica para soltar sujidades profundas e manchas",
      "Extração do shampoo com máquina que remove a sujidade, deixando o sofá limpo e quase seco",
    ],
  },
  {
    name: "Higienização de Colchão",
    description: "Aspiração, shampoo, escovagem e extração",
    icon: Bed,
    details: [
      "Serviço essencial para manter um ambiente de sono saudável e livre de ácaros, bactérias e alérgenos.",
      "Especialmente importante para pessoas com sensibilidades alérgicas ou problemas respiratórios.",
    ],
    includes: [
      "Aspiração profunda: remove poeira, ácaros e partículas superficiais acumuladas",
      "Aplicação de shampoo ou produto higienizante específico para colchões, seguro para a pele",
      "Escovagem leve para soltar sujidade e manchas nas fibras do colchão",
      "Extração do produto com máquina, garantindo higienização completa e ambiente mais saudável",
    ],
  },
  {
    name: "Higienização de Tapetes",
    description: "Aspiração, shampoo, escovagem e extração",
    icon: SquareStack,
    details: [
      "Processo completo de limpeza profunda para manter a limpeza e a durabilidade dos seus tapetes.",
      "Trabalhamos com shampoo profissional adequado ao tipo de tapete, mantendo cores e fibras.",
    ],
    includes: [
      "Aspiração intensa: retira poeira, areia e partículas da superfície",
      "Aplicação de shampoo profissional adequado ao tipo de tapete, mantendo cores e fibras",
      "Escovagem e agitação do produto para penetrar nas fibras e remover sujidades profundas",
      "Extração do shampoo com máquina, removendo toda a solução e sujidade, deixando o tapete limpo e quase seco",
    ],
  },
  {
    name: "Higienização de Alcatifas",
    description: "Aspiração, shampoo, escovagem e extração",
    icon: Layers,
    details: [
      "Processo especializado de limpeza profunda para alcatifas, removendo sujidade acumulada, ácaros e alérgenos.",
      "Utilizamos shampoo profissional e máquina de extração para restaurar a aparência e higiene da sua alcatifa.",
    ],
    includes: [
      "Aspiração profunda: remove poeira, fios e partículas incrustadas",
      "Aplicação de shampoo ou produto de limpeza profissional seguro que limpa sem danificar a alcatifa",
      "Escovagem mecânica ou manual para soltar a sujidade mais profunda das fibras",
      "Extração do shampoo com máquina, deixando a alcatifa limpa, higienizada e quase seca",
    ],
  },
  {
    name: "Limpeza Comercial",
    description: "Limpeza profissional para escritórios e espaços comerciais",
    icon: Building2,
    details: [
      "Serviço de limpeza profissional para escritórios, lojas e espaços comerciais, mantendo o ambiente profissional e acolhedor.",
      "Garantimos uma limpeza completa e desinfecção de todas as áreas comuns, casas de banho e espaços de trabalho.",
    ],
    includes: [
      "Limpeza de pó e desinfecção de móveis, secretárias, prateleiras e superfícies comuns",
      "Limpeza de quadros, objetos decorativos e equipamentos fixos (ex.: prateleiras, armários)",
      "Limpeza de espelhos e vidros interiores",
      "Aspiração de carpetes, tapetes e estofos (cadeiras, sofás de sala de espera)",
      "Limpeza exterior de equipamentos de cozinha ou copa (frigorífico, micro-ondas, exaustores)",
      "Limpeza e desinfecção completa de casas de banho e áreas sanitárias",
      "Aspiração e lavagem de pavimentos com produtos adequados ao tipo de chão (madeira, vinil, cerâmica)",
      "Substituição de sacos de lixo e gestão de resíduos",
      "Ambientação final com perfume neutro e agradável, mantendo o ambiente profissional e acolhedor",
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
