import { z } from "zod";
import { contacts } from "./data";

export const wizardSchema = z.object({
  service: z.string().min(1, "Selecione um serviço"),
  frequency: z.string().optional(),
  area: z.coerce.number().min(1, "Insira a área em m²"),
  zone: z.string().optional(),
  notes: z.string().optional(),
});

export type WizardFormData = z.infer<typeof wizardSchema>;

export function buildWhatsAppUrl(data: WizardFormData): string {
  const lines = [
    "Olá! Gostaria de agendar um serviço:",
    "",
    `📋 Serviço: ${data.service}`,
  ];

  if (data.frequency) lines.push(`🔄 Frequência: ${data.frequency}`);
  lines.push(`📐 Área: ${data.area} m²`);
  if (data.zone) lines.push(`📍 Zona: ${data.zone}`);
  if (data.notes) lines.push(`📝 Observações: ${data.notes}`);

  lines.push("", "Aguardo contacto. Obrigado!");

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${contacts.whatsapp}?text=${text}`;
}
