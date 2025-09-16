"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
    fullName: z.string().min(2, { message: "Le nom complet est requis" }),
    whatsappNumber: z.string().min(8, { message: "Numéro WhatsApp invalide" }),
    subscription: z.enum(["1 MOIS", "3 MOIS", "6 MOIS", "12 MOIS"], {
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
    const [selectedSubscription, setSelectedSubscription] = useState("");
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            whatsappNumber: "",
            subscription: undefined,
            device: undefined,
        },
    });

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        setError(null);

        try {
            // Add current date to the data
            const dataWithDate = {
                ...data,
                date: new Date().toISOString().split("T")[0],
            };

            const response = await fetch("/api/submit-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataWithDate),
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

    const subscriptionOptions = [
        { value: "1 MOIS", price: "14.99 €", label: "1 MOIS" },
        { value: "3 MOIS", price: "24.99 €", label: "3 MOIS" },
        { value: "6 MOIS", price: "29.99 €", label: "6 MOIS", popular: true },
        { value: "12 MOIS", price: "34.99 €", label: "12 MOIS" },
    ];

    const features = ["Qualité SD & HD & Full HD & 4K", "Chaînes Sport Premium", "Accès sur tous les appareils", "VOD mis à jour régulièrement"];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                    {/* Marketing Section */}
                    <div className="space-y-8">
                        {/* Header */}
                        <div className="text-center lg:text-left">
                            <div className="flex items-center justify-center lg:justify-start mb-4">
                                <div className="bg-orange-500 p-2 rounded-lg">
                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                    </svg>
                                </div>
                                <span className="ml-2 text-2xl font-bold text-gray-800">TvserTV</span>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                                MEILLEUR
                                <span className="block text-orange-500">ABONNEMENT TV 2025</span>
                            </h1>
                            <div className="bg-orange-500 text-white px-6 py-3 rounded-lg text-lg font-bold inline-block">
                                POURQUOI NOUS SOMMES LE CHOIX NUMÉRO
                                <span className="block text-2xl">1 EN FRANCE</span>
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-orange-500 text-white p-4 rounded-lg text-center">
                                <div className="text-2xl mb-2">📺</div>
                                <h3 className="font-bold text-sm">DIVERTISSEMENT ILLIMITÉ</h3>
                            </div>
                            <div className="bg-orange-500 text-white p-4 rounded-lg text-center">
                                <div className="text-2xl mb-2">💰</div>
                                <h3 className="font-bold text-sm">FAIBLE COÛT</h3>
                            </div>
                            <div className="bg-orange-500 text-white p-4 rounded-lg text-center">
                                <div className="text-2xl mb-2">📡</div>
                                <h3 className="font-bold text-sm">PLUS DE 22 000 CHAÎNES</h3>
                            </div>
                            <div className="bg-orange-500 text-white p-4 rounded-lg text-center">
                                <div className="text-2xl mb-2">🎧</div>
                                <h3 className="font-bold text-sm">ASSISTANCE 24H/7</h3>
                            </div>
                        </div>

                        {/* How it Works */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">COMMENT ÇA FONCTIONNE ?</h2>
                            <p className="text-orange-500 font-bold text-xl mb-6">STREAMING SIMPLIFIÉ</p>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Commandez Votre Abonnement</h3>
                                        <p className="text-gray-600 text-sm">
                                            Après commande de votre abonnement, vos liens streaming et identifiants sont envoyés instantanément par email ou WhatsApp.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Installez Application ou Player</h3>
                                        <p className="text-gray-600 text-sm">Notre équipe support vous guide pour configurer le streaming sur votre appareil, cela prend seulement 1-2 minutes.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Regardez & Profitez du Streaming</h3>
                                        <p className="text-gray-600 text-sm">
                                            Profitez de vos chaînes préférées et émissions VOD sur Smart TV, décodeur IPTV, smartphone, tablette, ordinateur avec notre service premium.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="lg:pl-8">
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                            <div className="bg-orange-500 text-white p-6 text-center">
                                <h2 className="text-2xl font-bold">SÉLECTIONNEZ LE FORFAIT QUI RÉPOND À VOS BESOINS</h2>
                            </div>

                            {isSuccess ? (
                                <div className="p-6">
                                    <div className="bg-green-50 border-2 border-green-200 text-green-800 px-6 py-8 rounded-lg text-center">
                                        <div className="text-4xl mb-4">✅</div>
                                        <p className="text-xl font-bold mb-2">Demande envoyée avec succès!</p>
                                        <p className="mb-6">Nous vous contacterons bientôt sur WhatsApp.</p>
                                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition-colors" onClick={() => setIsSuccess(false)}>
                                            Nouveau formulaire
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 space-y-6">
                                    {/* Subscription Plans */}
                                    <div>
                                        <label className="block text-lg font-bold text-gray-900 mb-4">Choisissez votre abonnement *</label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {subscriptionOptions.map((option) => (
                                                <label
                                                    key={option.value}
                                                    className={`relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                                        selectedSubscription === option.value
                                                            ? "border-orange-500 bg-orange-50"
                                                            : option.popular
                                                            ? "border-orange-300 bg-orange-25"
                                                            : "border-gray-200 hover:border-orange-300"
                                                    }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        value={option.value}
                                                        {...register("subscription")}
                                                        onChange={(e) => setSelectedSubscription(e.target.value)}
                                                        className="sr-only"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-bold text-lg">{option.label}</span>
                                                            <span className="text-2xl font-black text-orange-500">{option.price}</span>
                                                        </div>
                                                        <div className="mt-2 space-y-1">
                                                            {features.map((feature, idx) => (
                                                                <div key={idx} className="flex items-center text-sm text-gray-600">
                                                                    <span className="text-orange-500 mr-2">✓</span>
                                                                    {feature}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {option.popular && <div className="absolute -top-2 -right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">POPULAIRE</div>}
                                                </label>
                                            ))}
                                        </div>
                                        {errors.subscription && <p className="text-red-500 text-sm mt-2">{errors.subscription.message}</p>}
                                    </div>

                                    {/* Personal Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="fullName" className="block text-sm font-bold text-gray-900 mb-2">
                                                Nom Complet *
                                            </label>
                                            <input
                                                id="fullName"
                                                type="text"
                                                {...register("fullName")}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                                                placeholder="Votre nom complet"
                                            />
                                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="whatsappNumber" className="block text-sm font-bold text-gray-900 mb-2">
                                                Numéro WhatsApp *
                                            </label>
                                            <input
                                                id="whatsappNumber"
                                                type="tel"
                                                {...register("whatsappNumber")}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                                                placeholder="+33 6 12 34 56 78"
                                            />
                                            {errors.whatsappNumber && <p className="text-red-500 text-xs mt-1">{errors.whatsappNumber.message}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="device" className="block text-sm font-bold text-gray-900 mb-2">
                                            Appareil Principal *
                                        </label>
                                        <select
                                            id="device"
                                            {...register("device")}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                                        >
                                            <option value="">Sélectionnez un appareil</option>
                                            <option value="Smart TV">📺 Smart TV</option>
                                            <option value="Android Box">📱 Android Box</option>
                                            <option value="PC/Mac">💻 PC/Mac</option>
                                            <option value="Mobile">📱 Mobile</option>
                                            <option value="Autre">🔧 Autre</option>
                                        </select>
                                        {errors.device && <p className="text-red-500 text-xs mt-1">{errors.device.message}</p>}
                                    </div>

                                    {error && (
                                        <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-lg">
                                            <p>{error}</p>
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        disabled={isSubmitting}
                                        onClick={handleSubmit(onSubmit)}
                                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-300 disabled:to-orange-400 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Envoi en cours...
                                            </span>
                                        ) : (
                                            "🚀 COMMANDER MAINTENANT"
                                        )}
                                    </button>

                                    <p className="text-xs text-gray-500 text-center">En soumettant ce formulaire, vous acceptez d'être contacté via WhatsApp pour finaliser votre commande.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
