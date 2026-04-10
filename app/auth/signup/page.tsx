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
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted) {
      toast.error('Vous devez accepter les conditions générales.');
      return;
    }

    if (password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    setLoading(true);

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        toast.error('Un compte existe déjà avec cette adresse email.');
      } else {
        toast.error(authError.message);
      }
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <main className="min-h-screen bg-background dark:bg-slate-950">
        <Navbar />
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-white dark:bg-slate-800 border-border text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle className="h-16 w-16 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Inscription réussie !
              </h1>
              <p className="text-muted-foreground mb-6">
                Un email de confirmation a été envoyé à <strong>{email}</strong>.
                Veuillez cliquer sur le lien dans l&apos;email pour activer votre compte.
              </p>
              <Button
                onClick={() => router.push('/auth/signin')}
                className="bg-primary hover:bg-primary/90"
              >
                Aller à la page de connexion
              </Button>
            </Card>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

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
              <h1 className="text-3xl font-bold text-foreground mb-2">S&apos;inscrire</h1>
              <p className="text-muted-foreground">
                Créez votre compte Home237
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="font-semibold mb-2 block">
                  Nom complet
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Votre nom"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={loading}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  minLength={6}
                />
                <p className="text-xs text-muted-foreground mt-1">Minimum 6 caractères</p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                  disabled={loading}
                />
                <label htmlFor="terms" className="text-sm cursor-pointer text-muted-foreground">
                  J&apos;accepte les{' '}
                  <Link href="/mentions-legales" className="text-primary hover:underline">
                    conditions générales
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Inscription...
                  </>
                ) : (
                  "S'inscrire"
                )}
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
