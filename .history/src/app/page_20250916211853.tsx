import Image from "next/image";
import SubscriptionForm from "../components/SubscriptionForm";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const products = [
    {
        name: "Abonnement TV 1 Mois",
        price: "14.99",
    },
    {
        name: "Abonnement TV 3 Mois",
        price: "24.99",
    },
    {
        name: "Abonnement TV 6 Mois",
        price: "29.99",
    },
    {
        name: "Abonnement TV 12 Mois",
        price: "34.99",
    },
];

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TvseTV",
    url: siteUrl,
    logo: `${siteUrl}/media/favicon/android-chrome-512x512.png`,
    contactPoint: {
        "@type": "ContactPoint",
        contactType: "Assistance Client",
        email: "service.tv360@gmail.com", // Assuming this is the customer service email
    },
};

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TvseTV",
    url: siteUrl,
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: siteUrl,
        },
    ],
};

const productSchema = {
    "@context": "https://schema.org",
    "@graph": products.map((product, index) => ({
        "@type": "Product",
        name: product.name,
        description: "Accès à plus de 62 000 chaînes en qualité 4K, VOD illimitée, et compatibilité tous appareils. Le meilleur du divertissement.",
        image: `${siteUrl}/media/selectionez-le-forfait-qui-repond-a-vos-besoins.webp`,
        brand: {
            "@type": "Brand",
            name: "TvseTV",
        },
        offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: siteUrl,
        },
        sku: `TVSE-SUB-${product.name.split(" ")[2]}`,
    })),
};

export default function Home() {
    return (
        <div className="">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "OfferCatalog",
                        name: "Offres d'abonnement TV",
                        url: `${siteUrl}#offres`,
                        itemListElement: products.map((p) => ({
                            "@type": "Offer",
                            itemOffered: {
                                "@type": "Product",
                                name: p.name,
                            },
                            price: p.price,
                            priceCurrency: "EUR",
                            availability: "https://schema.org/InStock",
                        })),
                    }),
                }}
            />

            {/* Hero section */}
            <div className="mb-8">
                <Image src="/media/meilleur-abonnment-tv-2025.webp" alt="meilleur abonnment tv 2025" width={0} height={0} sizes="100vw" style={{ width: "100%", height: "auto" }} priority />
            </div>

            {/* Subscription options */}
            <div id="offres" className="mb-12">
                <Image
                    src="/media/selectionez-le-forfait-qui-repond-a-vos-besoins.webp"
                    alt="selectionez le forfait qui répond à vos besoins"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                />
            </div>

            {/* Subscription form */}
            <div className="mt-12">
                <h2 className="text-3xl font-bold text-center mb-8">Demande d'Abonnement</h2>
                <SubscriptionForm />
            </div>
        </div>
    );
}
