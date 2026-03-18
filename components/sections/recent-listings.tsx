'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PropertyCard } from '@/components/property-card';
import { Button } from '@/components/ui/button';
import { properties } from '@/lib/properties';

export function RecentListingsSection() {
  const recentProperties = properties.slice(0, 6);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-4xl font-bold text-foreground mb-4 text-center">
          Annonces <span className="text-primary">Récentes</span>
        </h2>
        <p className="text-center text-muted-foreground text-lg">
          Découvrez les dernières propriétés listées sur H237
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {recentProperties.map((property) => (
          <motion.div key={property.id} variants={itemVariants}>
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12 text-center">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
          <Link href="/annonces">Voir toutes les annonces</Link>
        </Button>
      </div>
    </section>
  );
}
