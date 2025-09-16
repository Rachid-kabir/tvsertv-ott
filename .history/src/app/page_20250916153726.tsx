import Image from "next/image";

export default function Home() {
    return (
        <div>
            <Image src="/media/meilleur-abonnment-tv-2025.webp" alt="meilleur abonnment tv 2025" width={0} height={0} sizes="100vw" style={{ width: "100%", height: "auto" }} />
            <Image
                src="/media/selectionez-le-forfait-qui-repond-a-vos-besoins.webp"
                alt="selectionez le forfait qui répond à vos besoins"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
            />
        </div>
    );
}
