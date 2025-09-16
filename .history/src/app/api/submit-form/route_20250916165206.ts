import { google } from "googleapis";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// This is the ID of your Google Sheet
// You'll need to replace this with your actual Google Sheet ID
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// This should match the name of the sheet tab where you want to add data
const SHEET_NAME = "Table1";

function buildHtmlEmail(data: { nom: string; prenom: string; whatsapp: string; abonnement: string; device: string }) {
    const { nom, prenom, whatsapp, abonnement, device } = data;
    return `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:#111;">
      <h2 style="margin:0 0 16px;">Nouvelle demande via Website Meilleur Abonnement TV</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tbody>
          <tr>
            <td style="border:1px solid #e5e7eb; padding:8px; font-weight:600; width:180px;">Nom</td>
            <td style="border:1px solid #e5e7eb; padding:8px;">${nom}</td>
          </tr>
          <tr>
            <td style="border:1px solid #e5e7eb; padding:8px; font-weight:600;">Prénom</td>
            <td style="border:1px solid #e5e7eb; padding:8px;">${prenom}</td>
          </tr>
          <tr>
            <td style="border:1px solid #e5e7eb; padding:8px; font-weight:600;">WhatsApp</td>
            <td style="border:1px solid #e5e7eb; padding:8px;">${whatsapp}</td>
          </tr>
          <tr>
            <td style="border:1px solid #e5e7eb; padding:8px; font-weight:600;">Abonnement</td>
            <td style="border:1px solid #e5e7eb; padding:8px;">${abonnement}</td>
          </tr>
          <tr>
            <td style="border:1px solid #e5e7eb; padding:8px; font-weight:600;">Appareil</td>
            <td style="border:1px solid #e5e7eb; padding:8px;">${device}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nom, prenom, whatsapp, abonnement, device } = body;

        // Validate required fields
        if (!nom || !prenom || !whatsapp || !abonnement || !device) {
            return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
        }

        // Set up authentication
        // The service account key should be stored as an environment variable
        // You'll need to create a service account in Google Cloud Console
        // and generate a JSON key
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
            console.error("Missing Google service account key");
            return NextResponse.json({ error: "Configuration error" }, { status: 500 });
        }

        const auth = new google.auth.GoogleAuth({
            credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        // Prepare the data row
        const values = [
            [
                nom,
                prenom,
                whatsapp,
                abonnement,
                device,
                new Date().toISOString(), // Timestamp
                "pending", // Status
            ],
        ];

        // Append data to the sheet
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A:G`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values,
            },
        });

        // Send email via Nodemailer
        const emailTo = process.env.CONTACT_TO ?? "service.tv360@gmail.com";
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST ?? "smtp.gmail.com",
            port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
            secure: process.env.SMTP_SECURE === "true" ? true : false,
            auth:
                process.env.SMTP_USER && process.env.SMTP_PASS
                    ? {
                          user: process.env.SMTP_USER,
                          pass: process.env.SMTP_PASS,
                      }
                    : undefined,
        });

        const subject = `Website Meilleur Abonnement TV - Nouvelle demande`;

        await transporter.sendMail({
            from: process.env.MAIL_FROM ?? `Website Meilleur Abonnement TV <no-reply@meilleur-abonnement-tv>`,
            to: emailTo,
            subject,
            html: buildHtmlEmail({ nom, prenom, whatsapp, abonnement, device }),
        });

        return NextResponse.json({ success: true, message: "Data saved and email sent" }, { status: 200 });
    } catch (error) {
        console.error("Error submitting form:", error);
        return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
    }
}
