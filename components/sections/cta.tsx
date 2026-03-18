"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-primary/80 dark:from-primary/80 dark:to-primary/60 rounded-2xl p-12 text-center text-white"
      >
        <h2 className="text-4xl font-bold mb-4">
          Prêt à publier votre annonce ?
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Atteignez des milliers de clients potentiels en quelques minutes. La
          publication est gratuite !
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link href="/publier">
              Publier une annonce <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/20"
          >
            <Link href="/annonces">Voir les annonces</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
