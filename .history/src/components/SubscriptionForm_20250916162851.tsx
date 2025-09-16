"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
    nom: z.string().min(2, { message: "Le nom est requis" }),
    prenom: z.string().min(2, { message: "Le prénom est requis" }),
    whatsapp: z.string().min(8, { message: "Numéro WhatsApp invalide" }),
    abonnement: z.enum(["1 MOIS", "3 MOIS", "6 MOIS", "12 MOIS"], {
        required_error: "Veuillez sélectionner un abonnement",
    }),
    device: z.enum(["Smart TV", "Android Box", "PC/Mac", "Mobile", "Autre"], {
        required_error: "Veuillez sélectionner un appareil",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SubscriptionForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nom: "",
            prenom: "",
            whatsapp: "",
            abonnement: undefined,
            device: undefined,
        },
    });

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("/api/submit-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Une erreur est survenue lors de l'envoi du formulaire");
            }

            setIsSuccess(true);
            reset();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Demande d'Abonnement</h2>

            {isSuccess ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    <p>Votre demande a été envoyée avec succès! Nous vous contacterons bientôt.</p>
                    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => setIsSuccess(false)}>
                        Nouveau formulaire
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                            Nom
                        </label>
                        <input id="nom" type="text" {...register("nom")} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                            Prénom
                        </label>
                        <input id="prenom" type="text" {...register("prenom")} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
                            WhatsApp <span className="text-red-500">*</span>
                        </label>
                        <input id="whatsapp" type="tel" {...register("whatsapp")} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="+33 6 12 34 56 78" />
                        {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="abonnement" className="block text-sm font-medium text-gray-700">
                            Abonnement
                        </label>
                        <select id="abonnement" {...register("abonnement")} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                            <option value="">Sélectionnez un abonnement</option>
                            <option value="1 MOIS">1 MOIS - 14.99 €</option>
                            <option value="3 MOIS">3 MOIS - 24.99 €</option>
                            <option value="6 MOIS">6 MOIS - 29.99 €</option>
                            <option value="12 MOIS">12 MOIS - 34.99 €</option>
                        </select>
                        {errors.abonnement && <p className="text-red-500 text-xs mt-1">{errors.abonnement.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="device" className="block text-sm font-medium text-gray-700">
                            Appareil
                        </label>
                        <select id="device" {...register("device")} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                            <option value="">Sélectionnez un appareil</option>
                            <option value="Smart TV">Smart TV</option>
                            <option value="Android Box">Android Box</option>
                            <option value="PC/Mac">PC/Mac</option>
                            <option value="Mobile">Mobile</option>
                            <option value="Autre">Autre</option>
                        </select>
                        {errors.device && <p className="text-red-500 text-xs mt-1">{errors.device.message}</p>}
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            <p>{error}</p>
                        </div>
                    )}

                    <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300">
                        {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                    </button>
                </form>
            )}
        </div>
    );
}
