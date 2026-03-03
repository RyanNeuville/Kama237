'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/property-card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { LogOut, Heart, MessageSquare, Home } from 'lucide-react';
import { properties } from '@/lib/properties';

export default function ProfilPage() {
  const [favorites, setFavorites] = useState<string[]>(['1', '4', '8']);
  const userListings = properties.slice(0, 3);
  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <main className="min-h-screen bg-background dark:bg-slate-950">
      <Navbar />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* User Header */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-border mb-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-4xl">
                  👤
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Jean Kamga</h1>
                  <p className="text-muted-foreground">jean.kamga@email.com</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Membre depuis janvier 2024
                  </p>
                </div>
              </div>

              <Button variant="outline" className="gap-2">
                <LogOut size={18} />
                Déconnexion
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-white dark:bg-slate-800 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Mes annonces</p>
                  <p className="text-3xl font-bold text-foreground mt-2">3</p>
                </div>
                <Home className="w-10 h-10 text-primary opacity-20" />
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-white dark:bg-slate-800 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Favoris</p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {favorites.length}
                  </p>
                </div>
                <Heart className="w-10 h-10 text-destructive opacity-20" />
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-white dark:bg-slate-800 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Messages</p>
                  <p className="text-3xl font-bold text-foreground mt-2">12</p>
                </div>
                <MessageSquare className="w-10 h-10 text-primary opacity-20" />
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-white dark:bg-slate-800 border-border">
            <Tabs defaultValue="listings" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="listings">Mes annonces</TabsTrigger>
                <TabsTrigger value="favorites">Favoris</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="settings">Paramètres</TabsTrigger>
              </TabsList>

              {/* Listings Tab */}
              <TabsContent value="listings" className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Mes annonces</h2>
                  <Button className="bg-primary hover:bg-primary/90">
                    Nouvelle annonce
                  </Button>
                </div>

                {userListings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userListings.map((property) => (
                      <div key={property.id} className="relative">
                        <PropertyCard property={property} />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Button size="sm" variant="secondary">
                            Éditer
                          </Button>
                          <Button size="sm" variant="destructive">
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      Vous n'avez pas encore publié d'annonce
                    </p>
                    <Button asChild className="bg-primary hover:bg-primary/90">
                      <a href="/publier">Publier ma première annonce</a>
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Favorites Tab */}
              <TabsContent value="favorites" className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Mes favoris</h2>

                {favoriteProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoriteProperties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      Vous n'avez pas encore d'annonces en favoris
                    </p>
                    <Button asChild className="bg-primary hover:bg-primary/90">
                      <a href="/annonces">Découvrir les annonces</a>
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Messages Tab */}
              <TabsContent value="messages" className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Messages</h2>

                <div className="space-y-4">
                  {[
                    {
                      from: 'Marie Fotso',
                      message:
                        'Bonjour, je suis intéressée par votre appartement à Douala Akwa. Pouvez-vous me donner plus d\'informations ?',
                      time: 'Il y a 2h',
                    },
                    {
                      from: 'Paul Nkomo',
                      message: 'La villa est-elle encore disponible ?',
                      time: 'Il y a 5h',
                    },
                    {
                      from: 'Sylvie Mbah',
                      message: 'Pouvons-nous convenir d\'une visite demain ?',
                      time: 'Il y a 1j',
                    },
                  ].map((msg, idx) => (
                    <Card
                      key={idx}
                      className="p-4 bg-background dark:bg-slate-900 border-border hover:border-primary transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{msg.from}</p>
                          <p className="text-muted-foreground text-sm mt-1">
                            {msg.message}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                          {msg.time}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Paramètres</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">
                      Informations personnelles
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Nom</label>
                        <input
                          type="text"
                          defaultValue="Jean Kamga"
                          className="w-full mt-2 px-4 py-2 border border-border rounded-lg bg-background dark:bg-slate-900"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Email</label>
                        <input
                          type="email"
                          defaultValue="jean.kamga@email.com"
                          className="w-full mt-2 px-4 py-2 border border-border rounded-lg bg-background dark:bg-slate-900"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          defaultValue="+237 6 XX XXX XXX"
                          className="w-full mt-2 px-4 py-2 border border-border rounded-lg bg-background dark:bg-slate-900"
                        />
                      </div>
                    </div>
                    <Button className="mt-6 bg-primary hover:bg-primary/90">
                      Enregistrer les modifications
                    </Button>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="font-semibold text-foreground mb-4">Sécurité</h3>
                    <Button variant="outline">Changer le mot de passe</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </motion.div>

      <Footer />
    </main>
  );
}
