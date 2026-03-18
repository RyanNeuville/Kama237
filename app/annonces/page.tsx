"use client";

import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FilterSidebar } from "@/components/filter-sidebar";
import { PropertyCard } from "@/components/property-card";
import { properties } from "@/lib/properties";
import { motion } from "framer-motion";

export default function AnnoncesPage() {
  const searchParams = useSearchParams();

  // Filter properties based on search params
  const filteredProperties = properties.filter((property) => {
    const type = searchParams.get("type");
    const transaction = searchParams.get("transaction");
    const city = searchParams.get("city");
    const priceMin = parseInt(searchParams.get("priceMin") || "0");
    const priceMax = parseInt(searchParams.get("priceMax") || "500000000");
    const location = searchParams.get("location");

    if (type && property.type !== type) return false;
    if (transaction && property.transaction !== transaction) return false;
    if (city && property.city !== city) return false;
    if (property.price < priceMin || property.price > priceMax) return false;
    if (
      location &&
      !property.location.toLowerCase().includes(location.toLowerCase()) &&
      !property.title.toLowerCase().includes(location.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navbar />

      <div className="section-padding container-xl pt-16">
        <div className="mb-16">
          <div className="flex items-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-4">
            <span className="w-8 h-px bg-primary" />
            Répertoire
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tighter mb-4">
            Toutes les <span className="text-primary italic font-serif">Annonces</span>
          </h1>
          <p className="text-muted-foreground text-lg font-medium">
            {filteredProperties.length} résultat{filteredProperties.length > 1 ? "s" : ""} correspondant à vos critères
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16 items-start">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 lg:sticky lg:top-24">
            <FilterSidebar />
          </aside>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            {filteredProperties.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
              >
                {filteredProperties.map((property) => (
                  <motion.div key={property.id} variants={itemVariants}>
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 rounded-4xl bg-secondary/30 border border-dashed border-border">
                <div className="text-center max-w-sm px-6">
                  <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mx-auto mb-6 text-muted-foreground">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-foreground mb-3 tracking-tight">
                    Aucun résultat
                  </h3>
                  <p className="text-muted-foreground font-medium mb-8">
                    Nous n'avons trouvé aucun bien correspondant à votre recherche. Essayez d'ajuster vos filtres.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
