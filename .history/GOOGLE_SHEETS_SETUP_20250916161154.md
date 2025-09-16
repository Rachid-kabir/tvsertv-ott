# Google Sheets Integration Setup

This document explains how to set up the Google Sheets integration for the form submission feature.

## Steps to Set Up Google Sheets API

1. **Create a Google Cloud Project**

    - Go to [Google Cloud Console](https://console.cloud.google.com/)
    - Create a new project or select an existing one
    - Enable the Google Sheets API for your project

2. **Create a Service Account**

    - In your Google Cloud project, go to "IAM & Admin" > "Service Accounts"
    - Click "Create Service Account"
    - Give it a name and description
    - Grant it the "Editor" role for Google Sheets
    - Click "Create Key" and select JSON format
    - Download the JSON key file

3. **Create a Google Sheet**

    - Create a new Google Sheet
    - Rename the first sheet tab to "Abonnements"
    - Add the following headers in the first row:
        - Nom
        - Prénom
        - Téléphone
        - WhatsApp
        - Abonnement
        - Appareil
        - Date
    - Share the sheet with the service account email (found in the JSON key)

4. **Configure Environment Variables**
    - Create a `.env.local` file in the root of your project
    - Add the following variables:
        ```
        GOOGLE_SHEET_ID=your_google_sheet_id_here
        GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
        ```
    - Replace `your_google_sheet_id_here` with your actual Google Sheet ID (found in the URL of your sheet)
    - For `GOOGLE_SERVICE_ACCOUNT_KEY`, paste the entire content of your JSON key file

## Security Considerations

-   Never commit your `.env.local` file or service account key to version control
-   For production, consider using a secret management service
-   Make sure your Google Sheet doesn't contain sensitive information that shouldn't be public
