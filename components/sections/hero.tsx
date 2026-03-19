"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search-bar";

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&h=1080&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-caption scroll-m-20 text-4xl font-extrabold  tracking-tight md:text-5xl lg:text-6xl lg:leading-tight">
            <span className="relative">
              <svg
                width={219}
                height={24}
                viewBox="0 0 219 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-x-0 -bottom-3 w-full text-white"
              >
                <path
                  d="M0.5 2H218L21 12.5H182.5L48.5 21.5H151"
                  stroke="currentColor"
                  strokeWidth={4}
                ></path>
              </svg>
              <span>Trouve </span>
            </span>
            ton futur chez toi au <br></br>
            <span className="-mx-2 -my-1 border border-foreground/40 bg-foreground/10 px-2 py-1">
              Cameroun
            </span>
          </h1>
          <br />

          <p className="text-lg font-normal text-white md:text-xl lg:text-2xl">
            Facile, rapide, sérieux – Découvre les meilleures annonces
            immobilières au Cameroun
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <SearchBar />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link href="/annonces">Voir les annonces</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-white/10 border-white text-white hover:bg-white/20"
          >
            <Link href="/publier">Publier une annonce</Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
