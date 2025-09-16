import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fullName, whatsappNumber, subscription, device, date } = body;

        if (!fullName || !whatsappNumber || !subscription || !device || !date) {
            return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
        }

        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;

        if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
            console.error("Missing SMTP configuration");
            return NextResponse.json({ error: "Configuration SMTP manquante" }, { status: 500 });
        }

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465, // true for 465, false for others
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });

        const subject = "from form : website meilleur abonnement tv";

        const html = `
            <div style="font-family: Arial, sans-serif;">
                <h2 style="margin-bottom: 12px;">Nouvelle demande d'abonnement</h2>
                <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; min-width: 480px;">
                    <thead>
                        <tr style="background:#f5f5f5; text-align:left;">
                            <th>Nom Complet</th>
                            <th>WhatsApp</th>
                            <th>Abonnement</th>
                            <th>Appareil</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${escapeHtml(fullName)}</td>
                            <td>${escapeHtml(whatsappNumber)}</td>
                            <td>${escapeHtml(subscription)}</td>
                            <td>${escapeHtml(device)}</td>
                            <td>${escapeHtml(date)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;

        const info = await transporter.sendMail({
            from: `Meilleur Abonnement TV <${smtpUser}>`,
            to: "service.tv360@gmail.com",
            subject,
            html,
        });

        return NextResponse.json({ success: true, messageId: info.messageId }, { status: 200 });
    } catch (error) {
        console.error("Error submitting form (email):", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}

function escapeHtml(value: string): string {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
