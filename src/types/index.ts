export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: number;
  name: string;
  service: string;
  rating: number;
  text: string;
  avatarInitials: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  serviceType?: string;
  message: string;
}
