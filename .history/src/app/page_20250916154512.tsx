import Image from "next/image";
import SubscriptionForm from "../components/SubscriptionForm";

export default function Home() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Hero section */}
            <div className="mb-8">
                <Image 
                    src="/media/meilleur-abonnment-tv-2025.webp" 
                    alt="meilleur abonnment tv 2025" 
                    width={0} 
                    height={0} 
                    sizes="100vw" 
                    style={{ width: "100%", height: "auto" }} 
                    priority
                />
            </div>
            
            {/* Subscription options */}
            <div className="mb-12">
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
