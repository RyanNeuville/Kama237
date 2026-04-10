'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PropertyCard } from '@/components/property-card';
import { Badge } from '@/components/ui/badge';
import { LogOut, MessageSquare, Home, Loader2, CheckCircle, User, Trash2, Heart, Eye, Phone } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { supabase, toFrontendProperty } from '@/lib/supabase';
import type { DbProperty, Message } from '@/lib/supabase';
import { Suspense } from 'react';

function ProfilContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, profile, loading: authLoading, signOut, refreshProfile } = useAuth();

  const [myProperties, setMyProperties] = useState<ReturnType<typeof toFrontendProperty>[]>([]);
  const [messages, setMessages] = useState<(Message & { properties?: { id: string; title: string } })[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Settings form
  const [settingsName, setSettingsName] = useState('');
  const [settingsPhone, setSettingsPhone] = useState('');
  const [savingSettings, setSavingSettings] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<(Message & { properties?: { id: string; title: string } }) | null>(null);

  const justPublished = searchParams.get('published') === 'true';

  // Initialize settings
  useEffect(() => {
    if (profile) {
      setSettingsName(profile.full_name || '');
      setSettingsPhone(profile.phone || '');
    }
  }, [profile]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/signin');
    }
  }, [user, authLoading, router]);

  // Populate settings from profile
  useEffect(() => {
    if (profile) {
      setSettingsName(profile.full_name || '');
      setSettingsPhone(profile.phone || '');
    }
  }, [profile]);

  // Fetch user data
  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      setLoadingData(true);

      // Fetch my properties
      const { data: propsData } = await supabase
        .from('properties')
        .select('*, profiles(*)')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (propsData) {
        setMyProperties((propsData as DbProperty[]).map(toFrontendProperty));
      }

      // Fetch messages for my properties
      const { data: msgsData } = await supabase
        .from('messages')
        .select('*, properties(id, title)')
        .order('created_at', { ascending: false });

      if (msgsData) {
        setMessages(msgsData as (Message & { properties?: { id: string; title: string } })[]);
      }

      setLoadingData(false);
    }

    fetchData();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
    router.refresh();
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSavingSettings(true);

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: settingsName,
        phone: settingsPhone,
      })
      .eq('id', user.id);

    if (!error) {
      toast.success("Paramètres mis à jour avec succès !");
      await refreshProfile();
    } else {
      toast.error("Erreur lors de la mise à jour des paramètres : " + error.message);
    }
    setSavingSettings(false);
  };

  const handleDeleteProperty = async (propertyId: string) => {
    setIsDeleting(true);

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', propertyId);

    if (!error) {
      toast.success("Annonce supprimée avec succès.");
      setMyProperties((prev) => prev.filter((p) => p.id !== propertyId));
    } else {
      toast.error("Erreur lors de la suppression de l'annonce.");
    }
    
    setIsDeleting(false);
    setPropertyToDelete(null);
  };

  const formatTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `Il y a ${mins}min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `Il y a ${hours}h`;
    const days = Math.floor(hours / 24);
    return `Il y a ${days}j`;
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case 'EN_ATTENTE': return <Badge variant="outline" className="border-yellow-500 text-yellow-600">En attente</Badge>;
      case 'PUBLIE': return <Badge className="bg-primary">Publié</Badge>;
      case 'ARCHIVE': return <Badge variant="secondary">Archivé</Badge>;
      default: return null;
    }
  };

  const displayName = profile?.full_name || user?.email?.split('@')[0] || '';
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (authLoading || (!user && !authLoading)) {
    return (
      <main className="min-h-screen bg-background dark:bg-slate-950">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background dark:bg-slate-950">
      <Navbar />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Success Banner */}
        {justPublished && (
          <motion.div variants={itemVariants} className="mb-8">
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary shrink-0" />
              <p className="text-sm text-foreground">
                <strong>Annonce soumise avec succès !</strong> Elle sera visible après validation par notre équipe.
              </p>
            </div>
          </motion.div>
        )}

        {/* User Header */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 bg-linear-to-r from-primary/10 to-accent/10 border-border mb-12 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary shadow-inner">
                  {initials || <User size={32} />}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground tracking-tight">{displayName}</h1>
                  <p className="text-muted-foreground font-medium">{user?.email}</p>
                  <p className="text-sm text-muted-foreground mt-2 bg-secondary/30 w-fit px-2 py-1 rounded">
                    Membre depuis {new Date(user?.created_at || '').toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <Button variant="outline" className="gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-colors" onClick={handleSignOut}>
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
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {loadingData ? '—' : myProperties.length}
                  </p>
                </div>
                <Home className="w-10 h-10 text-primary opacity-20" />
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-white dark:bg-slate-800 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Messages reçus</p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {loadingData ? '—' : messages.length}
                  </p>
                </div>
                <MessageSquare className="w-10 h-10 text-primary opacity-20" />
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-white dark:bg-slate-800 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Non lus</p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {loadingData ? '—' : messages.filter((m) => !m.is_read).length}
                  </p>
                </div>
                <MessageSquare className="w-10 h-10 text-destructive opacity-20" />
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-white dark:bg-slate-800 border-border shadow-md">
            <Tabs defaultValue="listings" className="w-full">
              <TabsList className="mb-6 bg-secondary/20 p-1">
                <TabsTrigger value="listings" className="gap-2">
                  <Home size={16} /> Mes annonces
                </TabsTrigger>
                <TabsTrigger value="messages" className="gap-2">
                  <MessageSquare size={16} /> Messages
                </TabsTrigger>
                <TabsTrigger value="favorites" className="gap-2">
                  <Heart size={16} /> Favoris
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2">
                   <User size={16} /> Paramètres
                </TabsTrigger>
              </TabsList>

              {/* Listings Tab */}
              <TabsContent value="listings" className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Mes annonces</h2>
                  <Button className="bg-primary hover:bg-primary/90" asChild>
                    <Link href="/publier">Nouvelle annonce</Link>
                  </Button>
                </div>

                {loadingData ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : myProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myProperties.map((property) => (
                      <div key={property.id} className="relative group">
                        <PropertyCard property={property} />
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="shadow-lg"
                              >
                                <Trash2 size={16} className="mr-2" />
                                Supprimer
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Êtes-vous sûr de vouloir supprimer &quot;{property.title}&quot; ? 
                                  Cette action est irréversible et retirera l&apos;annonce de la plateforme.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeleteProperty(property.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Supprimer définitivement
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      Vous n&apos;avez pas encore publié d&apos;annonce
                    </p>
                    <Button asChild className="bg-primary hover:bg-primary/90">
                      <Link href="/publier">Publier ma première annonce</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Messages Tab */}
              <TabsContent value="messages" className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Messages reçus</h2>

                {loadingData ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <Card
                        key={msg.id}
                        className={`p-4 border-border hover:border-primary transition-colors ${
                          !msg.is_read ? 'bg-primary/5 border-primary/20' : 'bg-background dark:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-foreground">{msg.sender_name}</p>
                              {!msg.is_read && (
                                <Badge className="bg-primary text-white text-xs">Nouveau</Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              {msg.sender_email} {msg.sender_phone && `• ${msg.sender_phone}`}
                            </p>
                            {msg.properties && (
                              <p className="text-xs text-primary mb-2">
                                Re: {msg.properties.title}
                              </p>
                            )}
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                              {formatTimeAgo(msg.created_at)}
                            </span>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button size="sm" variant="ghost" className="gap-2 text-primary hover:bg-primary/10" onClick={() => setSelectedMessage(msg)}>
                              <Eye size={16} />
                              Lire
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Aucun message pour le moment.</p>
                    </div>
                  )}
                </TabsContent>
  
                {/* Favorites Tab */}
                <TabsContent value="favorites" className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">Mes Favoris</h2>
                  <div className="flex flex-col items-center justify-center py-16 bg-secondary/10 rounded-xl border border-dashed border-border">
                    <Heart className="w-12 h-12 text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground font-medium">Vous n&apos;avez pas encore de favoris.</p>
                    <p className="text-xs text-muted-foreground mt-1">Cliquez sur le coeur sur une annonce pour la retrouver ici.</p>
                    <Button asChild className="mt-6 bg-primary hover:bg-primary/90" variant="outline">
                      <Link href="/annonces">Parcourir les annonces</Link>
                    </Button>
                  </div>
                </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Paramètres</h2>

                <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl">
                  <div className="bg-secondary/10 p-6 rounded-xl border border-border">
                    <h3 className="font-bold text-lg text-foreground mb-6 flex items-center gap-2">
                       <User className="text-primary w-5 h-5" /> Informations du profil
                    </h3>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="settings-name" className="text-sm font-semibold">Nom complet</Label>
                          <Input
                            id="settings-name"
                            type="text"
                            value={settingsName}
                            onChange={(e) => setSettingsName(e.target.value)}
                            placeholder="Votre nom"
                            disabled={savingSettings}
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="settings-phone" className="text-sm font-semibold">Téléphone</Label>
                          <Input
                            id="settings-phone"
                            type="tel"
                            value={settingsPhone}
                            onChange={(e) => setSettingsPhone(e.target.value)}
                            placeholder="+237 6XX XXX XXX"
                            disabled={savingSettings}
                            className="bg-background"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Email</Label>
                        <Input
                          type="email"
                          value={user?.email || ''}
                          disabled
                          className="bg-secondary/20 cursor-not-allowed border-dashed"
                        />
                        <p className="text-[10px] text-muted-foreground">L&apos;adresse email de votre compte ne peut pas être modifiée.</p>
                      </div>
                    </div>
  
                    <div className="mt-8 flex justify-end">
                      <Button
                        type="submit"
                        className="bg-primary hover:bg-primary/90 min-w-[200px]"
                        disabled={savingSettings}
                      >
                        {savingSettings ? (
                          <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Enregistrement...</>
                        ) : (
                          'Mettre à jour le profil'
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
  
        {/* Message Detail Dialog */}
        <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Message de {selectedMessage?.sender_name}
              </DialogTitle>
              <DialogDescription>
                Reçu {selectedMessage && formatTimeAgo(selectedMessage.created_at)}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-1">
                <p className="text-xs font-bold text-primary uppercase tracking-wider">Concernant</p>
                <p className="text-sm font-medium text-foreground">{selectedMessage?.properties?.title || 'Annonce supprimée'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-primary uppercase tracking-wider">Coordonnées</p>
                <p className="text-sm text-foreground">{selectedMessage?.sender_email}</p>
                {selectedMessage?.sender_phone && <p className="text-sm text-foreground">{selectedMessage.sender_phone}</p>}
              </div>
              <div className="bg-secondary/20 p-4 rounded-lg border border-border mt-2">
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Message</p>
                <p className="text-sm text-foreground leading-relaxed italic">&quot;{selectedMessage?.content}&quot;</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
                <Button variant="outline" onClick={() => setSelectedMessage(null)}>Fermer</Button>
                {selectedMessage?.sender_phone && (
                   <a href={`tel:${selectedMessage.sender_phone}`}>
                     <Button className="bg-primary hover:bg-primary/90 gap-2">
                        <Phone size={16} /> Appeler
                     </Button>
                   </a>
                )}
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      <Footer />
    </main>
  );
}

export default function ProfilPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <ProfilContent />
    </Suspense>
  );
}
