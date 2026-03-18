"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, MapPin, Bed, Bath, Square } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  squareMeter: number;
  image: string;
  type: "Appartement" | "Maison" | "Terrain" | "Villa" | "Studio" | "Commerce";
  transaction: "À louer" | "À vendre";
  isNew?: boolean;
  isUrgent?: boolean;
  isFeatured?: boolean;
}

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link href={`/annonces/${property.id}`}>
        <div className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
          {/* Image Container */}
          <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-slate-800">
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {property.isNew && (
                <Badge className="bg-accent text-accent-foreground">
                  Nouveau
                </Badge>
              )}
              {property.isUrgent && (
                <Badge className="bg-destructive text-white">Urgent</Badge>
              )}
              {property.isFeatured && (
                <Badge className="bg-primary text-white">En vedette</Badge>
              )}
            </div>

            {/* Like Button */}
            <button
              className="absolute top-4 right-4 bg-white dark:bg-slate-800 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              aria-label="Add to favorites"
            >
              <Heart size={20} className="text-destructive" />
            </button>

            {/* Transaction Badge */}
            <div className="absolute bottom-4 right-4">
              <Badge
                className={
                  property.transaction === "À louer"
                    ? "bg-blue-500 text-white"
                    : "bg-green-600 text-white"
                }
              >
                {property.transaction}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Type */}
            <p className="text-sm text-muted-foreground mb-2">
              {property.type}
            </p>

            {/* Title */}
            <h3 className="font-semibold text-lg text-foreground mb-3 line-clamp-2">
              {property.title}
            </h3>

            {/* Price */}
            <div className="mb-3">
              <p className="text-2xl font-bold text-primary">
                {formatPrice(property.price)}{" "}
                <span className="text-sm text-muted-foreground">
                  {property.transaction === "À louer" ? "FCFA/mois" : "FCFA"}
                </span>
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <MapPin size={16} />
              <span className="truncate">{property.location}</span>
            </div>

            {/* Features */}
            <div className="flex gap-4 text-sm text-muted-foreground pt-4 border-t border-border">
              <div className="flex items-center gap-1">
                <Bed size={16} />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath size={16} />
                <span>{property.bathrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <Square size={16} />
                <span>{property.squareMeter}m²</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
