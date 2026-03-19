"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Users, Target, Award, Zap, Home, TrendingUp } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-caption scroll-m-20 text-4xl font-extrabold  tracking-tight md:text-5xl lg:text-6xl lg:leading-tight">
              <span className="relative">
                <svg
                  width={219}
                  height={24}
                  viewBox="0 0 219 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-x-0 -bottom-3 w-full text-white"
                >
                  <path
                    d="M0.5 2H218L21 12.5H182.5L48.5 21.5H151"
                    stroke="currentColor"
                    strokeWidth={4}
                  ></path>
                </svg>
                <span>À Propos </span>
              </span>
              de
              <span className="-mx-2 -my-1 border text-white border-foreground/40 bg-foreground/10 px-2 py-1">
                Home237
              </span>
              <br />
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 text-balance mt-4">
              Révolutionner le marché immobilier camerounais avec transparence
              et innovation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Notre Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Home237 est née d'une vision simple : démocratiser l'accès à
                l'immobilier au Cameroun. Nous croyons que chercher sa maison
                idéale ne devrait pas être une quête compliquée.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                En connectant acheteurs, vendeurs et agents de manière
                transparente et efficace, nous transformons la façon dont les
                Camerounais trouvent leur propriété parfaite.
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/annonces">Explorez les annonces</Link>
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-6"
            >
              <div className="bg-card border border-border rounded-lg p-6">
                <Target className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">
                  Accessibilité
                </h3>
                <p className="text-sm text-muted-foreground">
                  Plateforme facile à utiliser pour tous
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <Award className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Qualité</h3>
                <p className="text-sm text-muted-foreground">
                  Annonces vérifiées et fiables
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <Zap className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Rapidité</h3>
                <p className="text-sm text-muted-foreground">
                  Trouvez votre bien en quelques clics
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <Home className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold text-foreground mb-2">
                  Transparence
                </h3>
                <p className="text-sm text-muted-foreground">
                  Pas de frais cachés, prix affichés
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-center mb-16"
          >
            Nos Chiffres Clés
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              { number: "50+", label: "Annonces actives", icon: Home },
              {
                number: "100+",
                label: "Utilisateurs inscrits",
                icon: Users,
              },
              { number: "10", label: "Villes couvertes", icon: TrendingUp },
              { number: "90%", label: "Satisfaction client", icon: Award },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center"
                >
                  <IconComponent className="w-10 h-10 mx-auto mb-4 text-accent" />
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <p className="text-white/80">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">
              Notre Histoire
            </h2>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white font-bold">
                    2025
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Idee & Fondation
                  </h3>
                  <p className="text-muted-foreground">
                    Deux jeunes etudiants camerounais identifient un problème :
                    trouver une maison au Cameroun était difficile et peu
                    transparent. Home237 est née de cette frustration.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent text-accent-foreground font-bold">
                    2026
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Lancement
                  </h3>
                  <p className="text-muted-foreground">
                    Après 6 mois de développement, Home237 lance sa plateforme
                    bêta à Douala et Yaoundé.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Nos Valeurs
            </h2>
            <p className="text-lg text-muted-foreground">
              Les principes qui guident chaque décision chez Home237
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8"
          >
            {[
              {
                title: "Intégrité",
                description:
                  "Nous opérons avec honnêteté totale. Pas de faux frais, pas de biais, juste du vrai.",
              },
              {
                title: "Innovation",
                description:
                  "Nous cherchons constamment à améliorer l'expérience immobilière avec la technologie.",
              },
              {
                title: "Accessibilité",
                description:
                  "L'immobilier ne doit pas être élitiste. Nous le rendons accessible à tous.",
              },
              {
                title: "Communauté",
                description:
                  "Nous construisons une communauté d'utilisateurs de confiance et honnêtes.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-lg p-8"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 rounded-full bg-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Rejoignez la Communauté Home237
            </h2>
            <p className="text-lg text-white/90 mb-8 text-balance">
              Que vous cherchiez à acheter, vendre ou louer, nous sommes là pour
              vous.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link href="/annonces">Voir les annonces</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 border-white text-white hover:bg-white/20"
              >
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
