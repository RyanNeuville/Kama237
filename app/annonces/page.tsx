"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FilterSidebar } from "@/components/filter-sidebar";
import { PropertyCard } from "@/components/property-card";
import { supabase, toFrontendProperty } from "@/lib/supabase";
import type { DbProperty } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

function AnnoncesContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<ReturnType<typeof toFrontendProperty>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);

      try {
        let query = supabase
          .from("properties")
          .select("*, profiles(*)")
          .eq("status", "PUBLIE")
          .order("created_at", { ascending: false });

        const type = searchParams.get("type");
        const transaction = searchParams.get("transaction");
        const city = searchParams.get("city");
        const priceMin = searchParams.get("priceMin");
        const priceMax = searchParams.get("priceMax");
        const location = searchParams.get("location");

        // Map frontend type names to DB enum values
        const typeMap: Record<string, string> = {
          Appartement: "APPARTEMENT",
          Maison: "MAISON",
          Terrain: "TERRAIN",
          Studio: "STUDIO",
          Villa: "VILLA",
          Commerce: "COMMERCE",
        };
        const transactionMap: Record<string, string> = {
          "À louer": "A_LOUER",
          "À vendre": "A_VENDRE",
        };

        if (type && typeMap[type]) query = query.eq("property_type", typeMap[type]);
        if (transaction && transactionMap[transaction]) query = query.eq("transaction_type", transactionMap[transaction]);
        if (city) query = query.eq("city", city);
        if (priceMin) query = query.gte("price", parseInt(priceMin));
        if (priceMax) query = query.lte("price", parseInt(priceMax));
        if (location) query = query.or(`neighborhood.ilike.%${location}%,title.ilike.%${location}%`);

        const { data, error } = await query;

        if (error) {
          console.warn("Supabase error:", error.message);
          setProperties([]);
        } else if (data) {
          setProperties((data as DbProperty[]).map(toFrontendProperty));
        } else {
          setProperties([]);
        }
      } catch (err) {
        setProperties([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [searchParams]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navbar />

      <div className="section-padding container-xl pt-16">
        <div className="mb-16">
          <h1 className="font-caption scroll-m-20 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl lg:leading-tight">
            <span className="relative">
              <svg width={219} height={24} viewBox="0 0 219 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-x-0 -bottom-3 w-full text-primary">
                <path d="M0.5 2H218L21 12.5H182.5L48.5 21.5H151" stroke="currentColor" strokeWidth={4}></path>
              </svg>
              <span>Toutes </span>
            </span>
            les{" "}
            <span className="-mx-2 -my-1 border text-primary border-foreground/40 bg-foreground/10 px-2 py-1">
              Annonces
            </span>
          </h1>
          <br />
          <p className="text-muted-foreground text-lg font-medium">
            {loading ? "Chargement..." : `${properties.length} résultat${properties.length > 1 ? "s" : ""} correspondant à vos critères`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16 items-start">
          <aside className="lg:col-span-1 lg:sticky lg:top-24">
            <FilterSidebar />
          </aside>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center py-32">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : properties.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
              >
                {properties.map((property) => (
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
                  <h3 className="text-2xl font-black text-foreground mb-3 tracking-tight">Aucun résultat</h3>
                  <p className="text-muted-foreground font-medium mb-8">
                    Nous n&apos;avons trouvé aucun bien correspondant à votre recherche. Essayez d&apos;ajuster vos filtres.
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

export default function AnnoncesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <AnnoncesContent />
    </Suspense>
  );
}
