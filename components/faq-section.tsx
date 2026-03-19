'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  description?: string;
  items: FAQItem[];
}

export function FAQSection({ title, description, items }: FAQSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{title}</h2>
            {description && <p className="text-lg text-muted-foreground">{description}</p>}
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-4"
        >
          {items.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full bg-card border border-border rounded-lg p-6 text-left hover:shadow-md transition-shadow flex justify-between items-start"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg">{item.question}</h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 ml-4 transition-transform ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-secondary/30 border border-border border-t-0 rounded-b-lg p-6"
                >
                  <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
