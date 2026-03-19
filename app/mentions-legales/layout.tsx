import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales | Home237",
  description:
    "Mentions légales de Home237. Informations juridiques, responsabilité et droits des utilisateurs.",
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
