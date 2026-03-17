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

export interface WhatsAppLabels {
  greeting: string;
  serviceLabel: string;
  frequencyLabel: string;
  areaLabel: string;
  zoneLabel: string;
  notesLabel: string;
  closing: string;
}

export function buildWhatsAppUrl(data: WizardFormData, labels: WhatsAppLabels): string {
  const lines = [
    labels.greeting,
    "",
    labels.serviceLabel.replace("{value}", data.service),
  ];

  if (data.frequency) lines.push(labels.frequencyLabel.replace("{value}", data.frequency));
  lines.push(labels.areaLabel.replace("{value}", String(data.area)));
  if (data.zone) lines.push(labels.zoneLabel.replace("{value}", data.zone));
  if (data.notes) lines.push(labels.notesLabel.replace("{value}", data.notes));

  lines.push("", labels.closing);

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${contacts.whatsapp}?text=${text}`;
}
