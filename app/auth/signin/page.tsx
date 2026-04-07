'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      if (authError.message.includes('Invalid login credentials')) {
        setError('Email ou mot de passe incorrect.');
      } else if (authError.message.includes('Email not confirmed')) {
        setError('Veuillez confirmer votre adresse email avant de vous connecter.');
      } else {
        setError(authError.message);
      }
      setLoading(false);
      return;
    }

    router.push('/profil');
    router.refresh();
  };

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
            <CardTitle className='flex items-center justify-center'>
              <Image
                src="/h237.png"
                alt="Home237 Logo"
                width={50}
                height={50}
                className="object-contain"
              />
            </CardTitle>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Connexion</h1>
              <p className="text-muted-foreground">
                Connectez-vous à votre compte Home237
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="font-semibold mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  'Se connecter'
                )}
              </Button>

              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  Pas encore de compte ?{' '}
                  <Link href="/auth/signup" className="text-primary hover:underline">
                    S&apos;inscrire
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
