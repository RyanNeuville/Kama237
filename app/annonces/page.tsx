'use client';

import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { FilterSidebar } from '@/components/filter-sidebar';
import { PropertyCard } from '@/components/property-card';
import { properties } from '@/lib/properties';
import { motion } from 'framer-motion';

export default function AnnoncesPage() {
  const searchParams = useSearchParams();

  // Filter properties based on search params
  const filteredProperties = properties.filter((property) => {
    const type = searchParams.get('type');
    const transaction = searchParams.get('transaction');
    const city = searchParams.get('city');
    const priceMin = parseInt(searchParams.get('priceMin') || '0');
    const priceMax = parseInt(searchParams.get('priceMax') || '500000000');
    const location = searchParams.get('location');

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
    <main className="min-h-screen bg-background dark:bg-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Annonces Immobilières</h1>
          <p className="text-muted-foreground">
            {filteredProperties.length} annonce{filteredProperties.length !== 1 ? 's' : ''} trouvée{filteredProperties.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <FilterSidebar />
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            {filteredProperties.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {filteredProperties.map((property) => (
                  <motion.div key={property.id} variants={itemVariants}>
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="col-span-full flex items-center justify-center py-24">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    Aucune annonce trouvée
                  </h3>
                  <p className="text-muted-foreground">
                    Essayez de modifier vos filtres pour trouver ce que vous cherchez
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
