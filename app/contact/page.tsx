"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

    // Reset after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

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
                <span>Contactez </span>
              </span>
              -
              <span className="-mx-2 -my-1 border text-white border-foreground/40 bg-foreground/10 px-2 py-1">
                Nous
              </span>
              <br />
            </h1>
            <div>
              <br />
            </div>
            <p className="text-lg sm:text-xl text-gray-200 text-balance">
              Des questions ? Nous sommes là pour vous aider 24h/24, 7j/7
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Phone,
                title: "Téléphone",
                details: ["+237 6 55 05 49 85", "+237 6 86 69 40 02"],
              },
              {
                icon: Mail,
                title: "Email",
                details: ["support@kama237.cm", "contact@kama237.cm"],
              },
              {
                icon: MapPin,
                title: "Adresse",
                details: ["Douala, Akwa", "Yaoundé, Bastos"],
              },
              {
                icon: Clock,
                title: "Heures",
                details: ["Lun-Ven: 08h-18h", "Sam-Dim: Fermé"],
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <div className="space-y-1">
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/50 to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Envoyez-nous un Message
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center"
                >
                  <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">
                    Merci !
                  </h3>
                  <p className="text-green-700 dark:text-green-200">
                    Votre message a été reçu. Nous vous répondrons dans les 24
                    heures.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nom complet
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jean Dupont"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jean@example.com"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Téléphone
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+237 6 XX XXX XXX"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Sujet
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="general">Question générale</option>
                      <option value="listing">À propos d'une annonce</option>
                      <option value="publish">Publier une annonce</option>
                      <option value="technical">Problème technique</option>
                      <option value="partnership">Partenariat</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Détaillez votre message..."
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Envoyer le message
                  </Button>
                </form>
              )}
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Questions Fréquentes
              </h2>

              <div className="space-y-6">
                {[
                  {
                    question: "Comment publier une annonce ?",
                    answer:
                      'C\'est simple ! Cliquez sur "Publier une annonce", remplissez les informations de votre propriété avec photos, et publiez en quelques minutes.',
                  },
                  {
                    question: "Les annonces sont-elles vérifiées ?",
                    answer:
                      "Oui, toutes les annonces passent par notre processus de vérification pour garantir la qualité et l'honnêteté des listings.",
                  },
                  {
                    question: "Y a-t-il des frais de commission ?",
                    answer:
                      "La publication est gratuite pour tous. Les frais de commission s'appliquent uniquement lors d'une transaction complétée.",
                  },
                  {
                    question: "Comment contacter un agent ?",
                    answer:
                      "Sur chaque annonce, vous verrez les coordonnées de l'agent. Vous pouvez appeler, envoyer un SMS ou un message via la plateforme.",
                  },
                  {
                    question: "Puis-je modifier ma liste ?",
                    answer:
                      "Oui, vous pouvez modifier ou supprimer votre annonce à tout moment depuis votre tableau de bord.",
                  },
                  {
                    question: "Comment signaler une annonce frauduleuse ?",
                    answer:
                      'Cliquez sur le bouton "Signaler" sur l\'annonce ou contactez-nous directement avec les détails. Nous enquêtons immédiatement.',
                  },
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-card border border-border rounded-lg p-6"
                  >
                    <h3 className="font-semibold text-foreground mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Restez Informé
            </h2>
            <p className="text-lg text-white/90 mb-8 text-balance">
              Inscrivez-vous à notre newsletter pour les dernières annonces et
              nouvelles du marché immobilier.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 bg-white/10 border-white text-white placeholder:text-white/50"
              />
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                S'inscrire
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
