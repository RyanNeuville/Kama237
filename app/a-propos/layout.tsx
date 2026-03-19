import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À Propos de Home237 | Plateforme Immobilière Cameroun",
  description:
    "Découvrez l'histoire de Home237, notre mission de démocratiser l'immobilier au Cameroun, notre équipe d'experts et nos valeurs.",
  openGraph: {
    title: "À Propos de Home237",
    description:
      "La plateforme immobilière qui révolutionne le marché au Cameroun avec transparence et innovation.",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
