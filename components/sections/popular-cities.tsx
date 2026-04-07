"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export const popularCities = [
  { name: "Douala", count: 142 },
  { name: "Yaoundé", count: 98 },
  { name: "Kribi", count: 45 },
  { name: "Limbe", count: 34 },
  { name: "Bafoussam", count: 28 },
  { name: "Buea", count: 19 },
];

export function PopularCitiesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-secondary/50 dark:bg-slate-900/50 rounded-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-4xl font-bold text-foreground mb-4 text-center">
          Villes <span className="text-primary">Populaires</span>
        </h2>
        <p className="text-center text-muted-foreground text-lg">
          Explorez les annonces par région au Cameroun
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {popularCities.map((city) => (
          <motion.div key={city.name} variants={itemVariants}>
            <Link href={`/annonces?city=${city.name}`}>
              <Card className="p-6 cursor-pointer hover:shadow-lg hover:border-primary transition-all duration-300 bg-white dark:bg-slate-800 border-border hover:border-primary">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      {city.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {city.count} annonce{city.count > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
