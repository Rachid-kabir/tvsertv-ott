import { google } from "googleapis";
import { NextResponse } from "next/server";

// Google Sheet ID from the URL you provided
const SPREADSHEET_ID = "1IHCyE8lDranMQEvE--9u_1DsZcZ1q5ohS7crULgPGYQ";

// This should match the name of the sheet tab where you want to add data
const SHEET_NAME = "Table1";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nom, prenom, whatsapp, abonnement, device } = body;

        // Validate required fields
        if (!nom || !prenom || !whatsapp || !abonnement || !device) {
            return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
        }

        // Set up authentication with the service account credentials
        const serviceAccountCredentials = {
            type: "service_account",
            project_id: "meilleur-abonnment-tv",
            private_key_id: "179cd136554761273093330ccef34d45c085bc78e",
            private_key:
                "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQEFAA5CBKgwggSk\nGZI9S6HgmWlCfU2UhadkeZ78+kTGUuMwIP1Hr38irk\nkn4NV+9nP51oENJzCM55UfYroIAXPUQLbW/So2+iDKSxm/Zi/\nd9vTFUc0GgmWYJL\nQX9wSxlngOyRMqo34oQUdbfos6KE9BBEqCvDAPVpY7QsN5fIGEtcbUnE8tXqiYep\nngCn0TqClAUJ3oXQA\n+0vKLUET1dqM2XcZ6I4AM59pmL78sNzU1AfOgCHaOq5xdherXfS\npYXvyrxIu2i/evcgs2UtY2n+S46m9yMiELcOm\n+PFhVVCJTS2uCIjwF7S2G6x8gkW8\nt+sEYGlnURGa3MOfi9slbacMPDFfxxb7d5HyckoKLrFwRkpfBdgPdqxgNthEQ\nBPKHCDYIM0W5ZY8mGmvqQJnH1smAgbn3\nme2iMDub8j5Hsv+acyI38BFg04a7QZm2/7G6iWoY2H02EoHlHQxyir2KP\n+FaofZz\nA3u4wZX7G19yoI1G5OvSqSDGrwKBgQDKJGye3XjVoZGI9yoI19yoYoyVv7Etkm9AI2Ll68DfzgUMEtTC3nG/\n9vLwKP2COg+p16WjEORFs+20\ntxTM7rdB8jPR8mbHNecwtlBmztTZtx9JCWk+/Ib7xH7IxlUJR/Q7xvZXA/\n9vLwKBgQCEiKh1072pSSYFRdIEhARVo8NYdZQvXegTAH6BqVedTc3nG/\nzJ\nyrkE5Ci+ImN3YcSYHgqrfx/x/mDInrqMy3wKRgqF32A9LPTZcsntu3+VXTZaofSU+20\nOQ8rwXXXKyud\nmidd4tPzcmcucl6lAAmBAAECgqEAAgEAPgkqhkiG9w0BAQsFAASCBKcwggSj\nLoXQKhpI6IPQKBgQDCEiJqZubLT5\nmalUEPy3SmGQnftDR82HqSwrvUWjfIX/NoDXX/mDInrqMy3wKRgqF32A9LPTZcsntu3+VXTZaofSU+20\nCt+JW7HBsr3GjEJqZubLTS\nmlaUEPy3SmGQnftDR82HqSwrvUWjfIX/NoDXX/mDInrqMy3wKRgqF32A9LPTZcsntu3+VXTZaofSU+20\nb43SODo0szcK9QvJPwLXFzxvfIzmhLWGCrtPMKIVbpULSjQQWpfU+20\nVXxXyud\nzJ\nyrkE5Ci+ImN3YcSYHgqrfx/x/mDInrqMy3wKRgqF32A9LPTZcsntu3+VXTZaofSU+20\nOQ8rwXXXKyud\nmidd4tPzcmcucl6lAAmBAAECgqEAAgEAPgkqhkiG9w0BAQsFAASCBKcwggSj\nLoXQKhpI6IPQKBgQDCEiJqZubLT5\nmalUEPy3SmGQnftDR82HqSwrvUWjfIX/NoDXX/mDInrqMy3wKRgqF32A9LPTZcsntu3+VXTZaofSU+20\nCt+JW7HBsr3GjEJqZubLTS\nmlaUEPy3SmGQnftDR82HqSwrvUWjfIX/NoDXX/mDInrqMy3wKRgqF32A9LPTZcsntu3+VXTZaofSU+20\nb43SODo0szcK9QvJPwLXFzxvfIzmhLWGCrtPMKIVbpULSjQQWpfU+20\nVXxXyud\n-----END PRIVATE KEY-----\n".replace(
                    /\\n/g,
                    "\n"
                ),
            client_email: "meilleur-abonnment-tv@meilleur-abonnment-tv.iam.gserviceaccount.com",
            client_id: "106658460980979663473",
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: "https://oauth2.googleapis.com/token",
            auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
            client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/meilleur-abonnment-tv%40meilleur-abonnment-tv.iam.gserviceaccount.com",
            universe_domain: "googleapis.com",
        };

        const auth = new google.auth.GoogleAuth({
            credentials: serviceAccountCredentials,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        // Prepare the data row to match Google Sheet columns: Nom, Prénom, WhatsApp, Abonnement, Appareil, Date, Status
        const values = [
            [
                nom,
                prenom,
                whatsapp, // Using WhatsApp as the main contact
                abonnement,
                device,
                new Date().toISOString(), // Timestamp
                "pending", // Status - setting as "pending" for new submissions
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
