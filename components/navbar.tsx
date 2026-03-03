'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold">
              <span className="text-primary">Kama</span>
              <span className="text-accent">237</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition">
              Accueil
            </Link>
            <Link href="/annonces" className="text-foreground hover:text-primary transition">
              Annonces
            </Link>
            <Link href="#" className="text-foreground hover:text-primary transition">
              À propos
            </Link>
            <Link href="#" className="text-foreground hover:text-primary transition">
              Contact
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/auth/signin">Connexion</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/auth/signup">S'inscrire</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <div className="flex flex-col gap-4 pt-4">
              <Link href="/" className="text-foreground hover:text-primary transition">
                Accueil
              </Link>
              <Link href="/annonces" className="text-foreground hover:text-primary transition">
                Annonces
              </Link>
              <Link href="#" className="text-foreground hover:text-primary transition">
                À propos
              </Link>
              <Link href="#" className="text-foreground hover:text-primary transition">
                Contact
              </Link>
              <div className="flex flex-col gap-2 mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/auth/signin">Connexion</Link>
                </Button>
                <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                  <Link href="/auth/signup">S'inscrire</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
