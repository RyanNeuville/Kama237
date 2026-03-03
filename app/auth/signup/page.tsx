'use client';

import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-background dark:bg-slate-950">
      <Navbar />

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 bg-white dark:bg-slate-800 border-border">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">S'inscrire</h1>
              <p className="text-muted-foreground">
                Créez votre compte Kama237
              </p>
            </div>

            <form className="space-y-6">
              <div>
                <Label htmlFor="name" className="font-semibold mb-2 block">
                  Nom complet
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Votre nom"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="font-semibold mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="font-semibold mb-2 block">
                  Téléphone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+237 6XX XXX XXX"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="font-semibold mb-2 block">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <label htmlFor="terms" className="text-sm cursor-pointer text-muted-foreground">
                  J'accepte les{' '}
                  <Link href="#" className="text-primary hover:underline">
                    conditions générales
                  </Link>
                </label>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                S'inscrire
              </Button>

              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  Vous avez déjà un compte ?{' '}
                  <Link href="/auth/signin" className="text-primary hover:underline">
                    Se connecter
                  </Link>
                </p>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
