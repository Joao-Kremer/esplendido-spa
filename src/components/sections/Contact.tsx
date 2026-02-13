"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { PHONE, PHONE_LINK, EMAIL } from "@/lib/constants";

const WHATSAPP_URL =
  "https://wa.me/351910725044?text=Olá! Gostaria de saber mais sobre os serviços de limpeza.";

const contactSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.email("Por favor, insira um email válido."),
  phone: z.string().optional(),
  serviceType: z.string().optional(),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const contactInfo = [
  { icon: Phone, label: PHONE, href: PHONE_LINK },
  { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}` },
  { icon: Clock, label: "Seg-Dom: 08:00 - 20:00", href: null },
  { icon: MapPin, label: "Área Metropolitana", href: null },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // Silently handle error
    }
  };

  const handleReset = () => {
    reset();
    setSubmitted(false);
  };

  return (
    <section
      id="contacto"
      className="py-16 sm:py-24 bg-gradient-to-br from-[#0A1628] via-[#1E3A5F] to-[#1E56A0] text-white relative overflow-hidden"
    >
      {/* Floating decorative circles */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#5B9BD5]/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#06D6A0]/5 blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-white/3 blur-2xl" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-[#06D6A0] text-sm font-semibold tracking-widest uppercase">
            Contacto
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold mt-3">
            Pronto para Transformar
            <br />o Seu <span className="gradient-text">Espaço</span>?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#5B9BD5] to-[#06D6A0] mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/70 leading-relaxed mb-8">
              Entre em contacto connosco para um orçamento gratuito e sem
              compromisso. Estamos prontos para transformar o seu espaço.
            </p>

            <ul className="space-y-6 mb-10">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-[#06D6A0]" />
                    </div>
                    <span className="text-white/80">{item.label}</span>
                  </div>
                );

                return item.href ? (
                  <li key={i}>
                    <a
                      href={item.href}
                      className="hover:text-[#06D6A0] transition-colors"
                    >
                      {content}
                    </a>
                  </li>
                ) : (
                  <li key={i}>{content}</li>
                );
              })}
            </ul>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#06D6A0] hover:bg-[#05c090] text-[#0A1628] font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#06D6A0]/30"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Fale pelo WhatsApp
            </a>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 sm:p-8 border border-white/10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#06D6A0]/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} className="text-[#06D6A0]" />
                  </div>
                  <h3 className="text-2xl font-[family-name:var(--font-heading)] font-bold mb-2">
                    Mensagem Enviada!
                  </h3>
                  <p className="text-white/60 mb-8">
                    Entraremos em contacto consigo em breve.
                  </p>
                  <button
                    onClick={handleReset}
                    className="text-[#06D6A0] font-semibold hover:underline"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Name */}
                  <div>
                    <input
                      {...register("name")}
                      placeholder="O seu nome"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-[#06D6A0] focus:outline-none transition-colors"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="O seu email"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-[#06D6A0] focus:outline-none transition-colors"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="Telefone (opcional)"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-[#06D6A0] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Service Type */}
                  <div>
                    <select
                      {...register("serviceType")}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/40 focus:border-[#06D6A0] focus:outline-none transition-colors [&>option]:bg-[#0A1628] [&>option]:text-white"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Tipo de serviço (opcional)
                      </option>
                      <option value="domestica">Limpeza Doméstica</option>
                      <option value="comercial">Limpeza Comercial</option>
                      <option value="sofas">Higienização de Sofás</option>
                      <option value="condominios">Limpeza de Condomínios</option>
                      <option value="pos-obra">Limpeza Pós Obra</option>
                      <option value="vidros">Limpeza de Vidros</option>
                      <option value="bolor">Limpeza de Bolor</option>
                      <option value="colchoes">Higienização de Colchões</option>
                      <option value="tapetes">Higienização de Tapetes</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      {...register("message")}
                      placeholder="A sua mensagem"
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-[#06D6A0] focus:outline-none transition-colors resize-none"
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#5B9BD5] to-[#06D6A0] text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#5B9BD5]/25 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        A enviar...
                      </>
                    ) : (
                      "Enviar Mensagem"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
