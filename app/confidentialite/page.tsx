'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function PrivacyPage() {
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
            Politique de Confidentialité
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
            {/* Introduction */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Home237 s'engage à protéger votre vie privée. Cette politique de confidentialité explique
                comment nous collectons, utilisons, partageons et protégeons vos données personnelles.
              </p>
            </div>

            {/* Données Collectées */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Données que Nous Collectons</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Informations de Compte</h3>
                  <p>Nom, prénom, email, numéro de téléphone, adresse, date de naissance</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Informations de Paiement</h3>
                  <p>
                    Pour les transactions, nous collectons les informations bancaires (jamais stockées
                    directement par nos serveurs)
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Données Techniques</h3>
                  <p>
                    Adresse IP, type de navigateur, pages visitées, durée de visite, cookies, données
                    de localisation (avec votre consentement)
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Contenu des Annonces</h3>
                  <p>Description, photos, documents fournis lors de la création d'annonce</p>
                </div>
              </div>
            </div>

            {/* Utilisation des Données */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Comment Nous Utilisons Vos Données</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Créer et gérer votre compte utilisateur</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Traiter les transactions et paiements</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Vous envoyer des notifications et messages importants</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Améliorer nos services et l'expérience utilisateur</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Prévenir la fraude et les abus</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Vous envoyer des offres promotionnelles (si consentement)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Respecter nos obligations légales</span>
                </li>
              </ul>
            </div>

            {/* Partage des Données */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Partage des Données</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos données avec :
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong className="text-foreground">Prestataires de services</strong> : paiement,
                    hébergement, analyse
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong className="text-foreground">Autres utilisateurs</strong> : les informations
                    publiques de votre profil
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong className="text-foreground">Autorités légales</strong> : si légalement
                    obligatoires
                  </span>
                </li>
              </ul>
            </div>

            {/* Sécurité */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Sécurité des Données</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous utilisons le chiffrement SSL/TLS et des mesures de sécurité avancées pour protéger
                vos données. Cependant, aucune transmission sur Internet n'est 100% sécurisée. Vous êtes
                responsable de la confidentialité de votre mot de passe.
              </p>
            </div>

            {/* Vos Droits */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Vos Droits</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Vous avez le droit de :
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Accéder à vos données personnelles</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Corriger les données inexactes</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Demander la suppression de vos données</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Vous opposer au traitement de vos données</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Obtenir une copie de vos données (portabilité)</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Pour exercer ces droits, contactez-nous à privacy@Home237.cm
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez configurer votre
                navigateur pour refuser les cookies, mais certaines fonctionnalités pourraient être
                affectées.
              </p>
            </div>

            {/* Modifications */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous pouvons modifier cette politique à tout moment. Les modifications sont effectives
                dès publication. Votre utilisation du site après modification implique votre acceptation.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Nous Contacter</h2>
              <p className="text-muted-foreground leading-relaxed">
                Pour toute question sur cette politique ou nos pratiques de confidentialité, contactez
                nous à : <br /> <br />
                <strong className="text-foreground">Email :</strong> privacy@Home237.cm <br />
                <strong className="text-foreground">Téléphone :</strong> +237 6 XX XXX XXX <br />
                <strong className="text-foreground">Adresse :</strong> Boulevard de la Liberté, Akwa,
                Douala, Cameroun
              </p>
            </div>

            {/* Date */}
            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Dernière mise à jour : 19 Mars 2025
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
