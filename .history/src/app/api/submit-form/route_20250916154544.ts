import { google } from "googleapis";
import { NextResponse } from "next/server";

// This is the ID of your Google Sheet
// You'll need to replace this with your actual Google Sheet ID
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// This should match the name of the sheet tab where you want to add data
const SHEET_NAME = "Abonnements";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nom, prenom, telephone, whatsapp, abonnement, device } = body;

        // Validate required fields
        if (!nom || !prenom || !telephone || !whatsapp || !abonnement || !device) {
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
                telephone,
                whatsapp,
                abonnement,
                device,
                new Date().toISOString(), // Timestamp
            ],
        ];

        // Append data to the sheet
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A:G`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values,
            },
        });

        return NextResponse.json({ success: true, message: "Data saved successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error submitting form:", error);
        return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
    }
}
