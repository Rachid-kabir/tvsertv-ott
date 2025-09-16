import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: "Meilleur Abonnement TV 2025 - N°1 en France | TvseTV",
    description: "Découvrez le meilleur abonnement TV en 2025. Plus de 22 000 chaînes, VOD, qualité 4K et support 24/7. Le choix numéro 1 en France pour un divertissement illimité à faible coût.",
    keywords: ["abonnement TV", "IPTV", "streaming", "chaînes TV", "VOD", "TV 4K", "meilleur abonnement", "TvseTV"],
    applicationName: "TvseTV",
    alternates: {
        canonical: siteUrl,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    themeColor: "#ffffff",
    openGraph: {
        title: "Meilleur Abonnement TV 2025 - N°1 en France | TvseTV",
        description: "Découvrez le meilleur abonnement TV en 2025. Plus de 22 000 chaînes, VOD, qualité 4K et support 24/7.",
        url: siteUrl,
        siteName: "TvseTV",
        images: [
            {
                url: `${siteUrl}/media/logo.webp`,
                width: 1200,
                height: 630,
                alt: "Bannière Meilleur Abonnement TV 2025",
            },
        ],
        locale: "fr_FR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Meilleur Abonnement TV 2025 - N°1 en France | TvseTV",
        description: "Le choix n°1 pour le streaming en France. Qualité 4K, +22 000 chaînes et VOD.",
        images: [`${siteUrl}/media/logo.webp`],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Script id="fb-pixel" strategy="afterInteractive">
                    {`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1405913997139536');
fbq('track', 'PageView');
                    `}
                </Script>
                <noscript>
                    <img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=1405913997139536&ev=PageView&noscript=1" />
                </noscript>
                {children}
            </body>
        </html>
    );
}
