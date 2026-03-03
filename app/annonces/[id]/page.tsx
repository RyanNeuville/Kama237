'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ImageCarousel } from '@/components/image-carousel';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { properties } from '@/lib/properties';
import {
  MapPin,
  Bed,
  Bath,
  Square,
  DollarSign,
  Share2,
  Heart,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <main className="min-h-screen bg-background dark:bg-slate-950">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Annonce non trouvée</h1>
          <p className="text-muted-foreground mb-8">
            Désolé, cette annonce n'existe pas ou a été supprimée.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/annonces">Retour aux annonces</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  // Duplicate image for carousel demo
  const carouselImages = [property.image, property.image, property.image];

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
    <main className="min-h-screen bg-background dark:bg-slate-950">
      <Navbar />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Back Button */}
        <motion.div variants={itemVariants} className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/annonces">← Retour</Link>
          </Button>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery - Takes 2 columns */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <ImageCarousel images={carouselImages} title={property.title} />
          </motion.div>

          {/* Quick Info Card */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-white dark:bg-slate-800 sticky top-24">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Prix</p>
                  <p className="text-3xl font-bold text-primary">
                    {formatPrice(property.price)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {property.transaction === 'À louer' ? 'FCFA/mois' : 'FCFA'}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Badge className="bg-primary">{property.type}</Badge>
                  <Badge
                    className={
                      property.transaction === 'À louer'
                        ? 'bg-blue-500'
                        : 'bg-green-600'
                    }
                  >
                    {property.transaction}
                  </Badge>
                </div>

                <div className="border-t border-border pt-4">
                  <Button className="w-full bg-primary hover:bg-primary/90 mb-2">
                    <Phone size={18} className="mr-2" />
                    Appeler
                  </Button>
                  <Button variant="outline" className="w-full mb-2">
                    <MessageCircle size={18} className="mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Heart size={18} className="mr-2" />
                    Favoris
                  </Button>
                </div>

                <div className="border-t border-border pt-4">
                  <button className="w-full flex items-center justify-center gap-2 text-primary hover:text-primary/80">
                    <Share2 size={18} />
                    Partager
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Details Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Title */}
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={20} />
                <span className="text-lg">{property.location}</span>
              </div>
            </div>

            {/* Features Grid */}
            <Card className="p-6 bg-white dark:bg-slate-800 border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Caractéristiques
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Bed className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {property.bedrooms}
                  </p>
                  <p className="text-sm text-muted-foreground">Chambre(s)</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Bath className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {property.bathrooms}
                  </p>
                  <p className="text-sm text-muted-foreground">Salle(s) de bain</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Square className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {property.squareMeter}
                  </p>
                  <p className="text-sm text-muted-foreground">m²</p>
                </div>
              </div>
            </Card>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Description
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Superbe {property.type.toLowerCase()} à {property.location}. Cette propriété offre un excellent
                rapport qualité-prix avec tous les équipements modernes. Idéale pour une famille
                ou un investisseur. Ne manquez pas cette opportunité unique !
              </p>
            </div>

            {/* Amenities */}
            <Card className="p-6 bg-white dark:bg-slate-800 border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Équipements</h2>
              <ul className="grid grid-cols-2 gap-3">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>Eau courante</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>Électricité</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>Gardien</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>Cuisine</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>Parking</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>Climatisation</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Agent Info */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-white dark:bg-slate-800">
              <h3 className="text-xl font-bold text-foreground mb-4">Agent</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                    👤
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Jean Kamga</p>
                    <p className="text-sm text-muted-foreground">Agent Immobilier</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Phone size={18} className="mr-2" />
                    +237 6 XX XXX XXX
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle size={18} className="mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>

      <Footer />
    </main>
  );
}
