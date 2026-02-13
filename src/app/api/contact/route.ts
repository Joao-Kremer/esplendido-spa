import { NextResponse } from "next/server";
import { z } from "zod/v4";

const contactSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.email("Por favor, insira um email válido."),
  phone: z.string().optional(),
  serviceType: z.string().optional(),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres."),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const { name, email, phone, serviceType, message } = data;

    const toEmail = process.env.CONTACT_EMAIL || "info@esplendido.pt";

    // If RESEND_API_KEY is not set, return success for development
    if (!process.env.RESEND_API_KEY) {
      console.log("[DEV] Contact form submission:", {
        name,
        email,
        phone,
        serviceType,
        message,
      });
      return NextResponse.json(
        { success: true, message: "Mensagem enviada com sucesso (modo dev)." },
        { status: 200 }
      );
    }

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Esplêndido Website <onboarding@resend.dev>",
      to: [toEmail],
      subject: `Novo contacto: ${name} - ${serviceType || "Geral"}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f7f9fc; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #1E56A0, #3B82F6); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Novo Contacto</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Via website Espl&ecirc;ndido</p>
          </div>
          <div style="background-color: #ffffff; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 8px; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #374151; width: 140px;">Nome</td>
                <td style="padding: 12px 8px; border-bottom: 1px solid #f0f0f0; color: #4b5563;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 8px; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #374151;">Email</td>
                <td style="padding: 12px 8px; border-bottom: 1px solid #f0f0f0; color: #4b5563;">
                  <a href="mailto:${email}" style="color: #3B82F6; text-decoration: none;">${email}</a>
                </td>
              </tr>
              ${
                phone
                  ? `<tr>
                <td style="padding: 12px 8px; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #374151;">Telefone</td>
                <td style="padding: 12px 8px; border-bottom: 1px solid #f0f0f0; color: #4b5563;">
                  <a href="tel:${phone}" style="color: #3B82F6; text-decoration: none;">${phone}</a>
                </td>
              </tr>`
                  : ""
              }
              ${
                serviceType
                  ? `<tr>
                <td style="padding: 12px 8px; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #374151;">Servi&ccedil;o</td>
                <td style="padding: 12px 8px; border-bottom: 1px solid #f0f0f0; color: #4b5563;">${serviceType}</td>
              </tr>`
                  : ""
              }
              <tr>
                <td style="padding: 12px 8px; font-weight: bold; color: #374151; vertical-align: top;">Mensagem</td>
                <td style="padding: 12px 8px; color: #4b5563; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>
          <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 16px;">
            Este email foi enviado atrav&eacute;s do formul&aacute;rio de contacto do website.
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Mensagem enviada com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Dados inválidos. Verifique os campos.", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Erro interno do servidor. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
