"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock } from "lucide-react";

export interface Office {
  city: string;
  address: string;
  phone: string;
  hours: string;
}

interface OfficeCardProps {
  office: Office;
  index?: number;
}

export function OfficeCard({ office, index = 0 }: OfficeCardProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: index * 0.1 },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <MapPin className="w-16 h-16 text-primary opacity-30" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          {office.city}
        </h3>
        <div className="space-y-3">
          <div className="flex gap-3">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-muted-foreground text-sm">{office.address}</p>
          </div>
          <div className="flex gap-3">
            <Phone className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-muted-foreground text-sm">{office.phone}</p>
          </div>
          <div className="flex gap-3">
            <Clock className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-muted-foreground text-sm">{office.hours}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
