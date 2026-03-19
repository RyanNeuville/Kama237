"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function LegalPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-white text-center"
          >
            Mentions Légales
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-12"
          >
            {/* Informations Légales */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Informations Légales
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Raison Sociale :</strong>{" "}
                  Home237 SARL
                </p>
                <p>
                  <strong className="text-foreground">Siège Social :</strong>{" "}
                  Boulevard de la Liberté, Akwa, Douala, Cameroun
                </p>
                <p>
                  <strong className="text-foreground">Capital Social :</strong>{" "}
                  10,000,000 CFA
                </p>
                <p>
                  <strong className="text-foreground">
                    Registre du Commerce :
                  </strong>{" "}
                  RC/CM/DLA/SHP/K-2022-B-00123
                </p>
                <p>
                  <strong className="text-foreground">Numéro NINEA :</strong>{" "}
                  1234567890123456789
                </p>
                <p>
                  <strong className="text-foreground">
                    Directeur de la Publication :
                  </strong>{" "}
                  Jean-Pierre Mvogo
                </p>
                <p>
                  <strong className="text-foreground">Contact :</strong>{" "}
                  contact@Home237.cm | +237 6 XX XXX XXX
                </p>
              </div>
            </div>

            {/* Responsabilité */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Responsabilité
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Home237 met tout en œuvre pour assurer l'exactitude des
                informations présentes sur son site. Cependant, elle ne peut
                garantir l'absence d'erreurs ou l'exhaustivité des informations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Les annonces publiées par les utilisateurs sont leur
                responsabilité. Home237 n'est pas responsable des contenus, des
                transactions conclues ou des litiges entre utilisateurs.
              </p>
            </div>

            {/* Propriété Intellectuelle */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Propriété Intellectuelle
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Tous les contenus du site (textes, images, logos, code source)
                sont la propriété de Home237 ou de ses partenaires. Toute
                reproduction sans autorisation écrite est strictement interdite.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Les marques Home237 et 237 sont des marques déposées. Toute
                utilisation non autorisée est prohibée.
              </p>
            </div>

            {/* Données Personnelles */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Protection des Données Personnelles
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Conformément à la loi informatique et libertés, vous disposez
                d'un droit d'accès, de rectification et de suppression des
                données vous concernant.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Pour exercer ces droits ou pour toute question sur notre
                politique de confidentialité, contactez-nous à
                privacy@Home237.cm
              </p>
            </div>

            {/* Limitation de Responsabilité */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Limitation de Responsabilité
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Home237 n'est pas responsable des dommages directs ou indirects
                résultant de l'utilisation du site, y compris notamment les
                pertes de données, les interruptions de service ou les dommages
                consécutifs. L'utilisation du site se fait à vos propres
                risques.
              </p>
            </div>

            {/* Liens Externes */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Liens Externes
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Home237 n'est pas responsable des contenus des sites externes
                vers lesquels des liens sont proposés. La présence d'un lien
                n'implique pas une approbation du contenu du site lié.
              </p>
            </div>

            {/* Modifications */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Modifications
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Home237 se réserve le droit de modifier ces mentions légales à
                tout moment. Les modifications entrent en vigueur dès leur
                publication sur le site.
              </p>
            </div>

            {/* Loi Applicable */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Loi Applicable
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Ces mentions légales sont régies par la loi camerounaise. Tout
                litige sera soumis à la juridiction des tribunaux compétents du
                Cameroun.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
