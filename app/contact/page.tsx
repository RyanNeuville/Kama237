"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background dark:bg-slate-950">
      <Navbar />

      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Contactez <span className="text-primary">H237</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              Une question ? Un projet immobilier ? Notre équipe est à votre écoute.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div className="flex items-start gap-6">
              <div className="bg-primary/10 p-4 rounded-xl">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-foreground mb-2">Email</h3>
                <p className="text-muted-foreground">contact@h237.cm</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="bg-primary/10 p-4 rounded-xl">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-foreground mb-2">Téléphone</h3>
                <p className="text-muted-foreground">+237 600 000 000</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="bg-primary/10 p-4 rounded-xl">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-foreground mb-2">Bureau</h3>
                <p className="text-muted-foreground">Douala, Akwa - Cameroun</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-slate-900 border border-border p-8 rounded-3xl shadow-sm"
          >
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Nom Complet</label>
                <Input placeholder="Votre nom" className="bg-secondary/50 border-none h-12 rounded-xl focus-visible:ring-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Email</label>
                <Input placeholder="votre@email.com" className="bg-secondary/50 border-none h-12 rounded-xl focus-visible:ring-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Message</label>
                <Textarea placeholder="Comment pouvons-nous vous aider ?" className="bg-secondary/50 border-none min-h-[150px] rounded-xl focus-visible:ring-primary" />
              </div>
              <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl gap-2 text-lg">
                <Send className="w-5 h-5" /> Envoyer le Message
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
