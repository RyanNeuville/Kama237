"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { supabase, toFrontendProperty, type DbProperty } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export function RecentListingsSection() {
  const [recentProperties, setRecentProperties] = useState<ReturnType<typeof toFrontendProperty>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecent() {
      const { data } = await supabase
        .from('properties')
        .select('*, profiles(*)')
        .eq('status', 'PUBLIE')
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (data) {
        setRecentProperties((data as DbProperty[]).map(toFrontendProperty));
      }
      setLoading(false);
    }
    fetchRecent();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Annonces <span className="text-primary">Récentes</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Découvrez les dernières propriétés listées sur H237
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : recentProperties.length > 0 ? (
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
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          Aucune annonce publiée pour le moment.
        </div>
      )}

      <div className="mt-12 text-center">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
          <Link href="/annonces">Voir toutes les annonces</Link>
        </Button>
      </div>
    </section>
  );
}
