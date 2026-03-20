import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.RESEND_TO_EMAIL || "contatocliente@esplendidoapp.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { service, name, postalCode, contact, message } = body;

    if (!service || !name) {
      return NextResponse.json({ error: "Campos obrigatórios em falta" }, { status: 400 });
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #00458B; padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #00DAFF; margin: 0; font-size: 24px;">Novo Pedido de Orçamento</h1>
          <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0;">Recebido pelo chatbot da Esplêndido</p>
        </div>
        <div style="background: #f7f9fa; padding: 24px; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #666; width: 140px;">📋 Serviço</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #0A1628;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #666;">👤 Nome</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #0A1628;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #666;">📮 Código Postal</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #0A1628;">${postalCode}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #666;">📞 Contacto</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #0A1628;">${contact}</td>
            </tr>
            ${message ? `
            <tr>
              <td style="padding: 12px 0; color: #666;">💬 Mensagem</td>
              <td style="padding: 12px 0; color: #0A1628;">${message}</td>
            </tr>` : ""}
          </table>
        </div>
        <p style="color: #999; font-size: 12px; text-align: center; margin-top: 16px;">
          Enviado automaticamente pelo site esplendido.pt
        </p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: `Esplêndido Site <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      subject: `Novo Orçamento: ${service} — ${name}`,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Erro ao enviar email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
