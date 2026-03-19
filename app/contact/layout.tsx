import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Home237 | Nous Contacter",
  description:
    "Contactez Home237 pour vos questions sur l'immobilier au Cameroun. Support 24/7, formulaire de contact, informations de nos bureaux à Douala",
  openGraph: {
    title: "Contact Home237",
    description:
      "Des questions ? Notre équipe est disponible 24h/24, 7j/7 pour vous aider.",
    type: "website",
  },
  twitter: {
    title: "Contact Home237",
    description:
      "Des questions ? Notre équipe est disponible 24h/24, 7j/7 pour vous aider.",
    card: "summary_large_image",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <>{children}</>
    </div>
  );
}
