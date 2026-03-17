import { z } from "zod";
import { contacts } from "./data";

export const wizardSchema = z.object({
  service: z.string().min(1),
  name: z.string().min(1),
  postalCode: z.string().min(1),
  contact: z.string().min(1),
  message: z.string().optional(),
});

export type WizardFormData = z.infer<typeof wizardSchema>;

export interface WhatsAppLabels {
  greeting: string;
  serviceLabel: string;
  nameLabel: string;
  postalCodeLabel: string;
  contactLabel: string;
  messageLabel: string;
  closing: string;
}

export function buildWhatsAppUrl(data: WizardFormData, labels: WhatsAppLabels): string {
  const lines = [
    labels.greeting,
    "",
    labels.serviceLabel.replace("{value}", data.service),
    labels.nameLabel.replace("{value}", data.name),
    labels.postalCodeLabel.replace("{value}", data.postalCode),
    labels.contactLabel.replace("{value}", data.contact),
  ];

  if (data.message) lines.push(labels.messageLabel.replace("{value}", data.message));

  lines.push("", labels.closing);

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${contacts.whatsapp}?text=${text}`;
}
