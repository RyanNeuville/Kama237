"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface ContactInfoItem {
  icon: LucideIcon;
  title: string;
  details: string[];
}

interface ContactInfoProps {
  items: ContactInfoItem[];
}

export function ContactInfo({ items }: ContactInfoProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid md:grid-cols-4 gap-8"
    >
      {items.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <IconComponent className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              {item.title}
            </h3>
            <div className="space-y-1">
              {item.details.map((detail, i) => (
                <p key={i} className="text-sm text-muted-foreground">
                  {detail}
                </p>
              ))}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
