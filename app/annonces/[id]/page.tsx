'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ImageCarousel } from '@/components/image-carousel';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase, toFrontendProperty } from '@/lib/supabase';
import type { DbProperty } from '@/lib/supabase';
import {
  MapPin, Bed, Bath, Square,
  Share2, Heart, MessageCircle, Phone, Loader2, CheckCircle, User,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<ReturnType<typeof toFrontendProperty> | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Message form
  const [msgName, setMsgName] = useState('');
  const [msgEmail, setMsgEmail] = useState('');
  const [msgPhone, setMsgPhone] = useState('');
  const [msgContent, setMsgContent] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*, profiles(*)')
          .eq('id', id)
          .single();

        if (error || !data) {
          setNotFound(true);
        } else {
          setProperty(toFrontendProperty(data as DbProperty));
        }
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingMsg(true);

    const { error } = await supabase.from('messages').insert({
      property_id: id,
      sender_name: msgName,
      sender_email: msgEmail,
      sender_phone: msgPhone || null,
      content: msgContent,
    });

    if (error) {
      toast.error("Erreur lors de l'envoi du message. Veuillez réessayer.");
      console.error(error);
    } else {
      toast.success("Votre message a été envoyé avec succès !");
      setMsgName('');
      setMsgEmail('');
      setMsgPhone('');
      setMsgContent('');
    }
    setSendingMsg(false);
  };

  const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR').format(price);

  if (loading) {
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

  if (notFound || !property) {
    return (
      <main className="min-h-screen bg-background dark:bg-slate-950">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Annonce non trouvée</h1>
          <p className="text-muted-foreground mb-8">
            Désolé, cette annonce n&apos;existe pas ou a été supprimée.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/annonces">Retour aux annonces</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  const carouselImages = property.images && property.images.length > 0
    ? property.images
    : [property.image, property.image, property.image];

  const ownerName = property.owner?.name || 'Propriétaire';
  const ownerPhone = property.owner?.phone || '+237 6 XX XXX XXX';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
        <motion.div variants={itemVariants} className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/annonces">← Retour</Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <ImageCarousel images={carouselImages} title={property.title} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-white dark:bg-slate-800 sticky top-24">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Prix</p>
                  <p className="text-3xl font-bold text-primary">{formatPrice(property.price)}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {property.transaction === 'À louer' ? 'FCFA/mois' : 'FCFA'}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Badge className="bg-primary">{property.type}</Badge>
                  <Badge className={property.transaction === 'À louer' ? 'bg-blue-500 text-white' : 'bg-green-600 text-white'}>
                    {property.transaction}
                  </Badge>
                </div>

                <div className="border-t border-border pt-4">
                  <a href={`tel:${ownerPhone}`}>
                    <Button className="w-full bg-primary hover:bg-primary/90 mb-2">
                      <Phone size={18} className="mr-2" />
                      {ownerPhone}
                    </Button>
                  </a>
                  <a href={`https://wa.me/${ownerPhone.replace(/\s+/g, '').replace('+', '')}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full mb-2">
                      <MessageCircle size={18} className="mr-2" />
                      WhatsApp
                    </Button>
                  </a>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => toast.info("Cette fonctionnalité (Favoris) sera bientôt disponible !")}
                  >
                    <Heart size={18} className="mr-2" />
                    Favoris
                  </Button>
                </div>

                <div className="border-t border-border pt-4">
                  <button className="w-full flex items-center justify-center gap-2 text-primary hover:text-primary/80">
                    <Share2 size={18} />
                    Partager
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{property.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={20} />
                <span className="text-lg">{property.location}</span>
              </div>
            </div>

            <Card className="p-6 bg-white dark:bg-slate-800 border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Caractéristiques</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex justify-center mb-2"><Bed className="w-6 h-6 text-primary" /></div>
                  <p className="text-2xl font-bold text-foreground">{property.bedrooms}</p>
                  <p className="text-sm text-muted-foreground">Chambre(s)</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2"><Bath className="w-6 h-6 text-primary" /></div>
                  <p className="text-2xl font-bold text-foreground">{property.bathrooms}</p>
                  <p className="text-sm text-muted-foreground">Salle(s) de bain</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2"><Square className="w-6 h-6 text-primary" /></div>
                  <p className="text-2xl font-bold text-foreground">{property.squareMeter}</p>
                  <p className="text-sm text-muted-foreground">m²</p>
                </div>
              </div>
            </Card>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {property.description || `Superbe ${property.type.toLowerCase()} à ${property.location}. Cette propriété offre un excellent rapport qualité-prix avec tous les équipements modernes. Idéale pour une famille ou un investisseur.`}
              </p>
            </div>

            {/* Contact Form */}
            <Card className="p-6 bg-white dark:bg-slate-800 border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Contacter le propriétaire</h2>
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="msg-name" className="font-semibold mb-2 block">Nom *</Label>
                      <Input id="msg-name" value={msgName} onChange={(e) => setMsgName(e.target.value)} placeholder="Votre nom" required disabled={sendingMsg} />
                    </div>
                    <div>
                      <Label htmlFor="msg-email" className="font-semibold mb-2 block">Email *</Label>
                      <Input id="msg-email" type="email" value={msgEmail} onChange={(e) => setMsgEmail(e.target.value)} placeholder="votre@email.com" required disabled={sendingMsg} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="msg-phone" className="font-semibold mb-2 block">Téléphone</Label>
                    <Input id="msg-phone" type="tel" value={msgPhone} onChange={(e) => setMsgPhone(e.target.value)} placeholder="+237 6XX XXX XXX" disabled={sendingMsg} />
                  </div>
                  <div>
                    <Label htmlFor="msg-content" className="font-semibold mb-2 block">Message *</Label>
                    <Textarea id="msg-content" value={msgContent} onChange={(e) => setMsgContent(e.target.value)} placeholder={`Bonjour, je suis intéressé(e) par "${property.title}". Pourriez-vous me donner plus d'informations ?`} rows={4} required disabled={sendingMsg} />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={sendingMsg}>
                    {sendingMsg ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Envoi...</>
                    ) : (
                      <><MessageCircle size={18} className="mr-2" />Envoyer le message</>
                    )}
                  </Button>
                </form>
            </Card>
          </div>

          {/* Agent Info */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-white dark:bg-slate-800">
              <h3 className="text-xl font-bold text-foreground mb-4">Propriétaire</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{ownerName}</p>
                    <p className="text-sm text-muted-foreground">Propriétaire</p>
                  </div>
                </div>
                <div className="border-t border-border pt-4 space-y-3">
                  <a href={`tel:${ownerPhone}`}>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Phone size={18} className="mr-2" />
                      {ownerPhone}
                    </Button>
                  </a>
                  <a href={`https://wa.me/${ownerPhone.replace(/\s+/g, '').replace('+', '')}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full">
                      <MessageCircle size={18} className="mr-2" />
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>

      <Footer />
    </main>
  );
}
