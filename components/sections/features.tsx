'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { features } from '@/lib/properties';
import { Shield, Lock, Phone, Home } from 'lucide-react';

const iconMap = {
  '✓': Shield,
  '🔒': Lock,
  '📱': Phone,
  '🏠': Home,
};

export function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
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
          Pourquoi <span className="text-primary">Kama237 ?</span>
        </h2>
        <p className="text-center text-muted-foreground text-lg">
          Nous vous offrons une expérience immobilière transparente et sécurisée
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {features.map((feature, index) => {
          const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Home;
          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className="p-8 bg-white dark:bg-slate-800 border-border hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-6">
                  <div className="bg-primary/10 p-4 rounded-lg flex-shrink-0">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
